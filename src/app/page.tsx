"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('on');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col w-full">
      
      {/* ═══ HERO SECTION ════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center overflow-hidden">
        {/* Orbiting Rings */}
        <div className="hero-ring hero-ring1" />
        <div className="hero-ring hero-ring2" />
        <div className="hero-ring hero-ring3" />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className="hero-badge reveal">— {t('truth')} {t('guard')} —</div>
          <div className="hero-old reveal d1">Veritas · Claritas · Fides</div>
          
          <h1 className="hero-h1 reveal d2 mb-8">
            <span className="t1">{t('truth')}</span>
            <span className="t2">{t('guard')}</span>
          </h1>

          <p className="hero-tag2 reveal d3 mb-6 uppercase tracking-[6px] text-xs font-serif text-[var(--rose2)] opacity-70">
            {t('bharat_edition')}
          </p>

          <p className="hero-sub reveal d4 mb-14 max-w-2xl mx-auto text-[15px] italic leading-[1.9] text-[var(--text-mid)]">
            {t('hero_desc')}
          </p>

          <div className="hero-strip reveal d4 flex flex-col sm:flex-row gap-12 sm:gap-20 bg-[rgba(13,17,48,0.55)] border-y border-[var(--border-gold)] py-8 px-14">
            <div className="flex flex-col items-center">
              <div className="h-stat-n text-4xl font-bold text-[var(--gold2)]">600M+</div>
              <div className="h-stat-l text-[10px] italic text-[var(--text-dim)] uppercase tracking-wider mt-2">Indian Users</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-stat-n text-4xl font-bold text-[var(--red)]">72%</div>
              <div className="h-stat-l text-[10px] italic text-[var(--text-dim)] uppercase tracking-wider mt-2">Fake Susceptibility</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-stat-n text-4xl font-bold text-[var(--green)]">&lt;3s</div>
              <div className="h-stat-l text-[10px] italic text-[var(--text-dim)] uppercase tracking-wider mt-2">Analysis Time</div>
            </div>
          </div>

          <div className="mt-16 reveal d4 flex flex-wrap justify-center gap-8">
            <Link href="/dashboard" className="mission-cta">
              {t('explore')} <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/lab" className="px-10 py-4 border border-[var(--border-gold)] text-[var(--gold2)] font-serif italic text-sm hover:bg-[var(--gold-faint)] transition-all">
              {t('get_started')}
            </Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ CRISIS SECTION ══════════════════════════════ */}
      <section className="py-32 px-6 max-w-[1260px] mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="sec-tag reveal">The Problem</div>
            <div className="sec-old reveal d1">A Nation Under Siege</div>
            <h2 className="sec-title reveal d2 text-4xl md:text-5xl font-bold mb-8 leading-tight">
              India's Misinformation Crisis is an Emergency
            </h2>
            <p className="sec-body reveal d3 text-[var(--text-mid)] italic leading-[1.9]">
              Every day, millions of Indians receive content that has never been verified. 
              The consequences are physical, financial, and fatal. TruthGuard provides instant clarity 
              where others see chaos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="scard scard-red reveal">
              <div className="snum text-4xl font-bold mb-2">30+</div>
              <div className="slbl text-xs italic text-[var(--text-mid)]">Mob lynchings from forwards</div>
            </div>
            <div className="scard scard-amber reveal d1">
              <div className="snum text-4xl font-bold mb-2">800+</div>
              <div className="slbl text-xs italic text-[var(--text-mid)]">COVID-19 Cure Deaths</div>
            </div>
            <div className="scard scard-gold reveal d2">
              <div className="snum text-4xl font-bold mb-2">10K+</div>
              <div className="slbl text-xs italic text-[var(--text-mid)]">Deepfakes per day</div>
            </div>
            <div className="scard scard-teal reveal d3">
              <div className="snum text-4xl font-bold mb-2">₹1L Cr+</div>
              <div className="slbl text-xs italic text-[var(--text-mid)]">Annual Scam Losses</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ HOW IT WORKS ═══════════════════════════════ */}
      <section className="py-32 px-6 max-w-[1260px] mx-auto w-full">
        <div className="text-center mb-20">
          <div className="sec-tag justify-center reveal">How It Works</div>
          <div className="sec-old reveal d1">From Doubt to Certainty</div>
          <h2 className="sec-title reveal d2 max-w-2xl mx-auto text-4xl md:text-5xl font-bold">Verify Content in Seconds</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="step reveal">
            <div className="step-n">01</div>
            <div className="step-ico text-3xl mb-4">📋</div>
            <div className="step-name font-bold mb-2">Submit</div>
            <div className="step-desc text-xs italic text-[var(--text-mid)]">Paste text, URL, or upload image captives.</div>
          </div>
          <div className="step reveal d1">
            <div className="step-n">02</div>
            <div className="step-ico text-3xl mb-4">🧠</div>
            <div className="step-name font-bold mb-2">Analyse</div>
            <div className="step-desc text-xs italic text-[var(--text-mid)]">AI cross-checks against global fact databases.</div>
          </div>
          <div className="step reveal d2">
            <div className="step-n">03</div>
            <div className="step-ico text-3xl mb-4">📊</div>
            <div className="step-name font-bold mb-2">Score</div>
            <div className="step-desc text-xs italic text-[var(--text-mid)]">Instant Credibility Score (0-100) returned.</div>
          </div>
          <div className="step reveal d3">
            <div className="step-n">04</div>
            <div className="step-ico text-3xl mb-4">🛡️</div>
            <div className="step-name font-bold mb-2">Act</div>
            <div className="step-desc text-xs italic text-[var(--text-mid)]">Share results or generate deep reports.</div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ═══ SCORE SECTION ═══════════════════════════════ */}
      <section className="py-32 px-6 max-w-[1260px] mx-auto w-full pb-48">
        <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
                <div className="sec-tag reveal">Evaluation</div>
                <div className="sec-old reveal d1">Precise Verdicts</div>
                <h2 className="sec-title reveal d2 text-4xl font-bold mb-8">Credibility Index</h2>
                <p className="sec-body reveal d3 text-[var(--text-mid)] italic">
                    Our AI model provides more than just a yes or no. We give you a granular score 
                    backed by multi-source evidence and contextual analysis.
                </p>
            </div>
            <div className="flex flex-col gap-6 reveal d2">
                <div className="sbar sbar-g p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm font-serif italic">
                        <span>Reliable ✅</span>
                        <span className="v-g font-bold">80 – 100</span>
                    </div>
                    <div className="bar-track"><div className="bar-fill bf-g h-full" style={{width: '90%'}}></div></div>
                </div>
                <div className="sbar sbar-a p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm font-serif italic">
                        <span>Misleading ⚠️</span>
                        <span className="v-a font-bold">50 – 79</span>
                    </div>
                    <div className="bar-track"><div className="bar-fill bf-a h-full" style={{width: '65%'}}></div></div>
                </div>
                <div className="sbar sbar-r p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm font-serif italic">
                        <span>Fake News ❌</span>
                        <span className="v-r font-bold">0 – 49</span>
                    </div>
                    <div className="bar-track"><div className="bar-fill bf-r h-full" style={{width: '25%'}}></div></div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
