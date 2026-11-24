import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const toolsDir = path.resolve(rootDir, 'src/data/tools');

test('1. JSON files integrity and parsing', () => {
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
  assert.ok(files.length > 0, 'No JSON tool files found');
  for (const f of files) {
    const raw = fs.readFileSync(path.join(toolsDir, f), 'utf8');
    assert.doesNotThrow(() => JSON.parse(raw), `File ${f} is not valid JSON`);
  }
});

test('2. Challenges validation (URLs, registration and pricing)', () => {
  const challengesPath = path.resolve(rootDir, 'src/data/challenges.json');
  const challenges = JSON.parse(fs.readFileSync(challengesPath, 'utf8'));

  const bellingcat = challenges.find((c) => c.id === 'bellingcat-challenges');
  assert.ok(bellingcat, 'Bellingcat challenge not found');
  assert.equal(bellingcat.url, 'https://challenge.bellingcat.com/', 'Bellingcat URL must point to challenge.bellingcat.com');

  const osintIndustries = challenges.find((c) => c.id === 'osint-industries-ctf');
  assert.ok(osintIndustries, 'OSINT Industries CTF not found');
  assert.equal(
    osintIndustries.url,
    'https://ctf.osint.industries/challenges',
    'OSINT Industries URL must point to /challenges'
  );
  assert.equal(osintIndustries.registrationRequired, true, 'OSINT Industries must require registration');
});

test('3. Verification defaults and checklist schema', () => {
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
  let total = 0;
  let verified = 0;
  let pending = 0;

  for (const f of files) {
    const tools = JSON.parse(fs.readFileSync(path.join(toolsDir, f), 'utf8'));
    for (const tool of tools) {
      total++;
      assert.ok(typeof tool.verified === 'boolean', `Tool ${tool.id} verified must be boolean`);
      assert.ok(tool.verification, `Tool ${tool.id} must have verification checklist`);
      assert.ok(typeof tool.verification.linkChecked === 'boolean');
      assert.ok(typeof tool.verification.infoChecked === 'boolean');
      assert.ok(typeof tool.verification.functionalityChecked === 'boolean');
      assert.ok(typeof tool.verification.pricingChecked === 'boolean');

      if (tool.verified) {
        verified++;
        assert.ok(tool.lastReviewed, `Verified tool ${tool.id} must have lastReviewed date`);
        assert.equal(tool.verification.linkChecked, true);
        assert.equal(tool.verification.infoChecked, true);
        assert.equal(tool.verification.functionalityChecked, true);
        assert.equal(tool.verification.pricingChecked, true);
      } else {
        pending++;
        assert.equal(tool.lastReviewed, null, `Pending tool ${tool.id} must not have artificial lastReviewed date`);
      }
    }
  }

  assert.equal(total, 305, 'Expected 305 tools in catalog');
  assert.ok(verified > 0, 'There should be audited and verified tools');
  assert.ok(pending > 0, 'There should be pending tools; catalog must not claim 100% verified');
  assert.ok(verified < total, 'Verification must not be unrealistically 100%');
});

test('4. Pricing classification consistency', () => {
  const files = fs.readdirSync(toolsDir).filter((f) => f.endsWith('.json'));
  const validPricings = new Set(['free', 'freemium', 'paid', 'unknown']);
  let freeCount = 0;
  let freemiumCount = 0;
  let paidCount = 0;

  for (const f of files) {
    const tools = JSON.parse(fs.readFileSync(path.join(toolsDir, f), 'utf8'));
    for (const tool of tools) {
      assert.ok(validPricings.has(tool.pricing), `Invalid pricing ${tool.pricing} for ${tool.id}`);
      if (tool.pricing === 'free') freeCount++;
      if (tool.pricing === 'freemium') freemiumCount++;
      if (tool.pricing === 'paid') paidCount++;
    }
  }

  assert.ok(freeCount > 0, 'Should have free tools');
  assert.ok(freemiumCount > 0, 'Should have freemium tools');
  assert.ok(paidCount > 0, 'Should have paid tools');
});

test('5. Investigate By and Categories taxonomies', () => {
  const categoriesPath = path.resolve(rootDir, 'src/data/categories.json');
  const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
  assert.equal(categories.length, 12, 'Expected exactly 12 technical categories');

  const investigatePath = path.resolve(rootDir, 'src/data/investigate-by.json');
  const investigate = JSON.parse(fs.readFileSync(investigatePath, 'utf8'));
  assert.equal(investigate.length, 14, 'Expected exactly 14 investigate-by targets');

  const fraudScams = investigate.find((i) => i.id === 'fraud-scams');
  assert.ok(fraudScams, 'fraud-scams grouping must exist');

  const classifieds = investigate.find((i) => i.id === 'classifieds');
  assert.ok(classifieds, 'classifieds grouping must exist');
});

test('6. Docker compose configuration and port alignment', () => {
  const composePath = path.resolve(rootDir, 'docker-compose.yml');
  const compose = fs.readFileSync(composePath, 'utf8');
  assert.ok(
    compose.includes('127.0.0.1:${OSINT_PORT:-3080}:3000'),
    'docker-compose.yml must bind to 127.0.0.1:${OSINT_PORT:-3080}:3000'
  );

  const envPath = path.resolve(rootDir, '.env.example');
  const envContent = fs.readFileSync(envPath, 'utf8');
  assert.ok(envContent.includes('OSINT_PORT=3080'), '.env.example must specify OSINT_PORT=3080');

  const deployPath = path.resolve(rootDir, 'docs/DEPLOY.md');
  const deployContent = fs.readFileSync(deployPath, 'utf8');
  assert.ok(!deployContent.includes('3104'), 'docs/DEPLOY.md must not contain outdated port 3104');
  assert.ok(deployContent.includes('3080'), 'docs/DEPLOY.md must document port 3080');
});
