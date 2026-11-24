"use client";

import React, { useState } from "react";
import {
  Search,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Terminal,
  Globe,
  Radio,
  FileCode,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";

interface OperatorItem {
  operator: string;
  description: string;
  example: string;
  testUrl?: (query: string) => string;
}

interface DorkPreset {
  title: string;
  description: string;
  category: string;
  template: (domain: string) => string;
  platform: "google" | "github" | "shodan" | "bing";
  getTestUrl: (dork: string) => string;
}

const GOOGLE_OPERATORS: OperatorItem[] = [
  {
    operator: "site:",
    description: "Restringe la búsqueda a un dominio específico o extensión geográfica/institucional.",
    example: "site:gob.es filetype:pdf",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "filetype: / ext:",
    description: "Filtra por extensión o formato de archivo (pdf, xlsx, env, sql, docx, kml).",
    example: "site:target.com filetype:xlsx OR filetype:pdf",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "inurl:",
    description: "Exige que la palabra o término aparezca en la ruta de la dirección URL.",
    example: "site:target.com inurl:admin OR inurl:login",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "intitle:",
    description: "Filtra páginas cuyo título HTML contenga las palabras clave indicadas.",
    example: 'site:target.com intitle:"index of /"',
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "intext:",
    description: "Busca estrictamente dentro del texto del cuerpo de la página web.",
    example: 'site:target.com intext:"confidencial" OR intext:"no difundir"',
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "cache:",
    description: "Muestra la última instantánea indexada y almacenada en los servidores de Google.",
    example: "cache:target.com/contacto",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "after: / before:",
    description: "Acota los resultados a páginas indexadas o modificadas dentro de un rango temporal (YYYY-MM-DD).",
    example: "site:elpais.com after:2024-01-01 before:2024-12-31",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "AROUND(n)",
    description: "Operador de proximidad: localiza dos términos separados por un máximo de n palabras.",
    example: '"Contrato" AROUND(4) "presupuesto"',
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "- (exclusión)",
    description: "Excluye términos, subdominios o palabras indeseadas de los resultados.",
    example: "site:target.com -www -blog",
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: '"" (literal)',
    description: "Coincidencia exacta obligatoria respetando el orden exacto de las palabras.",
    example: '"declaración responsable de obras"',
    testUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
];

const GITHUB_OPERATORS: OperatorItem[] = [
  {
    operator: "filename:",
    description: "Busca ficheros cuyo nombre coincida exactamente con el patrón indicado.",
    example: "filename:.env DB_PASSWORD",
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
  {
    operator: "path:",
    description: "Limita la búsqueda a directorios o carpetas concretas del árbol del repositorio.",
    example: 'path:config/ "apiKey"',
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
  {
    operator: "extension:",
    description: "Filtra archivos de código fuente por su extensión técnica (sql, pem, env, key, json).",
    example: 'extension:sql "INSERT INTO" "password"',
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
  {
    operator: "language:",
    description: "Restringe el lenguaje de programación detectado (python, bash, javascript, php).",
    example: 'language:python "os.environ.get"',
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
  {
    operator: "org: / user:",
    description: "Acota la búsqueda a repositorios de una organización o cuenta de usuario específica.",
    example: 'org:target-org "BEGIN PRIVATE KEY"',
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
  {
    operator: "fork:only",
    description: "Busca en forks de repositorios, donde frecuentemente persisten commits o secretos eliminados.",
    example: 'fork:only "target_api_secret"',
    testUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
];

const SHODAN_OPERATORS: OperatorItem[] = [
  {
    operator: "port:",
    description: "Filtra dispositivos o servidores con un puerto TCP o UDP abierto en escucha.",
    example: 'port:21 "vsftpd 2.3.4"',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "country:",
    description: "Código de país ISO de 2 letras según la ubicación geográfica de la IP.",
    example: 'country:ES "Apache/2.4"',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "city:",
    description: "Limita el ámbito de búsqueda a una ciudad o municipio concreto.",
    example: 'city:"Madrid" port:8080',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "org:",
    description: "Filtra por la empresa, entidad o proveedor de red (ISP) asignado al bloque de IPs.",
    example: 'org:"Telefonica de Espana"',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "http.title:",
    description: "Busca coincidencias en la etiqueta <title> devuelta por servidores web expuestos.",
    example: 'http.title:"Dashboard" port:8080',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "ssl:",
    description: "Busca dominios (SAN), certificados emitidos o huellas en el certificado TLS.",
    example: 'ssl:"target.com" 200',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
  {
    operator: "product:",
    description: "Nombre del servicio o software reconocido en el banner de respuesta.",
    example: 'product:"OpenSSH" -port:22',
    testUrl: (q) => `https://www.shodan.io/search?query=${encodeURIComponent(q)}`,
  },
];

const BING_OPERATORS: OperatorItem[] = [
  {
    operator: "filetype:",
    description: "Filtra por tipo de archivo al igual que en Google.",
    example: "site:target.com filetype:pdf",
    testUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "contains:",
    description: "Localiza páginas que contienen enlaces directos hacia un tipo de archivo determinado.",
    example: "site:target.com contains:pdf",
    testUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "ip:",
    description: "Encuentra otros sitios web y dominios alojados en la misma dirección IP.",
    example: "ip:192.0.2.1",
    testUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "instreamset:",
    description: "Combina búsquedas en títulos o cuerpo de texto con mayor control booleano.",
    example: 'instreamset:(title text):"OSINT"',
    testUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    operator: "feed:",
    description: "Localiza canales de sindicación RSS o feeds XML asociados al dominio.",
    example: "site:target.com feed:rss",
    testUrl: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}`,
  },
];

const PRESET_DORKS: DorkPreset[] = [
  {
    title: "Documentos Ofimáticos y PDFs",
    description: "Encuentra informes, balances, actas y memorias expuestas públicamente.",
    category: "Documentos",
    platform: "google",
    template: (d) => `site:${d} (filetype:pdf OR filetype:xlsx OR filetype:docx OR filetype:pptx) "confidencial" OR "interno"`,
    getTestUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    title: "Ficheros de Configuración y Respaldos",
    description: "Archivos .env, volcados SQL, ficheros de registro .log o backups olvidados.",
    category: "Ciberseguridad",
    platform: "google",
    template: (d) => `site:${d} (ext:env OR ext:sql OR ext:bak OR ext:log OR ext:key OR ext:ini)`,
    getTestUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    title: "Paneles de Administración y Accesos",
    description: "Localiza portales de login, consolas de administración o pasarelas de acceso.",
    category: "Infraestructura",
    platform: "google",
    template: (d) => `site:${d} (inurl:admin OR inurl:login OR inurl:cpanel OR inurl:dashboard OR inurl:portal)`,
    getTestUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    title: "Directorios Abiertos (Index of /)",
    description: "Carpetas de servidor web sin página de inicio con listado de archivos navegable.",
    category: "Directorios",
    platform: "google",
    template: (d) => `site:${d} intitle:"index of /" ("parent directory" OR "size" OR "last modified")`,
    getTestUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    title: "Descubrimiento de Subdominios",
    description: "Muestra subdominios indexados excluyendo la página principal 'www'.",
    category: "Reconocimiento",
    platform: "google",
    template: (d) => `site:*.${d} -www.${d}`,
    getTestUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`,
  },
  {
    title: "Secretos y Credenciales en GitHub",
    description: "Rastrea claves API, tokens o variables de entorno asociadas a la empresa en código público.",
    category: "Código",
    platform: "github",
    template: (d) => `"${d}" (filename:.env OR filename:config.json) ("api_key" OR "secret" OR "password")`,
    getTestUrl: (q) => `https://github.com/search?type=code&q=${encodeURIComponent(q)}`,
  },
];

export function DorkingCheatsheet() {
  const [activeTab, setActiveTab] = useState<"google" | "github" | "shodan" | "bing">("google");
  const [targetDomain, setTargetDomain] = useState("ejemplo.com");
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const getOperators = () => {
    switch (activeTab) {
      case "google":
        return GOOGLE_OPERATORS;
      case "github":
        return GITHUB_OPERATORS;
      case "shodan":
        return SHODAN_OPERATORS;
      case "bing":
        return BING_OPERATORS;
    }
  };

  return (
    <div className="space-y-6">
      {/* Interactive Domain Replacer Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-guacamole-card to-guacamole-base border border-guacamole-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-guacamole-green mb-1">
            <Sparkles className="w-4 h-4 text-guacamole-green" />
            <span>Generador de Dorks en Vivo</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300">
            Escribe el dominio objetivo para personalizar al instante todas las consultas de investigación:
          </p>
        </div>

        <div className="flex items-center gap-2 bg-guacamole-input border border-guacamole-border rounded-xl px-3 py-2 w-full md:w-80 shadow-inner">
          <Globe className="w-4 h-4 text-guacamole-green shrink-0" />
          <input
            type="text"
            value={targetDomain}
            onChange={(e) => setTargetDomain(e.target.value.trim() || "ejemplo.com")}
            placeholder="ejemplo.com"
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-gray-500 outline-none font-mono"
          />
        </div>
      </div>

      {/* Preset Dorks Grid */}
      <div>
        <div className="flex items-center justify-between px-1 mb-3">
          <h3 className="text-sm font-bold text-gray-100 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-guacamole-turquoise" />
            <span>Consultas Dorking Frecuentes y Listas para Usar</span>
          </h3>
          <span className="text-[11px] text-gray-400 font-mono">Objetivo: {targetDomain}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {PRESET_DORKS.map((preset, idx) => {
            const query = preset.template(targetDomain);
            const isCopied = copiedText === query;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-guacamole-card border border-guacamole-border hover:border-guacamole-turquoise/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-guacamole-turquoise font-mono">
                      {preset.category}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-guacamole-input text-gray-400 font-mono uppercase">
                      {preset.platform}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-100 mb-1">{preset.title}</h4>
                  <p className="text-[11px] text-gray-400 leading-snug mb-3">{preset.description}</p>
                </div>

                <div className="space-y-2">
                  <div className="p-2 rounded bg-guacamole-input text-[11px] font-mono text-gray-300 break-all border border-guacamole-border/70 select-all">
                    {query}
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => copyToClipboard(query)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-guacamole-input hover:bg-guacamole-base border border-guacamole-border text-[11px] text-gray-200 hover:text-white transition-colors"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-guacamole-green" />
                          <span className="text-guacamole-green font-medium">¡Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-gray-400" />
                          <span>Copiar dork</span>
                        </>
                      )}
                    </button>

                    <a
                      href={preset.getTestUrl(query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-lg bg-guacamole-turquoise/10 hover:bg-guacamole-turquoise/20 text-guacamole-turquoise border border-guacamole-turquoise/30 text-[11px] font-medium transition-colors"
                      title="Probar consulta en una nueva pestaña"
                    >
                      <span>Lanzar</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Operators Reference Table by Platform */}
      <div className="bg-guacamole-card border border-guacamole-border rounded-2xl p-4 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-guacamole-border">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-guacamole-green" />
              <span>Diccionario de Operadores de Búsqueda Avanzada</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Sintaxis técnica para acotar y forzar consultas profundas en los principales motores y plataformas.
            </p>
          </div>

          {/* Platform Tab Switcher */}
          <div className="flex items-center gap-1 p-1 bg-guacamole-input border border-guacamole-border rounded-xl self-start">
            <button
              onClick={() => setActiveTab("google")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "google"
                  ? "bg-guacamole-card text-guacamole-green shadow-sm border border-guacamole-border"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Google</span>
            </button>
            <button
              onClick={() => setActiveTab("github")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "github"
                  ? "bg-guacamole-card text-guacamole-turquoise shadow-sm border border-guacamole-border"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </button>
            <button
              onClick={() => setActiveTab("shodan")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "shodan"
                  ? "bg-guacamole-card text-amber-400 shadow-sm border border-guacamole-border"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>Shodan</span>
            </button>
            <button
              onClick={() => setActiveTab("bing")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "bing"
                  ? "bg-guacamole-card text-blue-400 shadow-sm border border-guacamole-border"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Bing</span>
            </button>
          </div>
        </div>

        {/* Operators List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getOperators().map((op, idx) => {
            const isCopied = copiedText === op.example;
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-guacamole-deep/70 border border-guacamole-border flex flex-col justify-between text-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <code className="text-xs font-mono font-bold text-guacamole-green bg-guacamole-input px-2 py-0.5 rounded border border-guacamole-border">
                      {op.operator}
                    </code>
                    {op.testUrl && (
                      <a
                        href={op.testUrl(op.example)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-gray-400 hover:text-guacamole-turquoise flex items-center gap-1"
                      >
                        <span>Probar</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed mb-2.5">{op.description}</p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-guacamole-border/50 bg-guacamole-input/40 px-2 py-1.5 rounded-lg">
                  <span className="font-mono text-[11px] text-gray-300 truncate select-all">{op.example}</span>
                  <button
                    onClick={() => copyToClipboard(op.example)}
                    className="p-1 text-gray-400 hover:text-white shrink-0"
                    title="Copiar ejemplo"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-guacamole-green" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
