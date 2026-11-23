"use client";

import React, { useState, useEffect } from "react";
import { ToolItem } from "@/types/osint";
import { Heart, ExternalLink, Copy, Check } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

export function ToolDetailActions({ tool }: { tool: ToolItem }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyViewed();
  const [copied, setCopied] = useState(false);
  const favorited = isFavorite(tool.id);

  useEffect(() => {
    addRecent(tool.slug);
  }, [tool.slug, addRecent]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-guacamole-green text-black font-semibold text-sm hover:bg-guacamole-turquoise shadow-glow transition-all"
      >
        <span>Acceder a la herramienta</span>
        <ExternalLink className="w-4 h-4" />
      </a>

      <button
        onClick={() => toggleFavorite(tool.id)}
        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
          favorited
            ? "bg-rose-950/60 border-rose-800 text-rose-300"
            : "bg-guacamole-card border-guacamole-border text-gray-200 hover:border-guacamole-green/60"
        }`}
      >
        <Heart className={`w-4 h-4 ${favorited ? "fill-rose-400 text-rose-400" : ""}`} />
        <span>{favorited ? "En Favoritos" : "Añadir a Favoritos"}</span>
      </button>

      <button
        onClick={copyUrl}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-guacamole-card border border-guacamole-border text-gray-200 hover:border-guacamole-green/60 text-sm font-medium transition-colors"
        title="Copiar URL al portapapeles"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-guacamole-green" />
            <span className="text-guacamole-green">URL Copiada</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 text-gray-400" />
            <span>Copiar Enlace</span>
          </>
        )}
      </button>
    </div>
  );
}
