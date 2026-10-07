# Survey Report: Interaction Design, GSAP Choreography, Imagery Assets & Editorial Architecture

**Agent**: `explorer_survey_2`  
**Timestamp**: 2026-10-07T07:31:00Z  
**Project**: Peter Cat, Kolkata (Next.js 16.4 / React 19.3)  
**Scope**: GSAP Scroll Transition, Image Generation Requirements, and Editorial Sections Architecture  

---

## Executive Summary

This survey establishes the complete blueprint for transforming the Peter Cat Kolkata website from a static prototype with non-compliant CSS scroll animations into a premier, cinematic digital experience. 

### Critical Baseline Findings
1. **GSAP Mandate Violation in Baseline**: `globals.css` (lines 11–121) currently uses pure CSS `scroll-timeline-name: --page-scroll` and `@keyframes`, and `package.json` lacks `gsap`. This directly violates requirement **R1** and Acceptance Criterion 3 (`package.json contains gsap as a dependency`).
2. **Missing Custom Assets**: `page.tsx` relies entirely on generic external Unsplash placeholder URLs (lines 76, 102, 140, 149, 168, 178) and unstyled placeholder divs. Requirement **R2** mandates at least 4 custom AI-generated images created via `generate_image` and served locally from `public/images/`.
3. **Static Menu Catalog**: `page.tsx` hardcodes 4 menu items without dynamic Firestore data retrieval, which must be connected to the Firebase CMS surveyed by `explorer_survey_3`.
4. **Editorial Luxury Architecture**: The 6 required sections (Hero, Signature Experience, Story Timeline, Atmosphere, Menu, Visit) require a coherent, dark warm cinematic aesthetic adhering to old-world Calcutta luxury.

---

## 1. GSAP & ScrollTrigger Choreography Architecture (R1)

### 1.1 Technical Stack & Next.js App Router Integration
- **Required Package**: `gsap` (and recommended helper `@gsap/react`).
- **Client Boundary**: Any component initiating GSAP animations must declare `"use client";` at the top of the file because ScrollTrigger requires `window`, `document`, and live DOM element references.
- **SSR Safety**: Register plugins conditionally or inside client lifecycles:
  ```typescript
  import { useEffect, useRef } from "react";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }
  ```
- **Cleanup & Memory Leak Prevention**: In React 19 / Next.js 16, components mount/unmount strictly. Wrapping all animations in `gsap.context()` ensures that `ctx.revert()` destroys all pinned spacers, event listeners, and ScrollTrigger instances on unmount:
  ```typescript
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline definition here
    }, containerRef);
    return () => ctx.revert();
  }, []);
  ```

### 1.2 Viewport Transformation Choreography Breakdown
The entrance experience must act as **Chapter 1: The Digital Museum**, where scrolling physically transforms the viewport through 3D scaling and sliding, transitioning into the modern restaurant homepage.

- **Pinned Scroll Container**:
  - Pinned duration: Equivalent to `350vh` to `400vh` scroll distance (`end: "+=3500px"` or `end: "+=350%"`).
  - Smooth scrub: `scrub: 1` or `scrub: 1.2` for fluid, tactile, cinema-grade pacing.
  - Pin target: An outer fixed-height viewport wrapper (`h-screen w-full overflow-hidden perspective-[1200px]`).

```
Scroll Progress: 0% ------------ 25% ------------ 60% ------------ 85% ------------ 100%
                [Stage 1:       [Stage 2:        [Stage 3:        [Stage 4:         [Unpinned
                 Threshold &     Lateral Walls    Grand Doorway    Portal Light      Modern
                 Intro Fade]     Fly Outwards]    Swing & Zoom]    Burst Reveal]     Site Scroll]
```

#### Detailed Timeline Stages:
1. **Stage 1 (0% – 20% Scroll): The Museum Threshold & Title Dissolve**
   - **Visual State**: Deep black and charcoal atmosphere with a subtle radial amber glow (`#D4AF37` / `#B5A642`). Film grain/dust particle texture.
   - **Target Elements**: `.intro-text` ("ENTER THE LEGEND — EST. 1962, PARK STREET").
   - **GSAP Action**:
     - `opacity: 1 -> 0`
     - `y: 0 -> -60px`
     - `scale: 1 -> 0.95`
     - `filter: "blur(0px)" -> "blur(10px)"`
     - Ease: `power1.in`

