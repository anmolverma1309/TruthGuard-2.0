"use client";

import { Beaker, ShieldCheck, Zap, Shield } from "lucide-react";
import DeepfakeScanner from "@/components/DeepfakeScanner";
import USBThreatDetector from "@/components/USBThreatDetector";

export default function LabPage() {
    return (
        <div className="flex-1 p-8 lg:p-20 relative flex flex-col items-center">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-neo-purple/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[700px] h-[700px] bg-neo-cyan/5 rounded-full blur-[180px]" />
            </div>

            <div className="w-full max-w-5xl mb-16 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-white/10 pb-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-neo-purple/10 text-neo-purple shadow-[0_0_20px_rgba(191,90,242,0.1)]">
                            <Shield className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white neo-text-glow tracking-tighter uppercase">
                            DEEPFAKE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-purple">SUITE</span>
                        </h1>
                    </div>
                    <p className="text-neo-text-secondary text-lg font-light max-w-2xl leading-relaxed">
                        Experimental security vectors and neural analysis tools. Testing the boundaries of deepfake detection and hardware isolation protocols.
                    </p>
                </div>
                <div className="mt-8 md:mt-0 flex items-center space-x-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
                    <Zap className="w-4 h-4 text-neo-purple fill-neo-purple shadow-[0_0_10px_rgba(191,90,242,0.5)]" />
                    <span className="text-xs font-bold font-mono text-white uppercase tracking-widest">Experimental Mode</span>
                </div>
            </div>

            <div className="w-full flex flex-col items-center gap-16">
                <section className="w-full flex flex-col items-center">
                    <div className="w-full max-w-4xl mb-8 flex items-center justify-between px-4">
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">01. Deepfake Scanner</h2>
                        <span className="text-[10px] font-mono text-neo-purple font-bold">Inference Active</span>
                    </div>
                    <DeepfakeScanner />
                </section>

                <section className="w-full flex flex-col items-center">
                    <div className="w-full max-w-4xl mb-8 flex items-center justify-between px-4">
                        <h2 className="text-xl font-black text-white uppercase tracking-[0.2em]">02. USB Threat Awareness</h2>
                        <span className="text-[10px] font-mono text-neo-cyan font-bold">Kernel Listener Enabled</span>
                    </div>
                    <USBThreatDetector />
                </section>
            </div>

            <div className="mt-20 py-8 px-12 neo-glass rounded-full border border-white/5 flex items-center gap-6">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <p className="text-[11px] font-mono text-neo-text-secondary tracking-widest uppercase">
                    All neural scans are processed in an isolated virtual sandbox.
                </p>
            </div>
        </div>
    );
}
