"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldAlert, Moon, Sun } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/" },
        { name: "Dashboard", href: "/dashboard" },
        { name: "Deepfake", href: "/lab" },
        { name: "Report Assistance (FIR)", href: "/integration" },
    ];

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-between items-center px-12 pointer-events-none">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group pointer-events-auto">
                <div className="relative">
                    <ShieldAlert className="w-8 h-8 text-neo-cyan transition-all group-hover:scale-110" />
                    <div className="absolute inset-0 bg-neo-cyan/20 blur-xl rounded-full" />
                </div>
                <span className="text-xl font-bold tracking-[0.2em] text-white neo-text-glow uppercase">
                    TRUTH<span className="text-neo-cyan">GUARD</span>
                </span>
            </Link>

            {/* Floating Nav Pill */}
            <div className="neo-glass rounded-full px-2 py-1.5 border border-white/10 flex items-center space-x-1 pointer-events-auto">
                {links.map((link) => {
                    const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${
                                isActive
                                    ? "text-white bg-neo-cyan/10 shadow-[inset_0_0_10px_rgba(0,229,255,0.2)] border border-neo-cyan/30"
                                    : "text-neo-text-secondary hover:text-white"
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

            {/* Theme Toggle Placeholder */}
            <div className="flex flex-col items-center pointer-events-auto">
                <div className="neo-glass rounded-full p-1 border border-white/10 flex items-center space-x-1">
                    <div className="p-1.5 rounded-full bg-neo-cyan/10 text-neo-cyan">
                        <Moon className="w-4 h-4" />
                    </div>
                    <div className="p-1.5 rounded-full text-neo-text-secondary">
                        <Sun className="w-4 h-4" />
                    </div>
                </div>
                <span className="text-[10px] font-mono text-neo-text-secondary mt-1 tracking-widest uppercase">Dark / Light</span>
            </div>
        </nav>
    );
}
