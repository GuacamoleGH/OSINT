# 🥑 OSINT Hub — GuacamoleGH

<p align="center">
  <img src="public/logo.png" width="100" height="100" alt="OSINT Hub Logo" style="border-radius: 16px;" />
</p>

<p align="center">
  <strong>Directorio curado, estructurado y autohospedado de inteligencia de fuentes abiertas (OSINT).</strong><br />
  Enfocado en fuentes públicas oficiales de España y la Unión Europea, herramientas de doble uso y ciberseguridad defensiva.
</p>

<p align="center">
  <a href="https://github.com/GuacamoleGH/OSINT/actions/workflows/link-checker.yml"><img src="https://github.com/GuacamoleGH/OSINT/actions/workflows/link-checker.yml/badge.svg" alt="Link Health Checker"></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js" alt="Next.js"></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript" alt="TypeScript"></a>
  <a href="https://docker.com"><img src="https://img.shields.io/badge/Docker-Hardened-2496ed?style=flat-square&logo=docker" alt="Docker"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/Licencia-MIT-00f59b?style=flat-square" alt="Licencia MIT"></a>
</p>

---

## 💡 ¿Qué es OSINT Hub?

**OSINT Hub** centraliza herramientas de investigación, buscadores especializados, registros oficiales, plataformas de práctica (CTFs) y metodologías técnicas en un portal ligero y sin dependencias de bases de datos.

A diferencia de marcadores estáticos o directorios genéricos, el catálogo está modelado en JSON con validación en Zod, fecha de última revisión por herramienta (`lastReviewed`), comprobación periódica de enlaces y navegación dual:
1. **Por Disciplina Técnica:** GEOINT, IMINT, SOCMINT, WEBINT, SIGINT, Cyber Intelligence, Chronolocation, Public Records y Transport.
2. **Por Selector Objetivo ("Investigate By"):** Comenzando por el dato disponible (usuario, correo, teléfono, matrícula, empresa o ubicación).

---

## 📸 Vistas del Portal

### 🔍 Buscador Global Inteligente (`Ctrl + K` / `/`)
Búsqueda difusa reactiva con Fuse.js, tolerancia a erratas y sinónimos bilingües cruzados (ej. *matrícula* ↔ *vehicle*, *correo* ↔ *email*, *sol* ↔ *suncalc*).

```text
┌────────────────────────────────────────────────────────────────────────┐
│  🔍 Buscar por herramienta, selector, tag o sinónimo...     [Ctrl + K] │
├────────────────────────────────────────────────────────────────────────┤
│  • Sherlock          [SOCMINT]  Rastreo de alias en +400 plataformas   │
│  • Iberpix / PNOA    [GEOINT]   Visor de ortofotos aéreas de España    │
│  • BOE & BORME       [PUBLIC]   Boletín Oficial y Registro Mercantil   │
└────────────────────────────────────────────────────────────────────────┘
```
> *(Sube tu captura o GIF a `docs/img/search-demo.gif` para previsualizarlo aquí)*

### ⚡ Generador de Dorks y Auditoría de Exposición (`/guides`)
Generador interactivo que adapta consultas de búsqueda avanzada al dominio objetivo para auditar activos expuestos (PDFs internos, subdominios o configuraciones indexadas por error).

```text
┌────────────────────────────────────────────────────────────────────────┐
│  Objetivo: [ ejemplo.com ]                                             │
├────────────────────────────────────────────────────────────────────────┤
│  [Documentos]     site:ejemplo.com filetype:pdf "confidencial" [Copiar]│
│  [Configuración]  site:ejemplo.com (ext:env OR ext:sql OR ext:bak)     │
│  [Subdominios]    site:*.ejemplo.com -www.ejemplo.com                  │
└────────────────────────────────────────────────────────────────────────┘
```
> *(Sube tu captura o GIF a `docs/img/dorks-demo.gif` para previsualizarlo aquí)*

---

## ⚖️ Marco Legal y Uso Ético (RGPD y LOPDGDD)

> [!WARNING]
> **Herramientas de Doble Uso (Dual-Use)**: Este portal cataloga recursos legítimos de investigación (como Sherlock, Maigret, Blackbird, informes reducidos de vehículos de la DGT o rastreo de canales públicos). Aunque son esenciales en auditorías de seguridad defensiva, verificación periodística y peritajes judiciales, también pueden ser objeto de abuso.

- **Ámbito normativo (España y UE):** Toda recopilación o tratamiento de datos personales está regulada por el **Reglamento General de Protección de Datos (RGPD UE 2016/679)** y la **Ley Orgánica 3/2018 (LOPDGDD)**.
- **Autorización:** Emplea los dorks y las herramientas de investigación exclusivamente sobre **dominios y activos propios, o bajo autorización expresa**.
- **Portal pasivo:** OSINT Hub no ejecuta consultas contra terceros desde el servidor ni registra las búsquedas del usuario. La responsabilidad legal del uso de cada herramienta recae en el usuario final. Consulta más detalles en la sección [`/about`](src/app/about/page.tsx).

---

## 🚀 Puesta en Marcha Rápida

### Con Docker Compose (Recomendado)

El contenedor corre securizado como usuario **no-root**, con sistema de archivos de solo lectura (`read_only: true`) y almacenamiento temporal en `tmpfs`:

```bash
# 1. Clonar el repositorio
git clone https://github.com/GuacamoleGH/OSINT.git
cd OSINT

# 2. Levantar el servicio
docker compose up -d --build
```
Accede desde tu navegador en: **`http://localhost:3104`**

> Para guías de integración con **Cloudflare Tunnel**, variables de entorno y despliegue avanzado en Homelab, consulta [docs/DEPLOY.md](docs/DEPLOY.md).

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Validar tipos y linter
npm run type-check
npm run lint

# Validar disponibilidad de enlaces
npm run check-links

# Compilar para producción
npm run build
```

---

## 🤝 Cómo Proponer Herramientas y Contribuir

¿Quieres sugerir una nueva herramienta o fuente oficial? Las contribuciones son bienvenidas:
- Revisa los criterios éticos y técnicos de inclusión.
- Consulta el formato JSON esperado y la guía paso a paso en [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE). Desarrollado para el ecosistema **GuacamoleGH**.
