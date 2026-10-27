---
date: 2026-10-26
repo: vitejs/vite
size: M
title: "Vite fixes URL watch tracking"
excerpt: "Vite now watches assets referenced via `new URL(..., import.meta.url)` even when query strings or hashes are present, plus a couple of maintenance updates."
commits: 3
authors: [lprnmns, btea]
commit_authors: {"e954a9c": lprnmns, "2ed1031": btea}
---

### **Fix asset URL watching for query/hash refs** (e954a9c)
Vite now strips query strings and hashes before deciding whether to `addWatchFile` for `new URL(..., import.meta.url)` references. That means files like `./foo.png?inline` or `./foo.png#hash` will still be watched correctly during dev, avoiding stale reload behavior.

### **Other misc changes**
- Updated `tsdown` to `^0.23.2` in `create-vite` and `plugin-legacy` (ac9a56d)
- Removed outdated `minimumReleaseAgeExclude` entries from workspace config (2ed1031)
