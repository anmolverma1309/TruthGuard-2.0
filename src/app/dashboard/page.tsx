import { Cpu } from "lucide-react";
import AnalysisForm from "@/components/AnalysisForm";

export default function DashboardPage() {
    return (
        <div className="flex-1 p-8 lg:p-20 relative flex flex-col items-center">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] bg-[var(--gold-faint)] rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[700px] h-[700px] bg-[var(--rose-dim)] rounded-full blur-[180px]" />
            </div>

            <div className="w-full max-w-5xl mb-16 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-[var(--border-dim)] pb-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-[var(--glass-gold)] text-[var(--gold2)] shadow-[0_0_20px_rgba(255,215,0,0.15)]">
                            <Cpu className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-black text-[var(--text)] tracking-tighter">
                            ANALYSIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold2)] to-[var(--rose2)] filter drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]">HUB</span>
                        </h1>
                    </div>
                    <p className="text-[var(--text-mid)] text-lg font-light max-w-2xl leading-relaxed">
                        Interface with TruthGuard's advanced intelligence engine. Submit digital signals for deep-core cryptographic and semantic verification.
                    </p>
                </div>
                <div className="mt-8 md:mt-0 flex items-center space-x-3 bg-[var(--glass-base)] px-5 py-2.5 rounded-full border border-[var(--border-dim)] backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-[var(--gold2)] animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
                    <span className="text-xs font-bold font-mono text-[var(--gold2)] uppercase tracking-widest">Core Synchronized</span>
                </div>
            </div>

            <AnalysisForm />

            {/* Quick stats or hints */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                <div className="bg-[var(--glass-base)] backdrop-blur-xl p-8 rounded-[24px] text-center border border-[var(--border-dim)] group hover:border-[var(--border-gold2)] transition-all">
                    <div className="text-4xl font-serif font-black text-[var(--text)] mb-2 group-hover:text-[var(--gold2)] transition-colors">94.8%</div>
                    <div className="text-[10px] text-[var(--text-dim)] font-mono tracking-[0.2em] uppercase font-bold">Accuracy Rating</div>
                </div>
                <div className="bg-[var(--glass-base)] backdrop-blur-xl p-8 rounded-[24px] text-center border border-[var(--border-dim)] group hover:border-[var(--border-rose)] transition-all">
                    <div className="text-4xl font-serif font-black text-[var(--text)] mb-2 group-hover:text-[var(--rose2)] transition-colors">2.4M+</div>
                    <div className="text-[10px] text-[var(--text-dim)] font-mono tracking-[0.2em] uppercase font-bold">Active Nodes</div>
                </div>
                <div className="bg-[var(--glass-base)] backdrop-blur-xl p-8 rounded-[24px] text-center border border-[var(--border-dim)] group hover:border-[var(--border-teal)] transition-all">
                    <div className="text-4xl font-serif font-black text-[var(--text)] mb-2 transition-colors">&lt;150ms</div>
                    <div className="text-[10px] text-[var(--text-dim)] font-mono tracking-[0.2em] uppercase font-bold">Latency Floor</div>
                </div>
            </div>
        </div>
    );
}
