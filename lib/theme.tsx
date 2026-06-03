"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored = localStorage.getItem("dmc-theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored ?? (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", initial === "dark");
    document.documentElement.style.colorScheme = initial;
    const frame = requestAnimationFrame(() => setTheme(initial));
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("dmc-theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
