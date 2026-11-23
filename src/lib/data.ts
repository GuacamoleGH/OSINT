import categoriesData from "@/data/categories.json";
import investigateByData from "@/data/investigate-by.json";
import resourcesData from "@/data/resources.json";
import challengesData from "@/data/challenges.json";

import generalTools from "@/data/tools/general.json";
import searchTools from "@/data/tools/search.json";
import geointTools from "@/data/tools/geoint.json";
import imintTools from "@/data/tools/imint.json";
import satelliteTools from "@/data/tools/satellite.json";
import chronolocationTools from "@/data/tools/chronolocation.json";
import socmintTools from "@/data/tools/socmint.json";
import webintTools from "@/data/tools/webint.json";
import sigintTools from "@/data/tools/sigint.json";
import cyberTools from "@/data/tools/cyber.json";
import publicRecordsTools from "@/data/tools/public-records.json";
import transportTools from "@/data/tools/transport.json";

import {
  ToolItem,
  ToolItemSchema,
  CategoryMeta,
  InvestigateByMeta,
  GuideResource,
  ChallengeItem,
  CategoryId,
  InvestigateById,
} from "@/types/osint";

// Aggregate and deduplicate all tools by tool ID
const rawToolLists = [
  ...generalTools,
  ...searchTools,
  ...geointTools,
  ...imintTools,
  ...satelliteTools,
  ...chronolocationTools,
  ...socmintTools,
  ...webintTools,
  ...sigintTools,
  ...cyberTools,
  ...publicRecordsTools,
  ...transportTools,
];

const toolMap = new Map<string, ToolItem>();

for (const raw of rawToolLists) {
  const parsed = ToolItemSchema.parse(raw);
  if (!toolMap.has(parsed.id)) {
    toolMap.set(parsed.id, parsed as ToolItem);
  }
}

const allToolsList: ToolItem[] = Array.from(toolMap.values());

export function getAllTools(): ToolItem[] {
  return allToolsList;
}

export function getToolBySlug(slug: string): ToolItem | undefined {
  return allToolsList.find((t) => t.slug === slug);
}

export function getToolById(id: string): ToolItem | undefined {
  return toolMap.get(id);
}

export function getAllCategories(): CategoryMeta[] {
  return categoriesData as CategoryMeta[];
}

export function getCategoryById(id: string): CategoryMeta | undefined {
  return (categoriesData as CategoryMeta[]).find((c) => c.id === id);
}

export function getAllInvestigateBy(): InvestigateByMeta[] {
  return investigateByData as InvestigateByMeta[];
}

export function getInvestigateById(id: string): InvestigateByMeta | undefined {
  return (investigateByData as InvestigateByMeta[]).find((i) => i.id === id);
}

export function getToolsByCategory(categoryId: CategoryId): ToolItem[] {
  return allToolsList.filter((t) => t.categories.includes(categoryId));
}

export function getToolsByInvestigateBy(investigateId: InvestigateById): ToolItem[] {
  return allToolsList.filter((t) => t.investigateBy && t.investigateBy.includes(investigateId));
}

export function getFeaturedTools(): ToolItem[] {
  return allToolsList.filter((t) => t.featured);
}

export function getCategoryToolCounts(): Record<CategoryId, number> {
  const counts: Partial<Record<CategoryId, number>> = {};
  for (const cat of categoriesData as CategoryMeta[]) {
    counts[cat.id] = allToolsList.filter((t) => t.categories.includes(cat.id)).length;
  }
  return counts as Record<CategoryId, number>;
}

export function getInvestigateByToolCounts(): Record<InvestigateById, number> {
  const counts: Partial<Record<InvestigateById, number>> = {};
  for (const inv of investigateByData as InvestigateByMeta[]) {
    counts[inv.id] = allToolsList.filter((t) => t.investigateBy && t.investigateBy.includes(inv.id)).length;
  }
  return counts as Record<InvestigateById, number>;
}

export function getAllGuides(): GuideResource[] {
  return resourcesData as GuideResource[];
}

export function getAllChallenges(): ChallengeItem[] {
  return challengesData as ChallengeItem[];
}

export function getGlobalStats() {
  const spainCount = allToolsList.filter((t) => t.geographicScope.includes("spain")).length;
  const europeCount = allToolsList.filter((t) => t.geographicScope.includes("europe")).length;
  const globalCount = allToolsList.filter((t) => t.geographicScope.includes("global")).length;
  const freeCount = allToolsList.filter((t) => t.pricing === "free").length;
  const freemiumCount = allToolsList.filter((t) => t.pricing === "freemium").length;

  return {
    totalTools: allToolsList.length,
    totalCategories: categoriesData.length,
    totalInvestigateBy: investigateByData.length,
    spainCount,
    europeCount,
    globalCount,
    freeCount,
    freemiumCount,
  };
}
