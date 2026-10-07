## 2026-10-07T11:20:09Z
You are worker_m2, an implementation worker for Milestone 2 of the Peter Cat website project.
Your working directory is: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\worker_m2
Project root is: c:\Users\kings\Documents\antigravity\cool-archimedes
Read the authoritative user request at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\ORIGINAL_REQUEST.md
Read the project specifications at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\orchestrator_1\PROJECT.md
Read the survey report at: c:\Users\kings\Documents\antigravity\cool-archimedes\.agents\teamwork\explorer_survey_3\report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_preview_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your write ownership:
You exclusively own:
- `src/types/menu.ts`
- `src/lib/firebase/config.ts`
- `src/lib/firebase/menuService.ts`
- `test_firebase.js` in project root

Your mission:
1. Create `src/types/menu.ts` defining `MenuItem` and `MenuCategory` as specified in `explorer_survey_3/report.md` § 2.2.
2. Create `src/lib/firebase/config.ts` initializing the Firebase client app and Firestore instance `db` using standard Firebase v12 modular SDK (`firebase/app`, `firebase/firestore`).
3. Create `src/lib/firebase/menuService.ts` providing:
   - `getMenuItems()`: Promise<MenuItem[]> - fetches items from Firestore `menu_items` collection, or uses `DEMO_FALLBACK_MENU` if network/permission is unavailable or collection is empty.
   - `getMenuItemsByCategory(category)`: Promise<MenuItem[]> - filtered items.
   - `DEMO_FALLBACK_MENU`: authentic 12+ items catalogue (Chelo Kebab Original, Chelo Kebab Special, Peter Cat House Mixed Sizzler, Chicken Steak Sizzler, Exotic Veg Sizzler, Mutton Boti Kebab, Murgh Makhmali Kebab, Beckti Meunière, Chicken à la Kiev, Classic Caramel Custard, Flambéed Baked Alaska, Vintage Kolkata Shandy, etc.) as detailed in `explorer_survey_3/report.md` § 2.3.
4. Create `test_firebase.js` in project root:
   - Acceptance criterion: "A test_firebase.js script successfully writes a test menu item to the local emulator or live Firestore and reads it back."
   - Follow `explorer_survey_3/report.md` § 3: initialize Firebase/Firestore (supports emulator host if present, live project, or demo integrity test mode), write a test menu item (`setDoc`), read it back (`getDoc`), assert deep equality of data fields, clean up (`deleteDoc`), log detailed progress, and exit with code 0 on success.
5. Execute `cmd /c "node test_firebase.js"` and verify it exits with code 0 and logs success.
6. Execute `cmd /c "npm run build"` to verify TypeScript compilation and zero regressions.

Document your commands, actions, and verification results in `handoff.md` in your working directory, and notify me via send_message.
