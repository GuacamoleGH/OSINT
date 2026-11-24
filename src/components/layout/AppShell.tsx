"use client";

import React, { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { SearchDialog } from "@/components/search/SearchDialog";
import { ToolItem } from "@/types/osint";

interface AppShellProps {
  children: React.ReactNode;
  allTools: ToolItem[];
  investigateCounts?: Record<string, number>;
}

export function AppShell({ children, allTools, investigateCounts = {} }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleOpenSearch = () => setSearchOpen(true);
    window.addEventListener("open-search", handleOpenSearch);
    return () => window.removeEventListener("open-search", handleOpenSearch);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      // Check for '/' when not focused on an input/textarea
      if (
        e.key === "/" &&
        !searchOpen &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  return (
    <div className="min-h-screen bg-guacamole-deep text-gray-100 flex flex-col selection:bg-guacamole-green/20 selection:text-guacamole-green">
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
      />

      <div className="flex-1 flex w-full">
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          investigateCounts={investigateCounts}
          totalTools={allTools.length}
        />

        <main className="flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-8 w-full">
          {children}
        </main>
      </div>

      {/* Global Search Dialog */}
      <SearchDialog
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        tools={allTools}
      />
    </div>
  );
}
