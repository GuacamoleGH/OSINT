"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToolItem } from "@/types/osint";
import { Search, X, ExternalLink, ArrowRight, CornerDownLeft, Sparkles } from "lucide-react";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tools: ToolItem[];
}

const SYNONYMS_MAP: Record<string, string[]> = {
  correo: ["email", "mail", "buzon"],
  email: ["correo", "buzon"],
  telefono: ["phone", "movil", "celular", "prefijo"],
  phone: ["telefono", "movil"],
  matricula: ["vehicle", "vehiculo", "coche", "dgt"],
  coche: ["vehicle", "vehiculo", "matricula"],
  vehicle: ["coche", "matricula", "dgt"],
  usuario: ["username", "alias", "nick", "perfil"],
  username: ["usuario", "alias", "nick"],
  mapa: ["maps", "geoint", "cartografia", "callejero"],
  maps: ["mapa", "cartografia"],
  avion: ["flight", "plane", "vuelo", "aereo", "ads-b"],
  flight: ["avion", "vuelo"],
  barco: ["vessel", "ship", "maritimo", "ais", "puerto"],
  maritimo: ["barco", "vessel", "ship"],
  satelite: ["satellite", "sentinel", "copernicus", "nasa"],
  satellite: ["satelite", "sentinel", "copernicus"],
  empresa: ["company", "companies", "mercantil", "sociedad", "cif"],
  company: ["empresa", "mercantil", "sociedad"],
  empleo: ["jobs", "trabajo", "vacantes", "eures", "infojobs"],
  jobs: ["empleo", "trabajo"],
  sol: ["suncalc", "sombras", "azimut", "hora", "chronolocation"],
  sombras: ["shadows", "suncalc", "hora"],
  foto: ["imint", "imagen", "forense", "exif"],
  imagen: ["foto", "imint", "forense"],
  ip: ["cyber", "red", "dns", "asn", "whois"],
  dominio: ["domain", "dns", "whois", "subdominio"],
  qr: ["zxing", "barcode", "codigo de barras", "decoder"],
  barcode: ["qr", "zxing", "codigo de barras", "bcbp"],
  zxing: ["qr", "barcode", "decoder"],
  bcbp: ["boarding pass", "tarjeta de embarque", "orcascan", "pnr", "vuelo"],
  embarque: ["bcbp", "boarding pass", "vuelo", "pnr"],
  pnr: ["bcbp", "localizador", "reserva", "vuelo"],
  geoguessing: ["rainbolt", "geoguessr", "geohints", "plonkit"],
  rainbolt: ["geoguessr", "plonkit", "geohints", "geolocalizacion"],
  montana: ["peakvisor", "heywhatsthat", "relieve", "cumbres"],
  horizonte: ["heywhatsthat", "peakvisor", "panorama"],
  interseccion: ["bellingcat osm search", "overpass", "proximidad"],
  metar: ["taf", "metar-taf", "viento", "tiempo aeropuerto", "pistas", "aeronautica"],
  taf: ["metar", "metar-taf", "pronostico aeropuerto", "viento"],
};

