---
date: 2026-09-10
repo: vitejs/vite
size: M
title: "Vite 8.3.0 lands with fixes and perf wins"
excerpt: "Vite shipped 8.3.0, adding CRLF-safe error frames, tighter node_modules detection, and faster proxy matching."
commits: 8
authors: [btea, sapphi-red, nyxst4ck, Tiancheng-Xu, kakiuwang-ui]
commit_authors: {"9913672": nyxst4ck, "c8f7b28": Tiancheng-Xu, "8abf700": btea, "ef0dc17": kakiuwang-ui}
---

### **Vite 8.3.0 release with meaningful bug fixes and a proxy speedup** (434e8e9)
Vite cut 8.3.0, rolling up the day’s substantive work into a stable release. The update includes a performance improvement in proxy handling plus fixes for CRLF line endings and node_modules path detection.

### **Code frames now handle CRLF correctly** (9913672)
Position-to-offset and code-frame generation were updated to account for `\r\n` line endings, which prevents misaligned diagnostics on Windows-style files. The new tests cover both offsets and ranges, so stack traces and inline error snippets should point at the right location regardless of newline style.

### **Proxy context matching is precompiled at server startup** (8abf700)
Proxy route matchers are now turned into reusable predicates once when the server starts, instead of re-parsing regex contexts on every request. That trims per-request overhead in proxy-heavy dev servers and should make matching cheaper under load.

### **`node_modules` detection now matches real path segments only** (ef0dc17)
`isInNodeModules()` now uses a segment-aware regex instead of a plain substring check, so paths like `my_node_modules` or `node_modules.js` no longer get misclassified. This fixes false positives in dependency handling and pnpm-style nested layouts while preserving expected matches.

### **SSR docs now show how to reload the browser for SSR-only module changes** (c8f7b28)
The SSR guide adds a concrete plugin example for custom setups where a module changes only in the SSR environment. It explains how to invalidate SSR modules and trigger a client full reload, filling in a gap that framework integrations often hide.

### Other misc changes
- Changelog merge and prerelease bookkeeping (2 commits)
- create-vite 9.2.1 release and template dependency bumps
- Changelog automation cleanup in `mergeChangelog.ts`
