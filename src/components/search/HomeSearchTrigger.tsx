"use client";

import React from "react";
import { Search } from "lucide-react";

export function HomeSearchTrigger() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-search"));
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center w-full px-4 py-2.5 text-sm text-gray-400 bg-guacamole-input/90 hover:bg-guacamole-input border border-guacamole-border hover:border-guacamole-green/50 rounded-xl transition-all shadow-sm group text-left cursor-pointer"
    >
      <div className="flex items-center gap-2.5">
        <Search className="w-4 h-4 text-guacamole-green" />
        <span className="text-xs sm:text-sm group-hover:text-gray-200 transition-colors">
          Buscar herramientas, selectores, técnicas...
        </span>
      </div>
    </button>
  );
}
