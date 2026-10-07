# E2E Test Infra: Peter Cat Kolkata Website

## Test Philosophy
- Opaque-box, requirement-driven testing. No dependency on internal implementation details.
- Validates requirements from `ORIGINAL_REQUEST.md`:
  - R1: GSAP & ScrollTrigger scroll animation
  - R2: Custom generated imagery (at least 4 distinct images loaded and displayed)
  - R3: Firebase Firestore backend and dynamic menu fetching
  - R4: Editorial sections (Hero, Signature Experience, Story Timeline, Atmosphere, Menu, Visit)
  - Programmatic: `test_firebase.js` exit code 0, `npm run build` exit code 0, `package.json` contains `gsap`.

## Feature Inventory
| # | Feature | Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---------|--------|:------:|:------:|:------:|:------:|
| F1 | Dependencies Setup | Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F2 | Custom Generated Imagery | R2 & Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F3 | Firebase Menu CMS | R3 & Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F4 | test_firebase.js Script | Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F5 | GSAP Scroll Transition | R1 & Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F6 | Editorial Sections | R4 & Acceptance Criteria | 5 | 5 | ✓ | ✓ |
| F7 | Production Build | Acceptance Criteria | 5 | 5 | ✓ | ✓ |

## Test Architecture
- Test Suite Runner: Node.js test script `test_e2e_suite.js` executing programmatic assertions across:
  - Dependency verification in `package.json`
  - Asset existence, dimensions, and image file headers in `public/images/`
  - Firebase verification via `node test_firebase.js`
  - Component and layout verification (DOM/AST checks for GSAP triggers, editorial sections)
  - Production build execution via `npm.cmd run build`

## Coverage Thresholds
- Tier 1: ≥5 per feature (isolation happy-path)
- Tier 2: ≥5 per feature (boundaries, offline fallback, missing config resilience)
- Tier 3: Pairwise feature interactions (e.g., Firestore menu + UI rendering, GSAP + responsive viewport)
- Tier 4: Real-world user journeys (full visitor walkthrough from entrance to Chelo Kebab menu inspection)
