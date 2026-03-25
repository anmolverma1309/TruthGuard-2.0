import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY?.trim();

// Check if API key is valid (not placeholder or empty)
const isValidApiKey = (key: string | undefined) => {
  if (!key) return false;
  if (key.includes("your-key") || key.includes("YOUR_KEY")) return false;
  if (key.length < 30) return false; // Valid OpenRouter keys are longer
  return true;
};

// Simple in-memory rate limiter based on IP
const rateLimitCache = new Map<string, { count: number, resetTime: number }>();

// Simple in-memory results cache for duplicate queries
const queryCache = new Map<string, any>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const rateRecord = rateLimitCache.get(ip);
    
    if (rateRecord) {
      if (now > rateRecord.resetTime) {
        rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 }); // 1 min window
      } else if (rateRecord.count >= 10) {
        return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429, headers: { "X-RateLimit-Limit": "10", "X-RateLimit-Remaining": "0" } });
      } else {
        rateLimitCache.set(ip, { count: rateRecord.count + 1, resetTime: rateRecord.resetTime });
      }
    } else {
      rateLimitCache.set(ip, { count: 1, resetTime: now + 60000 });
    }

    const { input } = await req.json();

    if (!input || input.trim() === "") {
      return NextResponse.json({ error: "Missing or empty text input." }, { status: 400 });
    }
    
    // Strip simple HTML tags to sanitize
    const sanitizedInput = input.replace(/<\/?[^>]+(>|$)/g, "");
    
    if (sanitizedInput.length > 2000) {
      return NextResponse.json({ error: "Input too long. Max 2000 characters." }, { status: 400 });
    }

    const hasValidApiKey = isValidApiKey(OPENROUTER_API_KEY);

    const prompt = `You are a professional fact-checking AI engine used in a production system.

Your job is to evaluate a claim and return a STRICT credibility analysis that will be directly used in a UI.

⚠️ CRITICAL INSTRUCTIONS:

1. You MUST always return a valid JSON object. No extra text outside JSON.

2. First classify the claim into EXACTLY ONE category:
   - FACTUAL (objectively verifiable)
   - OPINION (belief, religion, personal, philosophical)
   - MISLEADING (partially true but lacks context)
   - FALSE (factually incorrect)
   - UNVERIFIABLE (no reliable evidence exists)

3. SCORING RULES (STRICT):
   - FACTUAL (correct) → 80 to 100
   - FACTUAL (partial) → 60 to 79
   - MISLEADING → 40 to 59
   - FALSE → 0 to 39
   - OPINION → EXACTLY 50
   - UNVERIFIABLE → 40 to 60

4. STATUS MAPPING (STRICT):
   - 80–100 → "Likely True"
   - 60–79 → "Partially True"
   - 40–59 → "Misleading"
   - 0–39 → "Likely Fake"
   - OPINION → "Opinion"
   - UNVERIFIABLE → "Unverifiable"

5. EXPLANATION RULES (VERY IMPORTANT):
   - MUST clearly explain WHY the claim is true/false/misleading
   - MUST clearly explain WHY the claim is true/false/misleading in minimum 3 sentences
   - Use factual reasoning, not vague statements
   - If FALSE → mention correct fact
   - If MISLEADING → explain missing context
   - If OPINION → say it's belief-based, not provable
   - If FACTUAL → briefly justify with real-world knowledge

6. SPECIAL RULES:
   - NEVER mark religious or belief-based claims as false
   - NEVER give random or inconsistent scores
   - Use general scientific and common knowledge
   - Be logically consistent across all responses

7. CONFIDENCE:
   - Reflect certainty of analysis (0–100)
   - High confidence only for widely accepted facts

8. OUTPUT FORMAT (STRICT JSON ONLY):

{
  "claim": "<input claim>",
  "type": "FACTUAL | OPINION | MISLEADING | FALSE | UNVERIFIABLE",
  "credibility_score": <number between 0-100>,
  "status": "<Likely True | Partially True | Misleading | Likely Fake | Opinion | Unverifiable>",
  "confidence": <number between 0-100>,
  "explanation": "<clear reason why this claim is true/false> in minimum 3 sentences",
  "sources": [
    { "name": "<source name>", "status": "verified | contradicts | no-evidence", "url": "<source url or #>", "score": <number 0-100> }
  ]
}

⚠️ DO NOT:
- Add markdown
- Add comments
- Add extra fields
- Return anything except JSON

Now evaluate this claim:
"""
${input}
"""`;


    const cacheKey = input.trim().toLowerCase();
    if (queryCache.has(cacheKey)) {
      console.log(`Cache hit for query: "${cacheKey.substring(0, 20)}..."`);
      return NextResponse.json(queryCache.get(cacheKey));
    }

    const models = [
      "meta-llama/llama-3.1-8b-instruct"
    ];

    const backupKey = process.env.BACKUP_API_KEY?.trim();
    const apiKeys = [
      OPENROUTER_API_KEY,
      backupKey
    ].filter(k => k && !k.includes("your-key-here")) as string[];

    let aiResult = null;
    let lastError = "No AI models attempted.";
    if (apiKeys.length === 0) {
      lastError = "No valid API keys configured. Using local fallback.";
    }
    let attemptCount = 0;

    // Determine Referer dynamically for OpenRouter
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const host = req.headers.get("host") || "localhost:3000";
    const referer = `${protocol}://${host}`;

    // Helper for delay
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    if (apiKeys.length > 0) {
      for (const model of models) {
        if (aiResult) break;
        for (const apiKey of apiKeys) {
          attemptCount++;
          try {
            console.log(`Attempt ${attemptCount}: Trying ${model} with key ${apiKey.substring(0, 8)}...`);
            const response = await axios.post(
              'https://openrouter.ai/api/v1/chat/completions',
              {
                model: model,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.1,
              },
              {
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'HTTP-Referer': referer,
                  'X-Title': 'TruthGuard X',
                  'Content-Type': 'application/json'
                },
                timeout: 10000 // Reduced to 10s for faster fallback
              }
            );

            const content = response.data.choices[0].message.content;
            const jsonMatch = content.match(/\{[\s\S]*\}/);

            if (jsonMatch) {
              try {
                aiResult = JSON.parse(jsonMatch[0]);
                if (aiResult && aiResult.credibility_score !== undefined) break;
              } catch (pErr) {
                console.warn("Partial JSON parse error, retrying...");
              }
            }
          } catch (apiError: any) {
            const errMsg = apiError.response?.data?.error?.message || apiError.message;
            lastError = errMsg;
            
            if (process.env.NODE_ENV === 'development') {
              console.log(`Attempt ${attemptCount}: ${model} failed - ${errMsg}`);
            }
            
            if (apiError.response?.status === 429) {
              await sleep(1000); 
            }
            continue;
          }
        }
      }
    }

    if (!aiResult) {
      console.log(`AI analysis unavailable. Using local heuristic for: "${input.substring(0, 30)}..."`);
      
      const lowerInput = input.toLowerCase();
      let score = 50;
      let type = "UNVERIFIABLE";
      let status = "Unverifiable";
      let reasoning = "This claim requires verification against trusted sources. No matching patterns were found in the local intelligence buffer for a definitive assessment.";

      // Expanded Heuristic Matching
      const patterns = [
        {
          keywords: ["sky is blue", "earth is round", "water is h2o", "sun rises", "2+2=4", "gravity", "evolution", "photosynthesis", "dna", "oxygen"],
          score: 98, type: "FACTUAL", status: "Likely True",
          reason: "This is a fundamental scientific or mathematical fact supported by universal consensus and observable evidence."
        },
        {
          keywords: ["flat earth", "fake moon landing", "chemtrails", "vaccines cause autism", "illuminati", "5g causes", "salman khan married", "salman khan is married", "salman khan wife", "moon landing hoax", "earth hollow", "gravity fake", "disease man-made", "birds are fake", "nasa lies", "earth flat", "backwards moon", "fake disease", "poison vaccine", "government lies"],
          score: 12, type: "FALSE", status: "Likely Fake",
          reason: "This statement matches known misinformation patterns and conspiracy theories that have been thoroughly debunked by scientific and historical records."
        },
        {
          keywords: ["best", "love", "beautiful", "good", "bad", "worst", "opinion", "think", "believe", "god", "religion", "faith", "amazing", "terrible", "should", "prefer", "like", "hate", "favorite", "great", "excellent", "awful", "wonderful", "horrible", "fantastic", "disgusting", "i think", "i believe", "in my opinion", "i feel", "seems to me"],
          score: 50, type: "OPINION", status: "Opinion",
          reason: "This is a subjective claim based on personal belief, values, or taste. It cannot be objectively proven true or false."
        },
        {
          keywords: ["election", "stolen", "corruption", "politics", "politician", "scandal", "studies show", "researchers claim", "scientists believe", "many people think", "it is said", "allegedly", "supposedly", "rumor has it", "word on street", "according to some", "partial truth"],
          score: 45, type: "MISLEADING", status: "Misleading",
          reason: "Political claims often lack critical context. This statement contains elements that may be partially true but are presented in a way that could lead to incorrect conclusions."
        },
        {
          keywords: ["cure", "cancer", "miracle", "health", "doctor", "medicine", "treatment", "therapy", "disease", "virus", "epidemic", "pandemic", "vaccine", "drug"],
          score: 35, type: "UNVERIFIABLE", status: "Unverifiable",
          reason: "Medical and health claims require clinical verification. Without specific peer-reviewed evidence, this claim remains speculative and potentially dangerous."
        },
        {
          keywords: ["ai", "artificial intelligence", "machine learning", "robot", "algorithm", "data", "cybersecurity", "blockchain", "quantum computing", "internet of things", "5g", "technology", "software", "hardware", "startup", "innovation"],
          score: 60, type: "UNVERIFIABLE", status: "Unverifiable",
          reason: "Claims related to rapidly evolving technology often require up-to-date expert analysis and specific technical details for verification."
        }
      ];

      for (const p of patterns) {
        if (p.keywords.some(k => lowerInput.includes(k))) {
          score = p.score;
          type = p.type;
          status = p.status;
          reasoning = p.reason;
          break;
        }
      }

      aiResult = {
        claim: input,
        type,
        credibility_score: score,
        status,
        explanation: `⚠️ [LOCAL KNOWLEDGE BACKUP] ${reasoning}`,
        confidence: 75,
        sources: [
          { name: "TruthGuard X Local Buffer", status: score >= 80 ? "verified" : score <= 30 ? "contradicts" : "no-evidence", url: "#", score: score },
          { name: "Heuristic Engine V2", status: "no-evidence", url: "#", score: score - 5 > 0 ? score - 5 : 0 }
        ]
      };
    }

    // Map response to Dashboard UI
    const score = Number(aiResult.credibility_score) || 50;
    const type = String(aiResult.type).toUpperCase();

    // Prioritize the status field from AI response, fallback to logic if missing
    let statusCategory = aiResult.status || "Unverifiable";

    // Ensure fallback status matches strict criteria if aiResult.status is missing
    if (!aiResult.status) {
      if (type === "OPINION") {
        statusCategory = "Opinion";
      } else if (type === "FALSE") {
        statusCategory = "Likely Fake";
      } else if (type === "MISLEADING") {
        statusCategory = "Misleading";
      } else if (score >= 80) {
        statusCategory = "Likely True";
      } else if (score >= 60) {
        statusCategory = "Partially True";
      } else if (score >= 40) {
        statusCategory = "Misleading";
      } else {
        statusCategory = "Likely Fake";
      }
    }

    const reasoning = [
      `Classification: ${type}`,
      `Status: ${statusCategory}`,
      `Reasoning: ${aiResult.explanation || "No detailed reasoning provided."}`,
      `AI Confidence: ${aiResult.confidence}%`
    ];

    // Use AI-provided sources if available, otherwise fallback
    const sources = aiResult.sources || [
      { 
        name: "TruthGuard X Intelligence", 
        status: score >= 80 ? "verified" : score <= 39 ? "contradicts" : "no-evidence", 
        url: "#", 
        score: score 
      },
      { 
        name: "Local Knowledge Buffer", 
        status: score >= 90 ? "verified" : score <= 20 ? "contradicts" : "no-evidence", 
        url: "#", 
        score: score - 5 > 0 ? (score - 5 > 100 ? 100 : score - 5) : 0 
      }
    ];

    const currentTime = new Date().toISOString().split("T")[0];
    const disclaimer = `Report Generated: ${currentTime}. Fact Integrity: ${statusCategory}. Basis: ${type}. Scoring follows strict production guidelines. Subjective claims remain neutral.`;

    const responseBody = {
      score,
      claim: aiResult.claim || (input.length > 80 ? input.substring(0, 80) + "..." : input),
      status: statusCategory,
      reasoning,
      sources,
      disclaimer,
      aiDetection: aiResult
    };

    // Store in cache for 1 hour (conceptually, we just put it in the Map without expiry logic here for brevity)
    queryCache.set(cacheKey, responseBody);

    return NextResponse.json(responseBody);

  } catch (error) {
    console.error("Server Error parsing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
