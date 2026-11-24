"use client";

import React, { useState, useMemo } from "react";
import { ToolItem, CategoryMeta, InvestigateByMeta } from "@/types/osint";
import { ToolCard } from "@/components/tools/ToolCard";
import {
  Search,
  Filter,
  Grid,
  List,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  X,
} from "lucide-react";

interface ToolsDirectoryProps {
  initialTools: ToolItem[];
  categories: CategoryMeta[];
  investigateByList: InvestigateByMeta[];
  initialCategory?: string;
  initialInvestigateBy?: string;
  title?: string;
  subtitle?: string;
}

export function ToolsDirectory({
  initialTools,
  categories,
  investigateByList,
  initialCategory = "all",
  initialInvestigateBy = "all",
  title = "Directorio de Herramientas",
  subtitle = "Explora el catálogo completo de inteligencia de fuentes abiertas",
}: ToolsDirectoryProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedInvestigateBy, setSelectedInvestigateBy] = useState(initialInvestigateBy);
  const [selectedScope, setSelectedScope] = useState("all");
  const [selectedPricing, setSelectedPricing] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "featured">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(initialCategory !== "all" || initialInvestigateBy !== "all");

  const filteredTools = useMemo(() => {
    return initialTools
      .filter((tool) => {
        // Search filter
        if (search.trim()) {
          const q = search.toLowerCase();
          const cleanQ = q.replace(/[-\s_]/g, "");
          const matchName =
            tool.name.toLowerCase().includes(q) ||
            (cleanQ.length >= 3 && tool.name.toLowerCase().replace(/[-\s_]/g, "").includes(cleanQ));
          const matchDesc = tool.description.toLowerCase().includes(q);
          const matchTag = tool.tags.some(
            (t) =>
              t.toLowerCase().includes(q) ||
              (cleanQ.length >= 3 && t.toLowerCase().replace(/[-\s_]/g, "").includes(cleanQ))
          );
          const matchSynonym = tool.synonyms.some(
            (s) =>
              s.toLowerCase().includes(q) ||
              (cleanQ.length >= 3 && s.toLowerCase().replace(/[-\s_]/g, "").includes(cleanQ))
          );
          if (!matchName && !matchDesc && !matchTag && !matchSynonym) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "all" && !tool.categories.includes(selectedCategory as any)) {
          return false;
        }

        // InvestigateBy filter
        if (selectedInvestigateBy !== "all" && (!tool.investigateBy || !tool.investigateBy.includes(selectedInvestigateBy as any))) {
          return false;
        }

        // Geographic scope filter
        if (selectedScope !== "all" && !tool.geographicScope.includes(selectedScope as any)) {
          return false;
        }

        // Pricing filter
        if (selectedPricing !== "all" && tool.pricing !== selectedPricing) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== "all" && tool.difficulty !== selectedDifficulty) {
          return false;
        }

        // Platform type filter (matches primary type or any listed secondary platform)
        if (
          selectedType !== "all" &&
          tool.type !== selectedType &&
          !tool.platforms.includes(selectedType as any)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "featured") {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
        }
        return a.name.localeCompare(b.name, "es");
      });
  }, [
    initialTools,
    search,
    selectedCategory,
    selectedInvestigateBy,
    selectedScope,
    selectedPricing,
    selectedDifficulty,
    selectedType,
    sortBy,
  ]);

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedInvestigateBy !== "all",
    selectedScope !== "all",
    selectedPricing !== "all",
    selectedDifficulty !== "all",
    selectedType !== "all",
    Boolean(search.trim()),
  ].filter(Boolean).length;

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSelectedInvestigateBy("all");
    setSelectedScope("all");
    setSelectedPricing("all");
    setSelectedDifficulty("all");
    setSelectedType("all");
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Intro */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>

      {/* Search & View Mode Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-guacamole-card p-3 rounded-xl border border-guacamole-border">
        {/* Search input box */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filtrar herramientas por nombre, etiqueta o descripción..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-guacamole-input border border-guacamole-border rounded-lg text-gray-100 placeholder-gray-500 outline-none focus:border-guacamole-green/60"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right side controls: Filter toggle, Sort, Grid/List */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          {/* Filter toggle */}
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs border rounded-lg transition-colors ${
              showFilters || activeFiltersCount > 0
                ? "bg-guacamole-card border-guacamole-green/60 text-guacamole-green"
                : "bg-guacamole-input border-guacamole-border text-gray-300 hover:text-white"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-guacamole-green text-black font-bold text-[10px] flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none pl-3 pr-8 py-2 text-xs bg-guacamole-input border border-guacamole-border rounded-lg text-gray-300 outline-none focus:border-guacamole-green/60 cursor-pointer hover:border-guacamole-border-highlight transition-colors"
            >
              <option value="featured">Destacadas primero</option>
              <option value="name">Nombre (A-Z)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center bg-guacamole-input border border-guacamole-border rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${
                viewMode === "grid" ? "bg-guacamole-card text-guacamole-green shadow-sm" : "text-gray-400 hover:text-white"
              }`}
              title="Vista en cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${
                viewMode === "list" ? "bg-guacamole-card text-guacamole-green shadow-sm" : "text-gray-400 hover:text-white"
              }`}
              title="Vista en lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar (Collapsible) */}
      {showFilters && (
        <div className="bg-guacamole-card/60 border border-guacamole-border rounded-xl p-4 transition-all">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Categoría */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Disciplina
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Todas las categorías</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Por Objetivo */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Por Objetivo
            </label>
            <div className="relative">
              <select
                value={selectedInvestigateBy}
                onChange={(e) => setSelectedInvestigateBy(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Cualquier objetivo</option>
                {investigateByList.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Ámbito Geográfico */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Ámbito Geográfico
            </label>
            <div className="relative">
              <select
                value={selectedScope}
                onChange={(e) => setSelectedScope(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Todos los ámbitos</option>
                <option value="spain">España (prioritario)</option>
                <option value="europe">Europa</option>
                <option value="global">Global</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Precio
            </label>
            <div className="relative">
              <select
                value={selectedPricing}
                onChange={(e) => setSelectedPricing(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Cualquier precio</option>
                <option value="free">Gratis</option>
                <option value="freemium">Freemium</option>
                <option value="paid">De pago</option>
                <option value="unknown">Desconocido</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Dificultad */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Dificultad
            </label>
            <div className="relative">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Todas las dificultades</option>
                <option value="beginner">Principiante (Web directa)</option>
                <option value="intermediate">Intermedio (Filtros/API)</option>
                <option value="advanced">Avanzado (CLI / GIS / QL)</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Tipo de Plataforma */}
          <div>
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Tipo / Plataforma
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none text-xs bg-guacamole-input border border-guacamole-border rounded-md pl-2.5 pr-7 py-1.5 text-gray-200 outline-none focus:border-guacamole-green cursor-pointer"
              >
                <option value="all">Todos los tipos</option>
                <option value="web">Web App</option>
                <option value="mobile">App móvil</option>
                <option value="desktop">Software de escritorio</option>
                <option value="cli">Línea de comandos (CLI)</option>
                <option value="browser-extension">Extensión de navegador</option>
                <option value="api">API</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filters Reset Bar */}
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-guacamole-border/60 text-xs">
            <span className="text-gray-400">
              {activeFiltersCount} {activeFiltersCount === 1 ? "filtro activo" : "filtros activos"}
            </span>
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-guacamole-green hover:underline font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Restablecer filtros</span>
            </button>
          </div>
        )}
        </div>
      )}

      {/* Meta Bar: Result Count */}
      <div className="flex items-center justify-between px-1 text-xs text-gray-400">
        <span>
          Mostrando <strong className="text-gray-200 font-mono">{filteredTools.length}</strong> de{" "}
          <strong className="text-gray-200 font-mono">{initialTools.length}</strong> recursos
        </span>
      </div>

      {/* Tool List / Grid */}
      {filteredTools.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-guacamole-card border border-guacamole-border">
          <p className="text-base font-semibold text-gray-200">No se encontraron herramientas con esos criterios</p>
          <p className="text-sm text-gray-400 mt-1">Prueba a relajar los filtros aplicados o limpiar el buscador.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-guacamole-green text-black font-semibold text-xs rounded-md shadow-glow hover:bg-guacamole-turquoise transition-colors"
          >
            Limpiar todos los filtros
          </button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} viewMode="grid" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} viewMode="list" />
          ))}
        </div>
      )}
    </div>
  );
}
