"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  Lock,
  ChevronRight,
  ShieldAlert,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
type PaymentMethod = "card" | "upi" | "netbanking";
type Step = "order" | "checkout" | "processing" | "success" | "failed";
type CardType = "visa" | "mastercard" | "rupay" | "amex" | "unknown";

interface OrderDetails {
  productName: string;
  amount: string;
  email: string;
  plan: string;
}

interface CardDetails {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface FormErrors {
  number?: string;
  name?: string;
  expiry?: string;
  cvv?: string;
  upi?: string;
  bank?: string;
  email?: string;
  productName?: string;
  amount?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────
function detectCardType(num: string): CardType {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^5[1-5]/.test(n)) return "mastercard";
  if (/^6[0-9]/.test(n)) return "rupay";
  if (/^3[47]/.test(n)) return "amex";
  return "unknown";
}

function formatCardNumber(val: string, type: CardType): string {
  const digits = val.replace(/\D/g, "").slice(0, type === "amex" ? 15 : 16);
  if (type === "amex") {
    return digits.replace(/^(\d{4})(\d{6})(\d{0,5})/, (_, a, b, c) =>
      c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a
    );
  }
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(val: string): string {
  const digits = val.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}

function generateTxnId(): string {
  return "TXN" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"];
const PLANS = ["Monthly", "Quarterly", "Yearly", "Lifetime"];

// ── Components ─────────────────────────────────────────────────────────────

function InputField({ label, error, children, icon: Icon }: { label: string; error?: string; children: React.ReactNode; icon: any }) {
  return (
    <div className="space-y-1.5 flex-1">
      <label className="block text-[10px] font-mono font-semibold text-neo-text-secondary tracking-widest uppercase ml-1">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-text-secondary group-focus-within:text-neo-cyan transition-colors">
          <Icon className="w-4 h-4" />
        </div>
        {children}
      </div>
      {error && (
        <p className="text-red-400 text-[10px] flex items-center gap-1 ml-1 animate-pulse">
          <ShieldAlert className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

export default function PaymentPage() {
  const [step, setStep] = useState<Step>("order");
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [order, setOrder] = useState<OrderDetails>({
    productName: "TruthGuard AI Pro",
    amount: "499",
    email: "",
    plan: "Monthly",
  });
  const [card, setCard] = useState<CardDetails>({ number: "", name: "", expiry: "", cvv: "" });
  const [cardType, setCardType] = useState<CardType>("unknown");
  const [cvvFocused, setCvvFocused] = useState(false);
  const [upi, setUpi] = useState("");
  const [bank, setBank] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [txnId] = useState<string>(generateTxnId);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<any>(null);

  const inputCls = "w-full bg-white/5 border border-white/10 focus:border-neo-cyan/50 focus:bg-white/10 rounded-xl px-11 py-3.5 text-sm text-white outline-none transition-all placeholder:text-white/20";

  useEffect(() => {
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, []);

  const handlePay = () => {
    setStep("processing");
    let p = 0;
    progressRef.current = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(progressRef.current);
        setTimeout(() => setStep("success"), 500);
      }
      setProgress(Math.min(p, 100));
    }, 200);
  };

  return (
    <div className="min-h-screen bg-neo-bg text-white pt-24 pb-12 px-6 flex flex-col items-center">
      {/* Background Decorations */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neo-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl z-10"
      >
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Left Side: Order Info / Progress */}
          <div className="w-full md:w-1/3 space-y-6">
            <div className="neo-glass rounded-3xl p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldCheck className="w-16 h-16 text-neo-cyan" />
              </div>
              
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neo-cyan" />
                Your Identity
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest mb-1">Active Plan</p>
                  <p className="text-white font-bold">{order.productName}</p>
                  <p className="text-neo-cyan text-xs font-mono">{order.plan} Billing cycle</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest mb-1">Billing Amount</p>
                  <p className="text-2xl font-black text-white">₹{order.amount}</p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-neo-text-secondary uppercase tracking-tighter">
                  <Lock className="w-3 h-3 text-neo-cyan" /> 256-bit AES Encryption
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neo-text-secondary uppercase tracking-tighter">
                  <CheckCircle2 className="w-3 h-3 text-neo-cyan" /> Secure Gateway Tunnel
                </div>
              </div>
            </div>

            <div className="neo-glass rounded-2xl p-6 border border-white/10 hidden md:block">
              <p className="text-[10px] font-mono text-neo-text-secondary uppercase tracking-widest mb-4">System Status</p>
              <div className="space-y-3">
                {["Configuration", "Verification", "Execution"].map((s, i) => (
                  <div key={s} className="flex items-center justify-between">
                    <span className="text-xs text-white/60">{s}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-neo-cyan shadow-[0_0_8px_rgba(0,229,255,1)]" : "bg-white/10"}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Main Payment Flow */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === "order" && (
                <motion.div 
                  key="order"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="neo-glass rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl space-y-8"
                >
                  <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Configure Access</h1>
                    <p className="text-neo-text-secondary text-sm font-light">Prepare your misinformation intelligence uplink.</p>
                  </div>

                  <div className="space-y-6">
                    <InputField label="Intelligence Level" icon={ShieldCheck}>
                      <select 
                        value={order.productName}
                        onChange={(e) => setOrder({...order, productName: e.target.value})}
                        className={inputCls + " appearance-none cursor-pointer"}
                      >
                        <option value="TruthGuard AI Pro" className="bg-[#05070a]">TruthGuard AI Pro</option>
                        <option value="TruthGuard Enterprise" className="bg-[#05070a]">TruthGuard Enterprise</option>
                      </select>
                    </InputField>

                    <div className="flex flex-col md:flex-row gap-6">
                      <InputField label="Session Duration" icon={Loader2}>
                        <select 
                          value={order.plan}
                          onChange={(e) => setOrder({...order, plan: e.target.value})}
                          className={inputCls + " appearance-none cursor-pointer"}
                        >
                          {PLANS.map(p => <option key={p} value={p} className="bg-[#05070a]">{p}</option>)}
                        </select>
                      </InputField>

                      <InputField label="Uplink Cost (₹)" icon={CheckCircle2}>
                        <input 
                          type="number"
                          value={order.amount}
                          onChange={(e) => setOrder({...order, amount: e.target.value})}
                          className={inputCls}
                        />
                      </InputField>
                    </div>

                    <InputField label="Communication Channel (Email)" icon={Smartphone}>
                      <input 
                        type="email"
                        placeholder="agent@truthguard.ai"
                        value={order.email}
                        onChange={(e) => setOrder({...order, email: e.target.value})}
                        className={inputCls}
                      />
                    </InputField>

                    <button 
                      onClick={() => setStep("checkout")}
                      className="w-full py-4 rounded-2xl bg-neo-cyan text-neo-bg font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(0,229,255,0.2)] flex items-center justify-center gap-2 group"
                    >
                      Initialize Secure Checkout
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "checkout" && (
                <motion.div 
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="neo-glass rounded-[40px] p-8 md:p-12 border border-white/10 shadow-2xl space-y-8"
                >
                  <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-black tracking-tight">Checkout</h1>
                    <button onClick={() => setStep("order")} className="text-[10px] font-mono uppercase text-neo-text-secondary hover:text-neo-cyan transition-colors tracking-widest flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 rotate-180" /> Modify Order
                    </button>
                  </div>

                  {/* Method Select */}
                  <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
                    {[
                      { id: "card", label: "Credit Card", Icon: CreditCard },
                      { id: "upi", label: "UPI Node", Icon: Smartphone },
                      { id: "netbanking", label: "Bank Port", Icon: Building2 },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id as PaymentMethod)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${method === m.id ? "bg-white/10 text-white shadow-lg" : "text-white/40 hover:text-white/60"}`}
                      >
                        <m.Icon className={`w-4 h-4 ${method === m.id ? "text-neo-cyan" : ""}`} />
                        <span className="text-xs font-bold uppercase tracking-tighter">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {method === "card" && (
                      <div className="space-y-6">
                        <InputField label="Card Member Name" icon={User}>
                          <input 
                            type="text"
                            placeholder="AGENT NAME"
                            value={card.name}
                            onChange={(e) => setCard({...card, name: e.target.value.toUpperCase()})}
                            className={inputCls}
                          />
                        </InputField>
                        <InputField label="Access Serial (Card Number)" icon={CreditCard}>
                          <input 
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={card.number}
                            onChange={(e) => setCard({...card, number: formatCardNumber(e.target.value, cardType)})}
                            className={inputCls}
                          />
                        </InputField>
                        <div className="flex gap-6">
                          <InputField label="Expiration" icon={Loader2}>
                            <input 
                              type="text"
                              placeholder="MM/YY"
                              value={card.expiry}
                              onChange={(e) => setCard({...card, expiry: formatExpiry(e.target.value)})}
                              className={inputCls}
                            />
                          </InputField>
                          <InputField label="Security Pass (CVV)" icon={Lock}>
                            <input 
                              type="password"
                              placeholder="***"
                              value={card.cvv}
                              onChange={(e) => setCard({...card, cvv: e.target.value.slice(0, 3)})}
                              className={inputCls}
                            />
                          </InputField>
                        </div>
                      </div>
                    )}

                    {method === "upi" && (
                      <InputField label="UPI Endpoint ID" icon={Smartphone}>
                        <input 
                          type="text"
                          placeholder="agent@upi"
                          value={upi}
                          onChange={(e) => setUpi(e.target.value)}
                          className={inputCls}
                        />
                      </InputField>
                    )}

                    {method === "netbanking" && (
                      <InputField label="Authorization Terminal" icon={Building2}>
                        <select className={inputCls + " appearance-none cursor-pointer"}>
                          {BANKS.map(b => <option key={b} value={b} className="bg-[#05070a]">{b}</option>)}
                        </select>
                      </InputField>
                    )}

                    <button 
                      onClick={handlePay}
                      className="w-full py-4 rounded-2xl bg-neo-cyan text-neo-bg font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(0,229,255,0.2)] mt-8"
                    >
                      Authorize Transaction (₹{order.amount})
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div 
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="neo-glass rounded-[40px] p-12 border border-white/10 shadow-2xl flex flex-col items-center justify-center space-y-8 min-h-[400px]"
                >
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="64" cy="64" r="58" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle 
                        cx="64" cy="64" r="58" fill="none" stroke="var(--color-neo-cyan)" strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={2 * Math.PI * 58}
                        strokeDashoffset={2 * Math.PI * 58 * (1 - progress / 100)}
                      />
                    </svg>
                    <span className="absolute text-2xl font-black text-white">{Math.round(progress)}%</span>
                    <div className="absolute inset-0 bg-neo-cyan/20 blur-3xl rounded-full" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-2">Syncing with Gateway</h2>
                    <p className="text-neo-text-secondary text-sm">Do not terminate the connection protocol...</p>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="neo-glass rounded-[40px] p-12 border border-white/10 shadow-2xl flex flex-col items-center justify-center space-y-8 min-h-[400px]"
                >
                  <div className="w-24 h-24 rounded-full bg-neo-cyan/20 border-2 border-neo-cyan flex items-center justify-center relative">
                    <CheckCircle2 className="w-12 h-12 text-neo-cyan" />
                    <div className="absolute inset-0 bg-neo-cyan/40 blur-2xl rounded-full" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Access Granted</h2>
                    <p className="text-neo-text-secondary text-sm mb-6">Uplink verified. TransactionID: {txnId}</p>
                    <Link 
                      href="/dashboard"
                      className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      Enter Intelligence Lab <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