export function SearchDialog({ isOpen, onClose, tools }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const fuse = useMemo(() => {
    return new Fuse(tools, {
      keys: [
        { name: "name", weight: 0.35 },
        { name: "synonyms", weight: 0.25 },
        { name: "tags", weight: 0.2 },
        { name: "description", weight: 0.15 },
        { name: "subcategories", weight: 0.1 },
        { name: "categories", weight: 0.1 },
        { name: "investigateBy", weight: 0.1 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
      includeScore: true,
    });
  }, [tools]);

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      // Default to featured tools if search query is empty
      return tools.filter((t) => t.featured).slice(0, 8);
    }

    // 1. Direct substring matches (highest priority, 100% reliable)
    const directMatches = tools.filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(trimmed);
      const matchSlug = tool.slug.toLowerCase().includes(trimmed);
      const matchTag = tool.tags.some((t) => t.toLowerCase().includes(trimmed));
      const matchSynonym = tool.synonyms.some((s) => s.toLowerCase().includes(trimmed));
      const matchDesc = tool.description.toLowerCase().includes(trimmed);
      const matchCategory = tool.categories.some((c) => c.toLowerCase().includes(trimmed));
      const matchInvestigate = tool.investigateBy.some((i) => i.toLowerCase().includes(trimmed));
      return matchName || matchSlug || matchTag || matchSynonym || matchDesc || matchCategory || matchInvestigate;
    });

    // 2. Fuzzy search with Fuse on the exact query
    const fuseMatches = fuse.search(trimmed).map((r) => r.item);

    // 3. Synonym matches (if synonyms are registered for any of the query words)
    const words = trimmed.split(/\s+/);
    const relatedSynonyms: string[] = [];
    for (const w of words) {
      if (SYNONYMS_MAP[w]) {
        relatedSynonyms.push(...SYNONYMS_MAP[w]);
      }
    }

    const synonymMatches =
      relatedSynonyms.length > 0
        ? tools.filter((tool) =>
            relatedSynonyms.some((syn) => {
              const s = syn.toLowerCase();
              return (
                tool.name.toLowerCase().includes(s) ||
                tool.slug.toLowerCase().includes(s) ||
                tool.tags.some((t) => t.toLowerCase().includes(s)) ||
                tool.synonyms.some((sy) => sy.toLowerCase().includes(s)) ||
                tool.description.toLowerCase().includes(s)
              );
            })
          )
        : [];

    // Combine uniquely maintaining relevance priority
    const seen = new Set<string>();
    const combined: typeof tools = [];

    for (const item of [...directMatches, ...fuseMatches, ...synonymMatches]) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        combined.push(item);
      }
    }

    return combined.slice(0, 10);
  }, [query, tools, fuse]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      router.push(`/tools/${results[selectedIndex].slug}`);
      onClose();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-guacamole-base border border-guacamole-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-guacamole-border bg-guacamole-card/50">
          <Search className="w-5 h-5 text-guacamole-green mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por término, disciplina o dato (ej. 'satélite', 'correo', 'DGT', 'Steam', 'BSSID')..."
            className="w-full bg-transparent text-gray-100 placeholder-gray-500 text-base outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-gray-400 hover:text-gray-200 transition-colors mr-2"
              title="Borrar"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-xs text-gray-400 bg-guacamole-input border border-guacamole-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-guacamole-border/40">
          {!query.trim() && (
            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-guacamole-green flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Herramientas Destacadas Recomendadas</span>
            </div>
          )}

          {results.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-base font-medium">No se encontraron herramientas</p>
              <p className="text-sm mt-1 text-gray-500">
                Prueba con otro término, sinónimo o navega por categorías en el menú lateral.
              </p>
            </div>
          ) : (
            results.map((tool, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  onClick={onClose}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start justify-between p-3 rounded-md transition-colors ${
                    isSelected ? "bg-guacamole-hover border-l-2 border-guacamole-green" : "hover:bg-guacamole-card/60"
                  }`}
                >
                  <div className="flex-1 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-100 text-sm hover:text-guacamole-green">
                        {tool.name}
                      </span>
                      {tool.pricing === "free" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 rounded">
                          Gratis
                        </span>
                      )}
                      {tool.pricing === "freemium" && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-amber-950/60 text-amber-400 border border-amber-800/60 rounded">
                          Freemium
                        </span>
                      )}
                      {tool.geographicScope.includes("spain") && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-red-950/60 text-red-300 border border-red-800/60 rounded">
                          España
                        </span>
                      )}
                      {tool.geographicScope.includes("europe") && (
                        <span className="text-[10px] font-medium px-1.5 py-0.5 bg-blue-950/60 text-blue-300 border border-blue-800/60 rounded">
                          Europa
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-1">{tool.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {tool.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.2 bg-guacamole-input text-gray-400 rounded">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-center">
                    {isSelected && (
                      <span className="text-xs text-guacamole-green flex items-center gap-1 font-mono">
                        <span>Ver</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-guacamole-card/30 border-t border-guacamole-border flex items-center justify-between text-xs text-gray-400">
          <span>Usa ↑ ↓ para navegar, Enter para abrir</span>
          <span>{results.length} resultados</span>
        </div>
      </div>
    </div>
  );
}
