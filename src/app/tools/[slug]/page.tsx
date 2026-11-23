import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllTools,
  getToolBySlug,
  getCategoryById,
  getInvestigateById,
} from "@/lib/data";
import { ToolDetailActions } from "@/components/tools/ToolDetailActions";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Calendar,
  Layers,
  Compass,
  FileText,
  Key,
  UserCheck,
  Sparkles,
} from "lucide-react";

interface ToolDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: ToolDetailPageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return { title: "Herramienta no encontrada — OSINT Hub" };
  }
  return {
    title: `${tool.name} — OSINT Hub`,
    description: tool.description,
  };
}

export default function ToolDetailPage({ params }: ToolDetailPageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    notFound();
  }

  const allTools = getAllTools();
  // Find related tools (same category or investigateBy, excluding current tool)
  const relatedTools = allTools
    .filter(
      (t) =>
        t.id !== tool.id &&
        (t.categories.some((c) => tool.categories.includes(c)) ||
          t.investigateBy?.some((i) => tool.investigateBy?.includes(i)))
    )
    .slice(0, 4);

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Link href="/tools" className="hover:text-guacamole-green flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Directorio</span>
        </Link>
        <span>/</span>
        <span className="text-gray-200 truncate">{tool.name}</span>
      </div>

      {/* Main Header Card */}
      <div className="bg-guacamole-card border border-guacamole-border rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{tool.name}</h1>
              {tool.featured && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Destacada
                </span>
              )}
            </div>
            <p className="text-base text-gray-300 leading-relaxed max-w-3xl">{tool.description}</p>
          </div>

          <div className="shrink-0 flex items-center gap-1.5 self-start">
            {tool.verified && (
              <span className="inline-flex items-center gap-1 text-xs text-guacamole-green font-medium px-2.5 py-1 rounded-full bg-guacamole-input border border-guacamole-border">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verificada</span>
              </span>
            )}
          </div>
        </div>

        {/* Action buttons (Client interactive) */}
        <ToolDetailActions tool={tool} />

        {/* Badges and metadata grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-guacamole-border/60 text-xs">
          <div className="p-3 rounded-lg bg-guacamole-input/80 border border-guacamole-border">
            <span className="text-gray-400 block mb-1">Precio</span>
            <span className="font-semibold text-gray-100 uppercase font-mono">
              {tool.pricing === "free" ? "Gratuito (100% Free)" : tool.pricing === "freemium" ? "Freemium" : tool.pricing}
            </span>
            {tool.pricingDetails && (
              <span className="block text-[11px] text-amber-300 font-sans font-medium mt-1">
                {tool.pricingDetails}
              </span>
            )}
          </div>

          <div className="p-3 rounded-lg bg-guacamole-input/80 border border-guacamole-border">
            <span className="text-gray-400 block mb-1">Ámbito Geográfico</span>
            <span className="font-semibold text-gray-100 capitalize">
              {tool.geographicScope.join(", ")}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-guacamole-input/80 border border-guacamole-border">
            <span className="text-gray-400 block mb-1">Dificultad</span>
            <span className="font-semibold text-gray-100 capitalize">
              {tool.difficulty === "beginner" ? "Principiante" : tool.difficulty === "intermediate" ? "Intermedio" : "Avanzado"}
            </span>
          </div>

          <div className="p-3 rounded-lg bg-guacamole-input/80 border border-guacamole-border">
            <span className="text-gray-400 block mb-1">Plataforma</span>
            <span className="font-semibold text-gray-100 uppercase font-mono">
              {tool.type}
            </span>
          </div>
        </div>

        {/* Requirements row */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pt-2">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-gray-400" />
            <span>Registro: <strong className="text-gray-200">{tool.registrationRequired ? "Requerido" : "No necesario"}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Key className="w-4 h-4 text-gray-400" />
            <span>API Key: <strong className="text-gray-200">{tool.apiKeyRequired ? "Requerida" : "No requerida"}</strong></span>
          </div>
          {tool.lastReviewed && (
            <div className="flex items-center gap-1.5 ml-auto">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Revisada: <span className="font-mono text-gray-300">{tool.lastReviewed}</span></span>
            </div>
          )}
        </div>
      </div>

      {/* Main Info Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details, Instructions, Use Cases */}
        <div className="md:col-span-2 space-y-6">
          {/* Long Description / Analysis */}
          {tool.longDescription && (
            <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
              <h2 className="text-base font-bold text-gray-100 flex items-center gap-2">
                <FileText className="w-4 h-4 text-guacamole-green" />
                <span>Análisis y Descripción Detallada</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">{tool.longDescription}</p>
            </div>
          )}

          {/* Use Cases */}
          {tool.useCases && tool.useCases.length > 0 && (
            <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
              <h2 className="text-base font-bold text-gray-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-guacamole-turquoise" />
                <span>Casos de Uso Recomendados</span>
              </h2>
              <ul className="space-y-2">
                {tool.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-guacamole-turquoise mt-2 shrink-0" />
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Instructions */}
          {tool.instructions && (
            <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
              <h2 className="text-base font-bold text-gray-100 flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span>Instrucciones y Metodología de Uso</span>
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed bg-guacamole-input p-4 rounded-lg border border-guacamole-border font-sans">
                {tool.instructions}
              </p>
            </div>
          )}

          {/* Limitations and Caveats */}
          {tool.limitations && tool.limitations.length > 0 && (
            <div className="p-6 rounded-xl bg-amber-950/20 border border-amber-800/60 space-y-3">
              <h2 className="text-base font-bold text-amber-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Limitaciones y Consideraciones Éticas</span>
              </h2>
              <ul className="space-y-2">
                {tool.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-amber-200/90 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column: Taxonomy, Categories, Tags */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-guacamole-green flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              <span>Disciplinas Técnicas</span>
            </h3>
            <div className="space-y-1.5">
              {tool.categories.map((catId) => {
                const cat = getCategoryById(catId);
                return (
                  <Link
                    key={catId}
                    href={`/categories/${catId}`}
                    className="block p-2 rounded-lg bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border text-xs text-gray-200 hover:text-guacamole-green transition-colors"
                  >
                    <span className="font-semibold">{cat ? cat.name : catId}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Investigate By Targets */}
          {tool.investigateBy && tool.investigateBy.length > 0 && (
            <div className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-guacamole-turquoise flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Investigate By</span>
              </h3>
              <div className="space-y-1.5">
                {tool.investigateBy.map((invId) => {
                  const inv = getInvestigateById(invId);
                  return (
                    <Link
                      key={invId}
                      href={`/investigate-by/${invId}`}
                      className="block p-2 rounded-lg bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border text-xs text-gray-200 hover:text-guacamole-turquoise transition-colors"
                    >
                      <span className="font-semibold">{inv ? inv.name : invId}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tags & Synonyms */}
          <div className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Etiquetas & Descriptores
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {tool.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-guacamole-input text-gray-300 border border-guacamole-border"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-guacamole-border/60">
          <h2 className="text-lg font-bold text-gray-100">Herramientas Relacionadas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((rel) => (
              <ToolCard key={rel.id} tool={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
