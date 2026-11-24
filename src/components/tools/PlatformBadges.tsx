import React from "react";
import {
  PlatformType,
  PLATFORM_LABELS,
  PLATFORM_BADGE_CLASSES,
  getToolPlatforms,
} from "@/types/osint";
import { Globe, Terminal, Monitor, Smartphone, Puzzle, Code2 } from "lucide-react";

const PLATFORM_ICONS: Record<PlatformType, React.ComponentType<{ className?: string }>> = {
  web: Globe,
  cli: Terminal,
  desktop: Monitor,
  mobile: Smartphone,
  "browser-extension": Puzzle,
  api: Code2,
};

interface PlatformBadgesProps {
  type: PlatformType;
  platforms?: PlatformType[];
  includeApi?: boolean;
  size?: "sm" | "md";
}

/**
 * Renders badges for a tool's supported platforms (web, desktop, mobile, CLI, extension, API).
 */
export function PlatformBadges({
  type,
  platforms,
  includeApi = true,
  size = "sm",
}: PlatformBadgesProps) {
  const allPlatforms = getToolPlatforms(type, platforms);
  const visiblePlatforms = includeApi
    ? allPlatforms
    : allPlatforms.filter((p) => p === type || p !== "api");

  const sizeClasses =
    size === "md"
      ? "text-xs px-2 py-1 gap-1.5"
      : "text-[10px] px-1.5 py-0.5 gap-1";
  const iconClass = size === "md" ? "w-3.5 h-3.5" : "w-3 h-3";

  return (
    <>
      {visiblePlatforms.map((platform) => {
        const Icon = PLATFORM_ICONS[platform];
        return (
          <span
            key={platform}
            className={`inline-flex items-center font-medium rounded ${sizeClasses} ${PLATFORM_BADGE_CLASSES[platform]}`}
          >
            <Icon className={iconClass} />
            <span>{PLATFORM_LABELS[platform]}</span>
          </span>
        );
      })}
    </>
  );
}
