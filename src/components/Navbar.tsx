"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const links = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Deepfake", href: "/lab" },
        { name: "Report Assistance (FIR)", href: "/integration" },
        { name: "Upgrade", href: "/payment" },
    ];

    if (!mounted) return null;

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center px-12 pointer-events-none">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group pointer-events-auto">
                <div className="relative">
                    <ShieldAlert className="w-8 h-8 text-neo-cyan transition-all group-hover:scale-110" />
                    <div className="absolute inset-0 bg-neo-cyan/20 blur-xl rounded-full" />
                </div>
                <span className="text-xl font-bold tracking-[0.2em] text-neo-text-primary neo-text-glow uppercase">
                    TRUTH<span className="text-neo-cyan">GUARD</span>
                </span>
            </Link>

            {/* Floating Nav Pill */}
            <div className="neo-glass rounded-full px-2 py-1.5 border border-white/10 flex items-center space-x-1 pointer-events-auto transition-all">
                {links.map((link) => {
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 relative ${
                                isActive
                                    ? "text-neo-text-primary bg-neo-cyan/10 shadow-[inset_0_0_10px_rgba(0,229,255,0.2)] border border-neo-cyan/30"
                                    : "text-neo-text-secondary hover:text-neo-text-primary"
                            }`}
                        >
                            {isActive && (
                                <div className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-transparent via-neo-cyan to-transparent shadow-[0_0_8px_var(--color-neo-cyan)]" />
                            )}
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            {/* Right Section: Theme & Auth */}
            <div className="flex items-center gap-6 pointer-events-auto">
                {/* Auth Link */}
                <Link 
                    href="/auth"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all group"
                >
                    <User className="w-4 h-4 text-neo-cyan group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">Agent Access</span>
                </Link>

                {/* Theme Toggle */}
                <div className="flex flex-col items-center">
                    <div className="neo-glass rounded-full p-1 border border-white/10 flex items-center space-x-1 cursor-pointer overflow-hidden">
                        <button 
                            onClick={() => setTheme("dark")}
                            className={`p-1.5 rounded-full transition-all duration-300 ${
                                theme === "dark" 
                                    ? "bg-neo-cyan/10 text-neo-cyan shadow-[0_0_15px_rgba(0,229,255,0.3)]" 
                                    : "text-neo-text-secondary hover:text-neo-text-primary"
                            }`}
                        >
                            <Moon className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setTheme("light")}
                            className={`p-1.5 rounded-full transition-all duration-300 ${
                                theme === "light" 
                                    ? "bg-neo-cyan/10 text-neo-cyan shadow-[0_0_15px_rgba(30,144,255,0.3)]" 
                                    : "text-neo-text-secondary hover:text-neo-text-primary"
                            }`}
                        >
                            <Sun className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
