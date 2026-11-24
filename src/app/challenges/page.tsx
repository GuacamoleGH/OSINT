"use client";

import React, { useState, useMemo } from "react";
import { getAllChallenges } from "@/lib/data";
import { Target, ExternalLink, Search, Filter, ChevronDown } from "lucide-react";

export default function ChallengesPage() {
  const platforms = getAllChallenges();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPricing, setSelectedPricing] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesProvider = item.provider.toLowerCase().includes(q);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesProvider && !matchesTags) {
          return false;
        }
      }

      if (selectedPricing !== "all" && item.pricing !== selectedPricing) {
        return false;
      }

      if (selectedDifficulty !== "all" && item.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [platforms, searchQuery, selectedPricing, selectedDifficulty]);

  return (
    <div className="space-y-6 pb-16 max-w-6xl mx-auto">
      {/* Header (Clean & Minimal) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <Target className="w-6 h-6 text-amber-400" />
            <span>Práctica & Retos OSINT</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Plataformas y desafíos Capture The Flag para entrenar investigación abierta y geolocalización.
          </p>
        </div>

        <span className="text-xs font-mono text-gray-400 bg-guacamole-card px-3 py-1.5 rounded-lg border border-guacamole-border self-start sm:self-center">
          {platforms.length} plataformas
        </span>
      </div>

      {/* Filter and Search Bar (Compact) */}
      <div className="bg-guacamole-card border border-guacamole-border rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar plataforma, habilidad o autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-guacamole-input text-gray-200 text-xs pl-8 pr-3 py-1.5 rounded-lg border border-guacamole-border focus:outline-none focus:border-guacamole-green/60 placeholder:text-gray-500"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="appearance-none text-xs bg-guacamole-input text-gray-200 border border-guacamole-border rounded-lg pl-2.5 pr-7 py-1.5 outline-none cursor-pointer focus:border-guacamole-green/60"
            >
              <option value="all">Precios</option>
              <option value="free">Gratis</option>
              <option value="freemium">Freemium</option>
              <option value="paid">De pago</option>
              <option value="unknown">Desconocido</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="appearance-none text-xs bg-guacamole-input text-gray-200 border border-guacamole-border rounded-lg pl-2.5 pr-7 py-1.5 outline-none cursor-pointer focus:border-guacamole-green/60"
            >
              <option value="all">Nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Platforms Grid (Clean, readable, uncluttered) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredPlatforms.map((item) => (
          <div
            key={item.id}
            className="bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-amber-400/40 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-gray-100">
                    {item.title}
                  </h2>
                  <span className="text-[11px] text-gray-400">Por {item.provider}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border shrink-0 ${
                      item.pricing === "free"
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/60"
                        : item.pricing === "freemium"
                        ? "bg-amber-950/60 text-amber-400 border-amber-800/60"
                        : item.pricing === "paid"
                        ? "bg-rose-950/60 text-rose-400 border-rose-800/60"
                        : "bg-gray-800/60 text-gray-300 border-gray-700/60"
                    }`}
                  >
                    {item.pricing === "free"
                      ? "Gratis"
                      : item.pricing === "freemium"
                      ? "Freemium"
                      : item.pricing === "paid"
                      ? "De pago"
                      : "Desconocido"}
                  </span>
                  {item.registrationRequired !== undefined && (
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded border shrink-0 ${
                        item.registrationRequired
                          ? "bg-purple-950/60 text-purple-300 border-purple-800/60"
                          : "bg-guacamole-input text-gray-400 border-guacamole-border"
                      }`}
                    >
                      {item.registrationRequired ? "Requiere cuenta" : "Sin registro"}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed line-clamp-2">
                {item.description}
              </p>

              {item.pricingDetails && (
                <p className="text-[11px] text-amber-300 font-mono bg-guacamole-input/80 px-2 py-1 rounded border border-guacamole-border/60">
                  {item.pricingDetails}
                </p>
              )}
            </div>

            <div className="pt-2 border-t border-guacamole-border/40 flex items-center justify-between gap-2">
              <span className="text-[10px] uppercase font-mono text-gray-400">
                {item.category} • {item.difficulty}
              </span>

              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-guacamole-input hover:bg-amber-400 hover:text-black text-gray-200 border border-guacamole-border hover:border-amber-400 transition-all"
              >
                <span>Visitar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="p-8 text-center rounded-xl bg-guacamole-card border border-guacamole-border text-gray-400 text-xs">
          No se encontraron plataformas con los filtros seleccionados.
        </div>
      )}
    </div>
  );
}
