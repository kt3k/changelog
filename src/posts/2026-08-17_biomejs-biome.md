---
date: 2026-08-17
repo: biomejs/biome
size: L
title: "New lint rules, Tailwind fixes, resolver patch"
excerpt: "Biome adds 3 new nursery rules, fixes Tailwind class sorting and TypeScript path resolution, plus a small refactor and release churn."
commits: 9
authors: [dyc3, jp-knj, Netail, freeatnet, johncarmack1984, ematipico]
commit_authors: {"2fb17b5": dyc3, "6559e6c": jp-knj, "a8798ea": Netail, "85aac73": freeatnet, "faa2074": johncarmack1984, "fe5b5d4": ematipico}
---

### **New Astro `client:only` lint rule** (6559e6c)
Biome now ships `useAstroClientOnlyDirectiveValue`, a nursery rule that flags `client:only` directives missing a value in `.astro` files. This helps catch invalid component directives early and required adding Astro as a first-class rule domain.

### **New cascade-layer lint rule** (a8798ea)
`useNamedLayer` now warns on anonymous cascade layers such as `@layer { ... }`, which can’t be referenced or reordered later. The commit also wires the rule into ESLint migration support, config schemas, and diagnostics so it can be enabled and surfaced consistently.

### **New TypeScript unsafe type assertion rule** (85aac73)
Biome adds `noUnsafeTypeAssertion` to nursery, flagging TypeScript `as` assertions while allowing const assertions. This is a meaningful safety rule for catching unsound casts before they turn into runtime bugs.

### **Tailwind sorting now matches legacy important syntax** (faa2074)
The Tailwind v4 class sorter was overhauled to match Tailwind’s final candidate comparison more faithfully, including ties and the legacy leading `!` marker like `!flex` and `hover:!p-4`. That means fewer ordering mismatches and better autofix behavior for real-world utility strings.

### **TypeScript path aliases without `./` now resolve correctly** (fe5b5d4)
Biome’s resolver now treats `compilerOptions.paths` targets as relative to the configured base path even when the alias target omits a `./` prefix. This fixes broken resolution for common tsconfig setups like `"@/*": ["src/*"]`.

### **Refactor: normalize lint rule impl layout** (2fb17b5)
A large cross-crate refactor moved `impl Rule` blocks before helper code across many analyzers. It’s mostly mechanical, but it touches a broad surface area and should make lint rules easier to scan and maintain.

### Other misc changes
- Release/changeset cleanup and deleted published changelog entries (1 commit)
- Dependency bumps in pnpm and GitHub Actions tooling (2 commits)
- CI workflow updates for action version pins (1 commit)
