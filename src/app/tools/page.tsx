import React from "react";
import { Metadata } from "next";
import { getAllTools, getAllCategories, getAllInvestigateBy } from "@/lib/data";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";

export const metadata: Metadata = {
  title: "Todas las Herramientas — OSINT Hub",
  description: "Directorio completo y curado de recursos de inteligencia de fuentes abiertas.",
};

export default function ToolsPage() {
  const allTools = getAllTools();
  const categories = getAllCategories();
  const investigateByList = getAllInvestigateBy();

  return (
    <ToolsDirectory
      initialTools={allTools}
      categories={categories}
      investigateByList={investigateByList}
      title="Catálogo General de Herramientas"
      subtitle={`Filtra y explora las ${allTools.length} herramientas y fuentes OSINT seleccionadas del ecosistema.`}
    />
  );
}
