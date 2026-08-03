---
date: 2026-08-02
repo: denoland/deno
size: M
title: "Deno tightens Node compat and fixes outdated/fmt"
excerpt: "BlockList ranges got a major performance refactor, while Deno also fixed fmt stdin extensions, JSR outdated detection, and a few compatibility bugs."
commits: 7
authors: [rathodkunj2005, tomas-zijdemans, nathanwhit, crowlbot, bartlomieju, cppcoffee]
commit_authors: {"a117b87": rathodkunj2005, "f425eda": rathodkunj2005, "e3fb03a": tomas-zijdemans, "140ec24": nathanwhit, "7e4d1fb": crowlbot, "f69a8ff": bartlomieju, "51c48cf": cppcoffee}
---

### **Node BlockList ranges now store compact intervals** (140ec24)
Deno’s `node:net` BlockList no longer expands large ranges address-by-address; it now stores inclusive start/end pairs and checks containment numerically. That removes the CPU/memory blowup for large ranges while preserving IPv4-mapped IPv6 behavior and existing `rules` serialization.

### **`deno outdated` stops treating JSR pre-releases as latest** (f69a8ff)
The package manager now skips pre-release versions when the currently resolved dependency is stable, so `--latest` follows JSR’s stable `latest` semantics instead of surfacing alpha/beta versions. This makes outdated checks more accurate for projects that aren’t already on a pre-release line.

### **`fmt --ext` now accepts XML and SVG on stdin** (f425eda)
Formatting from stdin now recognizes `xml` and `svg` as valid extensions, matching the file-based formatter behavior. This unblocks correctly formatted XML/SVG pipelines that rely on stdin input.

### **Http2 settings callbacks no longer fire after destroy** (7e4d1fb)
A destroyed HTTP/2 session now exits early before invoking the pending settings callback. This fixes a race where late SETTINGS_ACK events could call user code after teardown.

### **Storage keeps the constructor name** (a117b87)
Web Storage now avoids binding the `constructor` property like a normal method, so `localStorage.constructor.name` and `sessionStorage.constructor.name` stay `"Storage"`. This restores expected Web API identity behavior.

### **Other misc changes**
- Removed the vendored `ext/node/polyfills/_util/async.ts` and its import-map entry (e3fb03a)
- Docs: corrected a few N-API and Node compat links (51c48cf)
