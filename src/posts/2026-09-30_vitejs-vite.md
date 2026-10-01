---
date: 2026-09-30
repo: vitejs/vite
size: M
title: "Build fixes and a preload perf win"
excerpt: "Fixes minify merging, CSS/preload edge cases, and removes a quadratic preload scan."
commits: 5
authors: [antur84, hktitof, charan-rathore, keshav-019, shoutoutuoadi325]
commit_authors: {"cf5c028": antur84, "bba3bb8": hktitof, "5e4b9ca": charan-rathore}
---

### **Preload helper avoids quadratic SSR link scanning** (cf5c028)
The build preload helper now caches existing `<link>` hrefs in sets instead of rescanning the full DOM for every dependency. That cuts the old quadratic behavior during build-time preload injection, and the updated preload playground test confirms already-preloaded chunks are not duplicated.

### **Rolldown output minify now merges correctly** (bba3bb8)
Vite now preserves user-provided `rolldownOptions.output.minify` objects by merging them with the lib build defaults instead of replacing them outright. This fixes cases where partial minify config would previously drop default settings like `compress` or `codegen` behavior.

### **Optimize-deps treats `browser: false` mappings as empty modules** (5e4b9ca)
The dep optimizer now distinguishes explicit `browser:false` mappings from unsupported Node builtins, returning an empty module without emitting the browser-compatibility warning. This removes noisy warnings and aligns optimized-dep behavior with package browser-field semantics.

### **Other misc changes**
- CSS preload handling for `renderBuiltUrl` URLs with queries.
- HTML asset decoding fix for percent-encoded `srcset` URLs.
- Added/updated playground coverage for the above fixes.
