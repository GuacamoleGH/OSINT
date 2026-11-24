# =============================================================================
# GuacamoleGH OSINT Hub — Dockerfile Multi-Stage de Producción
# =============================================================================

# Fase 1: Dependencias y compilación de Next.js
FROM node:20-alpine AS builder

WORKDIR /app

# Instalar dependencias de compilación
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Compilar proyecto en modo standalone
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Fase 2: Imagen mínima de ejecución en producción
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Crear usuario y grupo no privilegiado (UID/GID 1001)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar archivos estáticos y bundle standalone optimizado asignando propiedad al usuario nextjs
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Preparar directorio de caché con permisos para nextjs
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next/cache

USER nextjs

EXPOSE 3000

# Healthcheck de disponibilidad HTTP
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
