# 🥑 OSINT Hub — GuacamoleGH

<p align="center">
  <img src="public/logo.png" width="120" height="120" alt="OSINT Hub Logo" style="border-radius: 16px; box-shadow: 0 0 25px rgba(0, 245, 155, 0.25);" />
</p>

<p align="center">
  <strong>Portal personal, curado y autohospedado de inteligencia de fuentes abiertas (OSINT)</strong><br />
  Integrado visual y arquitecturalmente en el ecosistema <strong>GuacamoleGH</strong>.
</p>

<p align="center">
  <a href="https://github.com/GuacamoleGH/OSINT"><img src="https://img.shields.io/badge/versi%C3%B3n-1.0.0-00f59b?style=flat-square" alt="Versión"></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14.2.35-black?style=flat-square&logo=next.js" alt="Next.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=flat-square&logo=tailwind-css" alt="Tailwind CSS"></a>
  <a href="https://docker.com"><img src="https://img.shields.io/badge/Docker-Ready-2496ed?style=flat-square&logo=docker" alt="Docker"></a>
  <img src="https://img.shields.io/badge/puerto-192.168.0.18%3A3104-10b981?style=flat-square" alt="Puerto Local">
  <img src="https://img.shields.io/badge/licencia-MIT-00d9c4?style=flat-square" alt="Licencia">
</p>

---

## 🎯 Visión del Producto

**OSINT Hub** centraliza herramientas de investigación, buscadores especializados, bases de datos y registros públicos oficiales (con especial prioridad en **España** y la **Unión Europea**), metodologías, ejercicios prácticos y guías técnicas.

A diferencia de directorios genéricos o listas no filtradas, **OSINT Hub** implementa un modelo de datos estructurado en JSON con tipado estricto en Zod, validación previa de enlaces, ausencia de duplicados y un **doble eje de navegación** que permite comenzar una investigación desde dos perspectivas complementarias:
1. **Por Disciplina Técnica:** GEOINT, IMINT, SOCMINT, WEBINT, SIGINT, Cyber Intelligence, Chronolocation, Public Records o Transport Intelligence.
2. **Por Indicador Objetivo ("Investigate By"):** Comenzando directamente por el dato que se tiene entre manos (un nombre de usuario, un correo, un teléfono, una matrícula, una empresa, un perfil de videojuegos o una fotografía de un paisaje).

---

## ✨ Características Principales

### 🎨 Identidad Visual GuacamoleGH
- **Gama Carbón y Neón Tecnológico:** Fondo profundo `#0c0e12`, fondo base `#12151b`, tarjetas en `#181d26` con bordes sutiles y acentos en **Neón Esmeralda** (`#00f59b` / `#10b981`) y **Turquesa Digital** (`#00d9c4` / `#06b6d4`).
- **Modo Claro / Oscuro Conmutable:** Soporte completo y persistente para modo claro (`data-theme="light"`) y oscuro mediante botón de alternancia en la cabecera.
- **Reloj del Sistema en Vivo:** Widget superior con indicador pulsante en verde neón, hora local y fecha para registro de marcas temporales durante la investigación.
- **Doble Vista en el Directorio:** Selector dinámico de visualización en **Cuadrícula** (tarjetas informativas con etiquetas) o en **Lista** (filas compactas de alta densidad).

### 🔍 Buscador Global Inteligente (`Ctrl + K` / `/`)
- **Fuzzy Search con Fuse.js:** Búsqueda aproximada en el cliente con tolerancia a erratas en nombres, descripciones, etiquetas, subcategorías y ámbitos geográficos.
- **Diccionario Bilingüe de Sinónimos:** Resolución instantánea de términos cruzados en español e inglés:
  - `correo` ↔ `email`, `mail`
  - `matrícula` ↔ `vehicle`, `coche`, `dgt`
  - `teléfono` ↔ `phone`, `móvil`
  - `sol` / `sombras` ↔ `suncalc`, `azimut`, `hora`
  - `qr` / `código de barras` ↔ `zxing`, `barcode`, `bcbp`
  - `avión` / `vuelo` ↔ `flight`, `plane`, `ads-b`
  - `barco` / `marítimo` ↔ `vessel`, `ais`, `imo`
  - `montaña` / `horizonte` ↔ `peakvisor`, `heywhatsthat`, `relieve`
  - `geoguessing` ↔ `rainbolt`, `geoguessr`, `plonkit`, `geohints`

