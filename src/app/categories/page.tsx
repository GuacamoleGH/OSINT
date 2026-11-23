import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllCategories, getCategoryToolCounts } from "@/lib/data";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ArrowRight, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Categorías Técnicas OSINT — OSINT Hub",
  description: "Explora las 12 disciplinas fundamentales de inteligencia de fuentes abiertas.",
};

export default function CategoriesIndexPage() {
  const categories = getAllCategories();
  const counts = getCategoryToolCounts();

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-green font-medium mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>Taxonomía Técnica</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Las 12 Disciplinas OSINT</h1>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          Especialidades técnicas de investigación de fuentes abiertas: desde análisis de imágenes forenses (IMINT) y datos geoespaciales (GEOINT), hasta monitorización de tráfico aéreo y marítimo o registros oficiales mercantiles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = counts[cat.id] || 0;
          return (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="group bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/50 p-6 rounded-xl transition-all shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg bg-guacamole-input text-guacamole-green group-hover:bg-guacamole-green/10 transition-colors">
                    <CategoryIcon name={cat.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-gray-400 bg-guacamole-input px-2.5 py-1 rounded-md border border-guacamole-border">
                    {count} {count === 1 ? "herramienta" : "herramientas"}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-100 group-hover:text-guacamole-green transition-colors mb-2">
                  {cat.name}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{cat.description}</p>
              </div>

              <div className="pt-3 border-t border-guacamole-border/50 flex items-center justify-between text-xs text-guacamole-green font-semibold">
                <span>Ver herramientas</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
