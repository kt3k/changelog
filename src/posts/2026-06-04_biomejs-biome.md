---
date: 2026-06-04
repo: biomejs/biome
size: L
title: "Biome v2.5 lands with a few fixes"
excerpt: "Release merge plus fixes for a CSS regression, a type-info recursion crash, and broader SCSS/WASM support."
commits: 7
authors: [ematipico, denbezrukov]
commit_authors: {"7ff6b16": ematipico, "dd0a747": ematipico, "9e3cad4": ematipico, "97e2c32": ematipico, "2bf1d8c": ematipico, "232a5cb": denbezrukov, "53a115a": denbezrukov}
---

### **Release: Biome v2.5** (dd0a747)
A version bump merged a large batch of changesets, indicating the v2.5 release cut. This is the main delivery for the day and likely includes the feature set and fixes staged in `next`.

### **Fix type-aware rules from recursing forever** (7ff6b16)
Biome now tracks recursion depth while flattening `typeof`-based expressions, preventing a stack overflow in type-aware rules like `noFloatingPromises`, `noMisusedPromises`, and `noUnnecessaryConditions`. The new regression test covers the self-referential pattern that used to crash analysis.

### **Fix CSS global selector handling regression** (2bf1d8c)
The CSS/HTML module graph now recognizes both forms of CSS pseudo-class function selectors when checking for `:global(...)`, using a shared union helper instead of a narrower node cast. That keeps global-scoped classes from being misclassified during dependency and usage tracking.

### **Fix `noUnusedClasses` exemption for `:global(...)`** (97e2c32)
The linter’s global-selector check was updated to use the shared pseudo-class helper, aligning it with the parser/module-graph fix. This removes a regression where globally scoped classes could be reported as unused.

### **Sync CSS/SCSS formatter fixtures with Prettier** (232a5cb)
Formatter snapshots were refreshed across a number of CSS and SCSS edge cases, including escaped attributes, custom properties, and SCSS function/map/math examples. These are test-only updates, but they reflect formatter behavior changes that matter for parity with Prettier.

### **Enable SCSS in the unstable WASM build** (53a115a)
The unstable WASM feature set now includes SCSS support, and `biome_service` exposes the corresponding `lang_scss` feature flag. This makes SCSS available in experimental browser/WASM builds.

### Other misc changes
- Merge main into next (9e3cad4)
- Release workflow and changeset churn from the v2.5 merge
- Minor test snapshot cleanup and internal regression scaffolding
