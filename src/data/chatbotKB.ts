export const chatbotKB: Record<string, string> = {
    "hello": "Greetings. I am the TruthGuard AI Assistant. How can I assist you with fact-checking or digital safety today?",
    "hi": "Greetings. I am the TruthGuard AI Assistant. How can I assist you with fact-checking or digital safety today?",
    "who are you": "I am the TruthGuard AI Assistant. I help users navigate the platform, check digital hygiene, and verify information.",
    "what is truthguard": "TruthGuard-X is an AI-powered misinformation detection system designed to help users evaluate the credibility of digital content.",
    "how to report a cybercrime": "In India, you can report cybercrimes at the National Cyber Crime Reporting Portal (cybercrime.gov.in) or dial the national helpline 1930.",
    "how to check if a link is safe": "You can paste the URL into the 'Scan URL' tab on the TruthGuard dashboard. Our AI will analyze the domain and content for malicious patterns.",
    "deepfake": "Deepfakes are AI-generated synthetic media where a person in a video or image is replaced with someone else's likeness. You can use our Deepfake Scanner tool on the dashboard to analyze media."
};

export function getLocalAnswer(question: string): string | null {
    const q = question.toLowerCase().trim();
    
    // Direct match
    if (chatbotKB[q]) return chatbotKB[q];

    // Substring match for key safety topics
    if (q.includes("report") && (q.includes("cybercrime") || q.includes("scam") || q.includes("fraud"))) {
        return chatbotKB["how to report a cybercrime"];
    }
    if (q.includes("safe") && (q.includes("link") || q.includes("url") || q.includes("website"))) {
        return chatbotKB["how to check if a link is safe"];
    }
    if (q.includes("deepfake") || q.includes("fake video") || q.includes("ai video")) {
        return chatbotKB["deepfake"];
    }

    return null; // Null means fallback to API
}
