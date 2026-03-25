"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { getLocalAnswer } from "@/data/chatbotKB";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{role: string, text: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleAsk() {
    if (!question.trim()) return;

    const userMessage = { role: "user", text: question };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setQuestion("");
    setLoading(true);

    const localAnswer = getLocalAnswer(question);
    if (localAnswer) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", text: localAnswer }]);
        setLoading(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: currentMessages }),
      });

      const data = await res.json();
      const botText = data.answer || data.error || "No response received";
      setMessages((prev) => [...prev, { role: "bot", text: botText }]);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[70vh] w-full max-w-4xl mx-auto rounded-xl border border-[var(--border-gold)] bg-[var(--glass-base)] backdrop-blur-3xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.15)]">
      {/* Header */}
      <div className="bg-[var(--glass-gold)] border-b border-[var(--border-gold)] px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-serif font-black text-[var(--gold2)] tracking-widest flex items-center gap-3">
          <Bot className="text-[var(--gold2)] w-6 h-6" /> TruthGuard AI Assist
        </h2>
        <span className="text-xs font-mono text-[var(--gold)] px-3 py-1 bg-[var(--glass-base)] border border-[var(--border-gold)] rounded-full">Llama-3.3-70B</span>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <Bot className="text-[var(--gold-dim)] w-16 h-16 opacity-50" />
              <p className="text-[var(--text-mid)] font-serif text-lg">I am the TruthGuard AI Assistant.<br/>Ask me anything about incident reporting, digital hygiene, or safety.</p>
           </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              {/* Avatar */}
              <div className="flex-shrink-0 mt-1">
                {msg.role === "user" ? (
                   <div className="w-8 h-8 rounded-full bg-[var(--glass-teal)] border border-[var(--border-teal)] flex items-center justify-center">
                     <User className="text-[var(--teal)] w-4 h-4" />
                   </div>
                ) : (
                   <div className="w-8 h-8 rounded-full bg-[var(--glass-gold)] border border-[var(--border-gold)] flex items-center justify-center">
                     <Bot className="text-[var(--gold)] w-4 h-4" />
                   </div>
                )}
              </div>
              
              {/* Bubble */}
              <div
                className={`px-5 py-3 rounded-2xl align-top whitespace-pre-wrap font-sans text-[15px] leading-relaxed
                  ${msg.role === "user" 
                    ? "bg-[var(--glass-teal)] border border-[var(--border-teal)] text-white rounded-tr-none" 
                    : "bg-[var(--glass-base)] border border-[var(--border-gold)] text-[var(--text)] rounded-tl-none shadow-md"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex w-full justify-start">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--glass-gold)] border border-[var(--border-gold)] flex items-center justify-center mt-1">
                <Bot className="text-[var(--gold)] w-4 h-4 animate-pulse" />
              </div>
              <div className="px-5 py-3 rounded-2xl rounded-tl-none bg-[var(--glass-base)] border border-[var(--border-gold)] text-[var(--gold)] animate-pulse font-mono text-sm flex items-center gap-2">
                Processing logic stream...
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Box */}
      <div className="p-4 bg-[var(--bg)] border-t border-[var(--border-gold)]">
        <div className="relative flex items-center w-full group">
          <input
            ref={inputRef}
            type="text"
            id="chat-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Type your query here..."
            className="flex-1 bg-[var(--bg2)] border border-[var(--border-dim)] text-[var(--text)] rounded-xl py-3 pl-4 pr-16 font-sans text-[15px] focus:outline-none focus:border-[var(--gold)] focus:shadow-[0_0_15px_rgba(255,215,0,0.2)] transition-all placeholder-[var(--text-dim)] relative z-50 pointer-events-auto"
          />
          <button
            onClick={handleAsk}
            disabled={loading || !question.trim()}
            className="absolute right-2 px-3 py-1.5 bg-[var(--glass-gold)] hover:bg-[var(--border-gold)] border border-[var(--border-gold)] text-[var(--gold)] rounded-lg transition-all disabled:opacity-50 flex items-center justify-center cursor-pointer"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
