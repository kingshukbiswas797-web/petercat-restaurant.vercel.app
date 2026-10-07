# Project Codebase & Environment Survey Report

**Date**: 2026-10-07  
**Agent**: `explorer_survey_1`  
**Target Project**: `cool-archimedes` (Peter Cat, Kolkata Website)  
**Project Path**: `c:\Users\kings\Documents\antigravity\cool-archimedes`

---

## Executive Summary

The project is an existing Next.js 16.4.0 application with React 19.3.0 and Tailwind CSS v4, initialized with the Next.js App Router (`src/app/`). A static HTML/CSS scaffolding for Peter Cat (Kolkata) already exists in `src/app/page.tsx` and `src/app/globals.css`. 

However:
1. The existing museum entrance uses experimental **CSS scroll-driven animations** (`animation-timeline: --page-scroll`), which violates Requirement R1 (requiring **GSAP** and **ScrollTrigger**).
2. Neither **`gsap`** nor **`firebase`** is installed in `package.json` or `node_modules`. (A dry-run test confirms they install cleanly without peer dependency conflicts).
3. The menu is currently hardcoded static data; no Firebase integration or `test_firebase.js` script exists.
4. No AI-generated imagery exists yet in `public/`; `page.tsx` currently references Unsplash URLs and placeholder text.
5. On Windows PowerShell, running `npm` directly is blocked by execution policy (`npm.ps1` UnauthorizedAccess). Commands must be invoked via `cmd /c npm ...` or `npm.cmd ...`.
6. Java is not installed on this machine, meaning the official Java-based Firebase Local Emulator (`firebase-tools`) cannot run without a Java runtime. A live Firestore project or a lightweight mock/emulator must be used for Firestore verification.

---

## 1. Project Files, Directory Structure & Dependencies

### Directory Tree Overview
```
c:\Users\kings\Documents\antigravity\cool-archimedes\
├── .agents\
│   └── teamwork\
│       ├── ORIGINAL_REQUEST.md
│       └── explorer_survey_1\
├── .git\
├── .gitignore
├── AGENTS.md                  # Next.js 16 agent guidelines and docs pointer
├── eslint.config.mjs          # Flat ESLint configuration (v9)
├── guides.md                  # Reference documentation on CSS scroll-driven animations
├── next-env.d.ts
├── next.config.ts             # Cache Components + Partial Prefetching + Turbopack
├── package.json
├── package-lock.json
├── public\
│   ├── file.svg, globe.svg, next.svg, vercel.svg, window.svg
│   └── (No image assets currently exist)
├── src\
│   └── app\
│       ├── favicon.ico
│       ├── globals.css        # Peter Cat styles + CSS scroll-timeline animations
│       ├── layout.tsx         # Root layout with Inter & Playfair Display fonts
│       └── page.tsx           # 290-line static component with all sections
├── tailwind.config.ts         # Peter Cat custom palette (peter-black, peter-gold, etc.)
└── tsconfig.json              # Bundler module resolution, path alias @/* -> ./src/*
```

### `package.json` Analysis
```json
{
  "name": "cool-archimedes",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": {
    "next": "16.4.0",
    "react": "19.3.0",
    "react-dom": "19.3.0"
  },
  "devDependencies": {
    "@tailwindcss/turbopack": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.4.0",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### Scripts Available
- `npm run dev`: starts Next.js development server (`next dev`) with Turbopack.
- `npm run build`: builds the production application (`next build`). Tested and verified working (compiled in ~3.6s, static pages generated in ~599ms).
- `npm run start`: starts production server (`next start`).
- `npm run lint`: runs ESLint 9 using flat config.

---

## 2. Next.js Version, Architecture & Configurations

### Next.js & React Versions
- **Next.js**: `16.4.0` (Turbopack bundler default).
- **React**: `19.3.0` (React 19).
- **Node**: `v26.10.0`
- **npm**: `11.19.1`

### Router
- **App Router** (`src/app/`). There is no `pages/` directory.

### Configuration Files Deep-Dive

#### `next.config.ts`
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
```
- `cacheComponents: true` enables the Next.js 16 Cache Components architecture (`use cache`, instant navigation validation).
- `partialPrefetching: true` (PPR) is enabled.
- Turbopack rule integrates `@tailwindcss/turbopack` for CSS processing.

#### `tailwind.config.ts`
Tailwind CSS v4 is used. The theme extends custom Peter Cat brand colors and typography:
- `peter-black`: `#0A0A0A`
- `peter-charcoal`: `#1A1A1A`
- `peter-gold`: `#D4AF37`
- `peter-brass`: `#B5A642`
- `peter-offwhite`: `#F5F5DC`
- `peter-crimson`: `#8B0000`
- `fontFamily.serif`: `var(--font-playfair-display)`, Georgia, serif
- `fontFamily.sans`: `var(--font-inter)`, Helvetica, Arial, sans-serif

#### `src/app/layout.tsx`
Google Fonts `Inter` and `Playfair_Display` are loaded via `next/font/google` and set as CSS variables `--font-inter` and `--font-playfair-display`. The `<body>` tag has `bg-peter-black text-peter-offwhite selection:bg-peter-gold`.

#### `src/app/page.tsx`
Currently a 290-line static server component containing:
1. **Museum Scroll Container**: Sticky viewport with tunnel entrance, `.museum-wall-left`, `.museum-wall-right`, `.door-container`, `.door-left-panel`, `.door-right-panel`.
2. **Hero Section**: Modern restaurant entrance with "PETER CAT - A Kolkata institution since 1962".
3. **Signature Experience**: "THE CHELO KEBAB" highlight.
4. **The Story Timeline**: 1962, The Chelo Era (1970s), Today.
5. **The Atmosphere**: Quotes and mood section.
6. **Menu Showcase**: Hardcoded list of 4 items (Chelo Kebab, Chicken Sizzler, Mutton Boti Kebab, Caramel Custard).
7. **Visit Peter Cat**: Address (18A Park Street), Hours, Contact, Monogram footer.

