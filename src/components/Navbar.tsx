"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import FlagIcon from "./FlagIcon";

import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const { locale, setLocale, t } = useLanguage();
    const [mounted, setMounted] = useState(false);
    const [showLang, setShowLang] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const languages = [
        { code: 'en', name: 'EN' },
        { code: 'hi', name: 'हिं' },
        { code: 'pa', name: 'ਪੰ' },
        { code: 'mr', name: 'मरा' },
        { code: 'bn', name: 'বাংলা' },
        { code: 'ta', name: 'தமிழ்' },
    ];

    const links = [
        { name: t('home'), href: "/" },
        { name: t('fir_report'), href: "/fir-report-assistance.html" },
        { name: t('dashboard'), href: "/dashboard" },
        { name: t('deepfake'), href: "/lab" },
        { name: t('chatbot'), href: "/chat" },
        { name: t('upgrade'), href: "/payment" },
    ];

    if (!mounted) return null;

    return (
        <nav className="fixed top-0 left-0 right-0 z-[200] px-6 md:px-12 py-4 flex items-center justify-between bg-[rgba(8,11,26,0.75)] backdrop-blur-[28px] border-b border-[var(--border-gold)]">
            {/* Left: Language & Logo */}
            <div className="flex items-center gap-8">
                {/* Logo & Flag */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="nav-logo group relative text-2xl md:text-3xl">
                        <span className="relative z-10 transition-all duration-500 group-hover:tracking-[5px] font-old">
                            TruthGuard
                        </span>
                        <div className="absolute -inset-2 bg-[var(--gold2)]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <FlagIcon className="w-8 h-5 opacity-100 brightness-125 shadow-xl" />
                </div>

                {/* Desktop Links */}
                <ul className="hidden md:flex items-center gap-9 list-none mb-0">
                    {links.map((link) => {
                        const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                        return (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`font-serif italic text-xl tracking-wider transition-colors duration-200 ${
                                        isActive ? "text-[var(--gold2)]" : "text-[var(--text-mid)] hover:text-[var(--gold2)]"
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Right: Lang, Theme, CTA */}
            <div className="flex items-center gap-4 md:gap-8">
                {/* Language Selector */}
                <div className="relative">
                    <button 
                        onClick={() => setShowLang(!showLang)}
                        className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border-gold)] bg-[var(--glass-gold)] text-[var(--gold2)] hover:scale-110 transition-all font-serif italic text-xs shadow-[0_0_15px_rgba(212,168,67,0.15)]"
                    >
                        {languages.find(l => l.code === locale)?.name}
                    </button>
                    
                    {showLang && (
                        <div className="absolute top-14 right-0 g-base rounded-lg p-2 border border-[var(--border-gold)] flex flex-col gap-1 min-w-[100px] shadow-2xl animate-in fade-in slide-in-from-top-2 z-[210]">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLocale(lang.code as any);
                                        setShowLang(false);
                                    }}
                                    className={`px-3 py-2 rounded text-xs font-serif italic transition-all ${
                                        locale === lang.code 
                                            ? "bg-[var(--gold-dim)] text-[var(--gold2)] border border-[var(--border-gold)]" 
                                            : "text-[var(--text-mid)] hover:text-[var(--gold2)] hover:bg-white/5"
                                    }`}
                                >
                                    {lang.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Theme Toggle (Minimalist) */}
                <button 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 border border-[var(--border-dim)] rounded-full text-[var(--text-dim)] hover:text-[var(--gold2)] hover:border-[var(--border-gold)] transition-all"
                >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* Agent Access / CTA */}
                <Link 
                    href="/auth" 
                    className="nav-cta hidden sm:block"
                >
                    Agent Access
                </Link>
            </div>
        </nav>
    );
}
