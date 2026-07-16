---
date: 2026-07-15
repo: biomejs/biome
size: L
title: "CSS, JS inference, and linting land big updates"
excerpt: "Major additions: a new lint rule, CSS custom media support, CSS casing fixes, hardened type inference, and a CLI stateless-process-file refactor."
commits: 9
authors: [ematipico, Functionhx, jfmcdowell, denbezrukov, siketyan, Netail]
commit_authors: {"2000531": jfmcdowell, "b3b12b3": Functionhx, "89526e3": denbezrukov, "2bb8293": ematipico, "f787725": siketyan, "899c60d": ematipico}
---

### **New lint rule: `noNegationInEqualityCheck`** (b3b12b3)
Biome now flags patterns like `!foo === bar`, which usually hinge on operator precedence and are almost always meant to be `foo !== bar`. The rule ships with an unsafe autofix and is wired into config, diagnostics, migration, and docs.

### **CSS now supports `@custom-media` end to end** (f787725)
Biome can parse, format, and lint CSS custom media queries declared with `@custom-media`. This also updates the CSS AST/factory, formatter, and analysis rules so custom media names are recognized instead of being treated as unknown at-rules or media features.

### **CSS formatter casing is now syntax-aware** (89526e3)
The formatter was adjusted to preserve author-defined names while normalizing syntax-owned casing in places like selectors, keyframes, and container queries. That avoids rewriting user identifiers incorrectly and brings output in line with CSS casing expectations.

### **Salsa type inference was hardened** (2bb8293)
This is a substantial internal fix across typed services, module graph inference, and type-info internals. It tightens inference handling and fixes several regression cases around resolving module and expression types, which matters for type-aware linting and editor features.

### **CLI `process_file` became stateless for workspace writes** (899c60d)
The check/format/lint pipeline was refactored so processed files can be sent back through the workspace cleanly when running against a server. This also addresses a deadlock risk when type-aware rules are enabled and fixes `check --write` diagnostics to point at formatted output.

### **Markdown block quotes now handle space-indented bullets better** (2000531)
Space-indented list markers inside block quotes can now interrupt paragraphs correctly instead of being left lazy in the wrong cases. This improves CommonMark parsing fidelity for quoted content with indented bullets.

### Other misc changes
- Release/changelog automation and package metadata updates (1 commit)
- Sponsor README entry added for Latitude across localized docs (1 commit)
- Removed an accidental debug log in Svelte directive formatting (1 commit)
