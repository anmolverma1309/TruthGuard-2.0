import Link from "next/link";
import { Shield, Activity, Network, ArrowRight, Zap, Cpu, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-6 pt-32 relative overflow-hidden min-h-screen">
      
      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-5xl group">
        {/* Glow behind the panel */}
        <div className="absolute -inset-10 bg-neo-cyan/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
        
        <div className="neo-glass rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden border border-white/10">
          {/* Animated corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-neo-cyan/40 rounded-tl-[40px]" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-neo-purple/40 rounded-br-[40px]" />

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 neo-text-glow">
            TRUTH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-purple">GUARD</span>
          </h1>

          <p className="text-xl md:text-2xl text-neo-text-secondary max-w-2xl mx-auto mb-12 font-light tracking-wide">
            Explore highly interactive experiences <br className="hidden md:block" />
            with cursor-responsive animations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/dashboard"
              className="group relative px-12 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neo-cyan to-neo-cyan/80 neo-glow-cyan" />
              <span className="relative z-10 text-neo-bg font-bold tracking-widest flex items-center gap-2 uppercase">
                Explore <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            <Link
              href="/integration"
              className="group relative px-12 py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-neo-purple neo-glow-purple" />
              <span className="relative z-10 text-white font-bold tracking-widest uppercase">
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 max-w-4xl w-full z-10 pb-16">
        <div className="neo-glass px-8 py-5 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-neo-cyan/30 transition-colors group">
          <div className="p-2 rounded-xl bg-neo-cyan/10 text-neo-cyan shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            <Zap className="w-5 h-5 fill-neo-cyan/20" />
          </div>
          <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors">Real-time Data</span>
        </div>
        
        <div className="neo-glass px-8 py-5 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-neo-purple/30 transition-colors group">
          <div className="p-2 rounded-xl bg-neo-purple/10 text-neo-purple shadow-[0_0_15px_rgba(191,90,242,0.1)]">
            <Cpu className="w-5 h-5 fill-neo-purple/20" />
          </div>
          <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors">Adaptive Interface</span>
        </div>

        <div className="neo-glass px-8 py-5 rounded-2xl flex items-center gap-4 border border-white/5 hover:border-white/20 transition-colors group">
          <div className="p-2 rounded-xl bg-white/5 text-neo-cyan shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Lock className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium tracking-wide text-white/80 group-hover:text-white transition-colors">Secure Core</span>
        </div>
      </div>
    </div>
  );
}
