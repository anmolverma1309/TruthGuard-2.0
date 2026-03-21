"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const Footer: React.FC = () => {
    const { t } = useLanguage();
    const pathname = usePathname();

    if (pathname === "/fir-report" || pathname === "/chat") return null;
    
    return (
        <footer className="relative z-10 border-t border-[var(--border-gold)] bg-[rgba(8,11,26,0.80)] backdrop-blur-[24px] py-5 px-6 md:px-12 flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <div className="nav-logo text-2xl mb-2">TruthGuard</div>
                    <p className="font-serif italic text-xs text-[var(--text-dim)] max-w-xs leading-[1.7]">
                        Autonomous AI System for Detecting and Containing Misinformation.
                        Veritas · Claritas · Fides
                    </p>
                </div>
                
                <div className="flex flex-wrap gap-8 md:gap-14">
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[3px] text-[var(--gold)] font-bold mb-1">Platform</span>
                        <Link href="/dashboard" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">{t('dashboard')}</Link>
                        <Link href="/lab" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">{t('deepfake')}</Link>
                        <Link href="/fir-report" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">{t('fir_report')}</Link>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <span className="text-[10px] uppercase tracking-[3px] text-[var(--gold)] font-bold mb-1">Resources</span>
                        <Link href="#" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">Documentation</Link>
                        <Link href="#" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">API Reference</Link>
                        <Link href="#" className="font-serif italic text-xs text-[var(--text-dim)] hover:text-[var(--gold2)] transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </div>
            
            <div className="pt-8 border-t border-[rgba(212,168,67,0.10)] flex flex-col md:flex-row justify-between gap-4">
                <p className="font-serif italic text-[11px] text-[var(--text-dim)]">
                    © 2026 TruthGuard AI. Built for the integrity of Bharat's information ecosystem.
                </p>
                <div className="flex gap-6">
                    <Link href="#" className="font-serif italic text-[11px] text-[var(--text-dim)] hover:text-[var(--gold2)]">Twitter</Link>
                    <Link href="#" className="font-serif italic text-[11px] text-[var(--text-dim)] hover:text-[var(--gold2)]">GitHub</Link>
                    <Link href="#" className="font-serif italic text-[11px] text-[var(--text-dim)] hover:text-[var(--gold2)]">LinkedIn</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
