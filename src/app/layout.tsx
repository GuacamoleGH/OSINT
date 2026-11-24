import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { getAllTools, getInvestigateByToolCounts } from "@/lib/data";

export const metadata: Metadata = {
  title: "OSINT Hub — Ecosistema GuacamoleGH",
  description:
    "Portal personal curado y autohospedado de inteligencia de fuentes abiertas (OSINT) del ecosistema GuacamoleGH.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const allTools = getAllTools();
  const investigateCounts = getInvestigateByToolCounts();

  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('guacamolegh_osint_theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased">
        <AppShell allTools={allTools} investigateCounts={investigateCounts}>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
