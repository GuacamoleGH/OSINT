import React from "react";
import { Metadata } from "next";
import { ShieldCheck, Scale, Server, Globe, AlertOctagon, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Acerca de y Marco Legal — OSINT Hub",
  description: "Propósito, arquitectura, herramientas de doble uso, aviso legal (RGPD / LOPDGDD) y principios éticos.",
};

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-guacamole-card border border-guacamole-border text-xs text-guacamole-green font-medium mb-3">
          <Server className="w-3.5 h-3.5" />
          <span>Ecosistema GuacamoleGH</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Acerca de OSINT Hub & Marco Legal</h1>
        <p className="text-sm text-gray-300 mt-1 leading-relaxed">
          Directorio personal y curado para centralizar herramientas, fuentes públicas oficiales, metodologías y ejercicios de práctica de inteligencia de fuentes abiertas (OSINT).
        </p>
      </div>

      {/* Legal & Compliance Notice Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-950/20 border border-amber-800/60 shadow-card space-y-3">
        <div className="flex items-center gap-2.5 text-amber-300">
          <AlertOctagon className="w-5 h-5 text-amber-400 shrink-0" />
          <h2 className="text-sm sm:text-base font-bold">Aviso Legal, RGPD y LOPDGDD (España / UE)</h2>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Las herramientas y fuentes catalogadas en este portal son de <strong>acceso público o software de código abierto</strong>, pero muchas de ellas son de <strong>doble uso (dual-use)</strong>. En el ordenamiento jurídico español y de la Unión Europea, cualquier recopilación o tratamiento de datos personales vinculados a personas físicas identificadas o identificables está sujeto al <strong>Reglamento General de Protección de Datos (RGPD / GDPR UE 2016/679)</strong> y a la <strong>Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD)</strong>.
        </p>
        <div className="p-3.5 rounded-xl bg-guacamole-base/80 border border-amber-800/40 text-xs text-amber-200/90 space-y-1.5">
          <p className="font-semibold text-amber-300">Responsabilidad del Usuario:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            <li>El uso de selectores personales (teléfonos, matrículas, nombres de usuario, correos electrónicos o identidades) debe contar con una base jurídica habilitante (consentimiento, interés legítimo fundamentado, ejercicio de funciones jurisdiccionales o auditoría de seguridad sobre activos propios).</li>
            <li>Queda terminantemente desaconsejado y advertido el uso de estas herramientas para prácticas ilícitas, hostigamiento, vigilancia invasiva sin consentimiento o difusión no consentida de información privada (<em>doxxing</em>).</li>
            <li>OSINT Hub no realiza consultas intermediadas, no almacena datos de investigaciones ni monitoriza objetivos: es una biblioteca referencial pasiva.</li>
          </ul>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-green w-fit">
            <Scale className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Herramientas de Doble Uso</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Plataformas como Sherlock, Maigret, Blackbird, informes de vehículos por matrícula (DGT) o monitorización de canales de mensajería son esenciales en investigaciones forenses, peritajes judiciales, periodismo contrastado y ciberseguridad defensiva. Su inclusión en el catálogo responde a este fin legítimo y formativo.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-guacamole-turquoise w-fit">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Portal Estrictamente Pasivo</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Este servicio no dispone de base de datos de usuarios ni almacena términos de búsqueda en el servidor. Todas las operaciones reactivas de filtrado y búsqueda difusa (Fuse.js) y persistencia de favoritos se realizan localmente en el navegador del usuario (LocalStorage).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-blue-400 w-fit">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Prioridad España y Unión Europea</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Frente a catálogos anglocéntricos, OSINT Hub integra registros mercantiles, portales catastrales, teledetección comunitaria (Copernicus) y fuentes oficiales españolas (BOE, BORME, Catastro, DGT, CNMV, Plataforma de Contratación del Estado).
          </p>
        </div>

        <div className="p-6 rounded-xl bg-guacamole-card border border-guacamole-border space-y-3">
          <div className="p-2.5 rounded-lg bg-guacamole-input text-purple-400 w-fit">
            <FileCheck className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-gray-100">Verificación Periódica de Enlaces</h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Cada recurso cuenta con tipado estricto (Zod) y fecha de última verificación (<code className="font-mono text-gray-200">lastReviewed</code>). Además, un workflow automatizado audita periódicamente la disponibilidad de los enlaces para prevenir enlaces rotos.
          </p>
        </div>
      </div>
    </div>
  );
}
