"use client";

import { useState } from "react";
import { Upload, ShieldAlert, CheckCircle2, Loader2, Info } from "lucide-react";
import { detectDeepfake, DeepfakeResult } from "@/services/deepfakeService";

export default function DeepfakeScanner() {
    const [file, setFile] = useState<File | null>(null);
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState<DeepfakeResult | null>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handleScan = async () => {
        if (!file) return;
        setScanning(true);
        try {
            const data = await detectDeepfake(file);
            setResult(data);
        } finally {
            setScanning(false);
        }
    };

    return (
        <div className="w-full max-w-4xl neo-glass rounded-[40px] p-12 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neo-purple/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-neo-purple/20 transition-all duration-700" />
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="flex-1 w-full">
                    <h3 className="text-3xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
                        <Upload className="w-8 h-8 text-neo-purple" />
                        Signal Input
                    </h3>

                    <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-[32px] cursor-pointer hover:border-neo-purple/40 hover:bg-neo-purple/5 transition-all group/upload">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 text-neo-text-secondary mb-4 group-hover/upload:scale-110 transition-transform" />
                            <p className="mb-2 text-sm text-neo-text-secondary font-medium uppercase tracking-widest">
                                {file ? file.name : "Drop Intelligence Signal"}
                            </p>
                            <p className="text-xs text-white/30 font-mono">SUPPORTED: JPG, PNG, MP4</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileSelect} />
                    </label>

                    <button
                        onClick={handleScan}
                        disabled={!file || scanning}
                        className="w-full mt-8 bg-gradient-to-r from-neo-purple to-[#8a5cf5] text-white font-bold py-5 rounded-[24px] shadow-[0_0_30px_rgba(191,90,242,0.3)] hover:shadow-[0_0_50px_rgba(191,90,242,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm"
                    >
                        {scanning ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Analyzing Neural Patterns...
                            </>
                        ) : (
                            "Launch Neural Scan"
                        )}
                    </button>
                </div>

                <div className="flex-1 w-full min-h-[400px] flex flex-col">
                    <h3 className="text-3xl font-black text-white mb-6 tracking-tight">Neural Verdict</h3>
                    
                    {!result && !scanning && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-white/5 rounded-[32px] border border-white/5 opacity-50">
                            <ShieldAlert className="w-16 h-16 mb-4 text-white/20" />
                            <p className="text-neo-text-secondary text-sm font-mono tracking-widest leading-relaxed">
                                WAITING FOR CRYPTOGRAPHIC<br/>SIGNAL ANALYSIS
                            </p>
                        </div>
                    )}

                    {scanning && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 bg-neo-purple/5 rounded-[32px] border border-neo-purple/20">
                            <div className="w-20 h-20 relative">
                                <div className="absolute inset-0 border-4 border-neo-purple/30 rounded-full" />
                                <div className="absolute inset-0 border-4 border-neo-purple border-t-transparent rounded-full animate-spin" />
                            </div>
                            <p className="mt-6 text-neo-purple font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Scanning Core Layers</p>
                        </div>
                    )}

                    {result && (
                        <div className={`flex-1 p-10 rounded-[32px] border transition-all duration-500 ${
                            result.verdict === 'REAL' ? 'bg-green-500/10 border-green-500/30' :
                            result.verdict === 'FAKE' ? 'bg-neo-purple/10 border-neo-purple/30' :
                            'bg-yellow-500/10 border-yellow-500/30'
                        }`}>
                            <div className="flex items-center justify-between mb-8">
                                <span className={`text-4xl font-black neo-text-glow ${
                                    result.verdict === 'REAL' ? 'text-green-400' :
                                    result.verdict === 'FAKE' ? 'text-neo-purple' :
                                    'text-yellow-400'
                                }`}>
                                    {result.verdict}
                                </span>
                                <div className="text-right">
                                    <div className="text-3xl font-black text-white">{result.deepfake_probability}%</div>
                                    <div className="text-[10px] text-neo-text-secondary uppercase tracking-widest font-mono">Synthesis Prob.</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] text-neo-text-secondary font-mono tracking-widest uppercase mb-4 opacity-60">Key Signal Anomalies:</div>
                                {result.signals.map((signal, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-white/80 font-light">
                                        <div className="w-1.5 h-1.5 rounded-full bg-neo-purple shadow-[0_0_5px_rgba(191,90,242,0.8)]" />
                                        {signal}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
