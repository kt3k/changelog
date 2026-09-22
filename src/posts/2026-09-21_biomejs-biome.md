---
date: 2026-09-21
repo: biomejs/biome
size: L
title: "Biome adds Tailwind, YAML, LSP fixes"
excerpt: "New lint and formatter features land alongside Vue slot, VCS ignore, and language server fixes; Math globals are typed too."
commits: 9
authors: [dyc3, ematipico]
commit_authors: {"82f9b0e": dyc3, "2cdd220": dyc3, "3841c26": ematipico, "3a21c80": ematipico, "4e7fe94": ematipico, "429cf95": dyc3}
---

### **New Tailwind raw-color lint rule** (429cf95)
Biome adds `noTailwindRawColors`, a nursery rule that flags Tailwind palette colors like `bg-pink-500` and `text-white` in favor of design-system tokens such as `bg-primary`. The rule is wired into config, diagnostics, migration, and HTML analyzers, so it’s ready for real use.

### **YAML formatter now honors suppression comments** (4e7fe94)
Formatter suppressions in YAML now attach to the following mapping value or flow entry instead of being treated like ordinary document comments. That fixes cases where `# biome-ignore format` should preserve inline structure, and expands coverage for global and node-level suppression scenarios.

### **LSP file watchers are scoped correctly per workspace** (3841c26)
The language server now registers watched-file globs per workspace folder, with a fallback to `rootUri` when needed. It also preserves compatibility for clients without relative-pattern support by escaping absolute glob bases properly.

### **Vue slot props are no longer misreported as undeclared** (2cdd220)
`noUndeclaredVariables` now understands Vue `v-slot` and `#` shorthand bindings, including destructured slot props. This removes false positives in Vue templates by correctly collecting those embedded bindings.

### **VCS ignore matching now honors parent directory negations** (3a21c80)
`vcs.useIgnoreFile` now evaluates parent-directory ignore patterns when deciding whether a child path is ignored. That preserves re-included directories like `!/src` while still excluding sibling paths that should stay hidden.

### **Math is now a typed global** (82f9b0e)
Biome’s type info generator now includes the `Math` global class, with its constants and methods represented in generated global type data. This improves correctness for analyses that rely on builtin JS global typing.

### Other misc changes
- Dependency bumps: `@types/node` to 24.13.5, `tombi` to 1.5.5, `@changesets/cli` to 3.0.3.
