# Handoff Report — explorer_survey_2

**Agent**: `explorer_survey_2`  
**Working Directory**: `c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\explorer_survey_2`  
**Mission**: Survey interaction design, GSAP requirements, image assets requirements, and editorial sections.  
**Report Artifact**: `c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\explorer_survey_2\report.md`  

---

## 1. Observation

1. **`ORIGINAL_REQUEST.md` (lines 12–23, 29, 32–35)**:
   - *Requirement R1*: "Implement a scroll-driven cinematic entrance where the user 'walks deeper' through vintage signage and historical photos into the restaurant. **You must use GSAP (GreenSock) and ScrollTrigger** to orchestrate these animations, avoiding pure CSS scroll timelines to ensure broad compatibility and complex choreography."
   - *Requirement R2*: "Use the `generate_image` tool to create custom cinematic, vintage, and food imagery (specifically for the Chelo Kebab, the original sign, and atmospheric backgrounds) and integrate them into the site."
   - *Requirement R4*: "Build out the remaining sections (Hero, Signature Experience, The Story timeline, The Atmosphere, Menu, and Visit) combining Kolkata heritage, old-world luxury, and modern interaction. Do not use generic templates."
   - *Acceptance Criteria*: "`package.json` contains `gsap` as a dependency."
   - *Visual Rubric*: "The museum entrance acts as the first chapter. Scrolling physically transforms the viewport using GSAP (e.g. scaling, sliding) into the modern restaurant homepage, without feeling like a generic scroll-down. At least 4 distinct AI-generated images are successfully loaded and displayed in the UI."

2. **`package.json` (lines 11–15)**:
   - Currently contains only:
     ```json
     "dependencies": {
       "next": "16.4.0",
       "react": "19.3.0",
       "react-dom": "19.3.0"
     }
     ```
   - `gsap` is currently missing from `dependencies`.

3. **`src/app/globals.css` (lines 11–121)**:
   - Contains pure CSS scroll timeline definitions:
     ```css
     html {
       scroll-timeline-name: --page-scroll;
       scroll-timeline-axis: block;
     }
     .museum-wall-left {
       animation: museum-move-left auto linear both;
       animation-timeline: --page-scroll;
       animation-range: 0vh 150vh;
     }
     ```
   - This violates R1's explicit prohibition of pure CSS scroll timelines.

4. **`src/app/page.tsx` (lines 76, 102, 140, 149, 168, 178)**:
   - Contains generic external Unsplash image URLs (e.g. `https://images.unsplash.com/photo-1544025162-d76694265947`, etc.) and unpopulated placeholders. No custom generated images are present in `public/images/`.

5. **`public/` directory**:
   - Currently contains default Next.js SVGs (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`) and no `images/` folder.

---

## 2. Logic Chain

1. **Premise 1 (R1 & Acceptance Criterion)**: The project specification explicitly requires GSAP and ScrollTrigger for the museum-to-restaurant scroll transition, prohibits pure CSS scroll timelines, and demands `gsap` in `package.json`.
   - **Step**: The current implementation in `globals.css:11-121` uses pure CSS scroll timelines, which have inconsistent browser support and fail the explicit requirement.
   - **Inference**: `gsap` and `@gsap/react` must be installed, the pure CSS keyframes in `globals.css` must be removed, and a React client component (`MuseumEntrance.tsx` with `"use client"`) using `ScrollTrigger.create()` with a pinned container, scrub, 3D rotations, and `ctx.revert()` cleanup must be implemented.

2. **Premise 2 (R2 & Visual Rubric)**: The project requires at least 4 distinct custom AI-generated images created via `generate_image` covering Chelo Kebab, vintage Peter Cat signage, atmospheric dining room backgrounds, and heritage photos, stored locally and served in Next.js.
   - **Step**: The current `page.tsx` relies on external Unsplash URLs and missing asset placeholders.
   - **Inference**: A 5-asset generation plan was developed (`chelo_kebab`, `vintage_peter_cat_sign`, `atmospheric_dining_room`, `heritage_menu_archive`, and `museum_entrance_door`), complete with exact prompts, aspect ratios, target directory `public/images/`, and Next.js `<Image />` integration specs.

3. **Premise 3 (R4 & Editorial Architecture)**: The site requires 6 bespoke editorial sections (Hero, Signature Experience, The Story timeline, The Atmosphere, Menu, Visit) reflecting Kolkata heritage and dark warm cinematic luxury without generic templates.
   - **Step**: The current `page.tsx` contains basic, unpolished text and static mock menu items without deep narrative or interactive features.
   - **Inference**: Complete architectural blueprints, copy guidelines, interactive featurettes (e.g., "The Anatomy of a Legend" interactive breakdown for Chelo Kebab, illuminated timeline nodes, walk-in etiquette), and component breakdowns were documented in `report.md`.

---

## 3. Caveats

1. **Client-Side Hydration & React 19**: In Next.js 16 with React 19, ScrollTrigger calculations must run only after initial DOM mount (`useEffect` or `useGSAP`). Server-side rendering (SSR) will throw an error if `window` or `document` is accessed at module root level.
2. **Terminal Execution Policy on Windows**: As observed in the environment, running `npm` directly in PowerShell can trigger execution policy restrictions (`UnauthorizedAccess`); Worker commands should invoke `cmd /c npm ...` or `npm.cmd`.
3. **Firestore Menu Coordination**: The Menu catalog UI surveyed here relies on live Firestore dynamic fetching, which is being investigated in parallel by `explorer_survey_3`. The component design includes a graceful loading skeleton and local fallback to prevent layout breaks if Firestore emulator/network is delayed.

---

## 4. Conclusion

1. **GSAP Transition Blueprint**: The museum scroll transition must be implemented as a pinned 4-stage viewport choreography (`350vh` scroll duration, `scrub: 1`, 3D lateral wall push, double door swing on `rotateY: ±95deg`, and light-burst zoom into the modern restaurant hero), accompanied by a `prefers-reduced-motion` accessible fallback.
2. **Imagery Specifications**: Exactly 5 custom prompts with aspect ratios, filenames, and `public/images/` paths are ready for immediate generation by the Worker using `generate_image`.
3. **Editorial Sections**: All 6 sections are fully blueprinted with bespoke heritage copy, dark luxury color tokens (`#0A0A0A`, `#1A1A1A`, `#D4AF37`, `#B5A642`, `#F5F5DC`), and modular component definitions ready for implementation.

---

## 5. Verification Method

To independently verify the survey findings and eventual Worker implementation:
1. **Inspect Dependencies**:
   - Check `package.json` for `"gsap"`.
2. **Inspect Cleaned CSS**:
   - Verify `src/app/globals.css` does not contain `scroll-timeline-name` or `.museum-wall-*` CSS keyframes.
3. **Verify Asset Files**:
   - Verify that `public/images/chelo_kebab.png`, `public/images/vintage_peter_cat_sign.png`, `public/images/atmospheric_dining_room.png`, and `public/images/heritage_menu_archive.png` exist and are referenced via Next.js `<Image />` tags.
4. **Build Verification**:
   - Run: `cmd /c npm run build`
   - Ensure clean compilation with zero TypeScript or Next.js build errors.
