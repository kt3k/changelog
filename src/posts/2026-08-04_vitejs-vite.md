---
date: 2026-08-04
repo: vitejs/vite
size: M
title: "Bundled dev gets real runtime cleanup"
excerpt: "Bundled dev now injects its runtime client differently, while a big test sweep and doc/link fixes land alongside it."
commits: 7
authors: [h-a-n-a, sapphi-red, btea, ChinesePrince07]
commit_authors: {"23b8a08": sapphi-red, "5290aea": h-a-n-a, "ff4ab6c": h-a-n-a, "fe37d67": sapphi-red, "e72036e": btea, "06cd77f": ChinesePrince07, "278dc80": h-a-n-a}
---

### **Bundled dev stops baking server values into the bundle** (23b8a08)
The bundled-dev client/runtime path was reworked so server values are no longer injected directly into the bundle. The server now writes a dedicated runtime file and prepends it to entry chunks, which makes bundled dev behavior cleaner and less coupled to build-time internals.

### **Bundled dev removes the lazy stub-module workaround** (e72036e)
The old plugin wrapper that skipped transforms for Rolldown's `?rolldown-lazy=1` stub modules was deleted. This simplifies bundled dev internals and suggests that the earlier stub-module issue no longer needs a special-case workaround.

### **Bundled-dev coverage expands across CSS, assets, and long-tail cases** (5290aea, ff4ab6c, 278dc80)
A large batch of e2e tests was updated to run in bundled dev, with assertions adjusted for bundled output paths, hashed assets, and runtime differences. This is important because it raises confidence in the bundled-dev mode across CSS handling, asset serving, dynamic imports, environment behavior, and previously skipped edge cases.

### **Legacy watch rebuild gets a flaky-output workaround** (fe37d67)
A small timing workaround was added to the legacy styles-only watch test to wait for rebuild output to settle. This addresses a flaky failure in watch mode without changing product behavior.

### **Docs links for the Environment API are fixed** (06cd77f)
Broken links in the Environment API docs were corrected to the new route and anchor structure. This is a maintenance-only fix that improves navigation for plugin authors.

### Other misc changes
- Test-only tweaks and skips across playgrounds
- CSS/env/json/dynamic-import assertions updated for bundled dev
- Minor refactors in bundled-dev test helpers and playground expectations
