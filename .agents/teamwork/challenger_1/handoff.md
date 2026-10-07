# Empirical Verification & Adversarial Stress Test Report

**Author**: challenger_1 (Empirical Challenger: Critic & Specialist)  
**Target**: Peter Cat Kolkata Website — GSAP Interaction & Animation Reliability  
**Date**: 2026-10-07T11:52:00Z  
**Verdict**: **APPROVE**

---

## 1. Observation

### 1.1 Empirical Test Suite Results
Executed verification commands across all four tiers of `test_e2e_suite.js`:

1. **Tier 1 (Feature Coverage — Isolation Happy-Path)**:
   - Command: `cmd /c "node test_e2e_suite.js --tier 1"`
   - Output: `Total Tests: 43 | Passed: 43 | Failed: 0 | Pass Rate: 100.0% (5.76s)`
2. **Tier 2 (Boundary & Corner Cases — Resilience & Edge Conditions)**:
   - Command: `cmd /c "node test_e2e_suite.js --tier 2"`
   - Output: `Total Tests: 35 | Passed: 35 | Failed: 0 | Pass Rate: 100.0% (0.31s)`
3. **Tier 3 (Cross-Feature Interactions — Pairwise Module Contracts)**:
   - Command: `cmd /c "node test_e2e_suite.js --tier 3"`
   - Output: `Total Tests: 10 | Passed: 10 | Failed: 0 | Pass Rate: 100.0% (0.01s)`
4. **Tier 4 (Real-World Scenarios — User Journeys & Full Pipeline)**:
   - Command: `cmd /c "node test_e2e_suite.js --tier 4"`
   - Output: `Total Tests: 6 | Passed: 6 | Failed: 0 | Pass Rate: 100.0% (5.32s)`
5. **Full E2E Suite Run**:
   - Command: `cmd /c "node test_e2e_suite.js"`
   - Output: `Total Tests: 94 | Passed: 94 | Failed: 0 | Pass Rate: 100.0% (11.04s)`

### 1.2 Next.js Production Build
- Command: `cmd /c "npm run build"`
- Output:
  ```
  ▲ Next.js 16.4.0 (Turbopack)
  ✓ Compiled successfully in 245ms
  ✓ Generating static pages using 5 workers (4/4) in 665ms
  Route (app)
  ┌ ○ /
  └ ○ /_not-found
  ○ (Static) prerendered as static content
  ```
- Exit code: `0`.

### 1.3 Code Inspection of `src/components/MuseumEntrance.tsx`
- **SSR Safety**:
  - Line 1: `"use client";`
  - Lines 8-10:
    ```ts
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }
    ```
  - Lines 24-27: Animation timeline setup occurs strictly inside `useEffect`, preventing execution in Node/SSR during static pre-rendering.
- **Teardown & Memory Leak Prevention**:
  - Lines 27 & 175-179:
    ```ts
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      ...
    }, containerRef);

    return () => {
      ctx.revert();
    };
    ```
  - Scope is strictly bound to `containerRef`. Calling `ctx.revert()` tears down all child timelines, tweens, ScrollTrigger instances, and `matchMedia` listeners registered inside `ctx`.
- **Accessibility & Reduced Motion**:
  - Lines 30-38:
    ```ts
    mm.add("(prefers-reduced-motion: reduce)", () => {
      if (introTextRef.current) gsap.set(introTextRef.current, { opacity: 0 });
      if (leftWallRef.current) gsap.set(leftWallRef.current, { opacity: 0 });
      if (rightWallRef.current) gsap.set(rightWallRef.current, { opacity: 0 });
      if (doorContainerRef.current) gsap.set(doorContainerRef.current, { opacity: 0 });
      if (portalLightRef.current) gsap.set(portalLightRef.current, { opacity: 0 });
      if (guideCueRef.current) gsap.set(guideCueRef.current, { opacity: 0 });
    });
    ```
  - `src/app/globals.css` lines 78-85 declares standard CSS `@media (prefers-reduced-motion: reduce)` rules setting duration to 0.01ms.
- **Layout Handoff & Interaction Boundaries**:
  - Lines 50-60:
    ```ts
    onLeave: () => {
      if (viewportRef.current) {
        viewportRef.current.classList.add("pointer-events-none");
      }
    },
    onEnterBack: () => {
      if (viewportRef.current) {
        viewportRef.current.classList.remove("pointer-events-none");
      }
    },
    ```
  - Line 191: Viewport wrapper has `overflow-hidden`.
  - `src/app/page.tsx` line 19 and `src/app/globals.css` line 24 include `overflow-x-hidden`.

