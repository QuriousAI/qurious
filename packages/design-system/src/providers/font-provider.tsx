"use client";

import * as React from "react";

type FontPreference = "sans" | "mono";

interface FontContextType {
  font: FontPreference;
  setFont: (font: FontPreference) => void;
}

const FontContext = React.createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = React.useState<FontPreference>("sans");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Load preference from localStorage
    const stored = localStorage.getItem("font-preference") as FontPreference | null;
    if (stored && (stored === "sans" || stored === "mono")) {
      setFontState(stored);
      document.documentElement.classList.remove("font-sans", "font-mono");
      document.documentElement.classList.add(`font-${stored}`);
    } else {
      document.documentElement.classList.add("font-sans");
    }
  }, []);

  const setFont = React.useCallback((newFont: FontPreference) => {
    setFontState(newFont);
    if (typeof window !== "undefined") {
      localStorage.setItem("font-preference", newFont);
      document.documentElement.classList.remove("font-sans", "font-mono");
      document.documentElement.classList.add(`font-${newFont}`);
    }
  }, []);

  // Always provide context, but use default values before mount to prevent hydration mismatch
  return (
    <FontContext.Provider value={{ font, setFont }}>
      {children}
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = React.useContext(FontContext);
  if (context === undefined) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
