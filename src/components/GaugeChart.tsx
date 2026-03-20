"use client";

import { useEffect, useState } from "react";

interface GaugeChartProps {
    score: number;
    status: string;
}

export default function GaugeChart({ score, status }: GaugeChartProps) {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setAnimatedScore(score);
        }, 300);
        return () => clearTimeout(timeout);
    }, [score]);

    // Determine color based on status or score fallback
    let color = "#00ff66"; // Likely True (Green)
    const normalizedStatus = status?.toLowerCase() || "";

    if (normalizedStatus.includes("fake") || (score < 40 && !status)) {
        color = "#bf5af2"; // Likely Fake (Purple) - Matches image style
    } else if (normalizedStatus.includes("misleading") || (score < 60 && !status)) {
        color = "#ffaa00"; // Misleading (Amber)
    } else if (normalizedStatus.includes("partially") || (score < 80 && !status)) {
        color = "#00e5ff"; // Partially True (Cyan)
    } else if (normalizedStatus.includes("opinion") || score === 50) {
        color = "#a855f7"; // Opinion (Purple)
    } else if (normalizedStatus.includes("unverifiable")) {
        color = "#94a3b8"; // Unverifiable (Slate)
    }

    // Calculate SVG circle properties
    const radius = 80;
    const strokeWidth = 10;
    const center = 100;
    const circumference = 2 * Math.PI * radius;
    // The dashoffset controls how much of the stroke is hidden
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg className="w-72 h-72 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth={strokeWidth}
                />
                
                {/* Track Circle (Subtle background path) */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.02)"
                    strokeWidth={strokeWidth}
                />

                {/* Foreground Progress Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ 
                        filter: `drop-shadow(0 0 15px ${color}80)`,
                    }}
                />
            </svg>

            {/* Absolute positioning for text inside the circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-7xl font-black transition-all duration-500 tracking-tighter" style={{ color, textShadow: `0 0 30px ${color}40` }}>
                    {Math.round(animatedScore)}
                </span>
                <span className="text-neo-text-secondary text-[10px] uppercase tracking-[0.4em] font-bold opacity-60">
                    Confidence Matrix
                </span>
            </div>

            <div className="mt-12 text-center neo-glass px-10 py-5 rounded-2xl border border-white/5 shadow-2xl">
                <div className="text-[10px] text-neo-text-secondary uppercase tracking-[0.3em] mb-2 font-mono font-bold opacity-60">Neural Verdict</div>
                <div className="text-2xl font-black tracking-tight" style={{ color, textShadow: `0 0 15px ${color}30` }}>
                    {status || "Analyzing Signal..."}
                </div>
            </div>
        </div>
    );
}