---

## 3. GSAP & Firebase Dependency Status

| Dependency | Present in `package.json` | Installed in `node_modules` | Status |
|---|---|---|---|
| `gsap` | ❌ No | ❌ No | Must be installed |
| `@gsap/react` | ❌ No | ❌ No | Recommended to install alongside `gsap` |
| `firebase` | ❌ No | ❌ No | Must be installed |

### Dry-Run Installation Verification
Executed: `cmd /c "npm install --dry-run gsap @gsap/react firebase"`
- Result: **Exit Code 0**
- Resolved versions:
  - `gsap@3.15.0`
  - `@gsap/react@2.1.2`
  - `firebase@12.19.0`
- Zero peer dependency conflicts with React 19.3.0 and Next.js 16.4.0.
- Command for implementer: `cmd /c "npm install gsap @gsap/react firebase"`

---

## 4. Build/Dev Setup & Critical Pitfalls

### Pitfall 1: Windows PowerShell Script Execution Policy
- **Observation**: Calling `npm run build` in PowerShell results in:
  `PSSecurityException: UnauthorizedAccess` because Windows blocks `npm.ps1`.
- **Solution**: Always invoke npm commands using `cmd /c npm ...` or `npm.cmd ...`.

### Pitfall 2: Existing CSS Scroll-Timeline vs. Required GSAP ScrollTrigger
- **Observation**: `src/app/globals.css` currently implements the museum entrance animation using `@keyframes museum-move-left`, `animation-timeline: --page-scroll`, `scroll-timeline-name: --page-scroll`.
- **Requirement R1**: Explicitly mandates: *"You must use GSAP (GreenSock) and ScrollTrigger to orchestrate these animations, avoiding pure CSS scroll timelines to ensure broad compatibility and complex choreography."*
- **Solution**: 
  - Remove or replace the pure CSS scroll timeline rules in `globals.css`.
  - Re-implement the museum entrance tunnel in a client component (`"use client"`) using `gsap` and `ScrollTrigger`.
  - Animate the camera/perspective walk-through (scale, translate3d, doorway opening, left/right gallery wall parallax) via GSAP timeline pinned to scroll.

### Pitfall 3: Next.js 16 Server Components vs. GSAP Client Hooks
- **Observation**: Next.js 16 with `cacheComponents: true` expects server components by default. GSAP requires DOM access (`document`, `window`, ref elements).
- **Solution**: Isolate animated components (or the entire interactive page) into `"use client"` components, registering `gsap.registerPlugin(ScrollTrigger)` safely within `useEffect` or `useGSAP`.

### Pitfall 4: Java Not Installed (Firebase Emulator Limitation)
- **Observation**: Running `java -version` returns `'java' is not recognized`.
- **Impact**: The official Firebase Local Emulator (`firebase-tools emulators:start`) requires the Java Runtime Environment (JRE). It cannot run locally without Java.
- **Requirement Verification**: Acceptance criteria states: *"A `test_firebase.js` script successfully writes a test menu item to the local emulator or live Firestore and reads it back."*
- **Solution Options for Implementation**:
  1. Use live Firestore with a real/demo Firebase project credentials or Firestore Web REST API / SDK in demo mode (`projectId: "demo-petercat"` or configured live credentials).
  2. Or write a self-contained test script / lightweight emulator bridge in Node.js for `test_firebase.js`.
  3. Provide mock/offline fallback data in the frontend if network is unavailable, while actively fetching from Firestore when online.

### Pitfall 5: Missing AI Generated Imagery (Requirement R2)
- **Observation**: No custom imagery exists in `public/`. `page.tsx` uses external Unsplash URLs and text placeholders.
- **Requirement R2 & Acceptance Criteria**: Must generate at least 4 distinct AI-generated images using `generate_image` tool:
  1. `chelo_kebab.png`: Peter Cat Chelo Kebab with buttered basmati rice, fried egg, roasted tomato, succulent minced kebabs.
  2. `original_sign.png`: Vintage Park Street neon / brass Peter Cat sign.
  3. `vintage_menu_1962.png`: 1962 original menu catalogue cover / artifact.
  4. `restaurant_atmosphere.png`: Atmospheric Peter Cat dining hall with warm brass lamps, turbanned stewards, dark wood paneling.
  These must be saved into `public/` and linked directly in the Next.js UI using `next/image`.

---

## 5. Recommended Next Steps for Implementation

1. **Install Dependencies**:
   ```cmd
   cmd /c "npm install gsap @gsap/react firebase"
   ```
2. **Generate AI Imagery (R2)**:
   Call `generate_image` to create high-resolution assets and save to `public/images/`.
3. **Build Firebase Service & Menu CMS (R3)**:
   - Create `src/lib/firebase.ts` for Firebase app and Firestore initialization.
   - Create menu seeding data (Chelo Kebab, Chicken Sizzler, Mutton Boti Kebab, Caramel Custard, etc.).
   - Create `test_firebase.js` in project root that writes and reads a menu item.
4. **Build GSAP Scroll Museum Entrance (R1)**:
   - Create a dedicated client component (e.g. `src/components/MuseumEntrance.tsx`) or refactor `page.tsx`.
   - Setup GSAP timeline with `ScrollTrigger` to control the perspective walk-through, wall divergence, and door opening.
5. **Connect Menu to Firestore**:
   - Replace hardcoded catalogue items with dynamic Firestore query.
6. **Verify Build & Run Tests**:
   - Run `cmd /c "node test_firebase.js"`
   - Run `cmd /c "npm run build"`
