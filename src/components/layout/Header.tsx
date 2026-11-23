"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, Sun, Moon, Menu, Shield, Compass } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useTheme } from "@/hooks/useTheme";

interface HeaderProps {
  onOpenSearch: () => void;
  onToggleMobileMenu: () => void;
}

export function Header({ onOpenSearch, onToggleMobileMenu }: HeaderProps) {
  const { favorites } = useFavorites();
  const { theme, toggleTheme, mounted } = useTheme();
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(
        now.toLocaleDateString("es-ES", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-guacamole-deep/90 backdrop-blur-md border-b border-guacamole-border box-border">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        {/* Left: Mobile hamburger + Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-guacamole-card focus:outline-none"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-guacamole-border group-hover:border-guacamole-green/60 transition-colors bg-guacamole-card flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="GuacamoleGH OSINT Hub Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-gray-100 tracking-tight">OSINT Hub</span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  GuacamoleGH
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-gray-400">Portal de Inteligencia Abierta</span>
            </div>
          </Link>
        </div>

        {/* Center: Search Trigger Bar */}
        <div className="hidden lg:flex flex-1 max-w-md mx-6">
          <button
            onClick={onOpenSearch}
            className="w-full flex items-center justify-between px-3.5 py-1.5 text-sm text-gray-400 bg-guacamole-input border border-guacamole-border rounded-md hover:border-guacamole-green/50 hover:text-gray-200 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-guacamole-green" />
              <span>Buscar herramientas, técnicas, fuentes...</span>
            </div>
            <kbd className="px-1.5 py-0.5 text-[11px] bg-guacamole-card border border-guacamole-border rounded text-gray-400 font-mono">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Live Clock & Action Badges */}
        <div className="flex items-center gap-3">
          {/* Mobile search button */}
          <button
            onClick={onOpenSearch}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-md hover:bg-guacamole-card"
            title="Buscar (Ctrl+K)"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Live Clock Widget (Ecosistema GuacamoleGH) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-guacamole-card/60 border border-guacamole-border rounded-md text-xs text-gray-300">
            <span className="w-2 h-2 rounded-full bg-guacamole-green animate-pulse" />
            <span className="font-mono font-medium">{time || "--:--:--"}</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400 capitalize">{date}</span>
          </div>

          {/* Favorites Link */}
          <Link
            href="/favorites"
            className="relative p-2 text-gray-400 hover:text-white rounded-md hover:bg-guacamole-card transition-colors"
            title="Herramientas favoritas"
          >
            <Heart className="w-5 h-5" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-black bg-guacamole-green rounded-full shadow-sm">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-white rounded-md hover:bg-guacamole-card transition-colors"
            title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            aria-label="Alternar tema visual"
          >
            {mounted && theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
