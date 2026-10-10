---
date: 2026-10-09
repo: biomejs/biome
size: L
title: "Biome adds Vue, Svelte, CSS and CLI fixes"
excerpt: "New Vue/Svelte lint rules and several meaningful fixes landed across CSS analysis, CLI inspect flows, Tailwind, and Markdown formatting."
commits: 8
authors: [dyc3, ematipico]
commit_authors: {"b91a445": dyc3, "79ed984": dyc3, "c35b067": dyc3, "a3944f7": dyc3, "5b0cc21": ematipico, "915dc9d": ematipico, "e73db0e": ematipico, "78bd642": ematipico}
---

### **Vue event hyphenation rule added** (b91a445)
Biome now ships `useVueConsistentEventHyphenation`, a nursery rule that enforces consistent event-name hyphenation in Vue `v-on` directives on custom components. The rule is wired into config metadata, diagnostics, and ESLint migration, so it’s immediately usable and migratable.

### **Vue props-default mismatch rule added** (79ed984)
The new `noVueRequiredPropWithDefault` nursery rule flags props that are declared required but also given defaults, which is usually contradictory API design. It also updates Vue component analysis so the rule can reason about prop declarations more accurately.

### **Svelte text-mustache rule added** (c35b067)
Biome adds `noSvelteObjectInTextMustaches`, which warns when object, array, function, or class literals are used inside Svelte text mustaches and would render as unhelpful strings like `[object Object]`. The change also expands Svelte-related syntax support and plugs the rule into CLI/config surfaces.

### **Tailwind arbitrary-value rule gained escapes and better exceptions** (a3944f7)
`noTailwindArbitraryValue` no longer flags arbitrary modifiers, and it now supports `allowedCategories` and `allowedClasses` escape hatches. That makes the rule much more practical for real Tailwind codebases while keeping arbitrary values constrained by policy.

### **Markdown prose wrapping now handles CJK text better** (5b0cc21)
The Markdown formatter was updated to wrap prose more accurately around CJK characters and soft breaks. This should reduce awkward line breaking in rendered docs and improve formatting stability for multilingual content.

### **CSS selector analysis fixed for nested rules** (915dc9d)
Biome’s CSS analyzer now computes specificity correctly for nested selectors and no longer misses nested selectors inside `@container` and `@starting-style`. That fixes false negatives in `noDescendingSpecificity` and `noDuplicateSelectors` for modern CSS nesting patterns.

### **`inspect config` now handles paths without requiring a key** (e73db0e)
The CLI’s config inspection flow was reworked so `inspect config --path ...` can resolve and print configuration with matching overrides even when no key is provided. This makes the command behave more like a true resolved-config inspector instead of rejecting a common use case.

### **`inspect plugins` messages were substantially improved** (78bd642)
Plugin inspection got a major rewrite for clearer diagnostics and better inventory/reporting output. The command now produces more precise messages around plugin resolution, missing packages, version mismatches, and related edge cases, which should make plugin debugging much less painful.

### Other misc changes
- Dependency bumps / lockfile updates
- Small test snapshot churn and doc metadata updates
- Minor internal wiring for new rule registrations and generated config tables
