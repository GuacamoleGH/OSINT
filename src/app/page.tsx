import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllCategories,
  getAllInvestigateBy,
  getFeaturedTools,
  getCategoryToolCounts,
  getInvestigateByToolCounts,
  getGlobalStats,
} from "@/lib/data";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  Compass,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
  Layers,
  Search,
  Target,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();
  const featuredTools = getFeaturedTools().slice(0, 8);
  const categoryCounts = getCategoryToolCounts();
  const investigateCounts = getInvestigateByToolCounts();
  const stats = getGlobalStats();

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-guacamole-card to-guacamole-base border border-guacamole-border p-6 sm:p-10 shadow-card">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-guacamole-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-guacamole-turquoise/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-input border border-guacamole-border text-xs text-guacamole-green font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-guacamole-green animate-pulse" />
            <span>Ecosistema GuacamoleGH • Hub Autohospedado</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-guacamole-border bg-guacamole-deep/80 shadow-glow shrink-0">
              <Image
                src="/logo.png"
                alt="OSINT Hub Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain p-1"
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              OSINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-guacamole-green to-guacamole-turquoise">Hub</span>
            </h1>
          </div>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6">
            Portal curado de inteligencia de fuentes abiertas. Investiga desde una disciplina técnica (GEOINT, SOCMINT, WEBINT) o parte directamente de un indicador objetivo (alias, correo, matrícula, empresa o ubicación).
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-guacamole-green text-black font-semibold text-sm hover:bg-guacamole-turquoise transition-all shadow-glow"
            >
              <span>Explorar Directorio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/investigate-by"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-guacamole-input text-gray-200 border border-guacamole-border hover:border-guacamole-green/60 text-sm font-medium transition-colors"
            >
              <span>Investigate By</span>
            </Link>

            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-guacamole-input text-gray-200 border border-guacamole-border hover:border-guacamole-green/60 text-sm font-medium transition-colors"
            >
              <Target className="w-4 h-4 text-guacamole-turquoise" />
              <span>Retos Prácticos</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-guacamole-border/60">
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-guacamole-green font-mono">{stats.totalTools}</span>
            <p className="text-xs text-gray-400 mt-0.5">Herramientas curadas</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-guacamole-turquoise font-mono">100%</span>
            <p className="text-xs text-gray-400 mt-0.5">Gratis o Freemium útil</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-red-400 font-mono">{stats.spainCount}</span>
            <p className="text-xs text-gray-400 mt-0.5">Recursos oficiales España</p>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">{stats.europeCount}</span>
            <p className="text-xs text-gray-400 mt-0.5">Fuentes europeas</p>
          </div>
        </div>
      </section>

      {/* Investigate By Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <Compass className="w-5 h-5 text-guacamole-turquoise" />
              <span>Investigate By — Búsqueda por Objetivo</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Comienza tu investigación según el tipo de dato que posees, sin necesidad de conocer la herramienta de antemano.
            </p>
          </div>
          <Link
            href="/investigate-by"
            className="text-xs text-guacamole-turquoise hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver 12 agrupaciones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {investigateByList.map((inv) => {
            const count = investigateCounts[inv.id] || 0;
            return (
              <Link
                key={inv.id}
                href={`/investigate-by/${inv.id}`}
                className="group bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-turquoise/50 p-4 rounded-xl transition-all shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-guacamole-input text-guacamole-turquoise group-hover:bg-guacamole-turquoise/10 transition-colors">
                      <CategoryIcon name={inv.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-medium text-gray-400 bg-guacamole-input px-2 py-0.5 rounded">
                      {count} {count === 1 ? "herramienta" : "herramientas"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-gray-100 group-hover:text-guacamole-turquoise transition-colors">
                    {inv.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">{inv.shortDescription}</p>
                </div>

                <div className="mt-3 pt-2 border-t border-guacamole-border/40 flex items-center justify-between text-[11px] text-gray-400 group-hover:text-gray-200">
                  <span>Explorar</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 12 Disciplines Categories Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-guacamole-green" />
              <span>Disciplinas OSINT Técnicas</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Las 12 categorías fundamentales de inteligencia de fuentes abiertas organizadas por especialidad.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs text-guacamole-green hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver categorías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const count = categoryCounts[cat.id] || 0;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/50 p-4 rounded-xl transition-all shadow-sm flex items-start gap-3.5"
              >
                <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-green group-hover:bg-guacamole-green/10 transition-colors shrink-0">
                  <CategoryIcon name={cat.icon} className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-sm text-gray-100 group-hover:text-guacamole-green transition-colors truncate">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono font-medium text-gray-400 bg-guacamole-input px-1.5 py-0.2 rounded shrink-0">
                      {count}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{cat.shortDescription}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Herramientas Destacadas</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Selección editorial de recursos imprescindibles con prioridad para España y Europa.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs text-guacamole-green hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver catálogo completo ({stats.totalTools})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Learn & Challenges quick cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border flex items-start gap-4">
          <div className="p-3 rounded-lg bg-guacamole-input text-guacamole-turquoise shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-gray-100 mb-1">Guías & Recursos de Aprendizaje</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Aprende metodologías paso a paso: geolocalización visual, extracción de metadatos EXIF, dorking y consulta del registro mercantil español.
            </p>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-guacamole-turquoise hover:underline"
            >
              <span>Acceder a las guías</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border flex items-start gap-4">
          <div className="p-3 rounded-lg bg-guacamole-input text-amber-400 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-base text-gray-100 mb-1">Retos & Entrenamiento Práctico</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Pon a prueba tus habilidades con desafíos reales de geolocalización, análisis de sombras solares y verificación multimedia con guardado de progreso local.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
            >
              <span>Ver retos disponibles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
