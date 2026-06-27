---
date: 2026-06-26
repo: biomejs/biome
size: M
title: "Vue bind fix and test-chain handling"
excerpt: "Biome fixed Vue 3.4 same-name shorthand handling, recognized chained test.each calls, and refactored feature gating across core packages."
commits: 3
authors: [otkrickey, WaterWhisperer, ematipico]
commit_authors: {"36d5aa7": otkrickey, "771daa4": WaterWhisperer, "1e7dbfc": ematipico}
---

### **Vue `useVueValidVBind` now accepts same-name shorthand (36d5aa7)**
Biome no longer flags Vue 3.4+ same-name shorthand like `:foo` and `v-bind:foo` as missing a value. The rule still catches truly missing bindings such as bare `v-bind` or dynamic args without an explicit value, so the lint stays strict while matching modern Vue syntax.

### **`noMisplacedAssertion` understands chained `test.each` variants (771daa4)**
The JS analyzer now treats chained table tests like `test.each()`, `test.concurrent.each()`, and `it.concurrent.only.each()` as real test calls. That fixes false positives from `noMisplacedAssertion` and also improves formatting coverage for these declarations.

### **Core feature gating was reorganized around language features (1e7dbfc)**
Biome’s configuration and crate wiring were reworked to gate language support more explicitly via features like `lang_html`, `lang_js`, `lang_json`, and `lang_css`. This is a broad internal refactor that changes how the CLI and configuration crates pull in language-specific code, laying groundwork for cleaner optional support and slimmer builds.

### Other misc changes
- Added changesets for the Vue and JS analyzer fixes.
- Updated tests/snapshots for Vue `useVueValidVBind` and JS test-declaration formatting.
- Cargo manifest dependency/feature plumbing across multiple crates.
