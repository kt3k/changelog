---
date: 2026-10-20
repo: oven-sh/bun
size: L
title: "Crash hardening and bake/dev fixes land"
excerpt: "Bun fixed widespread crash paths, tightened bake behavior, improved source position accuracy, and refreshed trust roots and lint/check tooling."
commits: 9
authors: [Jarred-Sumner, dylan-conway, alii]
commit_authors: {"9b4284f": Jarred-Sumner, "4a5e6eb": Jarred-Sumner, "b7efd52": dylan-conway, "ea6a2c7": Jarred-Sumner, "6f58f6b": dylan-conway, "eb807b7": alii, "3469eb3": alii}
---

### **Major crash hardening across Bun** (9b4284f)
A large hardening pass fixes crashes in the runtime, bundler, dev server, shell, and CLI, turning a broad set of fatal conditions into normal errors or clean exits. This is the biggest change of the day and should materially reduce segfaults, panics, and aborts in real usage.

### **Source positions now agree across coverage, stack traces, and sourcemaps** (6f58f6b)
Bun now uses one shared set of tests and fixes to make reported source positions consistent across coverage, call sites, error previews, build errors, JUnit, inline snapshots, and source maps. That improves debugging accuracy and reduces cases where the wrong file location was reported.

### **`bun bake` fixes built-in `require()` and failed route loads** (eb807b7)
The dev server now distinguishes `require()` of a built-in module from ESM `import`, so it returns the CommonJS-style builtin export instead of the ESM namespace. It also avoids null-derefs when a route import throws, which closes off a real crash path in page loading.

### **Framework page exports are now router-defined, not hardcoded** (3469eb3)
Bake’s framework support now lets each router specify which server-only exports to strip from browser bundles, instead of relying on the three Next.js names globally. That makes nested/client-page routing more correct and prevents server-only imports from leaking into browser builds.

### **Bundled root certificates were regenerated and pruned** (ea6a2c7)
Bun refreshed its bundled CA set and removed four emSign roots from the bundle, with tests updated to guard both the label-based filter and the resulting SHA-256 fingerprints. This changes TLS trust behavior in a security-sensitive area and keeps the bundled roots aligned with policy.

### **CI images now validate updated system trust stores** (b7efd52)
The CI image spec now updates Linux and Windows trusted roots, and moves the FreeBSD sysroot to 14.4. The build scripts also add explicit checks that the intended roots are actually dropped, which helps prevent trust-store drift in CI.

### **`bun check`/`bun lint` get faster and fix missed diagnostics** (4a5e6eb)
This follow-up to the checker work restores errors that were lost, fixes a few lint cases, and speeds up `bun check` substantially. It also adds documentation for lint ignore semantics and updates the implementation to better match ESLint/oxlint behavior.

### Other misc changes
- Bake/dev test fixes for Windows cleanup and flaky cases (2 commits)
- More flaky-test cleanup across `test/` (1 commit)
- Documentation updates for FFI, JSC profiling, websockets, bindgen, and bunfig
- Small internal/runtime refactors in uSockets, source-map, and printer code
