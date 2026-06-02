---
date: 2026-05-22
repo: biomejs/biome
size: M
title: "CSS comment fixes and parser diagnostics"
excerpt: "Biome improved CSS/SCSS comment placement, tightened SCSS parser errors, and removed Corepack from CI setup."
commits: 3
authors: [denbezrukov, ematipico]
commit_authors: {"df6b867": denbezrukov, "7863d63": denbezrukov}
---

### **CSS/SCSS comments now stay on the right side of declaration boundaries** (df6b867)
Biome fixed comment handling around generic CSS property names, colons, and values so formatting matches Prettier more closely. This prevents comments from drifting across declaration boundaries and improves output for CSS and SCSS declarations with inline or trailing comments.

### **SCSS parser now reports clearer errors for malformed selectors** (7863d63)
The parser now emits a direct diagnostic when `@extend` is missing a selector, instead of silently recovering past the problem, and attribute selectors now surface a missing-name error in narrower cases like `[]` or `[` followed by a matcher. That makes SCSS syntax issues easier to understand and reduces confusing recovery diagnostics.

### Other misc changes
- Removed Corepack-based pnpm setup from several GitHub Actions workflows and updated contributor/testing docs accordingly.
