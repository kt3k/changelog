---
date: 2026-05-24
repo: biomejs/biome
period: weekly
slug: 2026-W21
period_label: "May 18–24, 2026"
size: L
title: "SCSS formatting gets a major polish pass"
excerpt: "A week of formatter and parser fixes tightened SCSS/CSS behavior, added feature gating, and hardened CI/security checks."
commits: 31
---

### **SCSS/CSS formatting became much more source-faithful**
Biome spent most of the week improving SCSS formatting edge cases so output preserves author intent instead of normalizing away structure. Notable fixes include keeping interpolation spacing intact, preserving blank lines in map pairs, improving wrapping for SCSS maps and control-variable maps, handling commented map values better, and aligning comment placement around declarations more closely with Prettier. Nested properties with interpolated names are now parsed too, which expands the formatter/parser support for modern SCSS patterns.

### **Parser and lint behavior were hardened for real-world SCSS and Tailwind code**
The CSS/SCSS parser gained better handling for unknown at-rules, interpolated query features, malformed selectors, and missing selector names in `@extend` and attribute selectors. On the lint side, Tailwind v4 typed arbitrary values now sort correctly, and `noMisusedPromises` was fixed to avoid a scope-resolution stack overflow on nested functions with shadowed destructured variables.

### **Feature gating reduced default build surface area**
Plugins are now opt-in behind a feature flag across the CLI, LSP, WASM, service, and config crates. The service stack also moved Markdown, YAML, GraphQL, and Grit support behind explicit Rust features, making builds more modular and trimming unnecessary default dependencies and compile paths.

### **CI and dependency plumbing were tightened**
The workspace and CI checks now run with `--all-features` for better coverage of gated code, and config/doc generation was updated to stay in sync. GitHub Actions got a security scan workflow, workflow permissions were hardened, and the compromised `close-issue` workflow was disabled. The CLI transport layer also dropped `dashmap` in favor of a more explicit pending-request map, while several dependency and snapshot refreshes landed throughout the week.

### Other misc changes
- HTML debug helpers were gated out of release builds.
- Several docs and schema descriptions were refreshed.
- PNPM/Corepack workflow setup was simplified in contributor and CI docs.
