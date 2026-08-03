---
date: 2026-08-02
repo: vitejs/vite
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: M
title: "Vite 8.2 tightens HMR, config, and SSR edge cases"
excerpt: "This week fixes sub-path HMR, bundled-dev reloads, plugin-driven inputs, SSR stack traces, and a few config parsing edge cases."
commits: 25
---

### **HMR and bundled-dev behavior got more reliable**
Vite fixed several dev-server edge cases that could make hot updates flaky or duplicate work. Bundled workers are now re-emitted during `load`/`transform` so patched worker URLs point to real files, bundled-dev reloads are queued and flushed once after rebuild instead of triggering redundant fallback reloads, and `indexHtml` now strips `base` before module-graph timestamp lookup so HMR works correctly under sub-path deployments.

### **Build and config resolution now handle more plugin-driven inputs**
Top-level `input` is now resolved without eagerly forcing absolute paths, which keeps plugin-resolved virtual entries and client/SSR handling aligned. Import analysis also preserves interop for imports injected into optimized dependencies, fixing a dev-only class of optimize-deps failures.

### **SSR and config parsing edge cases were hardened**
SSR stack traces now survive when `Object.prototype` is frozen by cloning call sites onto a null-prototype object. Config loading also now handles hashbang offsets with CRLF, CR, and Unicode line terminators, avoiding breakage on unusual shebang formatting. Native config compatibility warnings were improved to report `file:line:column` for easier navigation to unsupported syntax.

### **Release and ecosystem updates**
Vite 8.2.0 and create-vite 9.1.2 were released, alongside dependency bumps and rolldown-related package updates. The repo also moved its build CI to Node 24 while keeping tests on Node 20.

### **Other misc changes**
- create-vite docs now list the React Compiler templates
- `cacheDir` fallback docs were clarified
- Playground coverage expanded for assetsInclude, unknown extensions, and `?inline`
- Various template, lockfile, and workflow refreshes
