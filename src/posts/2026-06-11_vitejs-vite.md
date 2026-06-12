---
date: 2026-06-11
repo: vitejs/vite
size: L
title: "WASM imports land; CSS import fixes follow"
excerpt: "Vite adds direct `.wasm` ESM imports and `import.meta.glob` case control, plus fixes external CSS handling with lightningcss."
commits: 5
authors: [sapphi-red, Menci, sheremet-va, btea, shulaoda]
commit_authors: {"d64a1a5": sapphi-red, "c23d85b": Menci, "2ad6737": btea}
---

### **Direct `.wasm` imports now work as ESM** (c23d85b)
Vite can now import precompiled `.wasm` files directly, exposing their exports as named ES module bindings. It also wires up WASM module imports automatically and updates the docs and typings to reflect the new async ESM integration path alongside `?init`.

### **`import.meta.glob` gets a `caseSensitive` option** (2ad6737)
Glob imports can now opt into case-insensitive matching via `caseSensitive: false`, which broadens what files are picked up on case-insensitive patterns. This adds a useful control knob for cross-platform projects and documents the new behavior.

### **External CSS URLs are preserved with lightningcss** (d64a1a5)
Lightning CSS handling now treats absolute and protocol-relative `@import` URLs as external instead of trying to resolve them internally. That fixes external stylesheet imports like icon CDN CSS and keeps the dev/build pipeline aligned with how `postcss-import` behaves.

### Other misc changes
- Rolldown bumped to 1.1.1 across the repo.
- Internal dev-environment refactor to fold bundled-dev support into `DevEnvironment`.
