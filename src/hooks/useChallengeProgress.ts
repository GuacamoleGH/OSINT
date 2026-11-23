"use client";

import { useState, useEffect } from "react";

export type ChallengeStatus = "pending" | "in_progress" | "completed";

const CHALLENGE_STORAGE_KEY = "guacamolegh_osint_challenge_progress";

export function useChallengeProgress() {
  const [progress, setProgress] = useState<Record<string, ChallengeStatus>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CHALLENGE_STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read challenge progress", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setStatus = (challengeId: string, status: ChallengeStatus) => {
    setProgress((prev) => {
      const next = { ...prev, [challengeId]: status };
      try {
        localStorage.setItem(CHALLENGE_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save challenge progress", e);
      }
      return next;
    });
  };

  const getStatus = (challengeId: string): ChallengeStatus => {
    return progress[challengeId] || "pending";
  };

  return { progress, setStatus, getStatus, isLoaded };
}
