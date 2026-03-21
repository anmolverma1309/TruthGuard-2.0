import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "API Key missing in .env" }, { status: 401 });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: question }],
      max_tokens: 1024,
    });

    const answer = response.choices[0].message.content;
    return NextResponse.json({ answer });

  } catch (error: any) {
    console.error("Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
