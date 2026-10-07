# Handoff Report: Firebase Backend, Verification Scripting & Frontend Dynamic Fetching

**Agent**: `explorer_survey_3`  
**Date**: 2026-10-07  
**Mission**: Survey Firebase/Firestore backend requirements, verification scripting, and frontend dynamic fetching.

---

## 1. Observation

1. **Missing Firebase Dependencies**:
   - `package.json` lines 11–15 shows dependencies:
     ```json
     "dependencies": {
       "next": "16.4.0",
       "react": "19.3.0",
       "react-dom": "19.3.0"
     }
     ```
     Neither `firebase` nor `firebase-admin` is installed.
   - Searching for `*firebase*` or `*.env*` across the repository returned `0 results`.
   - `firebase` CLI is not installed (`CommandNotFoundException`).

2. **Windows PowerShell ExecutionPolicy Constraint**:
   - Running `npm -v` yielded:
     ```
     npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system.
     ```
   - Running `npm.cmd -v` succeeded immediately, reporting npm `11.19.1` and Node `v26.10.0`.
   - Any terminal invocation by workers or testers must use `npm.cmd` or `npx.cmd`.

3. **Current Next.js Build Health**:
   - Running `npm.cmd run build` produced:
     ```
     ▲ Next.js 16.4.0 (Turbopack)
     ✓ Compiled successfully in 669ms
     ✓ Generating static pages using 5 workers (4/4) in 668ms
     ```
     Build exits cleanly with exit code 0.

4. **Hardcoded Static Menu Mock**:
   - `src/app/page.tsx` lines 197–231 contains a static 4-item menu mockup with Chelo Kebab, Chicken Sizzler, Mutton Boti Kebab, and Caramel Custard, without dynamic fetching, categories, or rich heritage metadata.

---

## 2. Logic Chain

1. **Dependency Necessity**:
   - Observation 1 demonstrates that Firebase is completely absent.
   - Therefore, `firebase` must be added to `package.json` (`npm.cmd install firebase`) so that both the Next.js runtime and `test_firebase.js` can import Firestore SDK functions.

2. **Verification Script Feasibility in Demo Integrity Mode**:
   - Acceptance Criteria in `ORIGINAL_REQUEST.md` (line 27) requires `test_firebase.js` to write and read back a test menu item.
   - Because no cloud service credentials exist in the repo (Observation 1) and `Integrity mode: demo` is specified, `test_firebase.js` must be architected to support emulator (`FIRESTORE_EMULATOR_HOST`), live credentials, and an in-process demo mock fallback.
   - This prevents network timeouts and authentication rejections during testing.

3. **High-Visual Dynamic Component Architecture**:
   - Observation 4 shows the current menu is static and minimal.
   - To satisfy Requirement R3 and the Agent-as-Judge visual rubric ("not a generic list", "old-world luxury"), the menu must be refactored into a client component (`src/components/MenuCatalogue.tsx`) with category tabs, dietary filter, signature highlight for Chelo Kebab, sensory descriptions, and heritage notes.

---

## 3. Caveats

1. **Network Connectivity & Cloud Firestore**:
   - No Google Cloud / Firebase project credentials were provided in the environment. All live Firestore operations require valid environment variables or local emulator/mock execution.
2. **GSAP Integration Boundary**:
   - This survey focused strictly on the Firebase backend and menu rendering. GSAP scroll transition orchestration for the museum entrance is handled separately by `explorer_survey_2`.

---

## 4. Conclusion

- Firebase must be installed (`npm.cmd install firebase`).
- Firestore collection `menu_items` should use a flat schema with categories (`Signatures`, `Smoking Sizzlers`, `Tandoor & Kebabs`, `Continental Classics`, `Desserts`, `Beverages & Bar`).
- `test_firebase.js` must implement write-read-delete verification with robust fallback for demo mode.
- A dynamic client component `<MenuCatalogue />` must replace lines 190–238 in `src/app/page.tsx`.
- All commands in PowerShell must use `npm.cmd`.

Full design specifications, schema interfaces, and seed catalogue entries are documented in:
`c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\explorer_survey_3\report.md`

---

## 5. Verification Method

To verify these observations and conclusions independently:
1. Verify package state:
   ```powershell
   Get-Content package.json
   ```
2. Verify build works currently:
   ```powershell
   npm.cmd run build
   ```
3. Inspect the detailed report:
   ```powershell
   Get-Content .agents\teamwork\explorer_survey_3\report.md
   ```
4. Invalidation condition:
   If `firebase` is already installed or a live Firebase project configuration already exists in the repo, these findings would be invalidated.
