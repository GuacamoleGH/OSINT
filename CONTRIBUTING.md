# 🤝 Guía de Contribución — OSINT Hub

¡Gracias por tu interés en contribuir a **OSINT Hub**! Este proyecto es un directorio curado, estructurado y de código abierto enfocado en herramientas de inteligencia de fuentes abiertas, con especial prioridad en fuentes públicas oficiales de España y la Unión Europea.

---

## 📋 Criterios de Inclusión

Antes de proponer una nueva herramienta o fuente, asegúrate de que cumple con los siguientes criterios éticos y técnicos:

### 🛡️ Criterios Éticos y Legales (RGPD / LOPDGDD)
1. **Doble Uso Legítimo:** Aceptamos herramientas de investigación de fuentes abiertas (incluyendo rastreo de alias, registros públicos, geolocalización o análisis de metadatos) siempre que posean un caso de uso legítimo en ciberseguridad defensiva, auditoría de exposición propia, peritajes forenses, debida diligencia corporativa o periodismo de investigación.
2. **Sin Fines Exclusivos de Acoso o Doxxing:** No se admiten herramientas concebidas específicamente para el hostigamiento, la venta no autorizada de datos personales o la explotación de credenciales ilícitas procedentes de filtraciones (*leaks*) con datos sensibles no anonimizados.
3. **Respeto a la Privacidad:** Priorizamos fuentes de datos públicos oficiales, registros administrativos y herramientas de inspección técnica frente a servicios invasivos de rastreo indiscriminado de particulares.

### ⚙️ Criterios Técnicos
1. **Disponibilidad:** El enlace debe estar activo, resolver con HTTPS y responder con código HTTP válido.
2. **Ausencia de Duplicados:** Comprueba previamente en el buscador (`Ctrl + K`) que la herramienta no esté ya registrada.
3. **Metadatos Completos:** La ficha debe incluir `pricing`, `geographicScope`, `difficulty`, `lastReviewed` (fecha actual en formato `YYYY-MM-DD`) y al menos una categoría y un indicador "Investigate By".

---

## 📂 Dónde Añadir las Herramientas

Las herramientas se organizan en ficheros JSON dentro del directorio `src/data/tools/`:

| Fichero | Disciplina |
| :--- | :--- |
| `general.json` | Marcos generales, directorios y toolkits |
| `search.json` | Motores de búsqueda, dorking y metabuscadores |
| `geoint.json` | Geolocalización, cartografía oficial, visualización |
| `imint.json` | Análisis de imágenes, forense digital, metadatos EXIF |
| `satellite.json` | Teledetección orbital, Copernicus, NASA |
| `chronolocation.json` | Trayectorias solares, sombras, meteorología histórica |
| `socmint.json` | Redes sociales, alias, canales de mensajería |
| `webint.json` | Archivo web, certificados SSL, DNS, escaneo pasivo |
| `sigint.json` | Radiofrecuencias, Wi-Fi global, SDR |
| `cyber.json` | Ciberinteligencia, telemetría IP/ASN, reputación |
| `public-records.json` | BOE, Catastro, DGT, registros mercantiles, licitaciones |
| `transport.json` | Rastreo aéreo (ADS-B), marítimo (AIS) y transporte |

---

## 📝 Estructura y Ejemplo del JSON Esperado

Cada elemento debe cumplir estrictamente con el esquema Zod definido en `src/types/osint.ts`. Añade tu herramienta al final del array correspondiente:

```json
{
  "id": "nueva-herramienta",
  "name": "Nombre de la Herramienta",
  "slug": "nueva-herramienta",
  "description": "Descripción breve y concisa de la herramienta (1-2 frases).",
  "longDescription": "Descripción extendida detallando qué aporta a una investigación y su funcionamiento principal.",
  "url": "https://ejemplo.com",
  "categories": ["geoint"],
  "investigateBy": ["location"],
  "subcategories": ["Cartografía", "Geolocalización"],
  "tags": ["gis", "mapas", "espana"],
  "synonyms": ["visor cartográfico", "ortofoto"],
  "type": "web",
  "pricing": "free",
  "pricingDetails": "100% gratuito sin registro",
  "access": "public",
  "geographicScope": ["spain"],
  "platforms": ["web"],
  "difficulty": "beginner",
  "featured": false,
  "verified": true,
  "registrationRequired": false,
  "apiKeyRequired": false,
  "limitations": [
    "Requiere conexión a Internet",
    "Cobertura limitada al territorio nacional"
  ],
  "useCases": [
    "Identificación de parcelas catastrales",
    "Inspección de ortofotos históricas"
  ],
  "instructions": "Accede al visor web, introduce las coordenadas o la dirección y selecciona la capa deseada.",
  "lastReviewed": "2026-11-24",
  "status": "active"
}
```

### Valores Válidos para Campos Enumerados:
- **`categories`:** `general`, `search`, `geoint`, `imint`, `satellite`, `chronolocation`, `socmint`, `webint`, `sigint`, `cyber`, `public-records`, `transport`.
- **`investigateBy`:** `social-media`, `gaming`, `github-dev`, `username`, `people-professional`, `email`, `phone`, `vehicle`, `jobs-careers`, `domain-ip`, `companies`, `location`, `fraud-scams`, `classifieds`.
- **`pricing`:** `free`, `freemium`, `paid`, `unknown`.
- **`geographicScope`:** `spain`, `europe`, `global`.
- **`difficulty`:** `beginner`, `intermediate`, `advanced`.
- **`type` / `platforms`:** `web`, `cli`, `desktop`, `browser-extension`, `mobile`, `api`.

---

## 🚀 Flujo de Trabajo para Enviar un Pull Request

1. **Haz un fork** del repositorio y crea una rama para tu aportación:
   ```bash
   git checkout -b feature/nueva-herramienta
   ```

2. **Añade los datos** en el fichero JSON correspondiente en `src/data/tools/`.

3. **Verifica los tipos y la compilación:**
   ```bash
   npm run type-check
   npm run lint
   npm run build
   ```

4. **Comprueba los enlaces:**
   ```bash
   npm run check-links
   ```

5. **Envía un commit claro:**
   ```bash
   git commit -m "feat(tools): add nueva-herramienta to geoint.json"
   ```

6. **Abre una Pull Request** explicando brevemente por qué consideras valiosa la herramienta y su ámbito de aplicación.
