import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruthGuard X | AI Misinformation Intelligence",
  description: "Autonomous AI System for Detecting and Containing Misinformation Across the Internet.",
};

import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased bg-neo-bg text-neo-text-primary flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>
      </body>
    </html>
  );
}
