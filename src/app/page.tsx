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
  Compass,
  Target,
  BookOpen,
  Search,
} from "lucide-react";

export default function HomePage() {
  const investigateByList = getAllInvestigateBy();
  const featuredTools = getFeaturedTools().slice(0, 4);
  const stats = getGlobalStats();

  const topTargets = investigateByList.slice(0, 6);

  return (
    <div className="space-y-8 pb-12 w-full">
      {/* Hero Section (Clean, spacious, full width) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-guacamole-card to-guacamole-base border border-guacamole-border p-6 sm:p-10 text-center shadow-card w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-20 w-96 h-96 bg-guacamole-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-5">
          {/* Logo & Title */}
          <div className="flex items-center justify-center gap-3.5">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-guacamole-border bg-guacamole-deep/90 shadow-glow shrink-0">
              <Image
                src="/logo.png"
                alt="OSINT Hub Logo"
                width={48}
                height={48}
                className="w-full h-full object-contain p-1"
                priority
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              OSINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-guacamole-green to-guacamole-turquoise">Hub</span>
            </h1>
          </div>

          <p className="text-sm sm:text-base text-gray-300 max-w-lg mx-auto leading-relaxed">
            Directorio curado de herramientas y metodologías de inteligencia de fuentes abiertas.
          </p>

          {/* Quick Access Search Trigger Bar */}
          <div className="max-w-lg mx-auto pt-1">
            <Link
              href="/tools"
              className="flex items-center justify-between w-full px-4 py-3 text-sm text-gray-400 bg-guacamole-input/90 hover:bg-guacamole-input border border-guacamole-border hover:border-guacamole-green/50 rounded-xl transition-all shadow-sm group"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-guacamole-green" />
                <span className="text-xs sm:text-sm group-hover:text-gray-200 transition-colors">
                  Buscar herramientas, selectores, técnicas...
                </span>
              </div>
              <kbd className="px-2 py-0.5 text-[11px] bg-guacamole-card border border-guacamole-border rounded-md text-gray-400 font-mono">
                Explorar {stats.totalTools}
              </kbd>
            </Link>
          </div>

          {/* Quick Navigation Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Link
              href="/tools"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-guacamole-input text-gray-300 hover:text-white hover:border-guacamole-green/50 border border-guacamole-border transition-colors"
            >
              Catálogo Completo ({stats.totalTools})
            </Link>
            <Link
              href="/investigate-by"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-guacamole-input text-gray-300 hover:text-white hover:border-guacamole-turquoise/50 border border-guacamole-border transition-colors"
            >
              Por Objetivo ({stats.totalInvestigateBy})
            </Link>
            <Link
              href="/challenges"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-guacamole-input text-gray-300 hover:text-white hover:border-amber-400/50 border border-guacamole-border transition-colors"
            >
              Práctica & CTF
            </Link>
          </div>
        </div>

        {/* Minimal Stats Row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-guacamole-border/40 max-w-3xl mx-auto">
          <div>
            <span className="text-xl sm:text-2xl font-bold text-guacamole-green font-mono">{stats.totalTools}</span>
            <p className="text-[11px] text-gray-400 mt-0.5">Herramientas</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-guacamole-turquoise font-mono">100%</span>
            <p className="text-[11px] text-gray-400 mt-0.5">Verificadas</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-red-400 font-mono">{stats.spainCount}</span>
            <p className="text-[11px] text-gray-400 mt-0.5">España</p>
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold text-blue-400 font-mono">{stats.europeCount}</span>
            <p className="text-[11px] text-gray-400 mt-0.5">Europa</p>
          </div>
        </div>
      </section>

      {/* Featured Tools (Clean 4 cards) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-guacamole-green" />
            <span>Herramientas Destacadas</span>
          </h2>
          <Link
            href="/tools"
            className="text-xs text-guacamole-green hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Quick Access by Target (Clean chips) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-100 flex items-center gap-2">
            <Compass className="w-4 h-4 text-guacamole-turquoise" />
            <span>Investigar por Objetivo</span>
          </h2>
          <Link
            href="/investigate-by"
            className="text-xs text-guacamole-turquoise hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver los 12</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {topTargets.map((item) => (
            <Link
              key={item.id}
              href={`/investigate-by/${item.id}`}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-turquoise/50 transition-all text-xs text-gray-200 group"
            >
              <div className="p-1.5 rounded-lg bg-guacamole-input text-guacamole-turquoise group-hover:bg-guacamole-turquoise group-hover:text-black transition-colors shrink-0">
                <CategoryIcon name={item.icon} className="w-3.5 h-3.5" />
              </div>
              <span className="truncate font-medium text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Learn & Practice (2 minimal cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/guides"
          className="p-4 rounded-xl bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-turquoise/50 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-turquoise shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-gray-100 group-hover:text-guacamole-turquoise transition-colors">
              Guías y Metodología
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              Manuales de geolocalización, análisis EXIF y registros mercantiles.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-guacamole-turquoise group-hover:translate-x-1 transition-all shrink-0" />
        </Link>

        <Link
          href="/challenges"
          className="p-4 rounded-xl bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-amber-400/50 transition-all flex items-center gap-3.5 group"
        >
          <div className="p-2.5 rounded-lg bg-guacamole-input text-amber-400 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-sm text-gray-100 group-hover:text-amber-400 transition-colors">
              Práctica y Retos CTF
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              Plataformas y retos de la comunidad con precios transparentes.
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      </section>
    </div>
  );
}
