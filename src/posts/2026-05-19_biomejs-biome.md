---
date: 2026-05-19
repo: biomejs/biome
size: L
title: "Plugins and language gating land"
excerpt: "Feature-gating plugins, GraphQL/Markdown/YAML, plus improved CSS/SCSS parsing and formatting for unknown at-rules and binary edges."
commits: 5
authors: [ematipico, denbezrukov]
commit_authors: {"1971055": ematipico, "dc73b6b": ematipico, "6c1f017": denbezrukov, "a67c220": denbezrukov, "005d28d": ematipico}
---

### **Plugins are now opt-in behind a feature gate** (dc73b6b)
Biomes configuration, CLI, LSP, WASM, and service crates now only pull plugin support when the `plugins` feature is enabled. This reduces default surface area and makes plugin loading an explicit opt-in across the stack.

### **CSS parser/formatter now handles unknown at-rules better** (6c1f017)
The CSS pipeline gained support for parsing and formatting unknown CSS/SCSS at-rules, including dedicated syntax handling and formatter output for unknown at-rule names. The unknown-at-rule lint was also adjusted to compare against static names only, avoiding false matches on dynamic Sass-style names.

### **SCSS binary expression formatting preserves tighter source edges** (a67c220)
SCSS binary expression formatting was reworked to better preserve source-tight operator/operand edges and indentation behavior, especially around parenthesized expressions and control-flow conditions. This should reduce surprising whitespace changes in complex SCSS expressions and bring formatting closer to expected Prettier-like output.

### **Markdown, YAML, GraphQL, and Grit become feature-gated in service code** (1971055)
The service crate and its consumers now enable Markdown, YAML, GraphQL, and Grit support through explicit Rust features instead of always compiling them in. That makes builds more modular and avoids paying for language support that a given binary or test target does not use.

### Other misc changes
- Grit search CLI/search code was refactored to use a new `SearchLanguage` type and service-side search plumbing (005d28d)
- Cargo feature wiring updated across CLI, LSP, formatter tests, and dev-dependencies for the new gating model (dc73b6b, 1971055)
- Generated CSS syntax/factory updates and related test snapshot refreshes (6c1f017)
