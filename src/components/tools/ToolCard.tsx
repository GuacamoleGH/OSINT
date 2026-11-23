"use client";

import React from "react";
import Link from "next/link";
import { ToolItem } from "@/types/osint";
import { Heart, ExternalLink, Globe, Shield, Terminal, ArrowUpRight } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface ToolCardProps {
  tool: ToolItem;
  viewMode?: "grid" | "list";
}

export function ToolCard({ tool, viewMode = "grid" }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(tool.id);

  const getScopeBadge = (scope: string) => {
    switch (scope) {
      case "spain":
        return { label: "España", cls: "bg-red-950/70 text-red-300 border-red-800/80" };
      case "europe":
        return { label: "Europa", cls: "bg-blue-950/70 text-blue-300 border-blue-800/80" };
      default:
        return { label: "Global", cls: "bg-gray-800/70 text-gray-300 border-gray-700" };
    }
  };

  const getPricingBadge = (pricing: string) => {
    switch (pricing) {
      case "free":
        return { label: "Gratis", cls: "bg-emerald-950/70 text-emerald-400 border-emerald-800/80" };
      case "freemium":
        return { label: "Freemium", cls: "bg-amber-950/70 text-amber-400 border-amber-800/80" };
      case "paid":
        return { label: "De pago", cls: "bg-rose-950/70 text-rose-400 border-rose-800/80" };
      default:
        return { label: "Verificar", cls: "bg-gray-800 text-gray-400 border-gray-700" };
    }
  };

  const pricingBadge = getPricingBadge(tool.pricing);

  if (viewMode === "list") {
    return (
      <div className="group relative bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-border-highlight rounded-lg p-4 transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Link
              href={`/tools/${tool.slug}`}
              className="text-base font-semibold text-gray-100 group-hover:text-guacamole-green transition-colors hover:underline"
            >
              {tool.name}
            </Link>
            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${pricingBadge.cls}`}>
              {pricingBadge.label}
            </span>
            {tool.pricingDetails && (
              <span className="text-[10px] text-amber-300 bg-amber-950/50 border border-amber-800/70 px-2 py-0.5 rounded font-mono" title={tool.pricingDetails}>
                {tool.pricingDetails}
              </span>
            )}
            {tool.geographicScope.map((s) => {
              const b = getScopeBadge(s);
              return (
                <span key={s} className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${b.cls}`}>
                  {b.label}
                </span>
              );
            })}
            {tool.type === "cli" && (
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-purple-950/70 text-purple-300 border border-purple-800/80 flex items-center gap-1 font-mono">
                <Terminal className="w-3 h-3" />
                CLI
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400 line-clamp-2 mb-2">{tool.description}</p>

          <div className="flex flex-wrap items-center gap-1.5">
            {tool.categories.map((cat) => (
              <span key={cat} className="text-[10px] px-2 py-0.5 rounded bg-guacamole-input text-gray-300 border border-guacamole-border font-mono">
                {cat}
              </span>
            ))}
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] text-gray-400">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`p-2 rounded-md border transition-colors ${
              favorited
                ? "bg-rose-950/60 border-rose-800 text-rose-400"
                : "bg-guacamole-input border-guacamole-border text-gray-400 hover:text-white"
            }`}
            title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-4 h-4 ${favorited ? "fill-rose-400" : ""}`} />
          </button>

          <Link
            href={`/tools/${tool.slug}`}
            className="px-3 py-1.5 text-xs font-medium text-gray-200 bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border rounded-md hover:border-guacamole-green/60 transition-colors"
          >
            Ficha
          </Link>

          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-guacamole-green bg-guacamole-input border border-guacamole-border rounded-md hover:border-guacamole-green/60 transition-colors"
            title="Abrir sitio oficial en pestaña nueva"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // Grid Mode (default)
  return (
    <div className="group relative bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/40 hover:shadow-hover rounded-lg p-4 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Top bar: Name + Favorite */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link
            href={`/tools/${tool.slug}`}
            className="font-semibold text-sm sm:text-base text-gray-100 group-hover:text-guacamole-green transition-colors line-clamp-1"
          >
            {tool.name}
          </Link>

          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`p-1.5 rounded-md border transition-colors shrink-0 ${
              favorited
                ? "bg-rose-950/60 border-rose-800 text-rose-400"
                : "bg-guacamole-input border-guacamole-border text-gray-400 hover:text-white"
            }`}
            title={favorited ? "Quitar de favoritos" : "Guardar en favoritos"}
          >
            <Heart className={`w-3.5 h-3.5 ${favorited ? "fill-rose-400" : ""}`} />
          </button>
        </div>

        {/* Badges line */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded border ${pricingBadge.cls}`}>
            {pricingBadge.label}
          </span>
          {tool.geographicScope.map((s) => {
            const b = getScopeBadge(s);
            return (
              <span key={s} className={`text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded border ${b.cls}`}>
                {b.label}
              </span>
            );
          })}
          {tool.type === "cli" && (
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-purple-950/70 text-purple-300 border border-purple-800/80">
              CLI
            </span>
          )}
        </div>

        {/* Approximate pricing details if applicable */}
        {tool.pricingDetails && (
          <div className="text-[11px] text-amber-300/90 bg-amber-950/30 border border-amber-900/60 px-2 py-1 rounded font-mono mb-2 line-clamp-2" title={tool.pricingDetails}>
            {tool.pricingDetails}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-400 line-clamp-3 mb-3 leading-relaxed">{tool.description}</p>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3 pt-2 border-t border-guacamole-border/50">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-1.5 py-0.2 bg-guacamole-input text-gray-400 rounded">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-guacamole-border/50">
          <Link
            href={`/tools/${tool.slug}`}
            className="flex-1 text-center py-1.5 px-3 text-xs font-medium text-gray-200 bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border rounded hover:border-guacamole-green/60 transition-colors"
          >
            Detalles
          </Link>
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-gray-400 hover:text-guacamole-green bg-guacamole-input border border-guacamole-border rounded hover:border-guacamole-green/60 transition-colors"
            title="Abrir web oficial"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
