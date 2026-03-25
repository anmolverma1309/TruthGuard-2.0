import type { Metadata } from "next";
import { Inter, Noto_Serif, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TruthGuard X | AI Misinformation Intelligence",
  description: "Autonomous AI System for Detecting and Containing Misinformation Across the Internet.",
};

import Navbar from "@/components/Navbar";
import { Providers } from "./Providers";
import BackgroundLayers from "@/components/BackgroundLayers";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${spaceGrotesk.variable} antialiased flex flex-col min-h-screen transition-colors duration-300`}
      >
        <BackgroundLayers />
        <CustomCursor />
        <Providers>
          <Navbar />
          <main className="flex-grow flex flex-col relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
