#!/usr/bin/env node

/**
 * Link Checker for OSINT Hub tools catalog.
 * Validates URLs in src/data/tools/*.json and reports broken links.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const toolsDir = path.resolve(__dirname, '../src/data/tools');

const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));

let tools = [];
for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(toolsDir, file), 'utf8'));
  for (const item of content) {
    if (item.url) {
      tools.push({
        id: item.id,
        name: item.name,
        url: item.url,
        file,
        lastReviewed: item.lastReviewed,
      });
    }
  }
}

console.log(`🔍 Validando enlaces para ${tools.length} herramientas...`);

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 (OSINT-Hub-LinkChecker/1.0)';

async function checkUrl(tool) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    // Try HEAD first, fallback to GET if method not allowed (405) or forbidden (403)
    let response;
    try {
      response = await fetch(tool.url, {
        method: 'HEAD',
        headers: { 'User-Agent': USER_AGENT, 'Accept': '*/*' },
        signal: controller.signal,
        redirect: 'follow',
      });
      if (response.status === 405 || response.status === 403) {
        throw new Error('HEAD not supported');
      }
    } catch {
      response = await fetch(tool.url, {
        method: 'GET',
        headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html,*/*' },
        signal: controller.signal,
        redirect: 'follow',
      });
    }

    clearTimeout(timeout);

    // Accept 2xx and 3xx, and treat cloudflare challenge 403 as alive
    if (response.status < 400 || response.status === 403) {
      return { ok: true, status: response.status };
    }
    return { ok: false, status: response.status, error: `HTTP ${response.status}` };
  } catch (err) {
    clearTimeout(timeout);
    return { ok: false, status: 0, error: err.name === 'AbortError' ? 'Timeout (12s)' : err.message };
  }
}

// Concurrency pool
async function pool(items, limit, fn) {
  const results = [];
  const executing = [];
  for (const item of items) {
    const p = Promise.resolve().then(() => fn(item)).then((res) => {
      executing.splice(executing.indexOf(p), 1);
      return { item, res };
    });
    results.push(p);
    executing.push(p);
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  return Promise.all(results);
}

const CONCURRENCY = 8;
const results = await pool(tools, CONCURRENCY, checkUrl);

const failed = results.filter((r) => !r.res.ok);
const successful = results.filter((r) => r.res.ok);

console.log(`\n✅ Enlaces accesibles: ${successful.length}/${tools.length}`);

if (failed.length > 0) {
  console.log(`⚠️ Enlaces con advertencias o no accesibles (${failed.length}):`);
  for (const f of failed) {
    console.log(`  - [${f.item.file}] ${f.item.name} (${f.item.url}): ${f.res.error}`);
  }
  // If run with --strict, exit with 1
  if (process.argv.includes('--strict')) {
    process.exit(1);
  }
} else {
  console.log('🎉 Todos los enlaces respondieron correctamente.');
}
