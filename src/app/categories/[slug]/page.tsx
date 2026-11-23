import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategoryById,
  getAllTools,
  getToolsByCategory,
  getAllInvestigateBy,
} from "@/lib/data";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import { CategoryId } from "@/types/osint";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({ slug: c.id }));
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const category = getCategoryById(params.slug as CategoryId);
  if (!category) {
    return { title: "Categoría no encontrada — OSINT Hub" };
  }
  return {
    title: `${category.name} — OSINT Hub`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.slug as CategoryId);
  if (!category) {
    notFound();
  }

  const categoryTools = getToolsByCategory(category.id);
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();

  return (
    <ToolsDirectory
      initialTools={categoryTools}
      categories={categories}
      investigateByList={investigateByList}
      initialCategory={category.id}
      title={`${category.name}`}
      subtitle={category.description}
    />
  );
}
