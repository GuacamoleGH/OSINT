"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/data";
import { useFavorites } from "@/hooks/useFavorites";
import { ToolCard } from "@/components/tools/ToolCard";
import { Heart, ArrowLeft, Trash2, Compass } from "lucide-react";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();
  const allTools = useMemo(() => getAllTools(), []);

  const favoriteTools = useMemo(() => {
    return allTools.filter((t) => favorites.includes(t.id));
  }, [allTools, favorites]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-rose-400 font-medium mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-400" />
            <span>Colección Personal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Herramientas Favoritas</h1>
          <p className="text-sm text-gray-400 mt-1">
            Tus herramientas fijadas para acceso rápido, guardadas localmente en tu navegador.
          </p>
        </div>

        <Link
          href="/tools"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-guacamole-input text-gray-300 border border-guacamole-border hover:border-guacamole-green/60 text-xs font-medium self-start sm:self-center transition-colors"
        >
          <Compass className="w-3.5 h-3.5 text-guacamole-green" />
          <span>Explorar más herramientas</span>
        </Link>
      </div>

      {/* Tools List */}
      {!isLoaded ? (
        <div className="p-12 text-center text-gray-400">Cargando favoritos...</div>
      ) : favoriteTools.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <Heart className="w-10 h-10 text-gray-600 mx-auto" />
          <h2 className="text-lg font-bold text-gray-200">Aún no tienes herramientas en favoritos</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Haz clic en el icono de corazón en cualquier tarjeta del catálogo para fijar aquí tus recursos frecuentes.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-guacamole-green text-black font-semibold text-xs rounded-lg shadow-glow hover:bg-guacamole-turquoise transition-colors"
          >
            Ir al Directorio de Herramientas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