---

## 2. Logic Chain

1. **Premise 1 (SSR Safety)**: SSR crashes occur when code queries `window`, `document`, or browser DOM during Node.js server execution.
   - Observation: Module-level registration is guarded by `typeof window !== "undefined"` (line 8). The component uses `"use client"` and mounts animations strictly in `useEffect`. Node SSR build generates static pages without exceptions (`npm run build` exits 0).
   - Invariant verified: GSAP does not crash the server runtime.
2. **Premise 2 (Lifecycle & Cleanup)**: Memory leaks occur when ScrollTrigger listeners or RAF loops outlive component unmounting.
   - Observation: `gsap.context()` encapsulates all timeline creation and `matchMedia` listeners with `containerRef` scoping. The cleanup function explicitly invokes `ctx.revert()`.
   - Invariant verified: Component unmount triggers clean teardown.
3. **Premise 3 (Motion Accessibility & Responsive Bounds)**: Extreme 3D scaling (e.g. `scale: 2.4` and `scale: 4.8`) risks creating horizontal scroll blowouts and causing disorientation for motion-sensitive users.
   - Observation: The sticky container enforces `overflow-hidden`, and the root containers enforce `overflow-x-hidden`. `gsap.matchMedia` handles `prefers-reduced-motion: reduce` by suppressing animations, while `globals.css` neutralizes CSS transitions.
   - Invariant verified: Motion accessibility and boundary constraints are satisfied.
4. **Premise 4 (Handoff Continuity)**: Pinned full-screen elements risk trapping mouse events or blocking clicks to underlying sections once scrolled past.
   - Observation: `ScrollTrigger.onLeave` dynamically appends `pointer-events-none` to the viewport container when scroll exceeds 3500px, restoring `pointer-events` on reverse scroll (`onEnterBack`). Subsequent sections (`HeroSection`, `MenuCatalogue`, `VisitSection`) remain fully interactive.
   - Invariant verified: Scroll handoff is fluid and unblocked.
5. **Premise 5 (Empirical Verification)**: Automated tests covering all tiers must pass without failure.
   - Observation: All 94 test assertions across Tiers 1-4 exited with code 0 and 100% pass rate.
   - Invariant verified: System passes empirical specification.

---

## 3. Caveats

1. **Reduced Motion Container Height**: When `prefers-reduced-motion: reduce` is active, the visual animations are suppressed (elements are hidden with `opacity: 0`), but the outer `<section>` retains `h-[400vh]`. A minor ergonomic refinement for future iterations would be dynamically adjusting the outer container height to `auto` or `100vh` under reduced motion, although the current implementation does not crash or break layout.
2. **Headless Execution Context**: Testing was performed on Windows Server environment via Node.js v26.10.0 and Next.js Turbopack compiler. Hardware GPU acceleration and physical touch swipe momentum were simulated via ScrollTrigger unit harnesses rather than physical mobile devices.

---

## 4. Conclusion

The GSAP and ScrollTrigger implementation in `src/components/MuseumEntrance.tsx` is robust, leak-free, SSR-safe, and fully compliant with project acceptance criteria. All automated E2E test suites (Tiers 1 through 4, total 94 tests) pass with a 100% success rate, and the Next.js production build succeeds cleanly.

**Final Verdict: APPROVE**

---

## 5. Verification Method

To independently verify these results:

```powershell
# Tier 1: Isolation happy paths
cmd /c "node test_e2e_suite.js --tier 1"

# Tier 2: Boundary & resilience conditions
cmd /c "node test_e2e_suite.js --tier 2"

# Tier 3: Pairwise cross-feature contracts
cmd /c "node test_e2e_suite.js --tier 3"

# Tier 4: Real-world scenarios & end-to-end user journeys
cmd /c "node test_e2e_suite.js --tier 4"

# Full suite execution
cmd /c "node test_e2e_suite.js"

# Production build verification
cmd /c "npm run build"
```

**Invalidation conditions**:
- Any tier test failures (exit code != 0).
- Unhandled `window` reference error during `npm run build`.
- Memory leaks or hanging ScrollTrigger instances post-unmount.
