---
date: 2026-11-20
repo: biomejs/biome
size: L
title: "Biome adds a wave of new nursery lint rules"
excerpt: "Major lint coverage landed across TanStack Query, testing, SQLite, and JS patterns, plus a formatter fix and a few core refactors."
commits: 20
authors: [dyc3, Th3S4mur41, vibbix]
commit_authors: {"426c33d": Th3S4mur41, "d06ae5d": dyc3, "c0dc090": dyc3, "3677e52": dyc3, "32f5c05": dyc3, "aaf89d6": dyc3, "4408dd4": dyc3, "c4d56be": dyc3, "328be47": dyc3, "32daef0": dyc3, "adde697": dyc3, "9bd7f56": dyc3, "d9e86ab": dyc3, "838bb99": dyc3, "d3a3f65": dyc3, "6d0b26a": dyc3, "9ff9ee4": vibbix}
---

### **Formatter now keeps touching siblings on the same line** (d06ae5d)
The HTML formatter was adjusted so sibling elements that touch on the same line stay together instead of being broken apart unexpectedly. This fixes real-world formatting cases across HTML, Svelte, and Vue, and the snapshot updates show the intended output more precisely.

### **Added `noImmediateMutation` to catch mutations right after initialization** (c0dc090)
Biome now flags arrays, objects, `Set`s, `Map`s, and variables that are mutated immediately after being created or declared. That helps catch code that can be written more directly and avoids state changes that are easy to miss in review.

### **Added `useTanstackQueryExhaustiveDependencies` for stale-query bugs** (3677e52)
This new TanStack Query rule checks that `queryKey` includes everything `queryFn` depends on, preventing queries from silently reusing stale data when inputs change. It expands Biome’s framework-specific correctness coverage for React Query users.

### **Added `useTanstackQueryMutationPropertyOrder` for safer mutation callbacks** (32f5c05)
The new rule enforces TanStack Query mutation option ordering so `onMutate` comes before callbacks that rely on its return value. That avoids type and flow issues where later properties can reference data that has not been established yet.

### **Added `useExpectEqualityMatcher` to tighten test assertions** (aaf89d6)
Biome now recommends equality-specific matchers in tests when the assertion is really about exact equality. This makes test intent clearer and helps avoid weaker assertions that can miss regressions.

### **Added `noExpectToHaveBeenCalledOnce` for clearer mock assertions** (4408dd4)
A new nursery rule catches `toHaveBeenCalledOnce`-style expectations and nudges users toward the preferred assertion form. It’s a small but practical testing rule that improves consistency across codebases.

### **Added `noCanvasToImage` to discourage fragile canvas-to-image patterns** (c4d56be)
This rule flags problematic `canvas.toImage` usage patterns and adds dedicated tests and configuration wiring. It broadens Biome’s correctness checks for environments that rely on canvas APIs.

### **Added `noUnsafeSqliteInterpolation` to prevent SQL injection hazards** (328be47)
Biome now detects interpolated or tagged-template SQL passed to `node:sqlite` `exec()` and `prepare()`. That matters because it catches a straightforward injection risk at lint time instead of at runtime.

### **Added `useEarlyContinue` to simplify loop bodies** (32daef0)
The new rule suggests using `continue` when an `if` block wraps the rest of a loop body. This is mostly readability-focused, but it can make control flow easier to scan and reduce nesting.

### **Added `useDescribeFunctionTitle` for better test naming** (adde697)
Biome now flags test suite titles that repeat the imported function name and suggests passing the function itself instead. It improves test readability and keeps suite names aligned with the code under test.

### **Added `noVueNegationElse` for cleaner Vue templates** (9bd7f56)
This new Vue-specific rule catches negation-based `else` branches and ships with semantic-model updates to support it. It helps keep template logic more explicit and consistent.

### **Added `noArrayDelete` to disallow `delete` on arrays** (d9e86ab)
Biome now reports `delete` used on arrays, which is usually a sign of incorrect expectations about how array slots work. The rule is wired into the performance/suspicious checks and includes autofix-oriented test coverage.

### **Tailwind parser gets a SIMD lexer fast path** (838bb99)
The Tailwind parser was refactored to lex class strings ahead of parsing with a SIMD bulk pass, replacing a large chunk of the old token-source implementation. This is a meaningful performance and internal-architecture change, likely aimed at making Tailwind parsing faster and more scalable.

### **Rowan stops reading green trees through header-only references** (d3a3f65)
The core tree representation and cursor APIs were reworked to avoid relying on header-only references when traversing green trees. That’s a substantial internal refactor in a foundational crate, with correctness and maintainability implications across syntax handling.

### **Module graph now resolves Sass `@use`, `@forward`, and `@import`** (9ff9ee4)
Biome’s module graph and resolver gained Sass load resolution, including dedicated resolver logic and new SCSS module tests. This materially improves cross-file analysis for Sass projects and should unblock more accurate dependency and symbol tracking.

### Other misc changes
- Devcontainer environment variable tweak for Cargo (426c33d)
- Added Miri CI workflow (6d0b26a)
- Dependency/config generation and migration-mapping updates for new rules
- Miscellaneous test snapshots and rule registration wiring
