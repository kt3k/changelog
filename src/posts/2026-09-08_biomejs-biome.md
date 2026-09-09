---
date: 2026-09-08
repo: biomejs/biome
size: L
title: "Promise globals, DOM linting, and fixes"
excerpt: "Added Promise global typing and a new DOM traversal lint rule, plus a React Compiler wasm fix and several smaller bug/perf updates."
commits: 7
authors: [ematipico, denbezrukov, minseong0324, dyc3, devtechedge]
commit_authors: {"2b1718e": minseong0324, "353cbae": dyc3, "e997900": devtechedge, "ef9f7fa": ematipico, "ec9793d": denbezrukov, "579f401": denbezrukov, "4969ee1": ematipico}
---

**Add Promise global types to JS type info** (2b1718e)
Biome’s generated JS type model now includes `Promise` and its constructor/prototype/static methods, replacing the old gap in global typing support. This should improve downstream analysis of Promise-heavy code and make the type info more complete.

**Fix React Compiler to run in WebAssembly builds** (353cbae)
The React Compiler path now skips the native stack-spawning worker setup on wasm and relies on a larger linker stack budget instead. That fixes a silent no-diagnostics failure in WebAssembly builds, including the playground and wasm-based JS API usage.

**Add the `useBetterDomTraversing` nursery rule** (e997900)
Biome now flags positional DOM traversal patterns like indexed child access, repeated parent hops, and chained `querySelector()` calls, encouraging APIs such as `.firstChild`, `.closest()`, and merged selectors instead. The migration mapping, config/schema plumbing, and rule docs were all added, so the rule is usable from configuration and ESLint migration flows.

**Add JS traversal methods support for plugins** (ef9f7fa)
Plugin-facing JS traversal mappings were updated to use `elements` instead of `children` for JSX/astro fragment-like nodes, aligning the generated language bindings with the current tree shape. This is an important internal API adjustment for GritQL/plugin consumers that depend on those node slots.

**Improve line-counting performance in analyzer utilities** (579f401)
The shared `count_lines_in_file` helper now avoids rebuilding tokens when `skipBlankLines` is off, counting newline trivia directly instead. That speeds up `noExcessiveLinesPerFile` and tightens its behavior around EOF tokens and comments/token text.

### Other misc changes
- Various lint/suppression bug fixes, including `role="separator"` handling, private class member usage detection, and suppression comment placement (4969ee1)
- Added SCSS formatter benchmarks and wired them into benchmark CI (ec9793d)
- CI/workflow tweaks for plugin API type checks and wasm build coverage (ef9f7fa, 353cbae)
- Misc generated/config/test updates for the new rule and type-info migration (2b1718e, e997900, 4969ee1, 579f401)
