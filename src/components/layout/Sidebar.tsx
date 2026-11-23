"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  Layers,
  Heart,
  History,
  BookOpen,
  Target,
  Info,
  X,
  Share2,
  Gamepad2,
  GitBranch,
  AtSign,
  UserCheck,
  Mail,
  Phone,
  Car,
  Briefcase,
  Network,
  Building,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  investigateCounts?: Record<string, number>;
  totalTools?: number;
}

export function Sidebar({ isOpen, onClose, investigateCounts = {}, totalTools = 0 }: SidebarProps) {
  const pathname = usePathname();
  const { favorites } = useFavorites();
  const isInvestigateActive = pathname.startsWith("/investigate-by");
  const [isInvestigateOpen, setIsInvestigateOpen] = useState(isInvestigateActive);

  useEffect(() => {
    if (isInvestigateActive) {
      setIsInvestigateOpen(true);
    }
  }, [isInvestigateActive]);

  const discoverLinks = [
    { label: "Panel Principal", href: "/", icon: LayoutDashboard },
    { label: "Todas las herramientas", href: "/tools", icon: Wrench, count: totalTools },
    { label: "Categorías", href: "/categories", icon: Layers, count: 12 },
    { label: "Favoritos", href: "/favorites", icon: Heart, count: favorites.length },
    { label: "Historial reciente", href: "/recent", icon: History },
  ];

  const investigateLinks = [
    { label: "Redes Sociales", href: "/investigate-by/social-media", icon: Share2, id: "social-media" },
    { label: "Videojuegos", href: "/investigate-by/gaming", icon: Gamepad2, id: "gaming" },
    { label: "GitHub y Desarrollo", href: "/investigate-by/github-dev", icon: GitBranch, id: "github-dev" },
    { label: "Nombre de usuario", href: "/investigate-by/username", icon: AtSign, id: "username" },
    { label: "Personas y Profesional", href: "/investigate-by/people-professional", icon: UserCheck, id: "people-professional" },
    { label: "Correo Electrónico", href: "/investigate-by/email", icon: Mail, id: "email" },
    { label: "Teléfono", href: "/investigate-by/phone", icon: Phone, id: "phone" },
    { label: "Vehículos y Matrículas", href: "/investigate-by/vehicle", icon: Car, id: "vehicle" },
    { label: "Empleo y Empresas", href: "/investigate-by/jobs-careers", icon: Briefcase, id: "jobs-careers" },
    { label: "Dominio e IP", href: "/investigate-by/domain-ip", icon: Network, id: "domain-ip" },
    { label: "Sociedades y Empresas", href: "/investigate-by/companies", icon: Building, id: "companies" },
    { label: "Ubicación Geográfica", href: "/investigate-by/location", icon: MapPin, id: "location" },
  ];

  const learnLinks = [
    { label: "Guías y Metodología", href: "/guides", icon: BookOpen },
    { label: "Práctica y Retos CTF", href: "/challenges", icon: Target },
    { label: "Acerca de", href: "/about", icon: Info },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 md:z-30 h-screen w-64 bg-guacamole-deep border-r border-guacamole-border flex flex-col transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex md:hidden items-center justify-between p-3.5 border-b border-guacamole-border">
          <span className="font-bold text-gray-100 text-sm">Menú de Navegación</span>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items (clean, compact, no horizontal scroll, hidden scrollbar) */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-4 text-xs [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Section: Descubrir */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-guacamole-green">
              Descubrir
            </div>
            <ul className="space-y-0.5">
              {discoverLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {typeof item.count === "number" && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-guacamole-input text-gray-400 font-mono shrink-0">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: Investigar por Objetivo (Collapsible Accordion) */}
          <div>
            <div className="flex items-center justify-between px-2.5 mb-1">
              <button
                type="button"
                onClick={() => setIsInvestigateOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-guacamole-turquoise hover:text-white transition-colors"
              >
                <span>Por Objetivo</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-guacamole-input text-guacamole-turquoise font-mono">12</span>
                <ChevronDown
                  className={`w-3 h-3 text-guacamole-turquoise transition-transform duration-200 ${
                    isInvestigateOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <Link
                href="/investigate-by"
                onClick={onClose}
                className="text-[10px] text-gray-400 hover:text-guacamole-turquoise transition-colors"
              >
                Ver todos
              </Link>
            </div>

            {isInvestigateOpen && (
              <ul className="space-y-0.5 mt-1 pl-1 border-l border-guacamole-border/50">
                {investigateLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  const count = investigateCounts[item.id] || 0;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`flex items-center justify-between px-2.5 py-1 rounded-md text-[11px] transition-colors ${
                          isActive
                            ? "bg-guacamole-card text-guacamole-turquoise font-semibold border-l-2 border-guacamole-turquoise"
                            : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Icon className={`w-3 h-3 shrink-0 ${isActive ? "text-guacamole-turquoise" : "text-gray-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {count > 0 && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-guacamole-input text-gray-400 font-mono shrink-0">
                            {count}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Section: Formación y Práctica */}
          <div>
            <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Formación
            </div>
            <ul className="space-y-0.5">
              {learnLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-2.5 border-t border-guacamole-border text-[10px] text-gray-400 flex items-center justify-between bg-guacamole-base/50">
          <span>v1.0.0 • GuacamoleGH</span>
          <div className="flex items-center gap-1.5 text-guacamole-green">
            <span className="w-1.5 h-1.5 rounded-full bg-guacamole-green animate-pulse" />
            <span className="text-[10px] font-mono">Activo</span>
          </div>
        </div>
      </aside>
    </>
  );
}