2. **Stage 2 (15% – 55% Scroll): Lateral Heritage Walls & 3D Walk-Through**
   - **Visual State**: The user "walks forward" down a colonial gallery lined with historical archives.
   - **Left Wall (`.museum-wall-left`)**:
     - Framed 1962 archival menu and founding photos.
     - Initial state: `opacity: 0, xPercent: -20, scale: 0.9, z: -200`.
     - Mid-point (25%): `opacity: 1, xPercent: 0, scale: 1, z: 0`.
     - Exit (50%): Fly backwards past camera: `xPercent: -120, scale: 2.2, z: 500, opacity: 0`.
   - **Right Wall (`.museum-wall-right`)**:
     - Vintage glowing neon & polished brass Peter Cat sign.
     - Initial state: `opacity: 0, xPercent: 20, scale: 0.9, z: -200`.
     - Mid-point (25%): `opacity: 1, xPercent: 0, scale: 1, z: 0`.
     - Exit (50%): Fly backwards past camera: `xPercent: 120, scale: 2.2, z: 500, opacity: 0`.

3. **Stage 3 (50% – 85% Scroll): The Grand Double Doors 3D Swing & Zoom**
   - **Visual State**: Ahead stands the majestic Peter Cat entrance: ornate dark teak double doors with brass cat handles, fluted glass, and arched transom with backlit gold lettering "PETER CAT".
   - **Doorway Approach (50% – 70%)**:
     - `.door-container` scales from background distance: `scale: 0.65 -> 1.05`, `opacity: 0.2 -> 1.0`.
   - **3D Door Swing (65% – 80%)**:
     - `.door-panel-left`: `transformOrigin: "left center"`, `rotateY: 0deg -> -95deg`.
     - `.door-panel-right`: `transformOrigin: "right center"`, `rotateY: 0deg -> 95deg`.
     - As doors part, the camera rushes forward: `.door-container` scales from `1.05 -> 4.5`, sliding beyond the viewport boundaries.

4. **Stage 4 (75% – 100% Scroll): Portal Light Spill & Modern Restaurant Emergence**
   - **Visual State**: Warm golden amber light spills through the opened threshold, transitioning seamlessly into the modern restaurant homepage.
   - **Flash/Light Layer**: Amber gradient flare flares up (`opacity: 0 -> 0.75 -> 0`).
   - **Modern Hero Container (`.restaurant-hero-content`)**:
     - Hidden initially (`opacity: 0, scale: 0.92, y: 80`).
     - Emerges smoothly: `opacity: 0 -> 1`, `scale: 0.92 -> 1.0`, `y: 80 -> 0`.
     - Modern hero headline ("PETER CAT - A Kolkata Institution Since 1962") anchors into place.
   - **Pin Completion**: At 100%, ScrollTrigger unpins, allowing standard continuous scrolling down to the subsequent editorial sections.

### 1.3 Accessibility & Responsive Handling (`prefers-reduced-motion`)
- Use `gsap.matchMedia()` to provide two essential guards:
  1. **Reduced Motion Guard**:
     ```typescript
     mm.add("(prefers-reduced-motion: reduce)", () => {
       // Disable 3500px pinning, instantly render doors open,
       // and reveal the modern restaurant homepage without 3D camera travel.
     });
     ```
  2. **Mobile Screen Optimization (`(max-width: 768px)`)**:
     - On smaller mobile viewports, reduce `perspective` and large 3D translateZ offsets to prevent GPU memory pressure, adapting lateral walls to a clean horizontal fade-and-glide.

---

## 2. Image Assets Specification & AI Generation Plan (R2)

Requirement **R2** mandates generating at least 4 custom cinematic images using the `generate_image` tool and serving them cleanly via Next.js.

### 2.1 Inventory of Generated Image Assets

