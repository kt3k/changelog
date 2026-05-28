---
date: 2026-05-23
repo: denoland/deno
size: M
title: "Node module hook fix and JUnit reporter rewrite"
excerpt: "Restores `Module.register` on `node:module` and swaps the JUnit reporter off `quick-junit` for a local XML writer."
commits: 2
---

### **Restore `Module.register` on `node:module`** (1fab348)
Deno now re-attaches `register` as a static on the default `node:module` export, matching the named stub that already existed. This fixes feature detection in tools like tsx that check `M.register` to decide whether module loader hooks are available.

### **Replace the JUnit reporter’s `quick-junit` dependency** (f0ef190)
The test reporter no longer relies on the external `quick-junit` crate; it now writes JUnit XML directly with a local implementation tailored to Deno’s output. That removes a dependency and its transitive packages while preserving report structure, escaping, test outcomes, timings, and properties.

### Other misc changes
- Added a regression test for `Module.register`/`Module.registerHooks` exposure.
- Dependency metadata updates from removing `quick-junit`.