### 🧭 Las 12 Disciplinas OSINT Técnicas
| Disciplina | Icono | Enfoque Principal |
| :--- | :---: | :--- |
| **General OSINT** | 🧭 | Directorios estructurados, marcos de trabajo (OSINT Framework) y cajas de herramientas. |
| **Search Engines** | 🔍 | Búsqueda avanzada booleana, Google Dorks (GHDB), metabuscadores privados (SearXNG) y clustering semántico (Carrot2). |
| **GEOINT & Maps** | 📍 | Ortofotos oficiales de España (PNOA/Iberpix, Sede del Catastro), OpenStreetMap, Street View libre (Mapillary, KartaView), GIS (QGIS) y geolocalización visual (GeoHints, Plonk It, F4Map 3D, PeakVisor, HeyWhatsThat, Bellingcat OSM Search, Spot, Dual Maps). |
| **IMINT & Media** | 📷 | Búsqueda inversa visual (Google Lens, Yandex, TinEye), análisis forense digital (Forensically, FotoForensics, InVID-WeVerify UE), metadatos EXIF (ExifTool), decodificación de códigos QR/barras (ZXing) y metadatos de vídeo (YouTube Metadata). |
| **Satellite Intelligence** | 🛰️ | Teledetección orbital de la Unión Europea (Copernicus Data Space Browser, Sentinel Hub EO Browser), sensores térmicos e infrarrojos de la NASA (Worldview, FIRMS) y mosaicos de drones (OpenAerialMap). |
| **Chronolocation** | ⏱️ | Cálculo de trayectorias solares, azimut y proyección de sombras (SunCalc, Shadowmap, ShadowFinder Web, F4Map), meteorología histórica oficial (AEMET España, Ventusky) y husos horarios (Time and Date). |
| **SOCMINT** | 👥 | Rastreo pasivo de alias y perfiles (Sherlock, Maigret, Blackbird), monitorización comunitaria de canales públicos de Telegram (TGStat, Telemetr), videojuegos (SteamID.io, OSINT-Steam), métricas de audiencia (Social Blade) y tendencias en España (Trends24). |
| **WEBINT** | 🌐 | Archivos históricos inmutables de la web (Wayback Machine, Archive.today), transparencia de certificados SSL/TLS y subdominios (crt.sh), topología DNS (DNSDumpster), escaneo pasivo en sandbox (urlscan.io), minería de código (grep.app) y diagnóstico de correo (MXToolbox). |
| **SIGINT** | 📻 | Base de datos global de redes inalámbricas geolocalizadas (WiGLE), radio definida por software (RTL-SDR), redes mundiales de receptores de radio en vivo (WebSDR.org) y frecuencias públicas (RadioReference). |
| **Cyber Intelligence** | 🛡️ | Telemetría multivirus y DNS pasivo (VirusTotal), escaneo pasivo de puertos y servicios expuestos (Shodan, Censys), asignación de bloques IP y ASN europeos (RIPEstat), interconexión BGP (BGPView) y reputación de IPs (AbuseIPDB, Cisco Talos, Have I Been Pwned). |
| **Public Records** | 🏛️ | Fuentes oficiales del Estado en España (BOE y BORME, Plataforma de Contratación del Sector Público, Catastro, Datos.gob.es, CNMV, DGT Distintivo Ambiental, DGT Informe Reducido, InfoJobs), registros mercantiles europeos (Portal e-Justicia BRIS, data.europa.eu), registros mundiales de empresas (OpenCorporates, GLEIF), sanciones internacionales (OpenSanctions) y filtraciones periodísticas (ICIJ Offshore Leaks, OCCRP Aleph). |
| **Transport Intelligence** | ✈️ | Seguimiento aéreo ADS-B y militar sin censura (Flightradar24, ADS-B Exchange, OpenSky Network), monitorización marítima AIS (MarineTraffic, VesselFinder, Global Fishing Watch, Equasis UE) y decodificador de tarjetas de embarque IATA (Orca Scan BCBP Barcode Decoder). |

