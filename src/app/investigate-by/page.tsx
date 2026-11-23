import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { getAllInvestigateBy, getInvestigateByToolCounts } from "@/lib/data";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ArrowRight, Compass, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Investigate By — OSINT Hub",
  description: "Navegación por objetivo: investiga a partir del dato o indicador que posees.",
};

export default function InvestigateByIndexPage() {
  const list = getAllInvestigateBy();
  const counts = getInvestigateByToolCounts();

  return (
    <div className="space-y-8 pb-16">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-turquoise font-medium mb-3">
          <Compass className="w-3.5 h-3.5" />
          <span>Navegación por Objetivo</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Investigate By</h1>
        <p className="text-sm text-gray-400 mt-1 max-w-2xl">
          Selecciona el tipo de indicador o información de partida que deseas investigar (nombre de usuario, correo, matrícula, empresa o ubicación) para descubrir las herramientas más eficaces sin duplicados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((inv) => {
          const count = counts[inv.id] || 0;
          return (
            <Link
              key={inv.id}
              href={`/investigate-by/${inv.id}`}
              className="group bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-turquoise/50 p-6 rounded-xl transition-all shadow-card flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 rounded-lg bg-guacamole-input text-guacamole-turquoise group-hover:bg-guacamole-turquoise/10 transition-colors">
                    <CategoryIcon name={inv.icon} className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium text-gray-400 bg-guacamole-input px-2.5 py-1 rounded-md border border-guacamole-border">
                    {count} {count === 1 ? "herramienta" : "herramientas"}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-gray-100 group-hover:text-guacamole-turquoise transition-colors mb-2">
                  {inv.name}
                </h2>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{inv.description}</p>

                {inv.platforms && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {inv.platforms.slice(0, 4).map((p) => (
                      <span key={p} className="text-[10px] px-2 py-0.5 rounded bg-guacamole-input text-gray-400 border border-guacamole-border">
                        {p}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-guacamole-border/50 flex items-center justify-between text-xs text-guacamole-turquoise font-semibold">
                <span>Comenzar investigación</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
