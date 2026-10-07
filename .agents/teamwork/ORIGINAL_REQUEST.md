# Original User Request

## 2026-10-07T07:20:18Z

Build a premium, immersive Next.js frontend website for Peter Cat, Kolkata, featuring a digital museum entrance that gradually transforms into a modern restaurant experience via scroll-driven animations, backed by Firebase for the menu CMS.

Working directory: c:/Users/kings/Documents/antigravity/cool-archimedes
Integrity mode: demo

## Requirements

### R1. Immersive Scroll Transition (GSAP)
Implement a scroll-driven cinematic entrance where the user "walks deeper" through vintage signage and historical photos into the restaurant. **You must use GSAP (GreenSock) and ScrollTrigger** to orchestrate these animations, avoiding pure CSS scroll timelines to ensure broad compatibility and complex choreography.

### R2. Custom Generated Imagery
Use the `generate_image` tool to create custom cinematic, vintage, and food imagery (specifically for the Chelo Kebab, the original sign, and atmospheric backgrounds) and integrate them into the site.

### R3. Firebase Menu CMS
Implement a Firebase backend (Firestore) to manage and display the restaurant's menu catalogue. The frontend must fetch and display the menu from Firestore dynamically.

### R4. Editorial Sections
Build out the remaining sections (Hero, Signature Experience, The Story timeline, The Atmosphere, Menu, and Visit) combining Kolkata heritage, old-world luxury, and modern interaction. Do not use generic templates.

## Acceptance Criteria

### Programmatic Verification
- [ ] A `test_firebase.js` script successfully writes a test menu item to the local emulator or live Firestore and reads it back.
- [ ] The Next.js application builds without errors (`npm run build`).
- [ ] `package.json` contains `gsap` as a dependency.

### Agent-as-Judge Verification (Visual & Interaction Rubric)
- [ ] The museum entrance acts as the first chapter. Scrolling physically transforms the viewport using GSAP (e.g. scaling, sliding) into the modern restaurant homepage, without feeling like a generic scroll-down.
- [ ] At least 4 distinct AI-generated images are successfully loaded and displayed in the UI.
- [ ] The Menu section renders data actively fetched from Firebase, displayed in an elegant, highly visual format (not a generic list).
- [ ] The overall aesthetic adheres to the "old-world luxury" and "dark, warm, cinematic" keywords.


## 2026-10-07T11:06:58Z

The server was restarted. Please resume your work on the Peter Cat project from where you left off. Check PROJECT.md and your internal state to continue Phase 0 or whichever phase you were in.
