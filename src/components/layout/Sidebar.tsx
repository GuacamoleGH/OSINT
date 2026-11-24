"use client";

import React from "react";
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
    { label: "Guías & Dorking", href: "/guides", icon: BookOpen },
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
        className={`fixed md:sticky top-0 md:top-16 left-0 z-50 md:z-30 h-screen md:h-[calc(100vh-4rem)] w-60 bg-guacamole-deep border-r border-guacamole-border flex flex-col transition-transform duration-200 ease-in-out shrink-0 box-border overflow-hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Mobile Header in Drawer */}
        <div className="flex md:hidden items-center justify-between p-3 border-b border-guacamole-border">
          <span className="font-bold text-gray-100 text-xs">Menú de Navegación</span>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items (generous sizing, clear typography, crisp icons) */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden overscroll-contain px-3 py-3 space-y-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Section: Descubrir */}
          <div>
            <div className="px-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-guacamole-green">
              Descubrir
            </div>
            <ul className="space-y-1">
              {discoverLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors text-xs sm:text-[13px] ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {typeof item.count === "number" && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-guacamole-input text-gray-400 font-mono shrink-0">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: Investigar por Objetivo */}
          <div>
            <div className="flex items-center justify-between px-2 mb-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-guacamole-turquoise">
                <span>Por Objetivo</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-guacamole-input text-guacamole-turquoise font-mono">12</span>
              </div>
              <Link
                href="/investigate-by"
                onClick={onClose}
                className="text-[11px] text-gray-400 hover:text-guacamole-turquoise transition-colors"
              >
                Ver todos
              </Link>
            </div>

            <ul className="space-y-1 pl-1 border-l border-guacamole-border/50">
              {investigateLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const count = investigateCounts[item.id] || 0;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-2.5 py-1 rounded-lg text-xs sm:text-[13px] transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-turquoise font-semibold border-l-2 border-guacamole-turquoise"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-guacamole-turquoise" : "text-gray-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {count > 0 && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-guacamole-input text-gray-400 font-mono shrink-0">
                          {count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: Formación y Práctica */}
          <div>
            <div className="px-2 mb-1.5 text-xs font-bold uppercase tracking-wider text-gray-400">
              Formación
            </div>
            <ul className="space-y-1">
              {learnLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-colors text-xs sm:text-[13px] ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="px-3.5 py-2.5 border-t border-guacamole-border text-xs text-gray-400 flex items-center justify-between bg-guacamole-base/40 shrink-0">
          <span className="text-[11px] text-gray-400 font-mono">v1.0.0</span>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-guacamole-green/10 border border-guacamole-green/20 text-guacamole-green text-[11px] font-medium leading-none">
            <span className="w-2 h-2 rounded-full bg-guacamole-green shrink-0 animate-pulse" />
            <span className="font-sans">Activo</span>
          </div>
        </div>
      </aside>
    </>
  );
}
