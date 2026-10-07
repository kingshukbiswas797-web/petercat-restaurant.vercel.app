# TEST_READY: Peter Cat Kolkata Website E2E Test Suite

Published: 2026-10-07T11:20:00Z  
Author: `test_writer_1` (Specialist & QA Test Writer)  
Test Suite Location: `test_e2e_suite.js` (Project Root)  
Target Environment: Node.js v18+, Next.js 16.4.0 (App Router), Windows PowerShell / CMD / Bash  

---

## 1. Executive Summary

The standalone End-to-End (E2E) test suite `test_e2e_suite.js` has been created, verified, and published in the project root. It provides comprehensive, requirement-driven verification of all features, boundaries, cross-feature contracts, and real-world scenarios specified in `ORIGINAL_REQUEST.md`, `PROJECT.md`, and `TEST_INFRA.md`.

- **Total Test Cases**: 94 tests
- **Tier 1 (Feature Coverage)**: 43 tests
- **Tier 2 (Boundary & Corner Cases)**: 35 tests
- **Tier 3 (Cross-Feature Interactions)**: 10 tests
- **Tier 4 (Real-World Scenarios)**: 6 tests
- **Runtime**: Pure Node.js (Zero external testing dependencies, instant boot in <50ms)
- **Current Execution Status**: 50 tests passing (53.2% pass rate), with 44 tests accurately detecting pending implementation features mapped to upcoming Milestones M2, M3, and M4.

---

## 2. Test Execution Commands

### Primary Commands
```bash
# Run complete test suite (all tiers, strict exit code)
node test_e2e_suite.js

# Run progressive milestone check (exit 0 for non-blocking CI/orchestration)
node test_e2e_suite.js --soft-exit

# Run fast suite (skips the full next build step)
node test_e2e_suite.js --skip-build

# Run specific tier
node test_e2e_suite.js --tier 1
node test_e2e_suite.js --tier 2
node test_e2e_suite.js --tier 3
node test_e2e_suite.js --tier 4

# Run specific feature tests (F1 through F7)
node test_e2e_suite.js --feature F1
node test_e2e_suite.js --feature F2

# Output machine-readable JSON for agent/orchestrator consumption
node test_e2e_suite.js --json --soft-exit

# Stop on first failure
node test_e2e_suite.js --bail
```

*Note on Windows Execution*: On Windows PowerShell, executing `npm` directly invokes `npm.ps1` which may be restricted by execution policy. `test_e2e_suite.js` handles this automatically by routing child process commands to `npm.cmd` when on `win32`.

---

## 3. Tier Breakdown & Coverage Matrix

| Feature | Feature Name | Tier 1 (Happy Path) | Tier 2 (Boundaries) | Tier 3 (Interactions) | Tier 4 (Journeys) | Total Tests |
| :---: | :--- | :---: | :---: | :---: | :---: | :---: |
| **F1** | Dependencies Setup (`gsap`, `firebase`) | 7 tests | 5 tests | 1 test | 1 test | **14** |
| **F2** | Custom Generated Imagery (`public/images/`) | 7 tests | 5 tests | 3 tests | 1 test | **16** |
| **F3** | Firebase & Firestore Menu CMS | 8 tests | 6 tests | 3 tests | 1 test | **18** |
| **F4** | `test_firebase.js` Verification Script | 5 tests | 5 tests | 1 test | 1 test | **12** |
| **F5** | GSAP Scroll Transition & Motion | 6 tests | 5 tests | 3 tests | 1 test | **15** |
| **F6** | Editorial Luxury Sections (6 sections) | 6 tests | 5 tests | 3 tests | 1 test | **15** |
| **F7** | Production Build & Full Pipeline | 4 tests | 4 tests | 1 test | 1 test | **10** |
| **ALL** | **Complete Suite Totals** | **43** | **35** | **10** | **6** | **94** |

---

## 4. Current Test Results by Milestone

As of 2026-10-07T11:20:00Z:

### Milestone 1: Dependencies & Imagery (Complete)
- **F1 (Dependencies)**: 100% PASS
  - `package.json` contains `gsap`, `@gsap/react`, and `firebase`.
  - `node_modules` contains resolved installations.
  - Semver syntax, lockfile integrity, and React 19 compatibility verified.
- **F2 (Custom Imagery)**: 100% PASS
  - `public/images/` contains 10 image files (>4 distinct AI images).
  - `chelo_kebab.png`, `vintage_peter_cat_sign.png`, `atmospheric_dining_room.png`, `museum_entrance_door.png`, `heritage_menu_archive.png` present.
  - Binary header verification: 100% valid PNG and JPEG magic bytes.
  - File sizes all exceed the 5KB realistic image threshold (range: 807KB - 1.0MB).

### Milestone 2: Firebase Menu CMS & Verification Script (Pending M2 Worker)
- **F3 (Firebase Service)**: Pending
  - `src/types/menu.ts`, `src/lib/firebase/config.ts`, `src/lib/firebase/menuService.ts`.
- **F4 (test_firebase.js)**: Pending
  - `test_firebase.js` standalone script in root.

### Milestone 3: GSAP Scroll Transition & Editorial Components (Pending M3 Worker)
- **F5 (GSAP Transition)**: Pending
  - `src/components/MuseumEntrance.tsx`, removal of legacy pure CSS `scroll-timeline` from `globals.css`.
- **F6 (Editorial Components)**: Core text currently present in `page.tsx`; componentization and dynamic integration pending.

### Milestone 4: Production Build & Final Verification (Pending M4)
- **F7 (Production Build)**: Passing in initial static configuration (`npm.cmd run build` completes in <1s). Full integrated build will be verified upon completion of M2 and M3.

---

## 5. Escalation & Handoff Reference

When running `node test_e2e_suite.js`, every failing test prints a structured escalation target:
- Issues with `src/lib/firebase/*` or `test_firebase.js` -> Escalate to `worker_m2`.
- Issues with `src/components/*`, GSAP, or `globals.css` -> Escalate to `worker_m3`.
- Issues with full pipeline integration build -> Escalate to `worker_m4`.
