import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllCategories,
  getAllInvestigateBy,
  getFeaturedTools,
  getGlobalStats,
  getInvestigateByToolCounts,
} from "@/lib/data";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { ToolCard } from "@/components/tools/ToolCard";
import { HomeSearchTrigger } from "@/components/search/HomeSearchTrigger";
import {
  ArrowRight,
  Sparkles,
  Compass,
  Target,
  BookOpen,
  Search,
  MapPin,
  UserCheck,
  Network,
  Building,
  AtSign,
  Mail,
  Layers,
} from "lucide-react";

export default function HomePage() {
  const categories = getAllCategories();
  const allInvestigateBy = getAllInvestigateBy();
  const featuredTools = getFeaturedTools().slice(0, 4);
  const stats = getGlobalStats();
  const investigateCounts = getInvestigateByToolCounts();

  const topSelectors = [
    {
      id: "location",
      name: "Ubicación Geográfica",
      count: investigateCounts["location"] || 0,
      icon: MapPin,
      desc: "Satélites, mapas, streetview",
    },
    {
      id: "people-professional",
      name: "Personas y Profesional",
      count: investigateCounts["people-professional"] || 0,
      icon: UserCheck,
      desc: "Perfiles, registros y filtraciones",
    },
    {
      id: "domain-ip",
      name: "Dominio e IP",
      count: investigateCounts["domain-ip"] || 0,
      icon: Network,
      desc: "DNS, WHOIS, certificados y red",
    },
    {
      id: "companies",
      name: "Sociedades y Empresas",
      count: investigateCounts["companies"] || 0,
      icon: Building,
      desc: "BORME, registros mercantiles, CIF",
    },
    {
      id: "username",
      name: "Nombre de usuario",
      count: investigateCounts["username"] || 0,
      icon: AtSign,
      desc: "Huella digital en redes y foros",
    },
    {
      id: "email",
      name: "Correo Electrónico",
      count: investigateCounts["email"] || 0,
      icon: Mail,
      desc: "Brechas, dominios y reputación",
    },
  ];

  return (
    <div className="space-y-8 pb-12 w-full">
      {/* Hero Section (Balanced 2-column layout, no empty space) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-guacamole-card to-guacamole-base border border-guacamole-border p-6 sm:p-8 lg:p-10 shadow-card w-full">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-guacamole-green/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-guacamole-turquoise/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Brand, Search & Stats */}
          <div className="lg:col-span-6 space-y-4 text-left">
            <div className="flex items-center gap-3">
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
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  OSINT <span className="text-transparent bg-clip-text bg-gradient-to-r from-guacamole-green to-guacamole-turquoise">Hub</span>
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 leading-snug">
                  Directorio curado de herramientas y metodologías de inteligencia de fuentes abiertas.
                </p>
              </div>
            </div>

            {/* Quick Access Search Trigger Bar */}
            <div className="pt-1">
              <HomeSearchTrigger />
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-guacamole-border/40">
              <div>
                <span className="text-lg sm:text-xl font-bold text-guacamole-green font-mono">{stats.totalTools}</span>
                <p className="text-[10px] text-gray-400">Herramientas</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-guacamole-turquoise font-mono">
                  {stats.verifiedPercentage}%
                </span>
                <p className="text-[10px] text-gray-400">Verificadas</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-red-400 font-mono">{stats.spainCount}</span>
                <p className="text-[10px] text-gray-400">España</p>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-bold text-blue-400 font-mono">{stats.europeCount}</span>
                <p className="text-[10px] text-gray-400">Europa</p>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Target Selectors Grid */}
          <div className="lg:col-span-6 space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-guacamole-turquoise flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Comenzar por Indicador</span>
              </span>
              <Link
                href="/investigate-by"
                className="text-xs text-gray-400 hover:text-guacamole-turquoise transition-colors flex items-center gap-1"
              >
                <span>Ver los {allInvestigateBy.length}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {topSelectors.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={`/investigate-by/${item.id}`}
                    className="p-2.5 rounded-xl bg-guacamole-deep/80 hover:bg-guacamole-input border border-guacamole-border hover:border-guacamole-turquoise/50 transition-all flex flex-col justify-between group text-left"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="p-1 rounded-md bg-guacamole-input text-guacamole-turquoise group-hover:bg-guacamole-turquoise group-hover:text-black transition-colors shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-guacamole-card text-gray-400 border border-guacamole-border">
                        {item.count}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-gray-200 group-hover:text-guacamole-turquoise transition-colors truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-400 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
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

      {/* Categories / Technical Disciplines */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-gray-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-guacamole-green" />
            <span>Disciplinas Técnicas OSINT</span>
          </h2>
          <Link
            href="/categories"
            className="text-xs text-guacamole-green hover:underline flex items-center gap-1 font-medium"
          >
            <span>Ver las 12</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-guacamole-card hover:bg-guacamole-hover border border-guacamole-border hover:border-guacamole-green/50 transition-all text-xs text-gray-200 group"
            >
              <div className="p-1.5 rounded-lg bg-guacamole-input text-guacamole-green group-hover:bg-guacamole-green group-hover:text-black transition-colors shrink-0">
                <CategoryIcon name={cat.icon} className="w-3.5 h-3.5" />
              </div>
              <span className="truncate font-medium text-xs">{cat.name}</span>
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
              Guías & Google Dorking
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              Generador en vivo, chuleta de operadores (site:, filetype:), GitHub y Shodan.
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
