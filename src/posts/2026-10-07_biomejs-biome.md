---
date: 2026-10-07
repo: biomejs/biome
size: L
title: "Big day for Vue, Svelte, Tailwind, and CSS"
excerpt: "Biome added several nursery rules, expanded SCSS support, and fixed Tailwind/CSS parsing bugs that unblock real-world code."
commits: 14
authors: [dyc3, denbezrukov, ematipico, MustafaKemal0146]
commit_authors: {"3901392": ematipico, "5029823": dyc3, "3dd096f": dyc3, "b2db9f2": dyc3, "47c3084": dyc3, "9f1cfde": dyc3, "08cfbd2": dyc3, "c08e3c3": dyc3, "ce4816f": denbezrukov, "45e9ab0": denbezrukov, "c5fadc4": ematipico, "6ddce62": dyc3, "215288b": MustafaKemal0146, "8c4469c": MustafaKemal0146}
---

**SCSS support lands across the toolchain** (c5fadc4)
Biome now formats and lints `.scss` files, and treats `.module.scss` as CSS Modules. The change touches CLI help, formatter/linter behavior, and analyzer coverage, so SCSS workflows should feel first-class instead of partially unsupported.

**New SvelteKit resolve rule for internal navigation** (b2db9f2)
Biome adds `useSvelteKitResolve`, a nursery rule that requires internal links and calls to `goto()`, `pushState()`, and `replaceState()` to use SvelteKit's `resolve()`. That should help catch navigation paths that won't behave correctly in SvelteKit apps.

**Template literal strings now infer as strings** (47c3084)
Type inference was tightened so template literals are recognized as string types in more cases. This improves downstream analysis, including rules that depend on accurate type information to avoid false positives.

**`useImportExtensions` now respects configured mappings** (9f1cfde)
The import-extension lint rule now resolves user-configured extension mappings instead of assuming defaults. That makes the rule work correctly in projects with custom JSX/TS extension setups.

**Tailwind parser fixes several real-world class syntaxes** (08cfbd2, 5029823, c08e3c3, 6ddce62)
Biome fixed multiple Tailwind parsing edge cases: dashed utility names stay intact, binary minus is tokenized correctly in CSS values, leading digits are accepted in custom variants, and CSS-variable shorthands with parenthesized fallbacks parse properly. These changes unblock utilities like `flex-grow-0`, `bg-(--a,var(--b))`, and similar patterns used in modern Tailwind codebases.

**New Vue rule blocks `v-if` on the only root element** (3dd096f)
Biome adds `noVueRootVIf`, a nursery rule for Vue templates that flags `v-if` on a component's sole root node. This helps catch a pattern that can make component rendering behavior harder to reason about.

**Tailwind legacy utility detection expands** (08cfbd2)
`noTailwindLegacyUtilities` was added to flag deprecated Tailwind class names and suggest current equivalents. The parser also learned more legacy basename handling, improving coverage for older utility patterns.

**Tailwind and CSS parser/formatter get broader language support** (45e9ab0, ce4816f)
Biome extended CSS/SCSS handling for `attr()` fallbacks and keyframes, including Sass statements inside keyframe blocks. This reduces parser/formatter failures on mixed CSS/Sass syntax and brings analysis closer to what authors actually write.

### Other misc changes
- Fixed `noConfusingVoidType` to allow unions made only of `void` and `never` (215288b)
- `useConsistentObjectDefinitions` now ignores named function expressions (8c4469c)
- Added/updated migration mappings, generated rule metadata, docs, tests, and snapshots across the new rules
- Loader and workflow tweaks for JavaScript plugin support (3901392)