### 🎯 Las 12 Agrupaciones "Investigate By"
- **Social Media** • **Gaming** • **GitHub & Developer** • **Username** • **People & Professional** • **Email** • **Phone** • **Vehicle** • **Jobs & Careers** • **Domain & IP** • **Companies** • **Location**.

### 💾 Persistencia en LocalStorage (Zero Databases)
- **Favoritos (`/favorites`):** Marca cualquier herramienta con el icono de corazón para fijarla en tu colección personal accesible desde la cabecera.
- **Historial de Recientes (`/recent`):** Registro cronológico automático de las últimas fichas consultadas con botón de limpieza.
- **Retos Prácticos (`/challenges`):** Seguimiento de ejercicios prácticos reales (Bellingcat Challenges, OSINT Industries CTF, TryHackMe Searchlight, retos solares y mercantiles) con selector de estado (*Pendiente*, *En curso*, *Completado*) y cálculo porcentual de avance.

### 🛡️ Principios Éticos y de Privacidad
- El portal es estrictamente un **directorio y centro de operaciones pasivo**. No ejecuta escaneos invasivos ni ataques automatizados contra terceros desde el servidor.
- No almacena términos de búsqueda ni historial de navegación en bases de datos externas.
- Exclusión total de herramientas de doxxing, acoso o rastreo ilegal de particulares.

---

## 📁 Estructura del Repositorio

```text
OSINT/
├── Dockerfile                   # Construcción multi-stage de producción (node:20-alpine)
├── docker-compose.yml           # Orquestación con mapeo de puerto a 3104
├── .dockerignore
├── .gitignore
├── .eslintrc.json               # Configuración de ESLint para Next.js Core Web Vitals
├── .env.example
├── package.json
├── tailwind.config.ts           # Configuración de Tailwind con tokens de GuacamoleGH
├── tsconfig.json                # Configuración TypeScript estricta con alias @/*
├── next.config.mjs              # Configuración de Next.js (output: 'standalone')
├── public/
│   └── logo.png                 # Logotipo oficial del ecosistema
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Layout raíz con AppShell y metadatos de favicon
│   │   ├── page.tsx             # Dashboard principal con métricas, categorías y destacados
│   │   ├── globals.css          # Variables CSS personalizadas y estilos globales
│   │   ├── icon.png             # Icono de ruta automática para el navegador
│   │   ├── tools/
│   │   │   ├── page.tsx         # Directorio completo con filtros combinables
│   │   │   └── [slug]/page.tsx  # Fichas técnicas individuales detalladas (111 rutas SSG)
│   │   ├── categories/
│   │   │   ├── page.tsx         # Índice de las 12 disciplinas técnicas
│   │   │   └── [slug]/page.tsx  # Vista filtrada por disciplina
│   │   ├── investigate-by/
│   │   │   ├── page.tsx         # Índice de los 12 objetivos de investigación
│   │   │   └── [slug]/page.tsx  # Vista filtrada con pautas metodológicas
│   │   ├── favorites/page.tsx   # Colección personal de herramientas favoritas
│   │   ├── recent/page.tsx      # Historial de herramientas consultadas
│   │   ├── guides/page.tsx      # Guías metodológicas y documentación oficial
│   │   ├── challenges/page.tsx  # Retos prácticos formativos con pistas desplegables
│   │   └── about/page.tsx       # Acerca del proyecto, infraestructura y ética
│   ├── components/
│   │   ├── layout/              # Header (reloj, logo, buscador, temas), Sidebar y AppShell
│   │   ├── tools/               # ToolCard (cuadrícula/lista), ToolsDirectory y ToolDetailActions
│   │   ├── search/              # SearchDialog modal (Fuse.js + sinónimos)
│   │   └── ui/                  # CategoryIcon (resolución dinámica de Lucide Icons)
│   ├── data/
│   │   ├── categories.json      # Metadatos de las 12 categorías técnicas
│   │   ├── investigate-by.json  # Metadatos de los 12 objetivos Investigate By
│   │   ├── resources.json       # Compendio de guías y documentación
│   │   ├── challenges.json      # Retos formativos (Bellingcat, OSINT Industries CTF, etc.)
│   │   └── tools/               # Catálogo modular JSON por disciplina técnica (11 archivos)
│   ├── hooks/                   # useFavorites, useRecentlyViewed, useChallengeProgress, useTheme
│   ├── lib/                     # data.ts (loader seguro, validación Zod y deduplicación) y utils.ts
│   └── types/                   # osint.ts (esquemas Zod y tipos de TypeScript)
```

