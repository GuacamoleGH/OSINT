"use client";

import { useState, useEffect } from "react";

const FAVORITES_STORAGE_KEY = "guacamolegh_osint_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read favorites from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = (toolId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(toolId) ? prev.filter((id) => id !== toolId) : [...prev, toolId];
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save favorites to localStorage", e);
      }
      return next;
    });
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return { favorites, isFavorite, toggleFavorite, isLoaded };
}
