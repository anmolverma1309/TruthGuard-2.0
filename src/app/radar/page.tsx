import { Activity, Globe, Flame, AlertTriangle } from "lucide-react";
import ThreatRadar from "@/components/ThreatRadar";

export default function RadarPage() {
    const trendingTopics = [
        { name: "Fake CBD COVID Cures", category: "Health", score: 98, trend: "up", color: "text-cyber-red" },
        { name: "AI Voices in Phishing", category: "Scams", score: 94, trend: "up", color: "text-cyber-amber" },
        { name: "Deepfake Election Rally", category: "Politics", score: 87, trend: "down", color: "text-cyber-cyan" },
        { name: "Flash Crash Rumors", category: "Finance", score: 82, trend: "up", color: "text-cyber-cyan" },
        { name: "UFO Declassification Fake", category: "Conspiracy", score: 76, trend: "flat", color: "text-cyber-green" },
    ];

    return (
        <div className="flex-1 p-8 lg:p-20 relative flex flex-col items-center">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] bg-neo-purple/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[10%] right-[15%] w-[600px] h-[600px] bg-neo-cyan/5 rounded-full blur-[180px]" />
            </div>

            <div className="w-full max-w-6xl mb-12 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-white/10 pb-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-neo-purple/10 text-neo-purple shadow-[0_0_20px_rgba(191,90,242,0.1)]">
                            <Globe className="w-10 h-10 animate-pulse" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white neo-text-glow tracking-tighter">
                            THREAT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-purple to-neo-cyan">RADAR</span>
                        </h1>
                    </div>
                    <p className="text-neo-text-secondary text-lg font-light max-w-2xl leading-relaxed">
                        Passive signals intelligence and real-time monitoring of disinformation ecosystems. Analyzing global sentiment vectors for emerging propaganda patterns.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full">
                    <ThreatRadar />
                </div>

                <div className="space-y-8">
                    <div className="neo-glass rounded-[32px] p-10 border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neo-cyan/5 blur-3xl rounded-full" />
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <Flame className="w-6 h-6 text-neo-cyan shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                            Active Signal Bursts
                        </h3>

                        <div className="space-y-6">
                            {trendingTopics.map((topic, i) => (
                                <div key={i} className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 transition-all duration-300 hover:border-neo-cyan/20 hover:bg-white/10 group/item">
                                    <div className="flex flex-col">
                                        <span className="font-bold text-white text-lg mb-1 group-hover/item:text-neo-cyan transition-colors">{topic.name}</span>
                                        <span className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-[0.2em]">{topic.category}</span>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`text-2xl font-black ${topic.color === 'text-cyber-red' ? 'text-neo-purple' : 'text-neo-cyan'} neo-text-glow`}>{topic.score}</span>
                                        <span className="text-[9px] text-neo-text-secondary font-mono uppercase tracking-widest">Velocity</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="neo-glass rounded-[32px] p-8 border border-neo-purple/20 bg-neo-purple/5 relative overflow-hidden">
                         <div className="absolute inset-0 bg-gradient-to-br from-neo-purple/10 to-transparent pointer-events-none" />
                        <div className="flex items-start gap-5 relative z-10">
                            <div className="p-3 rounded-full bg-neo-purple/20 text-neo-purple border border-neo-purple/30">
                                <AlertTriangle className="w-6 h-6 animate-pulse" />
                            </div>
                            <div>
                                <h4 className="font-bold text-neo-purple mb-2 uppercase tracking-widest text-sm">Critical Anomalies</h4>
                                <p className="text-neo-text-secondary text-sm font-light leading-relaxed">
                                    Coordinated neural network amplification detected. Sentiment vector displacement of +400% observed in the last 120 minutes across core nodes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
