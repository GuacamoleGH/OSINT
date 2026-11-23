"use client";

import React, { useState } from "react";
import { getAllChallenges } from "@/lib/data";
import { useChallengeProgress, ChallengeStatus } from "@/hooks/useChallengeProgress";
import { Target, CheckCircle2, Clock, HelpCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

export default function ChallengesPage() {
  const challenges = getAllChallenges();
  const { getStatus, setStatus, isLoaded } = useChallengeProgress();
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});

  const toggleHint = (id: string) => {
    setOpenHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = challenges.filter((c) => getStatus(c.id) === "completed").length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header & Progress Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-amber-400 font-medium mb-3">
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Entrenamiento Práctico</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Retos & Ejercicios OSINT</h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Prueba tus capacidades de investigación con ejercicios reales de geolocalización, análisis solar y verificación forense. Tu progreso se guarda localmente en el navegador.
          </p>
        </div>

        {/* Progress pill */}
        <div className="p-4 rounded-xl bg-guacamole-card border border-guacamole-border flex items-center gap-4 self-start sm:self-center shrink-0">
          <div>
            <span className="text-xs text-gray-400 block">Progreso personal</span>
            <span className="text-lg font-bold text-gray-100 font-mono">
              {completedCount} / {challenges.length} completados
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-guacamole-input border-t-guacamole-green flex items-center justify-center font-mono text-xs font-bold text-guacamole-green">
            {Math.round((completedCount / challenges.length) * 100)}%
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="space-y-4">
        {challenges.map((challenge) => {
          const currentStatus = getStatus(challenge.id);
          const isHintsOpen = openHints[challenge.id];

          return (
            <div
              key={challenge.id}
              className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-guacamole-input text-guacamole-turquoise border border-guacamole-border font-mono">
                      {challenge.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                        challenge.difficulty === "beginner"
                          ? "bg-emerald-950/60 text-emerald-300 border-emerald-800"
                          : challenge.difficulty === "intermediate"
                          ? "bg-amber-950/60 text-amber-300 border-amber-800"
                          : "bg-purple-950/60 text-purple-300 border-purple-800"
                      }`}
                    >
                      {challenge.difficulty === "beginner"
                        ? "Principiante"
                        : challenge.difficulty === "intermediate"
                        ? "Intermedio"
                        : "Avanzado"}
                    </span>
                    <span className="text-xs text-gray-400">Proveedor: {challenge.provider}</span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-100">{challenge.title}</h2>
                  <p className="text-sm text-gray-300 mt-1 leading-relaxed">{challenge.description}</p>
                </div>

                {/* Status Selector */}
                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                  <select
                    value={currentStatus}
                    onChange={(e) => setStatus(challenge.id, e.target.value as ChallengeStatus)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold outline-none cursor-pointer ${
                      currentStatus === "completed"
                        ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                        : currentStatus === "in_progress"
                        ? "bg-amber-950 text-amber-300 border-amber-800"
                        : "bg-guacamole-input text-gray-300 border-guacamole-border"
                    }`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="in_progress">En curso</option>
                    <option value="completed">Completado</option>
                  </select>
                </div>
              </div>

              {/* Hints collapsible */}
              {challenge.hints && challenge.hints.length > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => toggleHint(challenge.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isHintsOpen ? "Ocultar pistas metodológicas" : "Mostrar pistas metodológicas"}</span>
                    {isHintsOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isHintsOpen && (
                    <div className="mt-2 p-3 bg-guacamole-input/80 border border-guacamole-border rounded-lg space-y-1.5 text-xs text-gray-300 animate-in fade-in duration-150">
                      <p className="font-semibold text-amber-300 mb-1">Pistas sin revelar la solución:</p>
                      {challenge.hints.map((hint, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{hint}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Direct Link to the Challenge */}
              <div className="pt-3 border-t border-guacamole-border/50 flex items-center justify-end">
                <a
                  href={challenge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-guacamole-green text-black font-semibold text-xs hover:bg-guacamole-turquoise transition-colors"
                >
                  <span>Abrir ejercicio oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
