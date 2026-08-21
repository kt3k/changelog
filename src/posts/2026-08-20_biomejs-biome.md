---
date: 2026-08-20
repo: biomejs/biome
size: L
title: "Type erasure, TS stripping, and parser fixes"
excerpt: "Big JS/TS transform work landed alongside Astro, Vue, and GritQL correctness fixes, plus a WASM plugin enablement tweak."
commits: 6
authors: [siketyan, levrik, Princesseuh, dyc3]
commit_authors: {"69165c2": siketyan, "c065f99": levrik, "8f7786f": Princesseuh, "238a7e8": siketyan, "d4ed4e6": siketyan, "9c2667b": dyc3}
---

### **TypeScript type stripping lands as a new JS transform** (238a7e8)
Biome added a new `stripTypes` transformation that erases TypeScript annotations from code, with support wired into the transformation registry and a new `transformations/stripTypes` diagnostic category. The change also expands test coverage across classes, enums, imports/exports, namespaces, and multiline cases, making this a major new code-mod style feature.

### **Astro document parsing is corrected across many edge cases** (8f7786f)
The HTML parser now handles a wide range of Astro syntax more faithfully, including fragment shorthand, empty expressions, comments inside expressions/attributes, frontmatter boundary cases, and bare `<` text. This should substantially reduce false parse failures and downstream linting noise for Astro files.

### **Vue same-name bindings are now recognized as references** (c065f99)
The embeds/reference walker now registers Vue directive bindings like `:disabled` and `v-bind:disabled` as value references, preventing unused-variable false positives. That fixes a real correctness issue in Vue templates and aligns the analyzer with how these bindings are actually consumed.

### **GritQL rewrites now handle metavariables in quoted strings** (9c2667b)
Grit pattern compilation was fixed so metavariables embedded inside quoted strings are matched and rewritten correctly. The change tightens byte-range handling in snippet compilation and removes a class of rewrite failures for plugins.

### **Deserializer internals are refactored around type erasure** (69165c2)
The deserialize layer was reworked to use erased visitor/context types and shared map-member iteration, with broad ripple changes across config and migration deserializers. The goal is smaller binaries and a less monomorphized deserialization path, which is an important internal efficiency/refactor change.

### **WASM builds can now opt into JS plugins** (d4ed4e6)
The WASM package now exposes a `js_plugin` feature via `unstable`, and the runtime/plugin loader got platform-specific support for single-threaded wasm targets plus an explicit `getrandom` backend. This unblocks JS plugin usage in WASM builds and fixes a portability gap.

### Other misc changes
- New changesets for the Astro, Vue, and GritQL fixes.
- Minor test updates and snapshot refreshes.
- Small Cargo/config dependency and build-file tweaks.
