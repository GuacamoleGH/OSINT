import React from "react";
import { Metadata } from "next";
import { getAllGuides } from "@/lib/data";
import { BookOpen, ExternalLink, Bookmark, ShieldCheck, Globe, GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: "Guías & Recursos OSINT — OSINT Hub",
  description: "Documentación oficial, manuales metodológicos y recursos de aprendizaje de fuentes abiertas.",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-turquoise font-medium mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Formación & Metodología</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Guías & Recursos de Aprendizaje</h1>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          Selección de manuales metodológicos, estándares oficiales de interoperabilidad y tutoriales paso a paso para estructurar investigaciones fiables y reproducibles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.map((guide) => (
          <div
            key={guide.id}
            className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border hover:border-guacamole-turquoise/40 transition-colors flex flex-col justify-between"
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

              <h2 className="text-base font-bold text-gray-100 mb-2">{guide.title}</h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">{guide.description}</p>
            </div>

            <div className="pt-4 border-t border-guacamole-border/50 flex items-center justify-between">
              {guide.author && (
                <span className="text-xs text-gray-400">
                  Por: <strong className="text-gray-300">{guide.author}</strong>
                </span>
              )}
              <a
                href={guide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border text-xs text-gray-200 hover:text-guacamole-turquoise transition-colors ml-auto"
              >
                <span>Consultar recurso</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
