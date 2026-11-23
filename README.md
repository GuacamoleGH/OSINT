# OSINT Hub — GuacamoleGH

> **Portal personal y autohospedado de inteligencia de fuentes abiertas (OSINT)**, curado, funcional e integrado visualmente en el ecosistema **GuacamoleGH**. Permite iniciar investigaciones desde una disciplina técnica (GEOINT, SOCMINT, WEBINT...) o directamente desde un indicador objetivo (alias, correo propio/autorizado, matrícula, empresa o ubicación).

---

## 1. Identidad Visual y Ecosistema

OSINT Hub comparte la línea visual y arquitectura de diseño del homelab **GuacamoleGH** (contrastada con los proyectos hermanos `Hub`, `Share`, `Flags`, `Games` y `main`):

- **Paleta base:** Gama Carbón oscura (`#0c0e12` de fondo profundo, `#12151b` de fondo base y `#181d26` en superficies de tarjetas).
- **Acentos tecnológicos de marca:** Neón Esmeralda (`#00f59b` / `#10b981`) y Turquesa / Cian Neón (`#00d9c4` / `#06b6d4`).
- **Soporte de Temas:** Modo oscuro por defecto con soporte completo para modo claro mediante atributo `data-theme="light"`.
- **Componentes y densidad:** Tarjetas de información compactas, badge de reloj en vivo con pulso verde, atajos de teclado globales y navegación responsive.

---

## 2. Características Principales

1. **Doble Eje de Navegación:**
   - **Disciplinas Técnicas:** 12 categorías especializadas (General OSINT, Search Engines, GEOINT, IMINT, Satellite, Chronolocation, SOCMINT, WEBINT, SIGINT, Cyber Intelligence, Public Records, Transport Intelligence).
   - **Investigate By:** 12 agrupaciones por objetivo (Social Media, Gaming, GitHub & Developer, Username, People & Professional, Email, Phone, Vehicle, Jobs & Careers, Domain & IP, Companies, Location).
2. **Catálogo Curado y Exhaustivo (102 herramientas únicas):**
   - Sin duplicados entre fichas.
   - 100% verificado: gratuito o freemium con cuota funcional real. Se excluyen servicios de pago estricto.
   - Máxima prioridad geográfica para recursos de **España** (IGN, Catastro, BOE, DGT, CNMV, Contratación del Estado) y la **Unión Europea** (Copernicus, EURES, data.europa.eu, BRIS).
3. **Buscador Global con Fuse.js y Sinónimos:**
   - Búsqueda aproximada en cliente (fuzzy search).
   - Diccionario bilingüe de sinónimos integrados (`correo / email`, `matrícula / vehicle`, `teléfono / phone`, `sol / shadows / suncalc`, etc.).
   - Atajo de teclado universal `Ctrl + K` (o `/` y `Esc`).
4. **Fichas Técnicas Individuales (`/tools/[slug]`):**
   - Análisis detallado, casos de uso, instrucciones metodológicas, limitaciones éticas, metadatos y herramientas relacionadas.
5. **Persistencia Local (LocalStorage):**
   - **Favoritos:** Fijar y desmarcar herramientas con persistencia inmediata sin requerir cuentas ni contraseñas.
   - **Historial:** Registro automático de las últimas herramientas consultadas.
   - **Retos Prácticos:** Seguimiento de estado (*Pendiente*, *En curso*, *Completado*) con cálculo porcentual de avance.
6. **Ética, Privacidad y Seguridad:**
   - Sin backend que ejecute escaneos invasivos contra terceros.
   - No almacena consultas sensibles de investigación ni fomenta el doxxing.

---

