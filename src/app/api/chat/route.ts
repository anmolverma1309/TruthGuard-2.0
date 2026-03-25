import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { question, messages } = await req.json();

    const currentInput = question || (messages && messages.length > 0 ? messages[messages.length - 1].text : "");

    if (!currentInput || currentInput.trim() === "") {
      return NextResponse.json({ error: "No input provided." }, { status: 400 });
    }

    if (currentInput.length > 500) {
      return NextResponse.json({ error: "Input too long. Max 500 characters." }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Configuration error" }, { status: 500 });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const groqMessages = [
      { 
        role: "system", 
        content: "You are the TruthGuard-X AI Assistant. Your only purpose is to help users with fact-checking, digital hygiene, identifying misinformation, and navigating the TruthGuard-X platform. Do not answer questions outside of these topics. If a user asks about something unrelated, politely refuse and remind them of your purpose. Be concise and authoritative."
      }
    ];

    if (messages && messages.length > 0) {
      messages.forEach((m: any) => {
        groqMessages.push({ role: m.role === "user" ? "user" : "assistant", content: m.text });
      });
    } else {
      groqMessages.push({ role: "user", content: currentInput });
    }

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: groqMessages as any,
      max_tokens: 1024,
    });

    const answer = response.choices[0].message.content;
    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error("Chat API Error:", error.message);
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
  }
}
