import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllInvestigateBy,
  getInvestigateById,
  getAllTools,
  getToolsByInvestigateBy,
  getAllCategories,
} from "@/lib/data";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import { InvestigateById } from "@/types/osint";
import { AlertCircle, Lightbulb } from "lucide-react";

interface InvestigateByPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const list = getAllInvestigateBy();
  return list.map((i) => ({ slug: i.id }));
}

export function generateMetadata({ params }: InvestigateByPageProps): Metadata {
  const inv = getInvestigateById(params.slug as InvestigateById);
  if (!inv) {
    return { title: "Objetivo no encontrado — OSINT Hub" };
  }
  return {
    title: `Investigar por ${inv.name} — OSINT Hub`,
    description: inv.description,
  };
}

export default function InvestigateByPage({ params }: InvestigateByPageProps) {
  const inv = getInvestigateById(params.slug as InvestigateById);
  if (!inv) {
    notFound();
  }

  const tools = getToolsByInvestigateBy(inv.id);
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();

  return (
    <div className="space-y-6">
      {/* Tips / Guidelines Banner */}
      {inv.tips && inv.tips.length > 0 && (
        <div className="p-4 sm:p-5 rounded-xl bg-guacamole-card border border-guacamole-turquoise/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-guacamole-turquoise">
            <Lightbulb className="w-4 h-4 text-guacamole-turquoise" />
            <span>Pautas Metodológicas y Consejos Clave</span>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1 text-xs text-gray-300">
            {inv.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-guacamole-input/60 p-2.5 rounded-lg border border-guacamole-border">
                <span className="w-1.5 h-1.5 rounded-full bg-guacamole-turquoise mt-1.5 shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Directory of tools related to this target */}
      <ToolsDirectory
        initialTools={tools}
        categories={categories}
        investigateByList={investigateByList}
        initialInvestigateBy={inv.id}
        title={`Investigate By: ${inv.name}`}
        subtitle={inv.description}
      />
    </div>
  );
}
