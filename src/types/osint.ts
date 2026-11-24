import { z } from "zod";

export const CategoryIdSchema = z.enum([
  "general",
  "search",
  "geoint",
  "imint",
  "satellite",
  "chronolocation",
  "socmint",
  "webint",
  "sigint",
  "cyber",
  "public-records",
  "transport",
]);
export type CategoryId = z.infer<typeof CategoryIdSchema>;

export const InvestigateByIdSchema = z.enum([
  "social-media",
  "gaming",
  "github-dev",
  "username",
  "people-professional",
  "email",
  "phone",
  "vehicle",
  "jobs-careers",
  "domain-ip",
  "companies",
  "location",
  "fraud-scams",
  "classifieds",
]);
export type InvestigateById = z.infer<typeof InvestigateByIdSchema>;

export const PricingTypeSchema = z.enum(["free", "freemium", "paid", "unknown"]);
export type PricingType = z.infer<typeof PricingTypeSchema>;

export const PRICING_LABELS: Record<PricingType, string> = {
  free: "Gratis",
  freemium: "Freemium",
  paid: "De pago",
  unknown: "Desconocido",
};

export const PRICING_BADGE_CLASSES: Record<PricingType, string> = {
  free: "bg-emerald-950/60 text-emerald-400 border border-emerald-800/60",
  freemium: "bg-amber-950/60 text-amber-400 border border-amber-800/60",
  paid: "bg-rose-950/60 text-rose-400 border border-rose-800/60",
  unknown: "bg-gray-800/60 text-gray-400 border border-gray-700/60",
};

export const VerificationChecklistSchema = z.object({
  linkChecked: z.boolean().default(false),
  infoChecked: z.boolean().default(false),
  functionalityChecked: z.boolean().default(false),
  pricingChecked: z.boolean().default(false),
});
export type VerificationChecklist = z.infer<typeof VerificationChecklistSchema>;

export const GeographicScopeSchema = z.enum(["spain", "europe", "global"]);
export type GeographicScope = z.infer<typeof GeographicScopeSchema>;

export const DifficultyLevelSchema = z.enum(["beginner", "intermediate", "advanced"]);
export type DifficultyLevel = z.infer<typeof DifficultyLevelSchema>;

export const PlatformTypeSchema = z.enum(["web", "cli", "desktop", "browser-extension", "mobile", "api"]);
export type PlatformType = z.infer<typeof PlatformTypeSchema>;

export const ToolItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().default(""),
  url: z.string().url(),
  categories: z.array(CategoryIdSchema).min(1),
  investigateBy: z.array(InvestigateByIdSchema).default([]),
  subcategories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  synonyms: z.array(z.string()).default([]),
  type: PlatformTypeSchema.default("web"),
  pricing: PricingTypeSchema.default("free"),
  pricingDetails: z.string().default(""),
  access: z.string().default("public"),
  geographicScope: z.array(GeographicScopeSchema).default(["global"]),
  platforms: z.array(PlatformTypeSchema).default(["web"]),
  difficulty: DifficultyLevelSchema.default("beginner"),
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  verification: VerificationChecklistSchema.default({
    linkChecked: false,
    infoChecked: false,
    functionalityChecked: false,
    pricingChecked: false,
  }),
  verificationNotes: z.string().default(""),
  registrationRequired: z.boolean().default(false),
  apiKeyRequired: z.boolean().default(false),
  limitations: z.array(z.string()).default([]),
  useCases: z.array(z.string()).default([]),
  instructions: z.string().default(""),
  lastReviewed: z.string().nullable().default(null),
  status: z.enum(["active", "deprecated", "restricted"]).default("active"),
});
export type ToolItem = z.infer<typeof ToolItemSchema>;

export interface CategoryMeta {
  id: CategoryId;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  order: number;
}

export interface InvestigateByMeta {
  id: InvestigateById;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  platforms?: string[];
  tips?: string[];
  order: number;
}

export interface GuideResource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
  scope: GeographicScope;
  author?: string;
  type: "doc" | "toolkit" | "guide" | "tutorial";
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: DifficultyLevel;
  url: string;
  provider: string;
  pricing: PricingType;
  pricingDetails?: string;
  tags?: string[];
  registrationRequired?: boolean;
}
