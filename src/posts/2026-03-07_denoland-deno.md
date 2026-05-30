---
date: 2026-03-07
repo: denoland/deno
size: M
title: "Coverage gets function metrics; npm extraction faster"
excerpt: "Deno adds function coverage reporting, refines core module loading internals, and ships two npm tarball extraction speedups."
commits: 6
authors: [bartlomieju, dsherret]
commit_authors: {"cca3136": bartlomieju, "99bb112": bartlomieju, "adafd45": bartlomieju, "09a9f0b": dsherret, "e219207": dsherret}
---

### **Function coverage now shows up in reports** (adafd45)
`deno coverage` now includes Function % in both the summary table and HTML report, using function hit/miss counts that were already collected for lcov output. This makes coverage output more complete and surfaces a metric users previously couldn’t see.

### **Core recursive module loading gets a major cleanup** (cca3136)
`deno_core`’s recursive module loading API was refactored to remove interior mutability hacks, avoid repeated root-specifier resolution, and simplify the loading state machine. This is a substantial internal cleanup that should make the module loader easier to reason about and maintain.

### **npm tarball extraction gets faster and safer** (e219207, 09a9f0b)
Tarball extraction was optimized to reduce syscalls and avoid extra copying, with the commit notes calling out roughly 10% faster extraction. Decompression also switched to a more efficient buffer initialization approach, shaving off more overhead in the npm cache path.

### Other misc changes
- Ecosystem compatibility tests now run only on weekdays (99bb112)
- `Deno.Env` docs now mention `--env-file` loading in the type definitions (d6ebab8)
