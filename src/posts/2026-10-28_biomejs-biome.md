---
date: 2026-10-28
repo: biomejs/biome
size: L
title: "Vue lint rules and server fixes land"
excerpt: "New Vue rules, a Vue parsing fix, and daemon/parser performance and memory improvements shipped today."
commits: 12
authors: [dyc3, ematipico, NikitaCOEUR]
commit_authors: {"824df15": dyc3, "861b288": dyc3, "f074730": dyc3, "40a82b0": dyc3, "df0f7cc": dyc3, "b6cbec8": dyc3, "752d367": ematipico, "90a4d74": ematipico, "2eddda9": dyc3, "8ff63f4": NikitaCOEUR}
---

### **New Vue lint rules for deprecated APIs and unused refs** (824df15, 861b288, 2eddda9)
Biome added several nursery Vue rules: `noVueDeprecatedDeleteSet`, `noVueUnusedRefs`, and `noVueComputedPropertiesInData`. These catch removed Vue 3 APIs, dead template refs, and computed values accessed too early in `data()`, and each rule is wired into config, diagnostics, and ESLint migration support.

### **Vue `v-for` defaults are now parsed and linted correctly** (df0f7cc)
Biome now parses default values in Vue `v-for` bindings as JavaScript instead of treating them as syntax errors. That fixes formatting and linting for patterns like `({ value = ... }) in rows`, and updates the `useVueValidVFor` rule to allow defaults on the main alias while still rejecting invalid key/index aliases.

### **Daemon and parser caching got a memory overhaul** (752d367, 90a4d74)
The server-side cache model was reworked so the daemon reuses file and project data more effectively across `biome check --use-server` runs, reducing memory growth. Related parser and semantic-model queries now use bounded LRU caching, and the internals were refactored to better document how parsed sources, snippets, and semantic models are tracked.

### **Rowan lookups and text access got faster** (f074730, b6cbec8, 40a82b0)
Biome improved `rowan` node and text access paths, including resolving syntax nodes closer to known locations and reading node text from the green tree. These changes cut `biome lint` runtime by roughly 1% to 3% on large projects, with the biggest wins in variable-tracking and unreachable-code rules.

### **CLI now uses jemalloc on x86_64 musl** (8ff63f4)
The CLI switches to jemalloc for x86_64 musl builds, which should help allocator behavior on that target. The change was also propagated through benchmark crates to keep build settings consistent.

### **Other misc changes**
- Release bookkeeping removed stale changeset files.
- Fixed a security advisory in `Cargo.lock`.
