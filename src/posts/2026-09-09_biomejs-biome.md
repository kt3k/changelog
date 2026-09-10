---
date: 2026-09-09
repo: biomejs/biome
size: L
title: "Plugin APIs and CSS parsing get big upgrades"
excerpt: "Semantic plugins, richer JS type inference, and several CSS parser/formatter fixes landed alongside perf and refactors."
commits: 24
authors: [denbezrukov, ematipico, dyc3, siketyan, hori-design]
commit_authors: {"571d397": dyc3, "b019982": denbezrukov, "cb0a3be": ematipico, "a9e3cad": ematipico, "b7a874d": ematipico, "21a10cf": siketyan, "701804f": denbezrukov, "26ff5b4": denbezrukov}
---

### **Plugin system gains semantic models, rule context, and fix mutations** (cb0a3be, a9e3cad, b7a874d)
Biome’s JS plugin runtime now exposes semantic models and per-rule context, and plugin actions carry precomputed text edits instead of raw strings. It also adds code-fix mutation support, which is a major API expansion for plugin authors and a prerequisite for more capable lint/fix behavior.

### **Type inference now propagates callback parameter types from call signatures** (21a10cf)
The analyzer now infers unannotated callback parameter types from the function signature they’re passed to, and respects explicit type arguments on calls. That unlocks more accurate diagnostics in rules like `noFloatingPromises`, `noBaseToString`, and related type-aware checks.

### **CSS parser/formatter fixes broaden SCSS and URL support** (b019982, 701804f, 26ff5b4)
CSS URLs starting with `@` or `!` are now accepted, including escaped-tail cases that previously broke formatting, and the formatter preserves the right raw text. Biome also adds support for interpolated SCSS subselectors and parenthesized Sass query values, fixing real parsing gaps in media/container query and selector handling.

### **DOM lint utilities were extracted and shared** (571d397)
Shared DOM AST helpers were pulled into a dedicated utility module and the DOM-related nursery rules were simplified around it. This is mostly an internal refactor, but it reduces duplication and makes future DOM rule work easier.

### Other misc changes
- CSS formatter performance improvements in separated-list traversal and verbatim bookkeeping (2 commits)
- Dependency and toolchain bumps, including Prettier/Svelte, pnpm, Vitest, GitHub Actions, Rust crates, and devcontainer images (11 commits)
- React Compiler vendored crate bump and experimental-check noise reduction (2 commits)
- Package/workflow rename follow-up and repo config updates (1 commit)