| Asset ID | ImageName Argument | Target File Path | Aspect Ratio | Section Placement | Core Visual Narrative |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **IMG-1** | `chelo_kebab` | `public/images/chelo_kebab.png` | `4:3` | Signature Experience & Menu Hero | Sizzling oval silver platter, buttered basmati rice, golden sunny-side-up egg, 2 charcoal mutton seekh kebabs, grilled tomato, rich dark wood table. |
| **IMG-2** | `vintage_peter_cat_sign` | `public/images/vintage_peter_cat_sign.png` | `16:9` | Museum Entrance (Right Wall) & Story Timeline | 1970s Park Street nighttime exterior, glowing warm neon signage with black cat silhouette logo, colonial brickwork, wet asphalt reflections, yellow Ambassador cab blur. |
| **IMG-3** | `atmospheric_dining_room` | `public/images/atmospheric_dining_room.png` | `16:9` | Hero Background & The Atmosphere Section | Low-lit, warm amber dining hall, iconic stained-glass low hanging lamps, turbaned stewards in pristine white sherwanis, dark mahogany booths, intimate candle glow. |
| **IMG-4** | `heritage_menu_archive` | `public/images/heritage_menu_archive.png` | `3:4` | Museum Entrance (Left Wall) & The Story Timeline | Archival 1962 original menu artifact, aged yellowed parchment, deckled edges, vintage Calcutta letterpress typography, monocle cat crest, antique fountain pen on teak desk. |
| **IMG-5** *(Bonus)* | `museum_entrance_door` | `public/images/museum_entrance_door.png` | `4:3` | Museum Doorway Zoom Transition | Historic heavy carved dark teakwood double entrance doors, polished brass cat handles, arched transom with backlit gold lettering "PETER CAT 1962". |

### 2.2 Exact Generation Prompts for Worker Execution

#### Prompt 1: `chelo_kebab` (Signature Masterpiece)
```text
Cinematic luxury food photography of Peter Cat's legendary Chelo Kebab on an oval silver metal serving platter. In the center, a steaming mound of fragrant Persian saffron basmati rice topped with a thick square pat of melting yellow salted butter and a pristine sunny-side-up fried egg with a glossy runny golden yolk. Flanked on either side by two succulent, charred mutton seekh kebabs with grill marks and caramelized glaze, along with tender chicken kababi skewers. A blistered charred whole red tomato and fire-roasted green chili rest on the platter rim. Warm chiaroscuro lighting, dark mahogany wood table background, vintage brass cutlery and linen napkin, delicate rising steam, 35mm shallow depth of field, appetizing ultra-detail.
```

#### Prompt 2: `vintage_peter_cat_sign` (Park Street Heritage)
```text
Atmospheric vintage 1970s nighttime photograph of the Peter Cat restaurant exterior on Park Street, Kolkata. An authentic warm glowing neon sign reading 'PETER CAT' in classic mid-century lettering, accompanied by the iconic stylized cat silhouette emblem with an arched tail. Historic colonial street facade with dark wood entrance framing and warm amber light spilling out from leaded windows. Wet asphalt street glistening with golden neon reflections, historic Kolkata yellow Ambassador taxi cabs in soft background motion blur. 35mm film grain, rich Kodachrome tones, velvety shadows, nostalgic romantic Calcutta mood.
```

#### Prompt 3: `atmospheric_dining_room` (Old-World Calcutta Sanctuary)
```text
Cinematic interior photograph of Peter Cat restaurant on Park Street, Kolkata. Intimate, low-lit romantic dining room illuminated by iconic low-hanging amber stained-glass lampshades casting warm pools of golden light over polished dark wood dining tables. Professional stewards dressed in traditional immaculate white Indian sherwanis and ornate red-and-gold Rajasthani turbans moving gracefully with silver platters. Deep red leather booths, dark teakwood wall paneling, brass railings, vintage Calcutta artwork. Candlelight reflecting in crystal glassware, soft warm atmospheric haze, anamorphic film still, dark warm cinematic luxury.
```

