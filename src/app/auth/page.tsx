"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ShieldAlert, Mail, Lock, User, Github, Chrome, Loader2 } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

type AuthMode = "login" | "signup" | "forgot";

export default function AuthPage() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === "login" || mode === "signup") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: true,
          callbackUrl: "/dashboard",
        });
      } else {
        // Mock forgot password
        alert("Reset link sent to " + email);
        setMode("login");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-neo-bg">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neo-cyan/10 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neo-purple/10 blur-[100px] rounded-full animate-pulse delay-700" />

      {/* Back Button */}
      <Link 
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-neo-text-secondary hover:text-neo-cyan transition-colors group z-50"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-mono uppercase tracking-widest">Back to Core</span>
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4 group">
            <ShieldAlert className="w-12 h-12 text-neo-cyan transition-transform group-hover:scale-110 duration-500" />
            <div className="absolute inset-0 bg-neo-cyan/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-2xl font-bold tracking-[0.2em] text-neo-text-primary uppercase flex items-center">
            TRUTH<span className="text-neo-cyan">GUARD</span>
            <span className="ml-2 text-[10px] bg-neo-cyan/10 text-neo-cyan px-2 py-0.5 rounded border border-neo-cyan/20">Secure</span>
          </h1>
        </div>

        {/* Auth Card */}
        <div className="neo-glass rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neo-cyan/30 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                {mode === "login" && "Welcome Back Agent"}
                {mode === "signup" && "Initialize New Account"}
                {mode === "forgot" && "System Recovery"}
              </h2>
              <p className="text-neo-text-secondary text-sm mb-8">
                {mode === "login" && "Access the Misinformation Intelligence Network"}
                {mode === "signup" && "Gain access to high-level detection tools"}
                {mode === "forgot" && "Enter your email for security verification"}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === "signup" && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-neo-text-secondary ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neo-text-secondary" />
                      <input 
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Agent Orange"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-sm text-white focus:border-neo-cyan/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-neo-text-secondary ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neo-text-secondary" />
                    <input 
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="agent@truthguard.ai"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-sm text-white focus:border-neo-cyan/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                    />
                  </div>
                </div>

                {mode !== "forgot" && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-neo-text-secondary">Password</label>
                      {mode === "login" && (
                        <button 
                          type="button"
                          onClick={() => setMode("forgot")}
                          className="text-[10px] text-neo-cyan hover:underline uppercase tracking-tighter"
                        >
                          Passphrase Loss?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neo-text-secondary" />
                      <input 
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-sm text-white focus:border-neo-cyan/50 focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
                      />
                    </div>
                  </div>
                )}

                <button 
                  disabled={loading}
                  className="w-full relative py-3.5 rounded-xl bg-neo-cyan text-neo-bg font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-[0.98] mt-4 shadow-[0_0_20px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <>
                        {mode === "login" && "Verify Access"}
                        {mode === "signup" && "Initialize System"}
                        {mode === "forgot" && "Recover Access"}
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono bg-[#0d111a] px-3 text-neo-text-secondary">
                  External Auth
                </div>
              </div>

              {/* Social Auth */}
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all">
                  <Github className="w-4 h-4 text-neo-purple" />
                  <span className="text-xs font-semibold">GitHub</span>
                </button>
                <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all">
                  <Chrome className="w-4 h-4 text-neo-cyan" />
                  <span className="text-xs font-semibold">Google</span>
                </button>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-xs text-neo-text-secondary">
                {mode === "login" ? (
                  <>
                    Not part of the network?{" "}
                    <button onClick={() => setMode("signup")} className="text-neo-cyan hover:underline">New Identity</button>
                  </>
                ) : (
                  <>
                    Already authenticated?{" "}
                    <button onClick={() => setMode("login")} className="text-neo-cyan hover:underline">Log In</button>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <p className="text-center mt-8 text-[10px] text-neo-text-secondary font-mono tracking-widest uppercase opacity-50">
          Encrypted End-to-End · PCI-DSS Compliant · TruthGuard Identity
        </p>
      </motion.div>
    </div>
  );
}
