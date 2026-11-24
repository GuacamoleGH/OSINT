"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolItem, PRICING_LABELS, PRICING_BADGE_CLASSES } from "@/types/osint";
import { Heart, ExternalLink, Terminal } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface ToolCardProps {
  tool: ToolItem;
  viewMode?: "grid" | "list";
}

export function ToolCard({ tool, viewMode = "grid" }: ToolCardProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(tool.id);

  const isSpain = tool.geographicScope.includes("spain");
  const isEurope = tool.geographicScope.includes("europe") && !isSpain;

  const handleCardClick = () => {
    router.push(`/tools/${tool.slug}`);
  };

  if (viewMode === "list") {
    return (
      <div
        onClick={handleCardClick}
        className="group relative bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/40 rounded-xl px-4 py-3 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-gray-100 group-hover:text-guacamole-green transition-colors">
              {tool.name}
            </span>

            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                PRICING_BADGE_CLASSES[tool.pricing] || PRICING_BADGE_CLASSES.unknown
              }`}
            >
              {PRICING_LABELS[tool.pricing] || "Desconocido"}
            </span>

            {isSpain && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/60">
                España
              </span>
            )}

            {isEurope && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
                Europa
              </span>
            )}

            {tool.type === "cli" && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60 flex items-center gap-1">
                <Terminal className="w-3 h-3" />
                CLI
              </span>
            )}

            {tool.verified ? (
              <span className="text-[10px] text-guacamole-green font-mono hidden md:inline ml-auto">
                ✓ Verificado{tool.lastReviewed ? `: ${tool.lastReviewed}` : ""}
              </span>
            ) : (
              <span className="text-[10px] text-gray-500 font-mono hidden md:inline ml-auto">
                Pendiente de verificación
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 line-clamp-1">{tool.description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            className={`p-1.5 rounded-lg border transition-colors ${
              favorited
                ? "bg-rose-950/60 border-rose-800 text-rose-400"
                : "bg-guacamole-input border-guacamole-border text-gray-400 hover:text-white"
            }`}
            title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? "fill-rose-400" : ""}`} />
          </button>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 text-gray-400 hover:text-guacamole-green bg-guacamole-input border border-guacamole-border rounded-lg hover:border-guacamole-green/60 transition-colors"
            title="Abrir web oficial"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // Grid Mode (Minimalist, spacious, clean)
  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/40 hover:shadow-card rounded-xl p-4 transition-all duration-200 flex flex-col justify-between cursor-pointer space-y-3"
    >
      <div>
        {/* Top: Name + Badges + Favorite */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm text-gray-100 group-hover:text-guacamole-green transition-colors line-clamp-1">
            {tool.name}
          </h3>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(tool.id);
            }}
            className={`p-1 rounded-md border transition-colors shrink-0 ${
              favorited
                ? "bg-rose-950/60 border-rose-800 text-rose-400"
                : "bg-guacamole-input border-guacamole-border text-gray-400 hover:text-white"
            }`}
            title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? "fill-rose-400" : ""}`} />
          </button>
        </div>

        {/* Badges line: Clean and minimal */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span
            className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
              PRICING_BADGE_CLASSES[tool.pricing] || PRICING_BADGE_CLASSES.unknown
            }`}
          >
            {PRICING_LABELS[tool.pricing] || "Desconocido"}
          </span>

          {isSpain && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-red-950/60 text-red-300 border border-red-800/60">
              España
            </span>
          )}

          {isEurope && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-800/60">
              Europa
            </span>
          )}

          {tool.type === "cli" && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950/60 text-purple-300 border border-purple-800/60">
              CLI
            </span>
          )}
        </div>

        {/* Description: 2 lines max, airy and readable */}
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{tool.description}</p>
      </div>

      {/* Bottom: Clean subtle footer with category, last reviewed and external link */}
      <div className="flex items-center justify-between pt-2 border-t border-guacamole-border/40 text-[11px] text-gray-500">
        <span className="font-mono text-gray-400 truncate max-w-[120px]">
          {tool.categories[0]}
        </span>

        {tool.verified ? (
          <span className="text-[10px] text-guacamole-green font-mono" title={tool.lastReviewed ? `Última verificación: ${tool.lastReviewed}` : "Verificada"}>
            ✓ Verificada
          </span>
        ) : (
          <span className="text-[10px] text-gray-500 font-mono" title="Pendiente de verificación">
            Pendiente
          </span>
        )}

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="p-1 text-gray-400 hover:text-guacamole-green transition-colors"
          title="Abrir web oficial"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
