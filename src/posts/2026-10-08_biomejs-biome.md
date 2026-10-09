---
date: 2026-10-08
repo: biomejs/biome
size: L
title: "Tailwind config gets smarter; CSS/HTML fixes land"
excerpt: "Biome adds Tailwind stylesheet imports, Vue formatter fixes, and several CSS parser/linter improvements, plus a few new rules and CI updates."
commits: 17
authors: [dyc3, denbezrukov, ematipico, siketyan]
commit_authors: {"1004290": siketyan, "4d056a5": dyc3, "73e169e": dyc3, "83df808": dyc3, "05e3036": dyc3, "54da5db": denbezrukov, "8955b56": dyc3, "cf408d5": dyc3, "6ffd0a1": denbezrukov, "eee4562": denbezrukov, "c870caa": siketyan}
---

### **Tailwind classes now read imported config and v4 ordering** (83df808, 4d056a5)
`useTailwindSortedClasses` was reworked around Tailwind CSS v4 ordering and now reads its design system from a configured `tailwind.stylesheet`, including local and package CSS imports via the `style` export condition. That means class sorting can reflect project-specific theme values, utilities, and variants instead of only built-in presets.

### **Vue event/directive formatting is fixed for statement-like handlers** (73e169e, 05e3036)
The HTML/Vue formatter now handles event handlers and quoted directive values more consistently, especially when the expression is a statement or appears inside quotes. This closes several formatting gaps that previously produced broken or unstable Vue output.

### **CSS parser/formatter gains better SCSS and GritQL support** (54da5db, 6ffd0a1, eee4562, 1004290, c870caa)
Biome expanded CSS parsing and formatting for modern `if()` branches, interpolated SCSS at-rule names, variable-led media ranges, and Grit metavariables in selectors, property names, and related contexts. These changes improve both normal CSS/SCSS handling and plugin/search workflows that rely on precise syntax preservation.

### **New lint rules and rule plumbing** (8955b56, cf408d5)
A new YAML `noEmptySource` rule and a JS `noOctal` rule were added, with configuration, diagnostics, and migration support wired in. `noOctal` also appears in ESLint migration mapping so existing configs can be translated more cleanly.

### **Other misc changes**
- CI/test infra updates, including nextest adoption and insta behavior fixes
- Rule metadata and rename churn around `useSortedClasses` → `useTailwindSortedClasses`
- Small formatting/chore updates, workflow path tweaks, and dependency lockfile changes
