---
date: 2026-07-06
repo: biomejs/biome
size: L
title: "CSS parser SCSS gating and LSP deadlock fix"
excerpt: "Biome tightened CSS/SCSS parsing, fixed a workspace deadlock in the LSP, and added a new ignore option for a DOM query lint."
commits: 7
authors: [ematipico, denbezrukov, dyc3, siketyan]
commit_authors: {"6450276": ematipico, "8ee18e9": denbezrukov, "3447b2f": dyc3}
---

### **Gate SCSS-only syntax in CSS parsing** (8ee18e9)
Biome now reports SCSS-exclusive constructs in CSS files instead of accepting them implicitly, with parser and formatter updates to support the new behavior. This closes a correctness gap around mixed CSS/SCSS syntax and improves the error users see when they use SCSS-only features in plain CSS.

### **Fix LSP deadlock caused by salsa setters** (6450276)
The workspace and LSP request flow were reworked to avoid a deadlock when the scanner is enabled. This is a high-impact stability fix for editor users: analysis, formatting, navigation, and related workspace accesses were adjusted so the server can keep responding instead of hanging.

### **Add `ignore` support to `useDomQuerySelector`** (3447b2f)
The `useDomQuerySelector` lint rule can now skip configured receiver identifiers, so projects can exempt non-DOM APIs that happen to expose matching method names. The rule, schema, docs, and tests were updated to make the option available end to end.

### **Other misc changes**
- CI runner image updates for macOS workflows (1 commit)
- GitHub Actions dependency bumps (1 commit)
- pnpm updated to 11.9.0 (1 commit)
- AgentScan workflow now skips bot PRs and uses ubuntu-slim (1 commit)
