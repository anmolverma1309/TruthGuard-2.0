"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Link as LinkIcon, FileImage, ShieldAlert, Loader2, Upload } from "lucide-react";

export default function AnalysisForm() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"text" | "url" | "image">("text");
    const [inputValue, setInputValue] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryToUse = activeTab === "image" && !inputValue ? "Image Analysis" : inputValue.trim();
        if (!queryToUse && activeTab !== "image") return;

        setIsAnalyzing(true);
        router.push(`/dashboard/results?q=${encodeURIComponent(queryToUse)}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[var(--glass-dark)] backdrop-blur-2xl rounded-[32px] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] relative border border-[var(--border-gold)] group">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-faint)] to-[var(--rose-dim)] opacity-50 pointer-events-none" />

            <div className="p-1 border-b border-white/5 bg-white/5">
                <div className="flex space-x-1 p-1">
                    {[
                        { id: "text", label: "Text Snippet", icon: Search },
                        { id: "url", label: "Scan URL", icon: LinkIcon },
                        { id: "image", label: "Screenshot", icon: FileImage },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 px-6 py-3 text-xs font-bold transition-all duration-300 rounded-full mx-1 uppercase tracking-widest font-mono ${isActive
                                    ? "bg-[var(--gold2)] text-[var(--bg)] shadow-[0_0_20px_rgba(255,215,0,0.3)]"
                                    : "text-[var(--text-mid)] hover:text-[var(--gold2)] hover:bg-[var(--glass-gold)]"
                                    }`}
                            >
                                <Icon className="w-3 h-3" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="p-10 backdrop-blur-3xl relative z-0">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="relative group/input">
                        <div className="absolute -inset-4 bg-[var(--gold-faint)] rounded-[32px] blur-2xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500" />

                        {activeTab === "text" && (
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter digital signal for analysis..."
                                className="w-full h-56 bg-[var(--glass-base)] border border-[var(--border-dim)] rounded-[24px] p-6 text-[var(--text)] placeholder-[var(--text-dim)] focus:border-[var(--border-gold2)] focus:ring-4 focus:ring-[var(--gold-dim)] transition-all duration-500 resize-none font-serif relative z-10 text-lg font-light leading-relaxed outline-none"
                                disabled={isAnalyzing}
                            />
                        )}

                        {activeTab === "url" && (
                            <div className="relative z-10">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <LinkIcon className="h-5 w-5 text-[var(--gold2)]" />
                                </div>
                                <input
                                    type="url"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="https://source-node.network/trace"
                                    className="w-full bg-[var(--glass-base)] border border-[var(--border-dim)] rounded-full py-6 pl-16 pr-6 text-[var(--text)] placeholder-[var(--text-dim)] focus:border-[var(--border-gold2)] focus:ring-4 focus:ring-[var(--gold-dim)] transition-all duration-500 font-mono outline-none"
                                    disabled={isAnalyzing}
                                />
                            </div>
                        )}

                        {activeTab === "image" && (
                            <div className="border border-dashed border-[var(--border-dim)] hover:border-[var(--border-gold2)] rounded-[32px] p-16 flex flex-col items-center justify-center bg-[var(--glass-base)] transition-all duration-500 relative z-10 cursor-pointer group/upload"
                                 onClick={() => document.getElementById('image-upload')?.click()}>
                                <div className="p-5 rounded-2xl bg-[var(--glass-gold)] text-[var(--gold2)] mb-6 group-hover/upload:scale-110 transition-transform">
                                    <Upload className="w-10 h-10" />
                                </div>
                                <p className="text-[var(--text)] text-lg font-serif mb-2">{inputValue ? "File Selected" : "Ingest Signal Matrix"}</p>
                                <p className="text-[var(--text-mid)] text-sm font-light tracking-wide">{inputValue ? inputValue : "Click to select a file"}</p>
                                <input 
                                    id="image-upload"
                                    type="file" 
                                    className="hidden" 
                                    disabled={isAnalyzing} 
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setInputValue(`[IMAGE_ANALYSIS] ${file.name}`);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 overflow-hidden">
                        <div className="flex items-center space-x-3 text-[10px] text-[var(--text-dim)] font-mono uppercase tracking-[0.2em] bg-[var(--glass-base)] px-4 py-2 rounded-full border border-[var(--border-dim)]">
                            <ShieldAlert className="w-3 h-3 text-[var(--gold)] animate-pulse" />
                            <span>Neural Scan Active • Zero-Knowledge Protocol</span>
                        </div>

                        <button
                            type="submit"
                            disabled={isAnalyzing || (!inputValue.trim() && activeTab !== "image")}
                            className={`group relative flex items-center space-x-3 px-10 py-4 rounded-full font-serif font-black text-sm uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${isAnalyzing
                                ? "bg-[var(--glass-base)] text-[var(--text-dim)] cursor-not-allowed"
                                : inputValue.trim() || activeTab === "image"
                                    ? "text-[var(--bg)] hover:scale-105"
                                    : "bg-[var(--glass-base)] border border-[var(--border-dim)] text-[var(--text-dim)] cursor-not-allowed"
                                }`}
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-[var(--gold2)] opacity-100 shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Search className="w-4 h-4" />
                                        Launch Intelligence Scan
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Decorative scanning line animation during analysis */}
            {isAnalyzing && (
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--gold2)] shadow-[0_0_15px_#ffd700] animate-[scan_2s_ease-in-out_infinite]" />
            )}
        </div>
    );
}
