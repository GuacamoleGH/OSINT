"use client";

import { useState, useEffect } from "react";

type Theme = "dark" | "light";
const THEME_STORAGE_KEY = "guacamolegh_osint_theme";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  } else {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const initial = stored === "light" || stored === "dark" ? stored : "dark";
      setTheme(initial);
      applyTheme(initial);
    } catch (e) {
      console.error(e);
      applyTheme("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (e) {
      console.error(e);
    }
  };

  return { theme, toggleTheme, mounted };
}
