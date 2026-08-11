---
date: 2026-08-10
repo: biomejs/biome
size: M
title: "CSS comment fix lands, deps refreshed"
excerpt: "Biome preserves comments in pseudo-class/element functions, alongside pnpm and rust-lapper dependency bumps."
commits: 3
authors: [denbezrukov]
commit_authors: {"bca1f73": denbezrukov}
---

### **Preserve comments inside pseudo-function selectors** (bca1f73)
CSS formatting now keeps comments inside functional pseudo-classes and pseudo-elements instead of pulling them before the function name. This fixes selector output like `:where(/* comment */ div)` and should reduce surprising reformatting in CSS/SCSS code.

### Other misc changes
- Updated pnpm to 11.20.0 in package manager metadata (db36fb4)
- Bumped `rust-lapper` to 1.3.0 (a172575)
