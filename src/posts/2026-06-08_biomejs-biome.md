---
date: 2026-06-08
repo: biomejs/biome
size: M
title: "SCSS parsing and formatting get smarter"
excerpt: "Biome adds dynamic SCSS keyframes-name support and improves SCSS variable list formatting; docs and tooling were also cleaned up."
commits: 4
authors: [denbezrukov, ematipico]
commit_authors: {"07d5e45": denbezrukov, "524dbca": denbezrukov}
---

### **Parse and format dynamic SCSS keyframes names** (07d5e45)
Biome now recognizes `@keyframes` names in SCSS when they’re dynamic instead of only plain identifiers, and the formatter gained the corresponding SCSS keyframes-name rules. This also updates the generated syntax/factory plumbing and parser tests, so dynamic keyframe names round-trip correctly instead of falling into bogus parsing.

### **Expand compound SCSS variable lists** (524dbca)
The SCSS formatter now treats compound variable lists like `$buttonConfig: "save" 50px, "cancel" 50px;` as a special case and expands them onto multiple lines. That makes mixed-value declaration lists render more readably and aligns the output with expected SCSS formatting behavior.

### Other misc changes
- Docs/comment wording updates for `noRestrictedDependencies` in JS/JSON lint rules (2 commits)
- README and changelog text tweaks, including the reported rule count bump
- Tooling/config updates: `cargo-deny` added to justfile install targets and denylist entries updated