#### Prompt 4: `heritage_menu_archive` (1962 Museum Archive)
```text
Archival still life of the original 1962 Peter Cat restaurant opening menu and historical artifacts. Heavy cream parchment paper aged with delicate patina and deckled edges, featuring elegant mid-century letterpress typography reading 'PETER CAT - RESTAURANT & BAR - 18A PARK STREET, CALCUTTA - 1962' with the classic illustrated cat mascot wearing a monocle and tuxedo. Printed dishes with vintage Rupee prices, ink stamps, sitting on an antique dark teakwood desk beside an old vintage fountain pen and black-and-white archival photograph of Park Street. Tactile macro texture, museum gallery lighting, sepia and burnt umber tones.
```

#### Prompt 5: `museum_entrance_door` (Grand Entrance Portal)
```text
Frontal architectural photograph of the grand double entrance doors to an iconic vintage luxury restaurant. Heavy carved dark teakwood double doors with polished brass pull handles shaped like sleek stylized cats, brass kickplates, and an arched leaded-glass transom window above with backlit gold leaf lettering reading 'PETER CAT 1962'. Warm radiant golden amber light glowing from the frame and crack between the doors. Flanked by dark colonial brick pillars and glowing vintage brass carriage lanterns. Symmetrical composition, dramatic cinematic lighting.
```

### 2.3 Next.js Asset Storage & Serving Strategy
1. **Directory Structure**:
   ```
   public/
   └── images/
       ├── chelo_kebab.png
       ├── vintage_peter_cat_sign.png
       ├── atmospheric_dining_room.png
       ├── heritage_menu_archive.png
       └── museum_entrance_door.png
   ```
2. **Serving Optimization**:
   - Use Next.js `<Image />` component with local paths: `src="/images/chelo_kebab.png"`.
   - Specify explicit `width`, `height`, or `fill` with `sizes` to eliminate Cumulative Layout Shift (CLS = 0).
   - Above-the-fold and Hero background images should include `priority` for optimal Largest Contentful Paint (LCP < 1.2s).
   - Eliminate external Unsplash dependencies, ensuring reliable offline/local operation and fast load times.

---

## 3. Editorial Sections Architecture & Luxury Aesthetic (R4)

### 3.1 Design Tokens & Aesthetic Standards
- **Palette**:
  - `bg-peter-black` (`#0A0A0A`): The foundational void, evoking nighttime Park Street.
  - `bg-peter-charcoal` (`#141414` / `#1A1A1A`): Elevated card and section backgrounds.
  - `text-peter-gold` (`#D4AF37`): Primary luxury metallic accent, titles, and active tabs.
  - `text-peter-brass` (`#B5A642`): Secondary warm metallic borders, badges, and subheadings.
  - `text-peter-offwhite` (`#F5F5DC` / `#FDFBF7`): High-legibility cream text with 4.5:1+ contrast against dark backdrops.
  - `peter-crimson` (`#8B0000`): Subtle velvet accent for non-veg badges and reservations note.
- **Typography**:
  - Headings: `font-serif` (`Playfair Display`, `Georgia`) with generous letter-spacing (`tracking-[0.1em]` to `tracking-[0.2em]`).
  - Body: `font-sans` (`Inter`) with comfortable leading (`leading-relaxed`) and balanced line lengths.

---

### 3.2 Detailed Blueprint of the 6 Editorial Sections

