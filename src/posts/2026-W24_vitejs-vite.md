---
date: 2026-06-14
repo: vitejs/vite
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Vite adds native WASM imports, fixes HTML/CSS edge cases"
excerpt: "This week Vite shipped direct WASM ESM imports, improved glob matching, fixed import map/CSS handling, and refreshed config loading and esbuild."
commits: 19
---

### **New module-loading capabilities land**
Vite added direct `.wasm` imports as first-class ESM, exposing WASM exports as named bindings and automatically wiring module imports. The existing `?init` path remains, but the new flow is documented and typed for native async integration.

### **Import resolution and asset handling get sturdier**
Several edge cases in HTML/CSS processing were fixed: import maps are now inserted correctly even when `modulepreload` links aren’t self-closing, and Lightning CSS now preserves absolute/protocol-relative `@import` URLs as external instead of trying to resolve them internally. `import.meta.glob` also gained a `caseSensitive` option for more predictable cross-platform matching.

### **Config loading and SSR/docs cleanup improve correctness**
Native config loading now tracks dependencies via `fresh-import` when available, reducing stale reload behavior. The week also included documentation corrections and clarifications around SSR external conditions, the environment/runtime APIs, and template defaults so the guides better match runtime behavior.

### **Security and toolchain updates**
Vite bumped esbuild to v0.28.1 as a security-related dependency refresh, and Rolldown was updated across the repo as part of ongoing toolchain maintenance.

### **Other misc changes**
- `create-vite` templates dropped redundant TypeScript `moduleResolution` settings and switched Node-side configs to `module: "nodenext"`.
- Ecosystem CI workflow permissions were fixed so PR/comment/Actions automation can run properly.
- A few docs and templates were tidied up, including team page updates, issue template links, and API reference wording.
