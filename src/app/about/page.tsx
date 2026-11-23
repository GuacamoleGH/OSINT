import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Lock, Server, Cpu, Globe, HeartHandshake } from "lucide-react";

export const metadata: Metadata = {
  title: "Acerca de — OSINT Hub",
  description: "Propósito, arquitectura, principios éticos y ecosistema GuacamoleGH.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-green font-medium mb-3">
          <Server className="w-3.5 h-3.5" />
          <span>Ecosistema GuacamoleGH</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Acerca de OSINT Hub</h1>
        <p className="text-sm text-gray-400 mt-1 leading-relaxed">
          Portal personal autohospedado concebido para centralizar y organizar herramientas, fuentes públicas, metodologías y ejercicios prácticos de inteligencia de fuentes abiertas (OSINT).
        </p>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-green w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Uso Responsable y Legalidad</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            OSINT Hub es exclusivamente un directorio curado de recursos públicos. No ejecuta consultas automatizadas contra terceros desde el servidor, no almacena términos de búsqueda de usuarios ni recopila datos personales.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-turquoise w-fit">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Privacidad y Protección de Datos</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Se excluyen expresamente servicios que faciliten doxxing, acoso, geolocalización invasiva de particulares o vulneración de controles de privacidad. Los recursos para vehículos y registros oficiales priorizan datos técnicos y societarios legítimos.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-amber-400 w-fit">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Prioridad España y Europa</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            A diferencia de los catálogos genéricos anglosajones, OSINT Hub destaca fuentes oficiales de España (IGN, Catastro, BOE, DGT, CNMV, Contratación del Estado) e iniciativas de la Unión Europea (Copernicus, EURES, data.europa.eu).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-blue-400 w-fit">
            <Cpu className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Arquitectura Técnica</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Desarrollado con Next.js 14 App Router, TypeScript y Tailwind CSS. Utiliza Fuse.js en el cliente para búsqueda aproximada y LocalStorage para favoritos y seguimiento de retos sin dependencias de bases de datos externas.
          </p>
        </div>
      </div>

      {/* Network & Infrastructure box */}
      <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-4">
        <h2 className="text-base font-bold text-gray-100">Infraestructura y Despliegue</h2>
        <div className="font-mono text-xs text-gray-300 bg-guacamole-input p-4 rounded-lg border border-guacamole-border space-y-1">
          <div>Entorno: Producción homelab GuacamoleGH</div>
          <div>Stack path: /opt/stacks/osint-hub/</div>
          <div>Contenedor: osint-hub (puerto local 127.0.0.1:3080)</div>
          <div>Enrutamiento seguro: Cloudflare Tunnel &rarr; osint.guacamolegh.es</div>
        </div>
      </div>
    </div>
  );
}
