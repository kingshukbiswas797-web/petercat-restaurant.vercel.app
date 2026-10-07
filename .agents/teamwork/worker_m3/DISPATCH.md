## 2026-10-07T11:29:46Z

You are worker_m3, an implementation worker for Milestone 3 of the Peter Cat website project.
Your working directory is: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\worker_m3
Project root is: c:\Users\kings\Documents\antigravity\cool-archimedes
Read the authoritative user request at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\ORIGINAL_REQUEST.md
Read the project specifications at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\orchestrator_1\PROJECT.md
Read the interaction and editorial survey report at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\explorer_survey_2\report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your write ownership:
You exclusively own:
- `src/app/globals.css`
- `src/components/MuseumEntrance.tsx`
- `src/components/HeroSection.tsx`
- `src/components/SignatureExperience.tsx`
- `src/components/StoryTimeline.tsx`
- `src/components/AtmosphereSection.tsx`
- `src/components/MenuCatalogue.tsx`
- `src/components/VisitSection.tsx`
- `src/app/page.tsx`

Your mission:
1. Refactor `src/app/globals.css`:
   - Completely remove the legacy pure CSS `scroll-timeline-name: --page-scroll`, `animation-timeline: --page-scroll`, and keyframes animations (lines 11-121) as mandated by Requirement R1.
   - Retain and enhance custom brand color tokens (`peter-black`, `peter-charcoal`, `peter-gold`, `peter-brass`, `peter-offwhite`, `peter-crimson`), fonts, and styling.
2. Build `src/components/MuseumEntrance.tsx` ('use client'):
   - Requirement R1: Scroll-driven cinematic entrance where the user "walks deeper" through vintage signage and historical photos into the restaurant using GSAP and ScrollTrigger.
   - Implement the 4-stage choreography from `explorer_survey_2/report.md`:
     Stage 1: Museum Threshold & Intro title dissolve
     Stage 2: Lateral Heritage Walls (left archival photos/menu, right vintage neon sign) fly backwards past camera
     Stage 3: Grand Double Doors (`museum_entrance_door.png`) 3D swing open and zoom into viewport
     Stage 4: Golden light spill transition into the modern restaurant
   - Register `gsap.registerPlugin(ScrollTrigger)` safely in browser context.
   - Use `gsap.context()` inside `useEffect` or `useGSAP` for proper cleanup on unmount.
   - Provide `prefers-reduced-motion` graceful fallback via `gsap.matchMedia()`.
3. Build the 6 Editorial Sections in `src/components/`:
   - `HeroSection.tsx`: Modern restaurant homepage revealed upon completing entrance transition. Background: `/images/atmospheric_dining_room.png`. Title, subtitle, CTA links to `#menu` and `#experience`.
   - `SignatureExperience.tsx`: Spotlights The Chelo Kebab using `/images/chelo_kebab.png` with brass filigree, storytelling copy, and interactive "Anatomy of a Legend" (Butter-Glazed Rice, Sunny-Side Yolk, Charcoal-Charred Seekh, Fire-Blistered Tomato).
   - `StoryTimeline.tsx`: Heritage story timeline (1962 founding, 1975 Chelo era, today) with illuminated brass nodes, `/images/heritage_menu_archive.png` and `/images/vintage_peter_cat_sign.png`.
   - `AtmosphereSection.tsx`: Editorial pull-quote and 4 sensory pillars (The Amber Glow, The Turbaned Stewards, The Sizzling Platter, The Teakwood Heritage).
   - `MenuCatalogue.tsx`: Dynamic client component actively fetching from `getMenuItems()` in `src/lib/firebase/menuService.ts`. Features interactive category tabs (`MENU_CATEGORIES`), dietary filter, search input, luxury cards in dark charcoal with brass borders and ₹ prices, and shimmering skeleton loading state.
   - `VisitSection.tsx`: Stephen Court Building 18A Park Street address, hours, the famous "Strictly Walk-in / No Reservations" tradition, phone number, and monogram crest footer.
4. Integrate everything into `src/app/page.tsx` assembling the sections seamlessly.
5. Verify build: Run `cmd /c "npm.cmd run build"` and verify it succeeds with exit code 0.
6. Verify test suite: Run `cmd /c "node test_e2e_suite.js --soft-exit"` and check results.

Document your commands, actions, and verification results in `handoff.md` in your working directory, and notify me via send_message.