---

## 🚀 Despliegue en el Servidor Homelab (`/opt/stacks/osint-hub`)

El servicio está configurado para desplegarse mediante Docker Compose en el servidor local:

### 1. Clonar el repositorio en el servidor
```bash
git clone https://github.com/GuacamoleGH/OSINT.git /opt/stacks/osint-hub
cd /opt/stacks/osint-hub
```

### 2. Comprobar la configuración (`docker-compose.yml`)
```yaml
services:
  osint-hub:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: osint-hub
    restart: unless-stopped
    ports:
      - "3104:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - HOSTNAME=0.0.0.0
    security_opt:
      - no-new-privileges:true
```

### 3. Construir y levantar el contenedor
```bash
docker compose up -d --build
```

El portal estará accesible de forma inmediata dentro de la red local en:
```text
http://192.168.0.18:3104
```

---

## 🌐 Configuración de Cloudflare Tunnel

Para publicar el servicio bajo el dominio público del servidor con certificado SSL/TLS automático:

```text
osint.guacamolegh.es
        │
        ▼ (HTTPS seguro gestionado por Cloudflare)
Cloudflare Tunnel (cloudflared)
        │
        ▼ (Red local interna del servidor)
http://192.168.0.18:3104 (o http://127.0.0.1:3104)
```

En el panel de **Cloudflare Zero Trust** (`Networks > Tunnels`):
1. Añadir regla de entrada (*Ingress Rule*):
   - **Public Hostname:** `osint.guacamolegh.es`
   - **Service Type:** `HTTP`
   - **URL:** `192.168.0.18:3104` (o `127.0.0.1:3104`)
2. Guardar la regla. El portal responderá de inmediato bajo `https://osint.guacamolegh.es/`.

---

## 💻 Desarrollo Local

```bash
# 1. Clonar repositorio
git clone https://github.com/GuacamoleGH/OSINT.git
cd OSINT

# 2. Instalar dependencias
npm install

# 3. Comprobar tipado estricto
npm run type-check

# 4. Comprobar linter
npm run lint

# 5. Iniciar servidor de desarrollo
npm run dev

# 6. Compilar para producción (genera 150 páginas estáticas)
npm run build
```

---

## ⌨️ Atajos de Teclado

| Atajo | Acción |
| :--- | :--- |
| `Ctrl + K` o `Cmd + K` | Abrir / Cerrar el buscador global |
| `/` | Activar el buscador global (cuando no se escribe en un input) |
| `Esc` | Cerrar modal de búsqueda o limpiar filtros |
| `↑` / `↓` | Navegar por la lista de resultados de búsqueda |
| `Enter` | Abrir la herramienta seleccionada en el buscador |

---

## 📄 Licencia

Este proyecto está publicado bajo la licencia **MIT**. Desarrollado para el ecosistema homelab **GuacamoleGH**.
