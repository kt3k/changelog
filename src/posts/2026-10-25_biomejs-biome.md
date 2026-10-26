---
date: 2026-10-25
repo: biomejs/biome
size: L
title: "Biome lands a wave of new lint rules"
excerpt: "Several new nursery rules shipped alongside an LSP warning fix, a CSS sorting bug fix, and a small performance win."
commits: 13
authors: [dyc3, nhedger, latin-1, xucian, MindTooth, JamBalaya56562]
commit_authors: {"301402f": nhedger, "9bd3527": dyc3, "167bb00": latin-1, "0a963e4": dyc3, "25a00a2": dyc3, "19fbfb2": dyc3, "cd716d3": dyc3, "f46411b": dyc3, "a384892": dyc3, "68770e0": dyc3, "896d53e": xucian, "6021da0": MindTooth, "260fbc1": JamBalaya56562}
---

**New nursery lint: `noReturnArrayPush`** (9bd3527)
Adds a rule that flags using the return value of `push()`/`unshift()`, which is usually a mistaken assumption about what those methods return. Biome also wired the rule into config validation, ESLint migration, and docs/snapshots.

**New nursery lint: `noConsoleSpaces`** (19fbfb2)
Introduces a rule for trailing/leading spaces inside multi-argument console calls, where the logger already inserts its own separator. This prevents doubled spaces in output and is now part of Biome's config schema and migration mapping.

**New nursery lint: `noMagicArrayFlatDepth`** (cd716d3)
Adds a rule that discourages unexplained non-`1` depth values passed to `Array.prototype.flat()`. It’s a targeted code-quality check with autofix-friendly rule plumbing and test coverage.

**New nursery lint: `noUnreadableIife`** (a384892)
Flags immediately-invoked arrow functions whose parenthesized body hurts readability. The implementation includes fix support and ESLint migration coverage.

**New nursery lint: `noUselessRecursion`** (0a963e4)
Adds a rule for self-recursive functions that could be replaced with iteration, helping avoid stack overflows and clearer control flow. The change also updates schema/config metadata and migration support.

**New nursery lint: `noYamlBooleanKeys`** (68770e0)
Adds a YAML-specific rule that rejects boolean keys like `true:` and `false:`. This closes off a subtle configuration/data modeling footgun and expands Biome's YAML analysis surface.

**New nursery lint: `useSvelteEventDispatcherTypes`** (f46411b)
Adds a Svelte rule that requires typed `createEventDispatcher()` usage in TypeScript components. That improves type safety for component events and rounds out Svelte rule support in the config selector and schema.

**CSS property sorting now preserves cascade-sensitive order** (167bb00)
Biome updated its CSS property-ordering logic to better handle Recess-style ordering and avoid breaking cascade behavior when sorting declarations. This is a correctness fix for automatic property reordering, backed by new sort/override tests.

**LSP now warns when configuration parsing fails** (301402f)
The language server now surfaces a warning when it can't load or parse the project configuration instead of silently stopping file processing. That should make broken config files much easier to diagnose in editors.

**Editor settings lookups were streamlined** (25a00a2)
Biome now resolves editor-settings directories once and checks them less often. This is a performance improvement in workspace/config handling that should reduce unnecessary filesystem work.

### Other misc changes
- Fixed markdown table whitespace attachment in the parser/formatter (896d53e)
- Marked `pnpm-lock.yaml` as a protected file (6021da0)
- Fixed Prettier migration to carry top-level `bracketSpacing` (260fbc1)