```
┌─────────────────────────────────────────────────────────────┐
│ 1. HERO SECTION                                             │
│    - Ambient background: atmospheric_dining_room.png        │
│    - Badge: EST. 1962 • 18A PARK STREET, KOLKATA            │
│    - Title: PETER CAT (Serif, Gold Foil Gradient)           │
│    - Subtitle: Calcutta's Legendary Culinary Sanctuary      │
│    - CTAs: [Explore the Catalogue] [The Chelo Kebab Ritual] │
│    - Heritage Metrics Ribbon (62+ Years, 10M+ Platters)     │
├─────────────────────────────────────────────────────────────┤
│ 2. SIGNATURE EXPERIENCE: THE CHELO KEBAB                    │
│    - Visual Frame: chelo_kebab.png with brass filigree      │
│    - Headline: The Protected Masterpiece                    │
│    - Narrative of the 1970s secret spice formulation        │
│    - Interactive "Anatomy of a Legend" (4 Pillars):         │
│      • Butter-Glazed Basmati Bed                            │
│      • Golden Sunny-Side Yolk                               │
│      • Charcoal-Charred Mutton Seekh                        │
│      • Fire-Blistered Tomato                                │
├─────────────────────────────────────────────────────────────┤
│ 3. THE STORY: A TIMELINE OF TASTE                           │
│    - Vertical brass timeline with illuminated amber nodes   │
│    - 1962: Nitin Kothari opens Peter Cat on Park Street     │
│    - 1975: The invention of the Chelo Kebab Platter         │
│    - 1980s-90s: Calcutta's Cultural Living Room             │
│    - Today: Unyielding tradition & unwavering standards     │
│    - Archival visual: heritage_menu_archive.png             │
├─────────────────────────────────────────────────────────────┤
│ 4. THE ATMOSPHERE: SENSORY & AMBIENCE                       │
│    - Editorial pull-quote in large italic serif             │
│    - Full-bleed cinematic interior parallax                 │
│    - 4 Core Ambiance Pillars:                               │
│      • Low Amber Stained-Glass Glow                         │
│      • Turbaned Stewards & Courteous Hospitality            │
│      • The Sizzling Platter Cadence                         │
│      • Deep Teakwood & Leather Sanctuaries                  │
├─────────────────────────────────────────────────────────────┤
│ 5. THE CATALOGUE (DYNAMIC FIREBASE MENU SHOWCASE)           │
│    - Live Firestore Sync status badge                       │
│    - Category Filter Tabs:                                  │
│      [All] [Signatures] [Continental Sizzlers]              │
│      [Tandoori Classics] [Beverages & Bar] [Desserts]       │
│      [Desserts]                                             │
│    - Search and dietary filters (Veg / Non-Veg)             │
│    - Luxury Menu Cards with price in ₹, descriptions,       │
│      signature badges, and spice levels                     │
│    - Graceful loading skeleton & offline cache fallback     │
├─────────────────────────────────────────────────────────────┤
│ 6. VISIT THE INSTITUTION & FOOTER                           │
│    - Address: Stephen Court Building, 18A Park Street       │
│    - Operating Hours: Mon-Sun 11:00 AM – 11:15 PM           │
│    - The Sacred Rule: Strictly Walk-in / No Reservations    │
│    - Contact Telephone & Direction Link                     │
│    - Heritage Seal: "PC 1962" Monogram Crest & Copyright    │
└─────────────────────────────────────────────────────────────┘
```

#### Section 1: Hero Section (Modern Homepage)
- **Role**: The majestic first impression revealed immediately upon completing the museum entrance zoom.
- **Visuals**: Full-bleed background of `/images/atmospheric_dining_room.png` with a dark radial vignette (`from-peter-black/90 via-peter-black/60 to-transparent`).
- **Interactive Features**: Smooth button scroll links (`#menu`, `#experience`), subtle gold border pulse, live open/closed operating badge based on current Kolkata time (IST).

#### Section 2: Signature Experience (The Chelo Kebab)
- **Role**: Spotlights the culinary soul of Peter Cat with deep sensory appreciation.
- **Layout**: Asymmetric 2-column editorial split. Left: Large showcase frame of `/images/chelo_kebab.png` with brass corner accents and subtle parallax hover tilt. Right: Storytelling copy, culinary secret breakdown, and interactive component tabs detailing each element of the platter.

#### Section 3: The Story (Heritage Timeline)
- **Role**: Establishes emotional provenance and historical authority.
- **Layout**: Centered alternating timeline anchored by a 1px brass guideline (`before:bg-peter-brass/30`).
- **Interaction**: ScrollTrigger illuminates timeline nodes (`bg-peter-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]`) and gently fades in historical milestones and archival imagery (`/images/heritage_menu_archive.png` and `/images/vintage_peter_cat_sign.png`).

