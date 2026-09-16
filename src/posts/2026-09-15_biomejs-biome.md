---
date: 2026-09-15
repo: biomejs/biome
size: L
title: "Big lint, Tailwind, and parser fixes"
excerpt: "Multiple notable bug fixes landed across linting, Tailwind parsing, and formatter behavior, plus a new lint source mapping."
commits: 9
authors: [dyc3, ematipico]
commit_authors: {"7ee3a6c": ematipico, "ddfd622": dyc3, "35e631f": dyc3, "7a4b895": dyc3, "f88793c": dyc3, "17d0ff0": ematipico, "0c89d7b": ematipico, "46e8912": dyc3, "99c7049": ematipico}
---

### **`useExhaustiveSwitchCases` gets `requireExplicitCase`** (7ee3a6c)
This rule now supports an option that reports missing union cases even when a `default` clause exists, letting teams keep runtime fallbacks while still enforcing explicit handling. The commit also wires ESLint migration support for `@typescript-eslint/switch-exhaustiveness-check` into Biome’s config conversion.

### **`useExhaustiveSwitchCases` and type-aware inference are tightened** (99c7049)
Biome fixed false positives for numeric literals written in different forms, so equivalent spellings like `0x1` are treated as the same case. The same work also broadens indexed-access type handling, improving exhaustiveness checks and related type-aware rules on tuple/object-derived unions.

### **Top-level `assist` suppressions now work in `check`** (ddfd622)
Suppression comments aimed at the whole `assist` category are now respected, including `biome-ignore-all assist`. This fixes a category mismatch that could cause top-level suppressions to be ignored during check runs.

### **Tailwind parser base-name detection is fixed** (7a4b895)
The parser now recognizes a wider set of dashed utility base names and keeps arbitrary values attached to the right portion of a class. That matters for downstream linting and formatting because classes like `min-inline-[12rem]` and `scrollbar-thumb-red-500` now parse into the expected base/value split.

### **Tailwind shorthand lint avoids conditional-test false positives** (f88793c)
`useTailwindShorthandClasses` no longer flags strings used in conditional tests as if they were ordinary utility lists. That prevents incorrect diagnostics on ternaries and template expressions that are being used for branch logic rather than class merging.

### **Anchor-content and fragment rules are corrected** (17d0ff0)
`useAnchorContent` now matches JSX behavior by requiring actual anchor content even when `aria-label`, `aria-labelledby`, or `title` are present, and the HTML/Astro/Vue/Svelte implementations were updated accordingly. The same commit also fixes `noUselessFragments` for Astro fragments with props and cleans up a formatter edge case around comments and extra parentheses.

### **CSS custom-property traversal no longer re-walks dependencies** (46e8912)
The CSS module graph traversal now tracks visited modules locally to avoid repeatedly traversing the same dependency chains. That should prevent hangs in `noUndeclaredCustomProperties` on stylesheets with many shared imports.

### **`@shadcn/lint` is added as a rule source** (35e631f)
Biome now recognizes `@shadcn/lint` as a source in its rule registry. This is a small integration change, but it expands the set of lint ecosystems Biome can map from.

### **Refactor: analyzer services move behind salsa-backed retrieval** (0c89d7b)
A broad internal refactor shifts analyzer plugins and visitors toward service retrieval through salsa, with new visitor lifecycle hooks and several service-layer adjustments across JS and CSS analysis. This is mostly infrastructure work, but it’s a significant foundation change because it alters how analyzers access semantic data.

### Other misc changes
- Dependency and workspace wiring updates for the new control-flow crate.
- Misc internal equality/trait derivations and service plumbing changes.
- Test and snapshot updates across CLI, HTML, JS, CSS, and Tailwind suites.