## 3. Stack Tecnológico

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components y Static Site Generation)
- **Lenguaje:** TypeScript 5 (tipado estricto y esquemas de validación Zod)
- **Estilos:** Tailwind CSS 3 con variables y tokens del ecosistema GuacamoleGH
- **Iconografía:** [Lucide Icons](https://lucide.dev/)
- **Buscador:** [Fuse.js 7](https://www.fusejs.io/)
- **Contenedorización:** Docker y Docker Compose con imagen multi-stage optimizada `node:20-alpine`

---

## 4. Estructura del Código

```text
OSINT/
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── .gitignore
├── .env.example
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root Layout + Shell GuacamoleGH
│   │   ├── page.tsx                # Dashboard principal
│   │   ├── globals.css             # Tokens CSS y estilos globales
│   │   ├── tools/
│   │   │   ├── page.tsx            # Directorio general con filtros combinables
│   │   │   └── [slug]/page.tsx     # Fichas técnicas individuales
│   │   ├── categories/
│   │   │   ├── page.tsx            # Índice de las 12 disciplinas
│   │   │   └── [slug]/page.tsx     # Vista filtrada por disciplina
│   │   ├── investigate-by/
│   │   │   ├── page.tsx            # Índice de las 12 agrupaciones por objetivo
│   │   │   └── [slug]/page.tsx     # Vista filtrada por dato a investigar
│   │   ├── favorites/page.tsx      # Colección personal de favoritos
│   │   ├── recent/page.tsx         # Historial de herramientas consultadas
│   │   ├── guides/page.tsx         # Guías metodológicas y documentación
│   │   ├── challenges/page.tsx     # Retos prácticos con guardado de progreso
│   │   └── about/page.tsx          # Acerca del proyecto y principios
│   ├── components/
│   │   ├── layout/                 # Header, Sidebar y AppShell
│   │   ├── tools/                  # ToolCard, ToolsDirectory y ToolDetailActions
│   │   ├── search/                 # SearchDialog (Fuse.js + Sinónimos)
│   │   └── ui/                     # CategoryIcon
│   ├── data/
│   │   ├── categories.json         # Las 12 disciplinas técnicas
│   │   ├── investigate-by.json     # Las 12 agrupaciones por objetivo
│   │   ├── resources.json          # Guías y tutoriales
│   │   ├── challenges.json         # Ejercicios prácticos
│   │   └── tools/                  # Catálogo modular JSON por disciplina
│   ├── hooks/                      # useFavorites, useRecentlyViewed, useChallengeProgress, useTheme
│   ├── lib/                        # data.ts (Loader seguro y estadísticas) y utils.ts
│   └── types/                      # osint.ts (Esquemas Zod y tipos TypeScript)
```

---

## 5. Instalación y Ejecución en Desarrollo

Requisitos: Node.js 18+ y npm.

```bash
# 1. Clonar el repositorio
git clone https://github.com/GuacamoleGH/OSINT.git
cd OSINT

# 2. Instalar dependencias
npm install

# 3. Comprobar tipos TypeScript
npm run type-check

# 4. Iniciar servidor de desarrollo
npm run dev
```

El portal estará disponible localmente en `http://localhost:3000`.

---

## 6. Despliegue en Producción (Docker)

El contenedor se ejecuta en el servidor en `/opt/stacks/osint-hub/`:

```bash
# En el servidor
cd /opt/stacks/osint-hub/

# Levantar el contenedor en segundo plano
docker compose up -d --build
```

### Configuración del servicio (`docker-compose.yml`):
- **Nombre del contenedor:** `osint-hub`
- **Puerto expuesto:** `127.0.0.1:3080:3000`
- **Reinicio:** `unless-stopped`
- **Healthcheck:** Consulta HTTP interna cada 30 segundos

---

## 7. Configuración de Cloudflare Tunnel

Para publicar el servicio bajo el dominio oficial del servidor:

```text
osint.guacamolegh.es
        │
        ▼ (HTTPS / SSL de Cloudflare)
Cloudflare Tunnel (cloudflared)
        │
        ▼ (Red local interna del servidor)
http://127.0.0.1:3080
```

En el panel de **Zero Trust > Networks > Tunnels** (o en el archivo local `config.yml` del túnel):
1. Añadir regla de entrada (*Ingress Rule*):
   - **Hostname:** `osint.guacamolegh.es`
   - **Service Type:** `HTTP`
   - **URL:** `127.0.0.1:3080`
2. Guardar cambios. El portal quedará inmediatamente accesible con certificado TLS válido.

---

## 8. Licencia

Desarrollado bajo licencia MIT para el ecosistema **GuacamoleGH**.