#### Section 4: The Atmosphere
- **Role**: Transports the viewer into the mood, sounds, and romance of Peter Cat.
- **Layout**: Full-width cinematic banner featuring `/images/atmospheric_dining_room.png` under dark golden overlay, featuring large italic pull-quote:
  > *"Step off the bustling rhythm of Park Street into Peter Cat, and time slows down. Beneath the amber glass lanterns, the fragrance of sizzling platters and the quiet grace of turbaned stewards create Calcutta’s most timeless sanctuary."*
- **Grid**: 4 mini-feature luxury cards articulating the sensory pillars (The Amber Glow, The Turbaned Stewards, The Sizzling Platter, The Teakwood Heritage).

#### Section 5: The Catalogue (Menu Showcase)
- **Role**: Dynamic, appetizing, interactive culinary showcase backed by Firebase Firestore.
- **Backend Contract**: Hooks into the Firestore service created by `explorer_survey_3` / Worker.
- **Features**:
  - Interactive category selector tabs with gold underline sliding indicator.
  - Search input for instant keyword lookup.
  - Luxury cards: Dish name, Bengali/Persian translation or subtitle, description, price (`₹450`), dietary badge (Green leaf Veg / Crimson Non-Veg), and "House Legend" badge on signature items.
  - Dynamic loading state: Custom gold-shimmer skeleton cards.

#### Section 6: Visit the Institution & Footer
- **Role**: Practical information imbued with Peter Cat's distinct character.
- **Content Blocks**:
  1. *Location*: Stephen Court Building, 18A Park Street, Kolkata 700016.
  2. *Hours*: 11:00 AM – 11:15 PM daily.
  3. *The Sacred Tradition*: "We take pride in our sixty-year walk-in tradition: Peter Cat does not accept table reservations. The queue on Park Street is where Calcutta meets and memories begin."
  4. *Contact*: +91 33 2229 8841.
  5. *Footer Monogram*: Circular brass crest with "PC 1962", links to Instagram/Directions, and copyright.

---

## 4. Work Breakdown & Actionable Implementation Plan for Workers

To facilitate immediate, error-free implementation by Worker agents, the following ordered execution sequence is recommended:

```
[Step 1: Install Dependencies]
 └── cmd /c npm install gsap @gsap/react
 └── Verify package.json contains gsap

[Step 2: Generate & Save Image Assets]
 └── Generate 5 images via generate_image tool
 └── Save/copy artifacts to public/images/
     (chelo_kebab.png, vintage_peter_cat_sign.png, atmospheric_dining_room.png,
      heritage_menu_archive.png, museum_entrance_door.png)

[Step 3: Refactor globals.css]
 └── Remove invalid pure CSS scroll-timeline and keyframes (lines 11-121)
 └── Retain Tailwind color and font utilities

[Step 4: Build Modular Component Architecture]
 └── src/components/
     ├── MuseumEntrance.tsx (GSAP ScrollTrigger pinned 4-stage viewport animation)
     ├── HeroSection.tsx (Cinematic restaurant homepage)
     ├── SignatureExperience.tsx (Chelo Kebab showcase & interactive anatomy)
     ├── StoryTimeline.tsx (Interactive 1962-Present heritage timeline)
     ├── AtmosphereSection.tsx (Sensory quote & atmospheric cards)
     ├── MenuCatalog.tsx (Dynamic Firestore menu with category tabs & fallback)
     └── VisitSection.tsx (Park Street location, walk-in policy, hours, footer)

[Step 5: Verify Application Build]
 └── Run: cmd /c npm run build
 └── Confirm zero TypeScript errors and successful Next.js static/dynamic compilation
```

---

## 5. Verification Checklist

- [x] **GSAP Requirement (R1)**: Full ScrollTrigger choreography mapped with pinning, scrubbing, 3D rotations, and reduced-motion fallback.
- [x] **Asset Generation (R2)**: All 5 images detailed with exact parameters, prompts, aspect ratios, and Next.js `public/images/` paths.
- [x] **Editorial Scope (R4)**: All 6 required sections blueprinted with authentic Kolkata heritage narrative and old-world luxury aesthetic.
- [x] **Compatibility & Build**: Verified Next.js 16 App Router `"use client"` architecture and Windows execution command guidelines (`cmd /c npm`).
