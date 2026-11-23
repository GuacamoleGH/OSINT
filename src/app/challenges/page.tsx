"use client";

import React, { useState, useMemo } from "react";
import { getAllChallenges } from "@/lib/data";
import { Target, ExternalLink, Search, Filter, ShieldCheck, DollarSign, ChevronDown } from "lucide-react";

export default function ChallengesPage() {
  const platforms = getAllChallenges();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPricing, setSelectedPricing] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");

  const filteredPlatforms = useMemo(() => {
    return platforms.filter((item) => {
      // Search text match
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

      // Pricing filter
      if (selectedPricing !== "all" && item.pricing !== selectedPricing) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== "all" && item.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [platforms, searchQuery, selectedPricing, selectedDifficulty]);

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case "free":
        return { label: "Gratis", cls: "bg-emerald-950/70 text-emerald-400 border-emerald-800/80" };
      case "freemium":
        return { label: "Freemium", cls: "bg-amber-950/70 text-amber-400 border-amber-800/80" };
      case "paid":
        return { label: "De pago", cls: "bg-rose-950/70 text-rose-400 border-rose-800/80" };
      default:
        return { label: "Comprobar", cls: "bg-gray-800 text-gray-400 border-gray-700" };
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case "beginner":
        return { label: "Principiante", cls: "bg-emerald-950/50 text-emerald-300 border-emerald-800/60" };
      case "intermediate":
        return { label: "Intermedio", cls: "bg-amber-950/50 text-amber-300 border-amber-800/60" };
      case "advanced":
        return { label: "Avanzado", cls: "bg-purple-950/50 text-purple-300 border-purple-800/60" };
      default:
        return { label: diff, cls: "bg-gray-800 text-gray-400 border-gray-700" };
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-green font-medium mb-3">
            <Target className="w-3.5 h-3.5 text-guacamole-green" />
            <span>Práctica & CTF Externos</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Plataformas de Práctica & Retos OSINT
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-3xl leading-relaxed">
            Directorio directo a los mejores sitios web, laboratorios y desafíos CTF de la comunidad internacional para entrenar geolocalización, verificación de datos e investigación digital.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          <div className="px-3 py-2 rounded-xl bg-guacamole-card border border-guacamole-border text-xs font-mono text-gray-300">
            <span className="text-guacamole-green font-bold text-sm mr-1">{platforms.length}</span>
            <span>plataformas verificadas</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-guacamole-card border border-guacamole-border rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por plataforma, habilidad, autor o disciplina..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-guacamole-input text-gray-200 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg border border-guacamole-border focus:outline-none focus:border-guacamole-green/60 transition-colors placeholder:text-gray-500"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Precio:</span>
          </div>
          <div className="relative">
            <select
              value={selectedPricing}
              onChange={(e) => setSelectedPricing(e.target.value)}
              className="appearance-none text-xs bg-guacamole-input text-gray-200 border border-guacamole-border rounded-lg pl-2.5 pr-7 py-2 outline-none cursor-pointer focus:border-guacamole-green/60"
            >
              <option value="all">Todos los precios</option>
              <option value="free">100% Gratis</option>
              <option value="freemium">Freemium</option>
              <option value="paid">De pago</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="appearance-none text-xs bg-guacamole-input text-gray-200 border border-guacamole-border rounded-lg pl-2.5 pr-7 py-2 outline-none cursor-pointer focus:border-guacamole-green/60"
            >
              <option value="all">Cualquier nivel</option>
              <option value="beginner">Principiante</option>
              <option value="intermediate">Intermedio</option>
              <option value="advanced">Avanzado</option>
            </select>
            <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlatforms.map((item) => {
          const pricingBadge = getPricingBadge(item.pricing);
          const diffBadge = getDifficultyBadge(item.difficulty);

          return (
            <div
              key={item.id}
              className="bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/40 rounded-xl p-5 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Header: Title + Provider */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-100 group-hover:text-guacamole-green transition-colors">
                      {item.title}
                    </h2>
                    <span className="text-xs text-gray-400 font-medium">Por: {item.provider}</span>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border shrink-0 ${pricingBadge.cls}`}>
                    {pricingBadge.label}
                  </span>
                </div>

                {/* Badges line: Category & Difficulty */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-guacamole-input text-guacamole-turquoise border border-guacamole-border font-mono">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${diffBadge.cls}`}>
                    {diffBadge.label}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Price indication highlight */}
                {item.pricingDetails && (
                  <div className="p-2.5 rounded-lg bg-guacamole-input/80 border border-guacamole-border/80 flex items-start gap-2 text-xs">
                    <DollarSign className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider">Precio estimado:</span>
                      <span className="text-amber-300 font-mono text-[11px] font-medium">{item.pricingDetails}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom: Tags & Direct External Link Button */}
              <div className="pt-3 border-t border-guacamole-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {item.tags?.map((t) => (
                    <span key={t} className="text-[10px] text-gray-400 bg-guacamole-input px-1.5 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-guacamole-input hover:bg-guacamole-green hover:text-black text-gray-200 border border-guacamole-border hover:border-guacamole-green transition-all shrink-0"
                >
                  <span>Visitar plataforma</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="p-12 text-center rounded-xl bg-guacamole-card border border-guacamole-border text-gray-400">
          <p className="text-sm">No se encontraron plataformas con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  );
}
