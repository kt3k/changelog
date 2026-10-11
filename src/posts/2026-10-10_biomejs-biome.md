---
date: 2026-10-10
repo: biomejs/biome
size: L
title: "Biome adds multiple lint rules and parser fixes"
excerpt: "A busy day: five new JS lint rules, type inference and control-flow fixes, plus CSS/HTML/Markdown parser improvements."
commits: 20
authors: [dyc3, denbezrukov, Athish2002, ematipico]
commit_authors: {"b52fee2": dyc3, "872ac9f": dyc3, "b45d426": dyc3, "ae0cabd": dyc3, "3c6331f": dyc3, "4faa773": denbezrukov, "8d0f080": Athish2002, "89b94a3": ematipico, "a60d7f1": denbezrukov, "d466b09": dyc3, "409e1cb": dyc3, "0ec0a46": dyc3, "7d55c42": dyc3, "b073c2f": dyc3, "0c71771": dyc3, "5fa646c": dyc3, "b1e35fa": dyc3, "cb571af": dyc3}
---

### **New JS rule: `noUnsafeUnaryMinus`** (b52fee2)
Adds a nursery lint rule that uses type information to flag unary `-` on values that aren’t `number` or `bigint`. This closes a correctness gap and ships with rule metadata, migrations, and tests.

### **New JS rule: `useUnaryMinus`** (3c6331f)
Introduces a nursery rule that prefers unary minus over multiplying or dividing by `-1`. It also updates the rule migration path and AST utilities to support the new analysis.

### **New JS rule: `noNestedTemplateLiterals`** (872ac9f)
Adds a nursery rule that reports template literals nested inside other template literals. This is a new code-quality check with ESLint migration support and coverage for invalid/valid cases.

### **New JS rule: `useConsistentJsonFileRead`** (b45d426)
Adds a nursery rule for consistent JSON file reads, including support for buffer/string variants and migration mappings from Unicorn. The implementation and test matrix suggest this is a fairly opinionated new linting rule rather than a minor tweak.

### **Type inference now treats plain array literals as arrays** (5fa646c)
Fixes type inference so `[1, "a"]` is inferred like TypeScript does instead of being treated as a tuple unless `as const` pins it. That improves downstream linting, including `useArraySortCompare`, which now catches more real `sort()`/`toSorted()` calls.

### **Control-flow analysis now handles unlabeled jumps in labeled loops** (ae0cabd)
Fixes several analyses that were incorrectly skipping functions containing an unlabeled `break`/`continue` inside a labeled loop. This restores expected reports from `noUnreachable`, `noUnreachableSuper`, `useGetterReturn`, `useIterableCallbackReturn`, and `noFallthroughSwitchClause`.

### **CSS parser/formatter now supports quoted interpolation in unknown SCSS at-rules** (4faa773)
Updates CSS parsing and formatting so quoted strings with interpolation are handled correctly in unknown SCSS at-rules. This also adjusts comment placement and parser behavior for the new embedded-string cases.

### **CSS Tailwind `@theme` parsing accepts multiple options** (b1e35fa)
Fixes parsing of Tailwind `@theme` rules with more than one option, including `prefix(...)` and other chained options. This aligns Biome with Tailwind’s real syntax and required broader factory/parser/formatter updates.

### **Markdown gains friendly CJK emphasis semantics** (89b94a3)
Adds support for CJK-aware emphasis handling in Markdown parsing and formatting. This is a substantial language-behavior change that touches the parser, formatter, benchmarks, and test suite.

### **Markdown gets a `noEmptySource` lint rule** (cb571af)
Adds a new markdown suspicious rule that flags empty sources, with options for allowing comments and related blank-line cases. This expands Biome’s Markdown lint coverage with a fully new rule and test matrix.

### **CSS SCSS parser now supports empty statements** (a60d7f1)
Adds support for empty SCSS statements across parser, formatter, and related lint checks. This improves compatibility with real-world SCSS and fixes parity around `@import`, keyframes, and other at-rules.

### **Tailwind raw color extraction is now generated** (d466b09)
Changes codegen around Tailwind preset raw colors, affecting both Rust logic and the TS config analyzer. This looks like infrastructure work to keep Tailwind preset data in sync and more maintainable.

### **`noTailwindRestyledComponents` now accepts custom advice** (409e1cb)
Lets users supply their own advice text for the Tailwind restyled-components rule. That’s a user-facing rule-option enhancement across JS/HTML analyzers and configuration schema.

### **Vue `useVueConsistentDefinePropsDeclaration` false positive fixed** (0ec0a46)
Narrows the rule so it only checks actual `defineProps` macro calls, fixing a false positive in Vue components. This is a targeted correctness improvement to the lint rule.

### **CLI child-process exit codes are preserved** (7d55c42)
Fixes the CLI wrapper so it no longer exits with 0 when the child process fails. This matters because it prevents broken command results from being reported as success.

### **Svelte `class:`/`style:` shorthands and directive parsing fixed** (b073c2f)
Fixes parsing of Svelte directive names/modifiers and ensures shorthand `class:`/`style:` usages count as variable references. That removes false positives from `noUnusedVariables` and improves formatter/parser correctness for Svelte.

### **HTML `useScopedStyles` moved to the suspicious group** (0c71771)
Reclassifies the HTML rule from style to suspicious and updates generated rule metadata accordingly. This is mostly a taxonomy/configuration change, with a small rule-file move.

### **`noUselessStringConcat` now preserves number stringification semantics** (8d0f080)
Adjusts the string-concat lint to avoid changing JavaScript’s number-to-string behavior when suggesting fixes. This is a correctness-oriented bug fix with a focused test case.

### **Other misc changes**
- Dependency/config bumps and generated-file updates
- Migrations and rule-schema wiring for new/renamed rules
- Test-only additions and snapshot churn
