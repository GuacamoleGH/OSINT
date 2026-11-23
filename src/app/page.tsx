import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllCategories,
  getAllInvestigateBy,
  getFeaturedTools,
  getGlobalStats,
} from "@/lib/data";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Compass,
  Target,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();
  const featuredTools = getFeaturedTools().slice(0, 4);
  const stats = getGlobalStats();

  // Top 6 targets for clean quick access
  const topTargets = investigateByList.slice(0, 6);

  return (
    <div className="space-y-10 pb-16 max-w-7xl mx-auto">
      {/* Hero Section (Balanced 2-column layout, no empty gap) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-guacamole-card to-guacamole-base border border-guacamole-border p-6 sm:p-8 lg:p-10 shadow-card">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-guacamole-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-guacamole-turquoise/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Brand & Description */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-input border border-guacamole-border text-xs text-guacamole-green font-medium">
              <span className="w-2 h-2 rounded-full bg-guacamole-green animate-pulse" />
              <span>Ecosistema GuacamoleGH • Portal OSINT</span>
            </div>

            <div className="flex items-center gap-4">
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
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                  OSINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-guacamole-green to-guacamole-turquoise">Hub</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
                  Portal Curado de Inteligencia de Fuentes Abiertas
                </p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
              Plataforma centralizada para investigar a partir de disciplinas técnicas (GEOINT, SOCMINT, IMINT) o directamente desde el dato que posees (alias, correo, matrícula, empresa o ubicación).
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-guacamole-green text-black font-semibold text-sm hover:bg-guacamole-turquoise transition-all shadow-glow"
              >
                <span>Explorar Directorio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/investigate-by"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-guacamole-input text-gray-200 border border-guacamole-border hover:border-guacamole-turquoise/60 text-sm font-medium transition-colors"
              >
                <Compass className="w-4 h-4 text-guacamole-turquoise" />
                <span>Por Objetivo</span>
              </Link>

              <Link
                href="/challenges"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-guacamole-input text-gray-200 border border-guacamole-border hover:border-amber-400/60 text-sm font-medium transition-colors"
              >
                <Target className="w-4 h-4 text-amber-400" />
                <span>Práctica & CTF</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Quick Access by Target (fills the right side cleanly) */}
          <div className="lg:col-span-5 bg-guacamole-deep/80 border border-guacamole-border rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-guacamole-turquoise" />
                <span>Iniciar por Objetivo</span>
              </span>
              <Link href="/investigate-by" className="text-[11px] text-guacamole-turquoise hover:underline">
                Ver los 12 &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {topTargets.map((item) => (
                <Link
                  key={item.id}
                  href={`/investigate-by/${item.id}`}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-guacamole-input/80 hover:bg-guacamole-card border border-guacamole-border hover:border-guacamole-turquoise/50 transition-all text-xs text-gray-200 group"
                >
                  <div className="p-1 rounded bg-guacamole-card text-guacamole-turquoise group-hover:bg-guacamole-turquoise group-hover:text-black transition-colors shrink-0">
                    <CategoryIcon name={item.icon} className="w-3.5 h-3.5" />
                  </div>
                  <span className="truncate font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-guacamole-border/60">
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

      {/* Featured Tools (Clean 4-card grid with full-card clickable navigation) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-guacamole-green" />
              <span>Herramientas Destacadas</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Selección de utilidades imprescindibles para investigación en fuentes abiertas.
            </p>
          </div>
          <Link
            href="/tools"
            className="text-xs text-guacamole-green hover:underline flex items-center gap-1 font-medium shrink-0"
          >
            <span>Ver catálogo ({stats.totalTools})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Explore by Category or Target (Clean pill selector cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-guacamole-turquoise" />
              <span>Disciplinas Técnicas Principales</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Accede directamente a los recursos según la metodología de análisis.
            </p>
          </div>
          <Link
            href="/categories"
            className="text-xs text-guacamole-turquoise hover:underline flex items-center gap-1 font-medium shrink-0"
          >
            <span>Ver las 12 categorías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="group bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-turquoise/50 p-3.5 rounded-xl transition-all flex flex-col justify-between"
            >
              <div className="p-2 rounded-lg bg-guacamole-input text-guacamole-turquoise group-hover:bg-guacamole-turquoise/10 transition-colors w-fit mb-2">
                <CategoryIcon name={cat.icon} className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-gray-200 group-hover:text-guacamole-turquoise transition-colors truncate">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-400 block mt-0.5">Explorar &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learn & Practice (2 clean cards at the bottom) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-turquoise shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-100 mb-1">Guías & Metodología</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Metodologías paso a paso: geolocalización visual, extracción de metadatos EXIF, dorking y consulta del registro mercantil oficial.
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

        <div className="p-5 rounded-xl bg-guacamole-card border border-guacamole-border flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-amber-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-gray-100 mb-1">Plataformas de Práctica & Retos CTF</h3>
            <p className="text-xs text-gray-400 leading-relaxed mb-3">
              Directorio directo a los mejores desafíos CTF, retos de geolocalización y laboratorios prácticos internacionales con indicación de costes.
            </p>
            <Link
              href="/challenges"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:underline"
            >
              <span>Ver plataformas y retos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
