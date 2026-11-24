import React from "react";
import { Metadata } from "next";
import { getAllGuides } from "@/lib/data";
import { BookOpen, ExternalLink, Terminal } from "lucide-react";
import { DorkingCheatsheet } from "@/components/dorking/DorkingCheatsheet";

export const metadata: Metadata = {
  title: "Guías, Metodología & Dorking — OSINT Hub",
  description: "Chuleta de Google Dorking, operadores avanzados y manuales metodológicos de inteligencia abierta.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="space-y-10 pb-16 w-full">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-turquoise font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>Dorking & Operadores Avanzados</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Google Dorking & Operadores de Búsqueda
        </h1>
        <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-3xl leading-relaxed">
          Guía interactiva de sintaxis booleana, dorks prediseñados y operadores específicos para Google, GitHub, Shodan y Bing. Introduce tu objetivo para generar y copiar consultas al instante.
        </p>
      </div>

      {/* Interactive Dorking Cheatsheet & Live Generator */}
      <DorkingCheatsheet />

      {/* Methodological Guides & Official Standards */}
      <div className="space-y-4 pt-6 border-t border-guacamole-border/60">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-guacamole-green" />
          <h2 className="text-base sm:text-lg font-bold text-gray-100">
            Manuales Metodológicos y Documentación Oficial
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border hover:border-guacamole-turquoise/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-guacamole-turquoise font-mono">
                    {guide.category}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-guacamole-input text-gray-300 border border-guacamole-border capitalize">
                    {guide.scope === "spain" ? "España" : guide.scope === "europe" ? "Europa" : "Global"}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-100 mb-1.5">{guide.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{guide.description}</p>
              </div>

              <div className="pt-3.5 border-t border-guacamole-border/50 flex items-center justify-between">
                {guide.author && (
                  <span className="text-[11px] text-gray-400 truncate mr-2">
                    Por: <strong className="text-gray-300">{guide.author}</strong>
                  </span>
                )}
                <a
                  href={guide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border text-xs text-gray-200 hover:text-guacamole-turquoise transition-colors shrink-0 ml-auto"
                >
                  <span>Consultar recurso</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
