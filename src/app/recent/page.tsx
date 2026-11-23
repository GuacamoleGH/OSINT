"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { getAllTools } from "@/lib/data";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ToolCard } from "@/components/tools/ToolCard";
import { History, Trash2, ArrowLeft } from "lucide-react";

export default function RecentPage() {
  const { recentSlugs, clearRecent, isLoaded } = useRecentlyViewed();
  const allTools = useMemo(() => getAllTools(), []);

  const recentTools = useMemo(() => {
    // Preserve visit order
    return recentSlugs
      .map((slug) => allTools.find((t) => t.slug === slug))
      .filter(Boolean) as typeof allTools;
  }, [allTools, recentSlugs]);

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-gray-300 font-medium mb-3">
            <History className="w-3.5 h-3.5 text-guacamole-green" />
            <span>Historial de Navegación</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Utilizadas Recientemente</h1>
          <p className="text-sm text-gray-400 mt-1">
            Herramientas cuyas fichas detalladas has consultado en esta sesión o recientemente en tu navegador.
          </p>
        </div>

        {recentTools.length > 0 && (
          <button
            onClick={clearRecent}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-guacamole-input text-gray-400 hover:text-rose-400 border border-guacamole-border hover:border-rose-800 text-xs font-medium self-start sm:self-center transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Borrar historial</span>
          </button>
        )}
      </div>

      {!isLoaded ? (
        <div className="p-12 text-center text-gray-400">Cargando historial...</div>
      ) : recentTools.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <History className="w-10 h-10 text-gray-600 mx-auto" />
          <h2 className="text-lg font-bold text-gray-200">No hay herramientas recientes en tu historial</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            A medida que abras fichas individuales de herramientas en el portal, aparecerán registradas aquí automáticamente.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-guacamole-green text-black font-semibold text-xs rounded-lg shadow-glow hover:bg-guacamole-turquoise transition-colors"
          >
            Explorar Herramientas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
