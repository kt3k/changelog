---
date: 2026-06-14
repo: biomejs/biome
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Biome sharpens SCSS, Markdown, and linting across the week"
excerpt: "Big SCSS/parser and Markdown formatter upgrades, a new React lint rule, a module-graph refactor, and a migration fix."
commits: 30
---

### **SCSS and CSS support got noticeably more expressive**
Biome spent much of the week improving SCSS/CSS parsing and formatting: dynamic `@keyframes` names, variable declarations inside `@keyframes`, interpolated `@supports` conditions, comma-separated CSS Modules `composes`, and smarter handling of parenthesized values, variable lists, and grid alignment around comments. These changes close several real-world parsing gaps while making SCSS output more predictable and readable.

### **Markdown formatting and parsing were brought closer to CommonMark/Prettier behavior**
The Markdown formatter received a substantial list-layout rewrite, improving bullets, ordered lists, continuation indents, and quote/list edge cases. Parser fixes also tightened block quotes with link-reference definitions, while internal syntax cleanup removed dead node kinds and simplified generated factories.

### **Linting expanded with a new React rule and stronger env detection**
Biome added the nursery `useReactFunctionComponentDefinition` rule for enforcing function-component declarations in React projects. In parallel, `noProcessEnv` now catches imported or destructured `env` usage, closing a common bypass and making the rule more effective in modern JS codebases.

### **Core internals and performance saw meaningful maintenance work**
The module-graph refactor removed mutex-based access around the salsa database, simplifying lookup paths and reducing contention in import resolution and related services. Separately, formatter internals were refactored for a reported speedup of up to ~20% on some files, and a new `biome_languages` crate was introduced to consolidate shared language/file abstractions.

### **Other misc changes**
- Fixed `biome migrate` output so renamed rules no longer produce invalid trailing commas in strict JSON configs.
- Documentation, changelog, and rule-description updates across JS/JSON lint rules.
- Dependency and toolchain bumps, CI tweaks, and assorted test/snapshot refreshes.
