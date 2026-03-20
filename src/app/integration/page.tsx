import Link from "next/link";
import { ShieldAlert, LogIn, FileText, Sparkles, Box, Zap } from "lucide-react";

export default function IntegrationHubPage() {
  const integrations = [
    {
      name: "Identity Access",
      subtitle: "Login Page Module",
      description: "Interactive animated login experience from the 'Login-Page' folder.",
      href: "/auth",
      icon: LogIn,
      gradient: "from-neo-cyan to-neo-purple",
      tag: "Active Connector"
    },
    {
      name: "Legal Intelligence",
      subtitle: "FIR Report Module",
      description: "Full-width legal report assistance tool from the 'fir' folder.",
      href: "/fir-report",
      icon: FileText,
      gradient: "from-neo-purple to-neo-cyan",
      tag: "Live Data"
    }
  ];

  return (
    <div className="min-h-screen bg-neo-bg pt-32 pb-20 px-8 relative overflow-hidden">
      {/* Decorative blurred background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neo-purple/10 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neo-cyan/10 blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-neo-cyan/10 border border-neo-cyan/20">
            <Sparkles className="text-neo-cyan w-4 h-4 shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
            <span className="text-neo-cyan font-mono uppercase tracking-[0.2em] text-[10px] font-bold">System Architecture</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 neo-text-glow tracking-tighter text-center">
            REPORT <span className="text-transparent bg-clip-text bg-gradient-to-r from-neo-cyan to-neo-purple">ASSISTANCE (FIR)</span>
          </h1>
          <p className="text-xl text-neo-text-secondary max-w-2xl mx-auto font-light leading-relaxed">
            Orchestrating high-performance UI modules from across the directory structure into a single unified workspace.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {integrations.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className="group relative rounded-[32px] overflow-hidden transition-all duration-500 hover:scale-[1.02]"
              >
                {/* Custom Border Gradient Simulation */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent p-px rounded-[32px]">
                  <div className="absolute inset-0 bg-neo-bg rounded-[32px] opacity-90" />
                </div>
                
                <div className="neo-glass relative z-10 p-10 h-full flex flex-col items-start rounded-[32px] border-none">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} mb-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-neo-cyan uppercase tracking-widest">{item.subtitle}</span>
                    <div className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-[10px] font-mono text-neo-text-secondary uppercase">{item.tag}</span>
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-neo-cyan transition-colors tracking-tight">
                    {item.name}
                  </h3>
                  
                  <p className="text-neo-text-secondary mb-10 leading-relaxed font-light">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-white/5 w-full flex items-center justify-between group-hover:border-neo-cyan/20 transition-colors">
                    <span className="text-xs font-bold text-neo-cyan tracking-[0.2em] uppercase">Initialize Session</span>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-neo-cyan group-hover:text-neo-bg transition-all">
                      <Zap className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-32 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
           <Box className="w-6 h-6 text-neo-text-secondary mb-4" />
           <p className="text-neo-text-secondary text-[10px] font-mono tracking-[0.3em] uppercase">
            Strict Directory Isolation Protocol Active
           </p>
        </div>
      </div>
    </div>
  );
}
