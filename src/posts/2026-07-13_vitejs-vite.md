---
date: 2026-07-13
repo: vitejs/vite
size: S
title: "Dependency updates and a docs fix"
excerpt: "Mostly dependency bumps, plus a docs correction for library build format defaults."
commits: 4
authors: [dfedoryshchev]
commit_authors: {"369ed60": dfedoryshchev}
---

### **Docs now reflect the real library format defaults** (369ed60)
The `build.lib.formats` docs were corrected to explain the actual defaults: `['es', 'umd']` for a single entry and `['es', 'cjs']` for multiple entries. That removes a misleading `@default` note and should reduce confusion for library builds.

### Other misc changes
- Dependency updates across the repo, including rolldown/rolldown-plugin-dts/tsdown and several docs/playground package bumps (fef682d, 3c345e4, 04175fb)
- Small docs formatting/type cleanup in API guides and shared options docs (fef682d)
- Playground test expectation adjusted after CSS asset naming changed (3c345e4)
