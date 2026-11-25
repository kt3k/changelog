---
date: 2026-11-24
repo: biomejs/biome
size: M
title: "Plugin rules land; CI gets faster"
excerpt: "Biome adds a new plugin-focused lint domain and two nursery rules, while workflow steps are parallelized to speed up CI."
commits: 5
authors: [dyc3, Jayllyz, EnesKartal]
commit_authors: {"771de3e": dyc3, "2460d16": EnesKartal, "31fad4a": dyc3}
---

**Add a new `biomePlugin` lint domain with two plugin-focused rules** (31fad4a)
Biome now has a dedicated domain for Biome JS plugin authors, plus two nursery rules: `useBiomeKindSets` and `useBiomeTopLevelTypes`. They flag slower or misplaced uses of `node.kind` checks and helper APIs like `nodeKinds()`, `tokenKinds()`, and `union()`, nudging plugins toward more efficient patterns.

**Fix `useNullishCoalescing` for defaulted parameters** (771de3e)
This fixes a false positive where `flag || other` was reported even when a parameter default already removed `undefined` from its type, such as `flag: boolean | undefined = false`. That makes the rule more accurate for common TypeScript parameter patterns.

**Allow import attributes on mixed type/value imports** (2460d16)
`noTypeOnlyImportAttributes` was adjusted to stop flagging combined imports/exports that include both value and type specifiers. The rule now correctly focuses on truly type-only imports with attributes instead of rejecting valid mixed forms.

### Other misc changes
- CI/workflow parallelization across several jobs (1 commit)
- Release/changelog cleanup (1 commit)
