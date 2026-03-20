"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-cyber-bg">
      {/* 
        This iframe connects to the separate Login-Page project.
        Assuming it's running on localhost:3001.
        We use fixed inset-0 and z-[60] to ensure it covers the Truthguard-X main layout,
        providing a focused "System Access" experience.
      */}
      <iframe
        src="http://localhost:3001"
        className="w-full h-full border-none shadow-2xl shadow-indigo-500/10"
        title="Login Page Integration"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      
      {/* Connector Overlay (only visible if iframe takes time to load or fails) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center p-4 text-center">
        <div className="max-w-md p-8 rounded-2xl border border-cyber-panel-border bg-cyber-panel-bg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-tighter">Connector Interface</h2>
          <p className="text-cyber-text-secondary mb-6 text-sm">
            Initializing secure link to <span className="text-cyber-accent">Login-Page</span> module...
          </p>
          <div className="flex flex-col gap-3 text-xs text-left p-4 bg-black/30 rounded-xl border border-white/5">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent animate-pulse" /> 
              Local service: <code className="text-cyber-cyan">localhost:3001</code>
            </p>
            <p className="opacity-50 italic">Note: Ensure the 'Login-Page' dev server is running.</p>
          </div>
          <button 
            onClick={() => window.history.back()}
            className="mt-8 flex items-center justify-center gap-2 w-full px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-all text-sm font-mono uppercase"
          >
            <ArrowLeft className="w-4 h-4" /> Terminate Session
          </button>
        </div>
      </div>
    </div>
  );
}
