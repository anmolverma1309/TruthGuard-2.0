"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

import { LanguageProvider } from "@/context/LanguageContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        {children}
      </ThemeProvider>
    </LanguageProvider>
  );
}
