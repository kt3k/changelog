---
date: 2026-06-22
repo: biomejs/biome
size: L
title: "Parser, formatter, and LSP fixes land"
excerpt: "Highlights include HTML processing instructions, CSS import comment formatting, Vue directive refactors, and safer LSP navigation."
commits: 8
authors: [ematipico, Netail, denbezrukov]
commit_authors: {"9689ced": Netail, "544e15c": ematipico, "98823fb": ematipico, "df51740": ematipico, "9420cb0": ematipico, "f8a303d": denbezrukov, "6c2e0d7": ematipico}
---

### **HTML parser now handles processing instructions** (98823fb)
Biome’s HTML parser and syntax/factory layers were extended to recognize processing instructions like `<?xml ... ?>` instead of treating them as errors. This also updates the HTML formatter and a11y rules to preserve and account for these nodes correctly.

### **CSS formatter keeps import/media comments inline** (f8a303d)
The CSS/SCSS formatter now formats comments that appear between media query entries in `@import` lists inline with the following query, matching the intended source structure. This fixes an awkward multiline output and tightens comment placement logic across CSS and SCSS import/media helpers.

### **Go-to-definition no longer errors on node_modules imports** (6c2e0d7)
The LSP navigation handler now treats inaccessible dependency lookups as a non-fatal miss instead of bubbling an error to the user. That makes go-to-definition more robust for imports resolved from `node_modules` and avoids noisy failures in editor workflows.

### **Core settings storage is now Arc-backed** (df51740)
Workspace project settings were changed to use `Arc<Settings>` internally, reducing cloning overhead when settings are shared across lookups and nested project state. The change is positioned as a performance improvement and should reduce unnecessary copying in the service layer.

### **Rule doc tooling gets a diagnostics printer abstraction** (544e15c)
`biome_ruledoc_utils` now routes configuration parsing diagnostics through a trait-backed writer instead of a concrete console writer. This is a refactor that makes the rules documentation tooling more flexible and reusable, while preserving the existing diagnostic output behavior.

### **Vue directive handling was unified across HTML analyzers** (9689ced)
Several HTML assist/lint rules now use shared Vue directive classification helpers like `is_binding()`, `is_if()`, and `is_for()` rather than comparing raw directive names in place. The refactor reduces duplication and makes directive detection more consistent across Vue-aware checks.

### Other misc changes
- More ruledoc utility exposure/refactoring (9420cb0)
- GitHub Actions and toolchain dependency bumps (3438a3d)
