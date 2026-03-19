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
        color = "#ff3333"; // Likely Fake (Red)
    } else if (normalizedStatus.includes("misleading") || (score < 60 && !status)) {
        color = "#ffaa00"; // Misleading (Amber)
    } else if (normalizedStatus.includes("partially") || (score < 80 && !status)) {
        color = "#ffee00"; // Partially True (Yellow)
    } else if (normalizedStatus.includes("opinion") || score === 50) {
        color = "#a855f7"; // Opinion (Purple)
    } else if (normalizedStatus.includes("unverifiable")) {
        color = "#94a3b8"; // Unverifiable (Slate)
    }

    // Calculate SVG circle properties
    const radius = 80;
    const strokeWidth = 12;
    const center = 100;
    const circumference = 2 * Math.PI * radius;
    // The dashoffset controls how much of the stroke is hidden
    const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
                {/* Background Circle */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="var(--color-cyber-panel-border)"
                    strokeWidth={strokeWidth}
                    className="opacity-20"
                />
                
                {/* Track Circle (Subtle background path) */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.05)"
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
                        filter: `drop-shadow(0 0 12px ${color}80)`,
                    }}
                />
            </svg>

            {/* Absolute positioning for text inside the circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-6xl font-bold font-mono transition-all duration-500" style={{ color, textShadow: `0 0 20px ${color}60` }}>
                    {Math.round(animatedScore)}
                </span>
                <span className="text-cyber-text-secondary text-base font-mono mt-1 uppercase tracking-[0.2em] opacity-80">
                    Confidence
                </span>
            </div>

            <div className="mt-8 text-center bg-cyber-bg/40 backdrop-blur-sm px-6 py-3 rounded-full border border-cyber-panel-border/30">
                <div className="text-[10px] text-cyber-text-secondary uppercase tracking-[0.3em] mb-1 font-mono">Verdict Status</div>
                <div className="text-xl font-bold font-mono tracking-wider" style={{ color, textShadow: `0 0 10px ${color}40` }}>
                    {status || "Analyzing..."}
                </div>
            </div>
        </div>
    );
}
