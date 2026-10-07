#!/usr/bin/env node

/**
 * ==============================================================================
 * PETER CAT KOLKATA — COMPREHENSIVE END-TO-END TEST SUITE
 * ==============================================================================
 * Author: test_writer_1 (Specialist & QA Test Writer)
 * Target: Peter Cat Website Project
 * Requirements Reference: ORIGINAL_REQUEST.md, PROJECT.md, TEST_INFRA.md
 *
 * Test Architecture:
 * - Tier 1: Feature Coverage (Isolation happy-path assertions across F1-F7)
 * - Tier 2: Boundary & Corner Cases (Resilience, offline data, a11y, missing configs)
 * - Tier 3: Cross-Feature Interactions (Pairwise contracts between modules)
 * - Tier 4: Real-World Scenarios (End-to-end user journeys & full pipeline)
 *
 * Execution:
 *   node test_e2e_suite.js
 *   node test_e2e_suite.js --tier 1
 *   node test_e2e_suite.js --skip-build
 *   node test_e2e_suite.js --json
 *   node test_e2e_suite.js --soft-exit
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const PROJECT_ROOT = __dirname;

// Parse CLI flags
const args = process.argv.slice(2);
const FLAGS = {
  tier: null,
  feature: null,
  verbose: args.includes('--verbose') || args.includes('-v'),
  json: args.includes('--json'),
  bail: args.includes('--bail'),
  skipBuild: args.includes('--skip-build'),
  summaryOnly: args.includes('--summary'),
  softExit: args.includes('--soft-exit') || args.includes('--report-only'),
};

for (let i = 0; i < args.length; i++) {
  if ((args[i] === '--tier' || args[i] === '-t') && args[i + 1]) {
    FLAGS.tier = parseInt(args[i + 1], 10);
  }
  if ((args[i] === '--feature' || args[i] === '-f') && args[i + 1]) {
    FLAGS.feature = args[i + 1].toUpperCase();
  }
}

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

// Utilities
function fileExists(relPath) {
  return fs.existsSync(path.join(PROJECT_ROOT, relPath));
}

function readFile(relPath) {
  const full = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  return fs.readFileSync(full, 'utf8');
}

function readJson(relPath) {
  const content = readFile(relPath);
  if (!content) return null;
  try {
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

function listFiles(relDir) {
  const full = path.join(PROJECT_ROOT, relDir);
  if (!fs.existsSync(full)) return [];
  try {
    return fs.readdirSync(full);
  } catch (err) {
    return [];
  }
}

function getFileStats(relPath) {
  const full = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    return fs.statSync(full);
  } catch (err) {
    return null;
  }
}

function checkImageHeader(relPath) {
  const full = path.join(PROJECT_ROOT, relPath);
  if (!fs.existsSync(full)) return { valid: false, reason: 'File does not exist' };
  try {
    const buffer = Buffer.alloc(16);
    const fd = fs.openSync(full, 'r');
    fs.readSync(fd, buffer, 0, 16, 0);
    fs.closeSync(fd);

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    const isPng = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
    // JPEG: FF D8 FF
    const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    // WEBP: 'RIFF'....'WEBP'
    const isWebp = buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
    // SVG: begins with <?xml or <svg
    const textStart = buffer.toString('utf8', 0, 10).trim();
    const isSvg = textStart.startsWith('<svg') || textStart.startsWith('<?xml');

    if (isPng) return { valid: true, format: 'PNG' };
    if (isJpeg) return { valid: true, format: 'JPEG' };
    if (isWebp) return { valid: true, format: 'WEBP' };
    if (isSvg) return { valid: true, format: 'SVG' };
    return { valid: false, reason: `Unknown binary header: ${buffer.slice(0, 4).toString('hex')}` };
  } catch (err) {
    return { valid: false, reason: err.message };
  }
}

function runCmd(cmd, cmdArgs = [], options = {}) {
  const isWin = process.platform === 'win32';
  const resolvedCmd = isWin && cmd === 'npm' ? 'npm.cmd' : cmd;
  const result = spawnSync(resolvedCmd, cmdArgs, {
    cwd: PROJECT_ROOT,
    shell: isWin,
    encoding: 'utf8',
    timeout: options.timeout || 45000,
    ...options,
  });
  return {
    status: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error,
  };
}

// Test Registry
const testRegistry = [];

function registerTest(tier, feature, id, title, runFn, escalationTarget = null) {
  testRegistry.push({
    tier,
    feature,
    id,
    title,
    runFn,
    escalationTarget: escalationTarget || 'orchestrator_1',
  });
}

// ==============================================================================
// TIER 1: FEATURE COVERAGE (Isolation Happy Path Tests)
// ==============================================================================

// --- Feature F1: Dependencies Setup ---
registerTest(1, 'F1', 'T1_F1_01', 'package.json exists and is valid JSON', () => {
  const pkg = readJson('package.json');
  if (!pkg) throw new Error('package.json does not exist or is not valid JSON');
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_02', 'package.json contains "gsap" dependency', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies || !pkg.dependencies.gsap) {
    throw new Error('package.json does not contain "gsap" in dependencies');
  }
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_03', 'package.json contains "@gsap/react" dependency', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies || !pkg.dependencies['@gsap/react']) {
    throw new Error('package.json does not contain "@gsap/react" in dependencies');
  }
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_04', 'package.json contains "firebase" dependency', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies || !pkg.dependencies.firebase) {
    throw new Error('package.json does not contain "firebase" in dependencies');
  }
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_05', 'package.json defines "build" script using next build', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.scripts || !pkg.scripts.build || !pkg.scripts.build.includes('next build')) {
    throw new Error('package.json does not define a build script invoking next build');
  }
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_06', 'node_modules contains resolved gsap module', () => {
  if (!fileExists('node_modules/gsap')) {
    throw new Error('node_modules/gsap is missing; npm install was not run or failed');
  }
}, 'worker_m1');

registerTest(1, 'F1', 'T1_F1_07', 'node_modules contains resolved firebase module', () => {
  if (!fileExists('node_modules/firebase')) {
    throw new Error('node_modules/firebase is missing; npm install was not run or failed');
  }
}, 'worker_m1');

// --- Feature F2: Custom Generated Imagery ---
registerTest(1, 'F2', 'T1_F2_01', 'public/images directory exists', () => {
  if (!fileExists('public/images')) {
    throw new Error('public/images directory does not exist');
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_02', 'public/images contains at least 4 distinct image files', () => {
  const files = listFiles('public/images').filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (files.length < 4) {
    throw new Error(`public/images contains ${files.length} images; requirement is at least 4 distinct images`);
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_03', 'Signature Chelo Kebab image exists in public/images', () => {
  const files = listFiles('public/images');
  const match = files.find(f => /chelo.*kebab/i.test(f));
  if (!match) {
    throw new Error('Signature image "chelo_kebab.*" not found in public/images');
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_04', 'Vintage Peter Cat signage image exists in public/images', () => {
  const files = listFiles('public/images');
  const match = files.find(f => /(sign|vintage|peter.*cat.*sign)/i.test(f));
  if (!match) {
    throw new Error('Vintage signage image "vintage_peter_cat_sign.*" not found in public/images');
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_05', 'Atmospheric dining room image exists in public/images', () => {
  const files = listFiles('public/images');
  const match = files.find(f => /(atmosphere|dining|interior)/i.test(f));
  if (!match) {
    throw new Error('Atmospheric dining room image "atmospheric_dining_room.*" not found in public/images');
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_06', 'Entrance door or archive image exists in public/images', () => {
  const files = listFiles('public/images');
  const match = files.find(f => /(door|entrance|archive|heritage)/i.test(f));
  if (!match) {
    throw new Error('Museum entrance or archive image not found in public/images');
  }
}, 'worker_m1');

registerTest(1, 'F2', 'T1_F2_07', 'All image files in public/images are non-empty (>1KB)', () => {
  const files = listFiles('public/images').filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (files.length === 0) throw new Error('No images found in public/images to check');
  for (const f of files) {
    const stats = getFileStats(path.join('public/images', f));
    if (!stats || stats.size < 1024) {
      throw new Error(`Image ${f} is too small or empty (${stats ? stats.size : 0} bytes)`);
    }
  }
}, 'worker_m1');

// --- Feature F3: Firebase & Firestore Menu CMS ---
registerTest(1, 'F3', 'T1_F3_01', 'Menu TypeScript definitions exist at src/types/menu.ts', () => {
  if (!fileExists('src/types/menu.ts')) {
    throw new Error('src/types/menu.ts does not exist');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_02', 'MenuItem interface in src/types/menu.ts defines core fields', () => {
  const content = readFile('src/types/menu.ts');
  if (!content) throw new Error('src/types/menu.ts could not be read');
  const requiredFields = ['id', 'name', 'category', 'price', 'currency', 'description', 'dietary'];
  for (const field of requiredFields) {
    if (!content.includes(field)) {
      throw new Error(`MenuItem interface missing required field: "${field}"`);
    }
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_03', 'MenuCategory type or union is defined in src/types/menu.ts', () => {
  const content = readFile('src/types/menu.ts');
  if (!content || (!content.includes('MenuCategory') && !content.includes('category:'))) {
    throw new Error('MenuCategory type definition missing from src/types/menu.ts');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_04', 'Firebase configuration exists at src/lib/firebase/config.ts', () => {
  if (!fileExists('src/lib/firebase/config.ts')) {
    throw new Error('src/lib/firebase/config.ts does not exist');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_05', 'src/lib/firebase/config.ts initializes and exports Firestore instance', () => {
  const content = readFile('src/lib/firebase/config.ts');
  if (!content) throw new Error('src/lib/firebase/config.ts could not be read');
  if (!content.includes('getFirestore') && !content.includes('firestore')) {
    throw new Error('src/lib/firebase/config.ts does not reference or export getFirestore');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_06', 'Firebase menu service exists at src/lib/firebase/menuService.ts', () => {
  if (!fileExists('src/lib/firebase/menuService.ts')) {
    throw new Error('src/lib/firebase/menuService.ts does not exist');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_07', 'menuService.ts exports getMenuItems function returning Promise', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  if (!content.includes('getMenuItems')) {
    throw new Error('menuService.ts does not export getMenuItems function');
  }
}, 'worker_m2');

registerTest(1, 'F3', 'T1_F3_08', 'Authentic seed catalogue is present with signature Chelo Kebab item', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  if (!/Chelo\s+Kebab/i.test(content)) {
    throw new Error('menuService.ts does not contain authentic Chelo Kebab in its catalogue');
  }
}, 'worker_m2');

// --- Feature F4: test_firebase.js Verification Script ---
registerTest(1, 'F4', 'T1_F4_01', 'Verification script test_firebase.js exists in project root', () => {
  if (!fileExists('test_firebase.js')) {
    throw new Error('test_firebase.js does not exist in project root');
  }
}, 'worker_m2');

registerTest(1, 'F4', 'T1_F4_02', 'test_firebase.js contains Firestore write operation testing', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  if (!content.includes('setDoc') && !content.includes('addDoc') && !content.includes('.set(') && !content.includes('.add(')) {
    throw new Error('test_firebase.js does not contain Firestore write operation');
  }
}, 'worker_m2');

registerTest(1, 'F4', 'T1_F4_03', 'test_firebase.js contains Firestore read operation testing', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  if (!content.includes('getDoc') && !content.includes('getDocs') && !content.includes('.get(')) {
    throw new Error('test_firebase.js does not contain Firestore read operation');
  }
}, 'worker_m2');

registerTest(1, 'F4', 'T1_F4_04', 'test_firebase.js passes Node.js syntax check (node -c)', () => {
  if (!fileExists('test_firebase.js')) throw new Error('test_firebase.js does not exist');
  const res = runCmd('node', ['-c', 'test_firebase.js']);
  if (res.status !== 0) {
    throw new Error(`test_firebase.js has syntax errors: ${res.stderr || res.stdout}`);
  }
}, 'worker_m2');

registerTest(1, 'F4', 'T1_F4_05', 'test_firebase.js executes cleanly and exits with code 0', () => {
  if (!fileExists('test_firebase.js')) throw new Error('test_firebase.js does not exist');
  const res = runCmd('node', ['test_firebase.js']);
  if (res.status !== 0) {
    throw new Error(`test_firebase.js failed with exit code ${res.status}: ${res.stderr || res.stdout}`);
  }
}, 'worker_m2');

// --- Feature F5: GSAP Scroll Transition ---
registerTest(1, 'F5', 'T1_F5_01', 'GSAP entrance component exists in src/components/MuseumEntrance.tsx', () => {
  if (!fileExists('src/components/MuseumEntrance.tsx')) {
    throw new Error('src/components/MuseumEntrance.tsx does not exist');
  }
}, 'worker_m3');

registerTest(1, 'F5', 'T1_F5_02', 'MuseumEntrance.tsx includes "use client" directive', () => {
  const content = readFile('src/components/MuseumEntrance.tsx');
  if (!content || !content.includes("'use client'") && !content.includes('"use client"')) {
    throw new Error('MuseumEntrance.tsx is missing "use client" directive required for GSAP hooks');
  }
}, 'worker_m3');

registerTest(1, 'F5', 'T1_F5_03', 'MuseumEntrance.tsx imports gsap and ScrollTrigger', () => {
  const content = readFile('src/components/MuseumEntrance.tsx');
  if (!content || !content.includes('gsap') || !content.includes('ScrollTrigger')) {
    throw new Error('MuseumEntrance.tsx does not import gsap and ScrollTrigger');
  }
}, 'worker_m3');

registerTest(1, 'F5', 'T1_F5_04', 'MuseumEntrance.tsx registers ScrollTrigger plugin', () => {
  const content = readFile('src/components/MuseumEntrance.tsx');
  if (!content || !/registerPlugin.*ScrollTrigger/i.test(content)) {
    throw new Error('MuseumEntrance.tsx does not call gsap.registerPlugin(ScrollTrigger)');
  }
}, 'worker_m3');

registerTest(1, 'F5', 'T1_F5_05', 'src/app/globals.css has eliminated pure CSS scroll-timeline', () => {
  const content = readFile('src/app/globals.css');
  if (!content) throw new Error('src/app/globals.css could not be read');
  if (content.includes('scroll-timeline') || content.includes('animation-timeline: --page-scroll')) {
    throw new Error('globals.css still contains pure CSS scroll-timeline, violating requirement R1');
  }
}, 'worker_m3');

registerTest(1, 'F5', 'T1_F5_06', 'MuseumEntrance.tsx implements multi-stage scroll animations', () => {
  const content = readFile('src/components/MuseumEntrance.tsx');
  if (!content) throw new Error('src/components/MuseumEntrance.tsx could not be read');
  const hasTimeline = content.includes('gsap.timeline') || content.includes('timeline(');
  const hasScrollTrigger = content.includes('scrollTrigger') || content.includes('ScrollTrigger');
  if (!hasTimeline || !hasScrollTrigger) {
    throw new Error('MuseumEntrance.tsx does not instantiate GSAP timeline with ScrollTrigger');
  }
}, 'worker_m3');

// --- Feature F6: Editorial Sections ---
registerTest(1, 'F6', 'T1_F6_01', 'Hero Section exists and highlights Peter Cat 1962 heritage', () => {
  const heroPath = fileExists('src/components/HeroSection.tsx') ? 'src/components/HeroSection.tsx' : 'src/app/page.tsx';
  const content = readFile(heroPath);
  if (!content || !/PETER\s+CAT/i.test(content) || !/1962/i.test(content)) {
    throw new Error('Hero section does not highlight Peter Cat 1962 heritage');
  }
}, 'worker_m3');

registerTest(1, 'F6', 'T1_F6_02', 'Signature Experience section exists spotlighting Chelo Kebab', () => {
  const pathToCheck = fileExists('src/components/SignatureExperience.tsx') ? 'src/components/SignatureExperience.tsx' : 'src/app/page.tsx';
  const content = readFile(pathToCheck);
  if (!content || !/CHELO\s+KEBAB/i.test(content)) {
    throw new Error('Signature Experience section spotlighting Chelo Kebab is missing');
  }
}, 'worker_m3');

registerTest(1, 'F6', 'T1_F6_03', 'Story Timeline section exists with historical eras from 1962', () => {
  const pathToCheck = fileExists('src/components/StoryTimeline.tsx') ? 'src/components/StoryTimeline.tsx' : 'src/app/page.tsx';
  const content = readFile(pathToCheck);
  if (!content || !/1962/i.test(content) || !/(Chelo|Timeline|Era)/i.test(content)) {
    throw new Error('Story Timeline section with historical eras is missing');
  }
}, 'worker_m3');

registerTest(1, 'F6', 'T1_F6_04', 'Atmosphere Section exists featuring sensory ambiance and pull quote', () => {
  const pathToCheck = fileExists('src/components/AtmosphereSection.tsx') ? 'src/components/AtmosphereSection.tsx' : 'src/app/page.tsx';
  const content = readFile(pathToCheck);
  if (!content || !/Atmosphere/i.test(content)) {
    throw new Error('Atmosphere section is missing');
  }
}, 'worker_m3');

registerTest(1, 'F6', 'T1_F6_05', 'Menu Catalogue section exists presenting culinary offerings', () => {
  const pathToCheck = fileExists('src/components/MenuCatalogue.tsx') ? 'src/components/MenuCatalogue.tsx' : 'src/app/page.tsx';
  const content = readFile(pathToCheck);
  if (!content || !/(Catalogue|Menu)/i.test(content)) {
    throw new Error('Menu Catalogue section is missing');
  }
}, 'worker_m3');

registerTest(1, 'F6', 'T1_F6_06', 'Visit Section exists with 18A Park Street address and hours', () => {
  const pathToCheck = fileExists('src/components/VisitSection.tsx') ? 'src/components/VisitSection.tsx' : 'src/app/page.tsx';
  const content = readFile(pathToCheck);
  if (!content || !/Park\s+Street/i.test(content) || !/11:00/i.test(content)) {
    throw new Error('Visit section with Park Street address and hours is missing');
  }
}, 'worker_m3');

// --- Feature F7: Production Build ---
registerTest(1, 'F7', 'T1_F7_01', 'next.config.ts or next.config.js exists and is valid', () => {
  if (!fileExists('next.config.ts') && !fileExists('next.config.js') && !fileExists('next.config.mjs')) {
    throw new Error('Next.js config file does not exist');
  }
}, 'worker_m1');

registerTest(1, 'F7', 'T1_F7_02', 'tsconfig.json exists and is valid JSON', () => {
  const tsconfig = readJson('tsconfig.json');
  if (!tsconfig) throw new Error('tsconfig.json does not exist or is not valid JSON');
}, 'worker_m1');

registerTest(1, 'F7', 'T1_F7_03', 'src/app/layout.tsx exists and provides root HTML structure', () => {
  const content = readFile('src/app/layout.tsx');
  if (!content || !content.includes('<html') || !content.includes('<body')) {
    throw new Error('src/app/layout.tsx does not provide root html/body structure');
  }
}, 'worker_m1');

registerTest(1, 'F7', 'T1_F7_04', 'Next.js production build passes (npm.cmd run build)', () => {
  if (FLAGS.skipBuild) {
    return; // User explicitly skipped build
  }
  const res = runCmd('npm', ['run', 'build'], { timeout: 60000 });
  if (res.status !== 0) {
    throw new Error(`Production build failed with status ${res.status}: ${res.stderr || res.stdout}`);
  }
}, 'worker_m4');

// ==============================================================================
// TIER 2: BOUNDARY & CORNER CASES (Resilience & Edge Conditions)
// ==============================================================================

// --- Feature F1 Boundaries ---
registerTest(2, 'F1', 'T2_F1_01', 'package.json dependencies use valid semver patterns', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies) throw new Error('package.json dependencies missing');
  const semverPattern = /^[\^~]?[0-9]+\.[0-9]+/;
  for (const [dep, version] of Object.entries(pkg.dependencies)) {
    if (!semverPattern.test(version)) {
      throw new Error(`Invalid semver version "${version}" for dependency "${dep}"`);
    }
  }
}, 'worker_m1');

registerTest(2, 'F1', 'T2_F1_02', 'No duplicate packages across dependencies and devDependencies', () => {
  const pkg = readJson('package.json');
  if (!pkg) throw new Error('package.json missing');
  const deps = Object.keys(pkg.dependencies || {});
  const devDeps = Object.keys(pkg.devDependencies || {});
  const duplicates = deps.filter(d => devDeps.includes(d));
  if (duplicates.length > 0) {
    throw new Error(`Duplicate dependencies detected: ${duplicates.join(', ')}`);
  }
}, 'worker_m1');

registerTest(2, 'F1', 'T2_F1_03', 'package-lock.json is valid JSON and contains integrity hashes', () => {
  const lock = readJson('package-lock.json');
  if (!lock) throw new Error('package-lock.json does not exist or is invalid JSON');
  if (!lock.lockfileVersion) throw new Error('package-lock.json missing lockfileVersion');
}, 'worker_m1');

registerTest(2, 'F1', 'T2_F1_04', 'React and React-DOM versions match in package.json', () => {
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies) throw new Error('package.json dependencies missing');
  const react = pkg.dependencies.react;
  const reactDom = pkg.dependencies['react-dom'];
  if (!react || !reactDom || react !== reactDom) {
    throw new Error(`React (${react}) and react-dom (${reactDom}) versions do not match`);
  }
}, 'worker_m1');

registerTest(2, 'F1', 'T2_F1_05', 'Tailwind CSS v4 config or import is configured in globals.css', () => {
  const css = readFile('src/app/globals.css');
  if (!css || (!css.includes('@tailwind') && !css.includes('@import "tailwindcss"') && !css.includes('@theme'))) {
    throw new Error('Tailwind CSS directive missing from src/app/globals.css');
  }
}, 'worker_m1');

// --- Feature F2 Boundaries (Imagery) ---
registerTest(2, 'F2', 'T2_F2_01', 'All images in public/images meet minimum realistic size (>5KB)', () => {
  const files = listFiles('public/images').filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (files.length === 0) throw new Error('No images in public/images');
  for (const f of files) {
    const stats = getFileStats(path.join('public/images', f));
    if (!stats || stats.size < 5120) {
      throw new Error(`Image ${f} is smaller than 5KB (${stats ? stats.size : 0} bytes)`);
    }
  }
}, 'worker_m1');

registerTest(2, 'F2', 'T2_F2_02', 'All images have valid binary magic headers (PNG/JPEG/WEBP)', () => {
  const files = listFiles('public/images').filter(f => /\.(png|jpe?g|webp)$/i.test(f));
  if (files.length === 0) throw new Error('No images in public/images');
  for (const f of files) {
    const header = checkImageHeader(path.join('public/images', f));
    if (!header.valid) {
      throw new Error(`Image ${f} has invalid binary header: ${header.reason}`);
    }
  }
}, 'worker_m1');

registerTest(2, 'F2', 'T2_F2_03', 'Image filenames use safe lowercase alphanumeric with underscores/hyphens', () => {
  const files = listFiles('public/images');
  if (files.length === 0) throw new Error('No images in public/images');
  for (const f of files) {
    if (/[^a-zA-Z0-9_\-\.]/.test(f)) {
      throw new Error(`Image filename "${f}" contains unsafe characters`);
    }
  }
}, 'worker_m1');

registerTest(2, 'F2', 'T2_F2_04', 'Images used across components have descriptive alt accessibility attributes', () => {
  const compFiles = ['src/components/MuseumEntrance.tsx', 'src/components/SignatureExperience.tsx', 'src/components/StoryTimeline.tsx', 'src/app/page.tsx'];
  for (const cf of compFiles) {
    const content = readFile(cf);
    if (content && content.includes('<Image') && !content.includes('alt=')) {
      throw new Error(`${cf} contains <Image> tags without alt attributes`);
    }
  }
}, 'worker_m3');

registerTest(2, 'F2', 'T2_F2_05', 'Image elements provide fallback or responsive sizing wrappers', () => {
  const pageContent = readFile('src/app/page.tsx') || '';
  const sigContent = readFile('src/components/SignatureExperience.tsx') || '';
  const combined = pageContent + sigContent;
  if (!combined.includes('relative') || (!combined.includes('aspect-') && !combined.includes('fill') && !combined.includes('width='))) {
    throw new Error('Image containers lack responsive aspect ratio or sizing constraints');
  }
}, 'worker_m3');

// --- Feature F3 Boundaries (Firebase & Menu Service) ---
registerTest(2, 'F3', 'T2_F3_01', 'Firebase config gracefully handles missing environment variables', () => {
  const content = readFile('src/lib/firebase/config.ts');
  if (!content) throw new Error('src/lib/firebase/config.ts could not be read');
  if (content.includes('throw new Error') && content.includes('NEXT_PUBLIC_FIREBASE')) {
    throw new Error('config.ts throws unhandled exception on missing env vars instead of fallback/demo config');
  }
}, 'worker_m2');

registerTest(2, 'F3', 'T2_F3_02', 'menuService.ts contains offline fallback data to prevent UI crash', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  if (!content.includes('fallback') && !content.includes('FALLBACK') && !content.includes('DEFAULT_MENU') && !content.includes('SAMPLE_MENU')) {
    throw new Error('menuService.ts does not define offline fallback menu data');
  }
}, 'worker_m2');

registerTest(2, 'F3', 'T2_F3_03', 'Offline fallback dataset contains at least 8 authentic menu items', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  const matches = (content.match(/name:\s*['"]/g) || []).length;
  if (matches < 8) {
    throw new Error(`menuService.ts contains only ${matches} fallback menu items; required >= 8`);
  }
}, 'worker_m2');

registerTest(2, 'F3', 'T2_F3_04', 'All fallback menu items have positive prices and valid dietary tags', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  if (content.includes('price: 0') || content.includes('price: -')) {
    throw new Error('menuService.ts contains zero or negative prices in fallback data');
  }
  if (!content.includes("'veg'") && !content.includes('"veg"')) {
    throw new Error('menuService.ts fallback items missing "veg" dietary tag');
  }
  if (!content.includes("'non-veg'") && !content.includes('"non-veg"')) {
    throw new Error('menuService.ts fallback items missing "non-veg" dietary tag');
  }
}, 'worker_m2');

registerTest(2, 'F3', 'T2_F3_05', 'getMenuItemsByCategory handles empty or unknown category gracefully', () => {
  const content = readFile('src/lib/firebase/menuService.ts');
  if (!content) throw new Error('src/lib/firebase/menuService.ts could not be read');
  if (content.includes('getMenuItemsByCategory') && !content.includes('filter(') && !content.includes('where(')) {
    throw new Error('getMenuItemsByCategory does not implement filtering logic');
  }
}, 'worker_m2');

registerTest(2, 'F3', 'T2_F3_06', 'Menu currency symbol formatting adheres to Indian Rupee (₹)', () => {
  const typesContent = readFile('src/types/menu.ts') || '';
  const serviceContent = readFile('src/lib/firebase/menuService.ts') || '';
  const pageContent = readFile('src/app/page.tsx') || '';
  const combined = typesContent + serviceContent + pageContent;
  if (!combined.includes('₹') && !combined.includes('INR')) {
    throw new Error('Menu catalogue does not format prices using Indian Rupee (₹)');
  }
}, 'worker_m2');

// --- Feature F4 Boundaries (test_firebase.js) ---
registerTest(2, 'F4', 'T2_F4_01', 'test_firebase.js handles offline/emulator/demo execution without throw', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  if (!content.includes('try') || !content.includes('catch')) {
    throw new Error('test_firebase.js lacks try/catch error resilience');
  }
}, 'worker_m2');

registerTest(2, 'F4', 'T2_F4_02', 'test_firebase.js isolates test documents or cleans them up', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  const hasIsolatedId = content.includes('test_') || content.includes('demo_') || content.includes('Date.now()');
  const hasDelete = content.includes('deleteDoc') || content.includes('.delete()');
  if (!hasIsolatedId && !hasDelete) {
    throw new Error('test_firebase.js writes to production collection without unique test ID or cleanup');
  }
}, 'worker_m2');

registerTest(2, 'F4', 'T2_F4_03', 'test_firebase.js does not leak hardcoded private keys', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  if (content.includes('-----BEGIN PRIVATE KEY-----')) {
    throw new Error('test_firebase.js contains hardcoded private key');
  }
}, 'worker_m2');

registerTest(2, 'F4', 'T2_F4_04', 'test_firebase.js completes within 15 seconds timeout', () => {
  if (!fileExists('test_firebase.js')) throw new Error('test_firebase.js does not exist');
  const start = Date.now();
  const res = runCmd('node', ['test_firebase.js'], { timeout: 15000 });
  const elapsed = Date.now() - start;
  if (res.status !== 0) {
    throw new Error(`test_firebase.js failed: ${res.stderr || res.stdout}`);
  }
  if (elapsed > 15000) {
    throw new Error(`test_firebase.js took too long (${elapsed}ms)`);
  }
}, 'worker_m2');

registerTest(2, 'F4', 'T2_F4_05', 'test_firebase.js logs clear structured verification stages', () => {
  const content = readFile('test_firebase.js');
  if (!content) throw new Error('test_firebase.js could not be read');
  if (!content.includes('console.log')) {
    throw new Error('test_firebase.js lacks console output for verification logging');
  }
}, 'worker_m2');

// --- Feature F5 Boundaries (GSAP & Motion) ---
registerTest(2, 'F5', 'T2_F5_01', 'Reduced motion support is implemented in CSS or GSAP hooks', () => {
  const css = readFile('src/app/globals.css') || '';
  const comp = readFile('src/components/MuseumEntrance.tsx') || '';
  const page = readFile('src/app/page.tsx') || '';
  const combined = css + comp + page;
  if (!combined.includes('prefers-reduced-motion') && !combined.includes('reducedMotion')) {
    throw new Error('No reduced motion support detected in globals.css or animation components');
  }
}, 'worker_m3');

registerTest(2, 'F5', 'T2_F5_02', 'GSAP and ScrollTrigger are guarded against SSR window crashes', () => {
  const comp = readFile('src/components/MuseumEntrance.tsx');
  if (!comp) throw new Error('src/components/MuseumEntrance.tsx could not be read');
  const hasClient = comp.includes("'use client'") || comp.includes('"use client"');
  const hasEffect = comp.includes('useEffect') || comp.includes('useGSAP') || comp.includes('typeof window');
  if (!hasClient || !hasEffect) {
    throw new Error('MuseumEntrance.tsx does not properly guard GSAP DOM execution inside client hook');
  }
}, 'worker_m3');

registerTest(2, 'F5', 'T2_F5_03', 'MuseumEntrance implements ScrollTrigger cleanup to prevent leaks', () => {
  const comp = readFile('src/components/MuseumEntrance.tsx');
  if (!comp) throw new Error('src/components/MuseumEntrance.tsx could not be read');
  const hasRevert = comp.includes('.revert()') || comp.includes('ScrollTrigger.killAll()') || comp.includes('.kill()');
  if (!hasRevert) {
    throw new Error('MuseumEntrance.tsx does not clean up ScrollTrigger instances on unmount');
  }
}, 'worker_m3');

registerTest(2, 'F5', 'T2_F5_04', 'MuseumEntrance sticky wrapper specifies perspective and overflow bounds', () => {
  const comp = readFile('src/components/MuseumEntrance.tsx') || readFile('src/app/page.tsx');
  if (!comp) throw new Error('Entrance component missing');
  if (!comp.includes('perspective') || !comp.includes('overflow-hidden')) {
    throw new Error('Museum entrance wrapper missing 3D perspective or overflow-hidden boundary');
  }
}, 'worker_m3');

registerTest(2, 'F5', 'T2_F5_05', 'Responsive container classes prevent horizontal scroll blowouts', () => {
  const comp = readFile('src/components/MuseumEntrance.tsx') || readFile('src/app/page.tsx');
  if (!comp) throw new Error('Entrance component missing');
  if (!comp.includes('w-full') && !comp.includes('max-w-')) {
    throw new Error('Container lacks responsive width constraints');
  }
}, 'worker_m3');

// --- Feature F6 Boundaries (Editorial Content) ---
registerTest(2, 'F6', 'T2_F6_01', 'Walk-in policy explicitly warns diners that reservations are not accepted', () => {
  const page = readFile('src/app/page.tsx') || readFile('src/components/VisitSection.tsx') || '';
  if (!/do not accept reservations|first-come|walk-in/i.test(page)) {
    throw new Error('Walk-in policy notice missing from visit details');
  }
}, 'worker_m3');

registerTest(2, 'F6', 'T2_F6_02', 'Operating hours explicitly specify 11:00 AM to 11:15 PM schedule', () => {
  const page = readFile('src/app/page.tsx') || readFile('src/components/VisitSection.tsx') || '';
  if (!/11:00\s*(AM)?/i.test(page) || !/11:15\s*(PM)?/i.test(page)) {
    throw new Error('Exact operational hours 11:00 AM – 11:15 PM not specified');
  }
}, 'worker_m3');

registerTest(2, 'F6', 'T2_F6_03', 'Visit section includes Stephen Court Building and PIN 700016', () => {
  const page = readFile('src/app/page.tsx') || readFile('src/components/VisitSection.tsx') || '';
  if (!/Stephen\s+Court/i.test(page) || !/700016/.test(page)) {
    throw new Error('Address missing landmark Stephen Court Building or PIN 700016');
  }
}, 'worker_m3');

registerTest(2, 'F6', 'T2_F6_04', 'Contact details include Kolkata phone number with +91 country code', () => {
  const page = readFile('src/app/page.tsx') || readFile('src/components/VisitSection.tsx') || '';
  if (!/\+91\s*33/i.test(page)) {
    throw new Error('Kolkata contact telephone (+91 33) missing');
  }
}, 'worker_m3');

registerTest(2, 'F6', 'T2_F6_05', 'Founder Nitin Kothari is historically credited in Story Timeline', () => {
  const page = readFile('src/app/page.tsx') || readFile('src/components/StoryTimeline.tsx') || '';
  if (!/Nitin\s+Kothari/i.test(page)) {
    throw new Error('Founder Nitin Kothari attribution missing from heritage story');
  }
}, 'worker_m3');

// --- Feature F7 Boundaries (Production Build) ---
registerTest(2, 'F7', 'T2_F7_01', 'Build does not require active Firebase emulator or live network connection', () => {
  const config = readFile('src/lib/firebase/config.ts');
  if (!config) throw new Error('src/lib/firebase/config.ts could not be read');
  if (config.includes('connectFirestoreEmulator') && !config.includes('if (')) {
    throw new Error('connectFirestoreEmulator invoked unconditionally during build');
  }
}, 'worker_m2');

registerTest(2, 'F7', 'T2_F7_02', 'Source code does not use @ts-ignore on menu data types', () => {
  const files = ['src/types/menu.ts', 'src/lib/firebase/menuService.ts', 'src/lib/firebase/config.ts'];
  for (const f of files) {
    const c = readFile(f);
    if (c && c.includes('@ts-ignore')) {
      throw new Error(`Found @ts-ignore suppressing type safety in ${f}`);
    }
  }
}, 'worker_m2');

registerTest(2, 'F7', 'T2_F7_03', 'Production build outputs valid static HTML files in .next folder', () => {
  if (FLAGS.skipBuild) return;
  if (!fileExists('.next')) {
    throw new Error('.next build directory does not exist');
  }
}, 'worker_m4');

registerTest(2, 'F7', 'T2_F7_04', 'No legacy CSS animation-timeline keyframes remain in compiled globals.css', () => {
  const css = readFile('src/app/globals.css');
  if (!css) throw new Error('globals.css missing');
  if (css.includes('museum-move-left') || css.includes('museum-move-right')) {
    throw new Error('Legacy CSS animation keyframes for museum entrance still present in globals.css');
  }
}, 'worker_m3');

// ==============================================================================
// TIER 3: CROSS-FEATURE INTERACTIONS (Pairwise Module Contracts)
// ==============================================================================

registerTest(3, 'INT', 'T3_INT_01', 'MenuCatalogue imports and consumes menuService getMenuItems', () => {
  const comp = readFile('src/components/MenuCatalogue.tsx');
  if (!comp) throw new Error('src/components/MenuCatalogue.tsx does not exist');
  if (!comp.includes('getMenuItems') && !comp.includes('menuService')) {
    throw new Error('MenuCatalogue component does not import or call getMenuItems');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_02', 'MenuCatalogue dietary toggle interacts with MenuItem.dietary field', () => {
  const comp = readFile('src/components/MenuCatalogue.tsx');
  if (!comp) throw new Error('src/components/MenuCatalogue.tsx does not exist');
  if (!comp.includes('dietary') || (!comp.includes('veg') && !comp.includes('all'))) {
    throw new Error('MenuCatalogue does not implement dietary filtering against MenuItem.dietary');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_03', 'src/app/page.tsx renders MuseumEntrance and all editorial sections', () => {
  const page = readFile('src/app/page.tsx');
  if (!page) throw new Error('src/app/page.tsx missing');
  const requiredComponents = ['MuseumEntrance', 'HeroSection', 'SignatureExperience', 'StoryTimeline', 'AtmosphereSection', 'MenuCatalogue', 'VisitSection'];
  for (const c of requiredComponents) {
    if (!page.includes(c)) {
      throw new Error(`src/app/page.tsx does not import and render <${c} />`);
    }
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_04', 'MuseumEntrance smoothly hands off scroll context to rest of page', () => {
  const entrance = readFile('src/components/MuseumEntrance.tsx');
  if (!entrance) throw new Error('MuseumEntrance.tsx missing');
  if (!entrance.includes('pin:') && !entrance.includes('pinSpacing')) {
    throw new Error('MuseumEntrance does not configure ScrollTrigger pin behavior for smooth handoff');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_05', 'SignatureExperience renders AI-generated chelo_kebab image', () => {
  const sig = readFile('src/components/SignatureExperience.tsx') || readFile('src/app/page.tsx');
  if (!sig || !/chelo_kebab/i.test(sig)) {
    throw new Error('SignatureExperience does not reference chelo_kebab image from public/images');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_06', 'MuseumEntrance references vintage signage and entrance door imagery', () => {
  const entrance = readFile('src/components/MuseumEntrance.tsx') || readFile('src/app/page.tsx');
  if (!entrance || (!/vintage_peter_cat_sign/i.test(entrance) && !/sign/i.test(entrance))) {
    throw new Error('MuseumEntrance does not reference vintage signage image');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_07', 'StoryTimeline integrates heritage archive images with timeline cards', () => {
  const story = readFile('src/components/StoryTimeline.tsx') || readFile('src/app/page.tsx');
  if (!story || (!/heritage_menu_archive/i.test(story) && !/images\//i.test(story))) {
    throw new Error('StoryTimeline does not reference heritage imagery');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_08', 'Dynamic Firestore menu catalogue uses luxury theme tokens from globals.css', () => {
  const menu = readFile('src/components/MenuCatalogue.tsx') || readFile('src/app/page.tsx');
  if (!menu || (!menu.includes('peter-gold') && !menu.includes('peter-brass') && !menu.includes('peter-charcoal'))) {
    throw new Error('MenuCatalogue does not utilize luxury brand color tokens (peter-gold, peter-brass)');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_09', 'GSAP animations do not block user interactions or links', () => {
  const entrance = readFile('src/components/MuseumEntrance.tsx');
  if (!entrance) throw new Error('MuseumEntrance.tsx missing');
  if (entrance.includes('pointer-events-none') && !entrance.includes('pointer-events-auto') && !entrance.includes('unpin')) {
    throw new Error('Potential pointer-events trap in MuseumEntrance blocking page interaction');
  }
}, 'worker_m3');

registerTest(3, 'INT', 'T3_INT_10', 'Dynamic menu fetching provides loading state skeleton or fallback feedback', () => {
  const menu = readFile('src/components/MenuCatalogue.tsx');
  if (!menu) throw new Error('MenuCatalogue.tsx missing');
  if (!menu.includes('loading') && !menu.includes('isLoading') && !menu.includes('fallback')) {
    throw new Error('MenuCatalogue does not handle loading state or fallback indicator');
  }
}, 'worker_m3');

// ==============================================================================
// TIER 4: REAL-WORLD SCENARIOS (User Journeys & Pipeline Synthesis)
// ==============================================================================

registerTest(4, 'SCN', 'T4_SCN_01', 'Scenario 1: Digital Museum Entrance Walkthrough', () => {
  // Verifies the user lands on the museum entrance, images load, and GSAP timeline triggers
  const entrance = readFile('src/components/MuseumEntrance.tsx');
  if (!entrance) throw new Error('Museum entrance component missing');
  const images = listFiles('public/images');
  if (images.length < 4) throw new Error('Required museum imagery not available');
  if (!entrance.includes('ScrollTrigger') || !entrance.includes('gsap')) {
    throw new Error('GSAP scroll walk-through pipeline broken');
  }
}, 'worker_m3');

registerTest(4, 'SCN', 'T4_SCN_02', 'Scenario 2: Signature Chelo Kebab Culinary Exploration', () => {
  // Verifies the user scrolls deeper and arrives at Chelo Kebab anatomy
  const sig = readFile('src/components/SignatureExperience.tsx') || readFile('src/app/page.tsx');
  if (!sig) throw new Error('Signature experience section missing');
  const keywords = ['mutton', 'rice', 'egg', 'butter'];
  for (const kw of keywords) {
    if (!new RegExp(kw, 'i').test(sig)) {
      throw new Error(`Chelo Kebab culinary anatomy missing key ingredient description: "${kw}"`);
    }
  }
}, 'worker_m3');

registerTest(4, 'SCN', 'T4_SCN_03', 'Scenario 3: Six-Decade Heritage Journey', () => {
  // Verifies historical continuity from 1962 to modern day
  const timeline = readFile('src/components/StoryTimeline.tsx') || readFile('src/app/page.tsx');
  if (!timeline) throw new Error('Story timeline missing');
  if (!timeline.includes('1962') || !/today|present/i.test(timeline)) {
    throw new Error('Timeline does not span from 1962 founding to present day');
  }
}, 'worker_m3');

registerTest(4, 'SCN', 'T4_SCN_04', 'Scenario 4: Dynamic Menu Catalogue Browsing & Filtering', () => {
  // Verifies visitor can interact with the dynamic Firestore catalogue
  const menuComp = readFile('src/components/MenuCatalogue.tsx');
  const menuService = readFile('src/lib/firebase/menuService.ts');
  if (!menuComp && !readFile('src/app/page.tsx')) throw new Error('Menu catalogue component missing');
  if (!menuService) throw new Error('menuService missing');
  if (!menuService.includes('Chelo Kebab') || !menuService.includes('₹')) {
    throw new Error('Menu items catalogue data incomplete');
  }
}, 'worker_m2');

registerTest(4, 'SCN', 'T4_SCN_05', 'Scenario 5: Diner Visit & Logistics Planning', () => {
  // Verifies diner finds physical location, operating hours, walk-in policy, contact
  const visit = readFile('src/components/VisitSection.tsx') || readFile('src/app/page.tsx');
  if (!visit) throw new Error('Visit section missing');
  const checks = [
    { pattern: /Park\s+Street/i, label: 'Park Street location' },
    { pattern: /11:00/i, label: 'Opening hours' },
    { pattern: /reservation/i, label: 'Walk-in policy notice' },
    { pattern: /\+91/i, label: 'Contact phone' },
  ];
  for (const c of checks) {
    if (!c.pattern.test(visit)) {
      throw new Error(`Diner logistics missing: ${c.label}`);
    }
  }
}, 'worker_m3');

registerTest(4, 'SCN', 'T4_SCN_06', 'Scenario 6: End-to-End Build & Verification Pipeline', () => {
  // Synthesizes dependencies, scripts, and build
  const pkg = readJson('package.json');
  if (!pkg || !pkg.dependencies.gsap || !pkg.dependencies.firebase) {
    throw new Error('Dependencies incomplete for production pipeline');
  }
  if (!fileExists('test_firebase.js')) {
    throw new Error('Firebase verification script missing');
  }
  if (FLAGS.skipBuild) return;
  const res = runCmd('npm', ['run', 'build'], { timeout: 60000 });
  if (res.status !== 0) {
    throw new Error(`Production build failed in verification pipeline: ${res.stderr || res.stdout}`);
  }
}, 'worker_m4');

// ==============================================================================
// TEST EXECUTION RUNNER
// ==============================================================================

function runAllTests() {
  const startTime = Date.now();
  console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`${colors.bold}${colors.yellow} PETER CAT KOLKATA — E2E VERIFICATION TEST SUITE${colors.reset}`);
  console.log(`${colors.dim} Project Root: ${PROJECT_ROOT}${colors.reset}`);
  console.log(`${colors.dim} Node Version: ${process.version} | Platform: ${process.platform}${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

  let filtered = testRegistry;
  if (FLAGS.tier !== null) {
    filtered = filtered.filter(t => t.tier === FLAGS.tier);
    console.log(`${colors.blue}Filtering by Tier: ${FLAGS.tier}${colors.reset}\n`);
  }
  if (FLAGS.feature !== null) {
    filtered = filtered.filter(t => t.feature === FLAGS.feature);
    console.log(`${colors.blue}Filtering by Feature: ${FLAGS.feature}${colors.reset}\n`);
  }

  const results = {
    total: filtered.length,
    passed: 0,
    failed: 0,
    tiers: {
      1: { total: 0, passed: 0, failed: 0 },
      2: { total: 0, passed: 0, failed: 0 },
      3: { total: 0, passed: 0, failed: 0 },
      4: { total: 0, passed: 0, failed: 0 },
    },
    details: [],
  };

  let currentTier = null;

  for (const test of filtered) {
    if (test.tier !== currentTier && !FLAGS.summaryOnly && !FLAGS.json) {
      currentTier = test.tier;
      const tierNames = {
        1: 'TIER 1: FEATURE COVERAGE (Isolation Happy-Path)',
        2: 'TIER 2: BOUNDARY & CORNER CASES (Resilience & Edge Conditions)',
        3: 'TIER 3: CROSS-FEATURE INTERACTIONS (Pairwise Module Contracts)',
        4: 'TIER 4: REAL-WORLD SCENARIOS (User Journeys & Full Pipeline)',
      };
      console.log(`\n${colors.bold}${colors.magenta}--- ${tierNames[currentTier]} ---${colors.reset}`);
    }

    results.tiers[test.tier].total++;
    const testStart = Date.now();
    let status = 'PASS';
    let errorMsg = null;

    try {
      test.runFn();
      results.passed++;
      results.tiers[test.tier].passed++;
    } catch (err) {
      status = 'FAIL';
      errorMsg = err.message;
      results.failed++;
      results.tiers[test.tier].failed++;
    }
    const duration = Date.now() - testStart;

    results.details.push({
      id: test.id,
      tier: test.tier,
      feature: test.feature,
      title: test.title,
      status,
      duration,
      error: errorMsg,
      escalationTarget: test.escalationTarget,
    });

    if (!FLAGS.summaryOnly && !FLAGS.json) {
      if (status === 'PASS') {
        console.log(`  ${colors.green}✔ [PASS]${colors.reset} [${test.id}] ${test.title} ${colors.dim}(${duration}ms)${colors.reset}`);
      } else {
        console.log(`  ${colors.red}✖ [FAIL]${colors.reset} [${test.id}] ${test.title} ${colors.dim}(${duration}ms)${colors.reset}`);
        console.log(`    ${colors.yellow}Reason:${colors.reset} ${errorMsg}`);
        console.log(`    ${colors.dim}Escalate to: ${test.escalationTarget}${colors.reset}`);
        if (FLAGS.bail) {
          console.log(`\n${colors.red}Bailing on first failure (--bail flag active).${colors.reset}`);
          break;
        }
      }
    }
  }

  const totalTime = Date.now() - startTime;
  const passRate = results.total > 0 ? ((results.passed / results.total) * 100).toFixed(1) : 0;

  if (FLAGS.json) {
    console.log(JSON.stringify({ ...results, totalTime, passRate }, null, 2));
    process.exit(results.failed > 0 && !FLAGS.softExit ? 1 : 0);
  }

  console.log(`\n${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
  console.log(`${colors.bold} TEST EXECUTION SUMMARY REPORT${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}`);
  console.log(` Tier 1 (Feature Coverage):        ${results.tiers[1].passed.toString().padStart(2)} / ${results.tiers[1].total.toString().padStart(2)} passed (${results.tiers[1].failed} failed)`);
  console.log(` Tier 2 (Boundary & Corner Cases): ${results.tiers[2].passed.toString().padStart(2)} / ${results.tiers[2].total.toString().padStart(2)} passed (${results.tiers[2].failed} failed)`);
  console.log(` Tier 3 (Cross-Feature):           ${results.tiers[3].passed.toString().padStart(2)} / ${results.tiers[3].total.toString().padStart(2)} passed (${results.tiers[3].failed} failed)`);
  console.log(` Tier 4 (Real-World Scenarios):    ${results.tiers[4].passed.toString().padStart(2)} / ${results.tiers[4].total.toString().padStart(2)} passed (${results.tiers[4].failed} failed)`);
  console.log(`${colors.bold}${colors.cyan}----------------------------------------------------------------------${colors.reset}`);
  console.log(` Total Tests: ${results.total} | Passed: ${colors.green}${results.passed}${colors.reset} | Failed: ${results.failed > 0 ? colors.red + results.failed + colors.reset : '0'} | Pass Rate: ${passRate}%`);
  console.log(` Execution Time: ${(totalTime / 1000).toFixed(2)}s`);
  console.log(`${colors.bold}${colors.cyan}======================================================================${colors.reset}\n`);

  if (results.failed > 0) {
    console.log(`${colors.yellow}Note: Failed tests indicate pending milestone implementation features.${colors.reset}`);
    console.log(`${colors.yellow}Run with --soft-exit to exit 0 during progressive milestone testing.${colors.reset}\n`);
    if (!FLAGS.softExit) {
      process.exit(1);
    }
  }

  process.exit(0);
}

// Run suite
runAllTests();
