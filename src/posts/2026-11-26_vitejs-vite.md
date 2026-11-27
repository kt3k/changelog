---
date: 2026-11-26
repo: vitejs/vite
size: L
title: "Vite 8.4 lands with security and DX upgrades"
excerpt: "Vite 8.4 ships an allow-list FS security model, dynamic import refetching, CSS subpath imports, and a new create-vite release."
commits: 6
authors: [sapphi-red, jay-es, btea]
commit_authors: {"67e8298": sapphi-red}
---

### **Vite 8.4 introduces a stricter file-serving security model** (67e8298)
Vite 8.4 adds an allow-list based approach for `server.fs`, including support for `server.fs.strict: 'extended'` and safe-module registration via `environment.addSafeModule`. This is a meaningful security hardening step that narrows what the dev server can expose and sets up a future default change.

### **Dynamic imports, CSS URL resolution, and Wasm imports get better** (67e8298)
The release also improves dynamic import retry behavior so related CSS can be re-fetched on re-execution, enables subpath imports in CSS `url()`, and adds support for Wasm source-phase imports. These changes improve correctness and bring Vite closer to newer browser and platform capabilities.

### **Vite now detects duplicate CLI dev processes** (67e8298)
Running a second dev server for the same project now fails with a helpful lock-style error unless `--bypass-lock` is passed. This avoids accidentally running conflicting servers against the same app.

### **create-vite 9.4.0 adds new scaffolding options and updates templates** (dbb01aa)
`create-vite` is released at 9.4.0 with new support for a devtools option, the Vite+ package manager, and Solid 2 in solid templates. The templates also move to Vite 8.4.0, so new projects pick up the latest core changes immediately.

### **Vite 8.4.0 is tagged and its changelog is rolled up** (841132e)
The core package is promoted from beta to the final 8.4.0 release, with the changelog reorganized to include the beta entries under a dedicated section. This is mostly release plumbing, but it marks the stable cut of the cycle.

### Other misc changes
- Docs cleanup: removed the ViteConf 2026 banner and refreshed the sponsor sidebar link/text.
- Small internal refactor: `combineSourcemaps()` now uses `.some()` instead of `.find()`.
- Docs tweak: recommend `tsrs` instead of `oxlint-tsgolint` in the React TS template.
