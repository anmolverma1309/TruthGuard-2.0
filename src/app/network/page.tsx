import { Network } from "lucide-react";
import NetworkGraph from "@/components/NetworkGraph";

export default function NetworkPage() {
    return (
        <div className="flex-1 p-8 lg:p-20 relative flex flex-col items-center">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-neo-cyan/5 rounded-full blur-[150px]" />
                <div className="absolute bottom-[20%] left-[15%] w-[600px] h-[600px] bg-neo-purple/5 rounded-full blur-[180px]" />
            </div>

            <div className="w-full max-w-5xl mb-12 flex flex-col md:flex-row items-center md:items-end justify-between border-b border-white/10 pb-10">
                <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                        <div className="p-3 rounded-2xl bg-neo-cyan/10 text-neo-cyan shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                            <Network className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white neo-text-glow tracking-tighter">
                            SIGNAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-purple">MATRICES</span>
                        </h1>
                    </div>
                    <p className="text-neo-text-secondary text-lg font-light max-w-2xl leading-relaxed">
                        Visualizing high-fidelity propagation chains and infection vectors. Mapping the topology of coordinated inauthentic behavior across global networks.
                    </p>
                </div>
            </div>

            <div className="w-full max-w-5xl">
                <NetworkGraph />

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="neo-glass p-10 rounded-[32px] border border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-neo-purple/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-bold text-white mb-6">Topology Insight</h3>
                        <p className="text-neo-text-secondary mb-8 font-light leading-relaxed">
                            Neural tracing identifies <span className="text-neo-cyan font-bold">signal-nexus.dev</span> as the primary origin. Rapid escalation mapped through coordinated <span className="text-neo-purple font-bold">Node-Set Beta</span>.
                        </p>
                        <div className="w-full bg-white/5 rounded-full h-1.5 mb-3 group-hover:bg-white/10 transition-colors">
                            <div className="bg-gradient-to-r from-neo-cyan to-neo-purple h-full rounded-full shadow-[0_0_10px_rgba(0,229,255,0.5)]" style={{ width: "85%" }}></div>
                        </div>
                        <div className="text-[10px] text-right font-mono text-neo-cyan uppercase tracking-[0.2em] font-bold">85% Coordinated Inauthenticity</div>
                    </div>

                    <div className="neo-glass p-10 rounded-[32px] border border-white/10 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-neo-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-2xl font-bold text-white mb-6">Critical Hubs</h3>
                        <ul className="space-y-4">
                            {[
                                { name: "Node-Set Beta", value: "4.2k+ Traces", color: "text-neo-cyan" },
                                { name: "Nexus Point X", value: "1.2M+ Impact", color: "text-neo-purple" },
                                { name: "Echo Chamber 1", value: "High Risk", color: "text-neo-cyan" }
                            ].map((node, i) => (
                                <li key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0 group/li">
                                    <span className="text-white font-medium group-hover/li:text-neo-cyan transition-colors">{node.name}</span>
                                    <span className={`${node.color} font-mono text-xs uppercase tracking-widest font-bold`}>{node.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
