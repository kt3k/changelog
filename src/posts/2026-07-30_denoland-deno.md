---
date: 2026-07-30
repo: denoland/deno
size: L
title: "Deno tightens networking and package handling"
excerpt: "Origin-scoped redirect header stripping, safer stream close cancellation, npmrc auth matching fixes, plus new add and CJS analysis behavior."
commits: 8
authors: [nathanwhit, piscisaureus, dsherret, cppcoffee]
commit_authors: {"1635110": nathanwhit, "5558c9d": nathanwhit, "c026afe": nathanwhit, "786225a": nathanwhit, "131a727": nathanwhit, "39f402e": dsherret}
---

### **Fix redirect-sensitive headers to follow origin boundaries** (131a727)
Deno now strips authorization-class headers whenever a redirect crosses origins, instead of using a looser host/protocol check. This brings fetch behavior in line with the spec and closes cases where sensitive headers could leak across origin changes.

### **Cancel pending writes when network streams close** (1635110)
TCP, Unix, vsock, and TLS streams now cancel blocked writes and shutdowns as well as reads when the resource closes. That prevents closed sockets from staying alive behind a pending write and fixes a subtle resource-lifetime bug.

### **Match npm auth config by full authority and path boundaries** (c026afe)
The npmrc resolver now compares auth settings against the URL’s complete authority, including port, and only matches path prefixes at segment boundaries. This avoids selecting the wrong registry token for similarly named hosts, sibling paths, or non-default ports.

### **Add `deno add --unscoped` for aliasing scoped packages by name** (39f402e)
A new `--unscoped` flag lets `deno add` store scoped packages under their unscoped alias, e.g. `jsr:@david/jsonc-morph` becomes `jsonc-morph`. That makes import-map entries and install commands shorter and more consistent when you want the package’s public name.

### **Preserve pre-quoted shell args without weakening escaping** (5558c9d)
Node-compatible `spawn`/`spawnSync` now strip one caller-added quote layer before re-escaping shell arguments, so already-quoted values continue to work with `shell: true`. The added regression covers quote-breakout attempts to ensure the command-injection mitigation still holds.

### **CJS recursive analysis now uses loader-owned sources** (786225a)
CommonJS export analysis was refactored to take source from the active module loader instead of reopening files independently. That makes recursive analysis consistent across graph, npm, standalone, and bundled loading paths, and avoids early parse failures and permission surprises.

### Other misc changes
- Updated Node test viewer and contributor-guide links; removed crux.land/eszip viewer references
- Docs path updates in contributor instructions
