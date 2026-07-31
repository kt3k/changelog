---
date: 2026-07-30
repo: vitejs/vite
size: M
title: "Vite 8.2.0 lands input and HMR fixes"
excerpt: "Vite ships 8.2.0 with top-level input support fixes, bundled-dev reload improvements, and a server-side indexHtml bug fix."
commits: 6
authors: [sapphi-red, h-a-n-a, ForgottenR]
commit_authors: {"b24381d": h-a-n-a, "41df81a": sapphi-red, "fa005d1": ForgottenR}
---

### **Top-level `input` now behaves correctly with plugins** (41df81a)
Vite now resolves a top-level `input` option without forcing it to absolute paths up front, which fixes plugin-driven virtual inputs and keeps client/SSR environment handling aligned. This closes a gap where builds and dev config could mis-handle non-file entries or plugin-resolved inputs.

### **Bundled dev reloads now happen once after rebuild** (b24381d)
Bundled-dev HMR no longer falls back to an immediate page reload path; instead it queues a single reload-needed signal and flushes the actual page reload after rebuild. That makes reload behavior more consistent and avoids redundant reloads during HMR failure/rebuild flows.

### **`indexHtml` now strips `base` before module-graph lookup** (fa005d1)
The server’s HTML transform now looks up HMR timestamps using the base-stripped URL, fixing cases where apps served from a non-root `base` would miss timestamp injection for entry scripts. This prevents duplicate entry execution and stale HMR behavior under sub-path deployments.

### **Other misc changes**
- Release bumps: `vite` 8.2.0, `create-vite` 9.1.2
- Playground/test config updates for top-level `input` support
- Dependency/template version bumps across `create-vite` templates
