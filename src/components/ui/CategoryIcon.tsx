import React from "react";
import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";

interface CategoryIconProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  // @ts-expect-error dynamic index
  const IconComponent = (Icons[name] || Icons.HelpCircle) as React.ComponentType<LucideProps>;
  return <IconComponent {...props} />;
}
