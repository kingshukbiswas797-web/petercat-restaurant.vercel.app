# Project: Peter Cat Kolkata Website

## Architecture
- **Framework**: Next.js 16.4.0 (App Router), React 19.3.0, TypeScript, Tailwind CSS v4.
- **Animation Engine**: GSAP 3.15+ and ScrollTrigger for complex scroll choreography (museum walk-through transition).
- **Backend & CMS**: Firebase (Firestore) for dynamic menu catalogue management and live client-side fetching.
- **Imagery**: High-resolution custom AI generated images (`public/images/`) created via `generate_image`.
- **Aesthetic**: Dark, warm, cinematic old-world luxury (Kolkata heritage, brass accents, deep mahogany, amber lighting).

## Code Layout
- `public/images/`: Local storage for custom generated images (`chelo_kebab.png`, `vintage_peter_cat_sign.png`, `atmospheric_dining_room.png`, `heritage_menu_archive.png`, `museum_entrance_door.png`).
- `src/types/menu.ts`: TypeScript definitions for menu items, categories, and dietary tags.
- `src/lib/firebase/config.ts`: Firebase App initialization and Firestore instance export.
- `src/lib/firebase/menuService.ts`: Firestore menu service (data fetching, offline/demo fallback, catalogue seeding).
- `src/components/MuseumEntrance.tsx`: GSAP + ScrollTrigger client component for the 4-stage museum entrance walk-through.
- `src/components/HeroSection.tsx`: Editorial modern restaurant hero section.
- `src/components/SignatureExperience.tsx`: The Chelo Kebab signature spotlight & interactive anatomy breakdown.
- `src/components/StoryTimeline.tsx`: Heritage story timeline (1962 to present).
- `src/components/AtmosphereSection.tsx`: Atmospheric sensory pillars and editorial pull-quotes.
- `src/components/MenuCatalogue.tsx`: Dynamic Firestore-backed menu showcase with categories, search, and dietary filters.
- `src/components/VisitSection.tsx`: Location, timings, walk-in policy, contact, and monogram footer.
- `src/app/page.tsx`: Main page assembling all components into an immersive, seamless flow.
- `src/app/globals.css`: Base styles, color tokens, typography, clean utility classes (pure CSS scroll-timeline removed).
- `test_firebase.js`: Verification script in project root for Firestore read/write testing.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Dependencies Setup | Install `gsap`, `@gsap/react`, `firebase`, verify `package.json` | M1 | ORIGINAL_REQUEST §Acceptance Criteria |
| F2 | Custom Generated Imagery | Generate at least 4 distinct AI images via `generate_image` in `public/images/` | M1 | ORIGINAL_REQUEST §R2 |
| F3 | Firebase & Firestore Menu CMS | Initialize Firestore, define schema, seed 12+ authentic items with offline resilience | M2 | ORIGINAL_REQUEST §R3 |
| F4 | test_firebase.js Verification Script | Standalone verification script writing and reading back menu item (exit code 0) | M2 | ORIGINAL_REQUEST §Acceptance Criteria |
| F5 | GSAP Scroll Transition | GSAP + ScrollTrigger 4-stage museum-to-restaurant walk-through animation | M3 | ORIGINAL_REQUEST §R1 |
| F6 | Editorial Luxury Sections | Build Hero, Signature Experience, Story Timeline, Atmosphere, Menu, and Visit | M3 | ORIGINAL_REQUEST §R4 |
| F7 | Full E2E & Production Build | Pass E2E test suite, `npm run build` succeeds, forensic integrity audit clean | M4 | ORIGINAL_REQUEST §Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Dependencies & Custom Imagery | Install `gsap`, `@gsap/react`, `firebase`; generate and place all 5 AI images | none | DONE |
| M2 | Firebase CMS & Verification Script | Implement Firestore types, config, service, seed data, and `test_firebase.js` | M1 | DONE |
| M3 | GSAP Transition & Editorial Sections | Refactor `globals.css`, build `MuseumEntrance.tsx`, all 6 editorial components, integrate in `page.tsx` | M1, M2 | DONE |
| M4 | Final Milestone: E2E Verification & Forensic Audit | Run E2E test suite, verify `npm run build`, reviewer, challenger, and forensic auditor gates | M3 | DONE |

## Interface Contracts
### `src/types/menu.ts` ↔ `src/components/MenuCatalogue.tsx`
- `MenuItem` shape:
  - `id`: string
  - `name`: string
  - `category`: MenuCategory
  - `price`: number
  - `currency`: string ("₹")
  - `description`: string
  - `heritageNotes`: string
  - `isSignature`: boolean
  - `dietary`: "veg" | "non-veg"
  - `badge`?: string
  - `imageUrl`?: string
  - `order`: number

### `src/lib/firebase/menuService.ts` ↔ `src/components/MenuCatalogue.tsx`
- `getMenuItems()`: Promise<MenuItem[]>
- `getMenuItemsByCategory(category: string)`: Promise<MenuItem[]>
- Built-in offline fallback data ensures zero UI crash under demo mode or offline states.

### `src/components/MuseumEntrance.tsx` ↔ `src/app/page.tsx`
- Standard client component with pinned ScrollTrigger container.
- Clean unpin handoff when scroll progress reaches 100%, allowing fluid navigation to the rest of the page.
