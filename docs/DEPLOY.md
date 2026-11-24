# 🚀 Guía de Despliegue y Homelab — OSINT Hub

Esta guía detalla la puesta en producción de **OSINT Hub** en un entorno de servidor autohospedado (homelab) utilizando Docker Compose y Cloudflare Tunnel para exposición segura bajo HTTPS.

---

## 📦 1. Requisitos Previos

- Docker Engine 24+ y Docker Compose v2+
- (Opcional) Instancia de `cloudflared` configurada para Cloudflare Zero Trust.

---

## 🛠️ 2. Despliegue con Docker Compose

### 1. Clonar el repositorio
```bash
git clone https://github.com/GuacamoleGH/OSINT.git /opt/stacks/osint-hub
cd /opt/stacks/osint-hub
```

### 2. Configurar variables de entorno (opcional)
Copia la plantilla `.env.example` a `.env` si deseas personalizar el puerto expuesto o el hostname:
```bash
cp .env.example .env
```

### 3. Orquestación (`docker-compose.yml`)
El servicio está securizado con contenedor *non-root*, sistema de archivos de solo lectura (`read_only: true`), `tmpfs` para cachés volátiles de Next.js y descarte de privilegios (`cap_drop: ALL` y `no-new-privileges`):

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
    read_only: true
    tmpfs:
      - /tmp:size=64M,mode=1777
      - /app/.next/cache:size=128M,uid=1001,gid=1001
    cap_drop:
      - ALL
```

### 4. Construir y levantar
```bash
docker compose up -d --build
```

El servicio responderá en `http://localhost:3104` (o la IP interna de tu nodo local).

---

## 🌐 3. Exposición Pública mediante Cloudflare Tunnel

Para publicar el servicio bajo tu dominio público con certificado SSL/TLS gestionado sin abrir puertos en el router:

```text
osint.tu-dominio.com
        │
        ▼ (HTTPS seguro gestionado por Cloudflare)
Cloudflare Edge Network
        │
        ▼ (Túnel cifrado con cloudflared)
Servidor Local: http://127.0.0.1:3104
```

### Pasos en Cloudflare Zero Trust (`Networks > Tunnels`):
1. Añade una regla de entrada (*Ingress Rule*):
   - **Public Hostname:** `osint.tu-dominio.com` (ejemplo: `osint.guacamolegh.es`)
   - **Service Type:** `HTTP`
   - **URL:** `127.0.0.1:3104` (o la IP local del host Docker)
2. Guarda los cambios. El portal quedará disponible de inmediato con HTTPS estricto.

---

## 🔄 4. Actualización del Servicio

Para aplicar cambios y actualizar la imagen:
```bash
cd /opt/stacks/osint-hub
git pull origin main
docker compose up -d --build
docker image prune -f
```
