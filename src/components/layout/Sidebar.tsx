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
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "All Tools", href: "/tools", icon: Wrench, count: totalTools },
    { label: "Categories", href: "/categories", icon: Layers, count: 12 },
    { label: "Favorites", href: "/favorites", icon: Heart, count: favorites.length },
    { label: "Recently Used", href: "/recent", icon: History },
  ];

  const investigateLinks = [
    { label: "Social Media", href: "/investigate-by/social-media", icon: Share2, id: "social-media" },
    { label: "Gaming", href: "/investigate-by/gaming", icon: Gamepad2, id: "gaming" },
    { label: "GitHub & Developer", href: "/investigate-by/github-dev", icon: GitBranch, id: "github-dev" },
    { label: "Username", href: "/investigate-by/username", icon: AtSign, id: "username" },
    { label: "People & Professional", href: "/investigate-by/people-professional", icon: UserCheck, id: "people-professional" },
    { label: "Email", href: "/investigate-by/email", icon: Mail, id: "email" },
    { label: "Phone", href: "/investigate-by/phone", icon: Phone, id: "phone" },
    { label: "Vehicle", href: "/investigate-by/vehicle", icon: Car, id: "vehicle" },
    { label: "Jobs & Careers", href: "/investigate-by/jobs-careers", icon: Briefcase, id: "jobs-careers" },
    { label: "Domain & IP", href: "/investigate-by/domain-ip", icon: Network, id: "domain-ip" },
    { label: "Companies", href: "/investigate-by/companies", icon: Building, id: "companies" },
    { label: "Location", href: "/investigate-by/location", icon: MapPin, id: "location" },
  ];

  const learnLinks = [
    { label: "Guides & Resources", href: "/guides", icon: BookOpen },
    { label: "Challenges", href: "/challenges", icon: Target },
    { label: "About", href: "/about", icon: Info },
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
        <div className="flex md:hidden items-center justify-between p-4 border-b border-guacamole-border">
          <span className="font-bold text-gray-100 text-sm">Navegación</span>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 text-sm">
          {/* Section: Discover */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-guacamole-green">
              Discover
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
                      className={`flex items-center justify-between px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {typeof item.count === "number" && (
                        <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-guacamole-input text-gray-400 font-mono">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: Investigate By */}
          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-guacamole-turquoise">
                Investigate By
              </span>
              <Link
                href="/investigate-by"
                onClick={onClose}
                className="text-[10px] text-gray-400 hover:text-guacamole-turquoise"
              >
                Ver todos
              </Link>
            </div>
            <ul className="space-y-0.5">
              {investigateLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const count = investigateCounts[item.id] || 0;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-md text-xs transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-turquoise font-semibold border-l-2 border-guacamole-turquoise"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-guacamole-turquoise" : "text-gray-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {count > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-guacamole-input text-gray-400 font-mono shrink-0">
                          {count}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Section: Learn */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Learn
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
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-guacamole-card text-guacamole-green font-semibold border-l-2 border-guacamole-green"
                          : "text-gray-300 hover:bg-guacamole-card/60 hover:text-gray-100"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-guacamole-green" : "text-gray-400"}`} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t border-guacamole-border text-[11px] text-gray-400 flex items-center justify-between bg-guacamole-base/50">
          <span>v1.0.0 • Ecosistema GH</span>
          <span className="w-2 h-2 rounded-full bg-guacamole-green" title="Operacional" />
        </div>
      </aside>
    </>
  );
}
