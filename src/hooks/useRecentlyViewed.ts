"use client";

import { useState, useEffect } from "react";

const RECENT_STORAGE_KEY = "guacamolegh_osint_recent";
const MAX_RECENT = 20;

export function useRecentlyViewed() {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_STORAGE_KEY);
      if (stored) {
        setRecentSlugs(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read recent tools from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addRecent = (slug: string) => {
    setRecentSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      const next = [slug, ...filtered].slice(0, MAX_RECENT);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save recent tools to localStorage", e);
      }
      return next;
    });
  };

  const clearRecent = () => {
    setRecentSlugs([]);
    try {
      localStorage.removeItem(RECENT_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear recent tools", e);
    }
  };

  return { recentSlugs, addRecent, clearRecent, isLoaded };
}
