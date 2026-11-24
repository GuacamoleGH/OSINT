# 🚀 Guía de Compilación y Puesta en Marcha — OSINT Hub

Instrucciones detalladas para compilar, levantar en local o desplegar en producción **OSINT Hub**.

---

## 📋 Requisitos Previos

- **Para Docker:** Docker Engine 24+ y Docker Compose v2+.
- **Para desarrollo local:** Node.js 18+ (recomendado Node 20 LTS o superior) y `npm` (o `pnpm` / `bun`).

---

## 🚀 Puesta en Marcha Rápida

### Con Docker Compose (Recomendado)

El contenedor está securizado siguiendo buenas prácticas de hardening: corre como usuario **no-root** (`nextjs:nodejs`), con sistema de archivos de solo lectura (`read_only: true`) y almacenamiento temporal montado en memoria mediante `tmpfs`:

```bash
# 1. Clonar el repositorio
git clone https://github.com/GuacamoleGH/OSINT.git
cd OSINT

# 2. Levantar el servicio
docker compose up -d --build
```

Una vez levantado, accede desde tu navegador en:
👉 **`http://localhost:3080`**

> [!TIP]
> Para despliegues en servidores domésticos (Homelab), túneles seguros con **Cloudflare Tunnel**, variables de entorno y certificados SSL, consulta la guía dedicada en [docs/DEPLOY.md](docs/DEPLOY.md).

---

### Desarrollo Local

Si prefieres ejecutar el proyecto directamente en tu máquina sin contenedores:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo en http://localhost:3000
npm run dev
```

---

## 🛠️ Scripts de Verificación y Compilación

El proyecto incluye scripts para garantizar la integridad del catálogo y la estabilidad del código:

| Comando | Acción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con recarga rápida (HMR). |
| `npm run type-check` | Ejecuta `tsc --noEmit` para validar el tipado estático de TypeScript. |
| `npm run lint` | Ejecuta ESLint sobre todo el código fuente del proyecto. |
| `npm run check-links` | Comprueba la disponibilidad y códigos HTTP de todos los enlaces del catálogo. |
| `npm run build` | Compila el proyecto con Next.js SSG pre-renderizando todas las páginas estáticas. |
| `npm run start` | Inicia el servidor optimizado de producción tras haber ejecutado `npm run build`. |

---

## 📦 Despliegue en Producción sin Docker

Para servir los archivos estáticos pre-renderizados en un servidor Node.js o detrás de un proxy inverso como Nginx o Caddy:

```bash
# Compilar páginas estáticas
npm run build

# Iniciar servidor de producción (por defecto en el puerto 3000)
npm run start -p 3080
```
