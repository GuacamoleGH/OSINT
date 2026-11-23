import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllInvestigateBy,
  getInvestigateById,
  getToolsByInvestigateBy,
  getAllCategories,
} from "@/lib/data";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import { InvestigateById } from "@/types/osint";

interface InvestigateByPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const list = getAllInvestigateBy();
  return list.map((i) => ({ slug: i.id }));
}

export function generateMetadata({ params }: InvestigateByPageProps): Metadata {
  const inv = getInvestigateById(params.slug as InvestigateById);
  if (!inv) {
    return { title: "Objetivo no encontrado — OSINT Hub" };
  }
  return {
    title: `Investigar por ${inv.name} — OSINT Hub`,
    description: inv.description,
  };
}

export default function InvestigateByPage({ params }: InvestigateByPageProps) {
  const inv = getInvestigateById(params.slug as InvestigateById);
  if (!inv) {
    notFound();
  }

  const tools = getToolsByInvestigateBy(inv.id);
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();

  return (
    <ToolsDirectory
      initialTools={tools}
      categories={categories}
      investigateByList={investigateByList}
      initialInvestigateBy={inv.id}
      title={`Investigar por: ${inv.name}`}
      subtitle={inv.description}
    />
  );
}
