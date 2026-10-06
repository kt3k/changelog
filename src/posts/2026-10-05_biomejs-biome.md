---
date: 2026-10-05
repo: biomejs/biome
size: L
title: "New lint rules and migration coverage"
excerpt: "Biome added two nursery lint rules, improved CSS/Tailwind parsing and sorting, and expanded eslint migration diagnostics with better coverage reasons."
commits: 11
authors: [dyc3, erenbati, Th3S4mur41, denbezrukov]
commit_authors: {"851d803": erenbati, "81cccb0": dyc3, "7a573de": dyc3, "354f74c": Th3S4mur41, "4efe06d": dyc3, "9ce4eee": denbezrukov}
---

### **New Tailwind appearance override rule** (81cccb0)
Biome adds `noTailwindRestyledComponents` to the nursery, flagging Tailwind classes that restyle component appearance while ignoring layout-only utilities. The change also wires the rule into config, diagnostics metadata, and ESLint migration so it can be surfaced and migrated consistently.

### **useLogicalProperties now covers physical values too** (354f74c)
`useLogicalProperties` now checks not just physical CSS property names but also physical values in `frame-sizing`, `anchor-size()`, and `anchor()`. It also reports `justify-content: left/right` without autofix because the correct logical replacement depends on layout axis, which makes this a meaningful expansion of the rule’s scope.

### **Self-assign lint catches dot/bracket equivalents** (851d803)
`noSelfAssign` was tightened to recognize self-assignments even when one side uses dot notation and the other uses equivalent computed keys, including numeric and string literals. This closes a real false-negative gap for cases like `obj.foo = obj["foo"]` or `obj[3] = obj[3]`.

### **Tailwind parser accepts selectors starting with `[`** (7a573de)
The Tailwind lexer now parses arbitrary variants whose selector itself begins with an attribute selector, fixing failures on patterns like `[[data-variant=legend]+&]:-mt-1.5`. This unlocks a class of valid Tailwind syntax that previously was rejected outright.

### **SCSS percentage-template sorting is safer** (9ce4eee)
`useSortedProperties` now avoids sorting in cases where keyframe/template steps depend on surrounding declarations, preventing unsafe reorderings. The accompanying parser/formatter updates also improve handling of percentage-based SCSS keyframe bodies and recovery cases.

### **ESLint migration got smarter about unsupported rules** (4efe06d)
`biome migrate eslint` now explains more cases where an ESLint rule is unsupported because Biome already covers it, a formatter option exists, or the rule is deprecated/legacy. This makes migration output more actionable and reduces guesswork when porting configs.

### **Tailwind restyle migration mapping added** (81cccb0)
The ESLint-to-Biome mapper now recognizes `shadcn/no-restyle` and maps it to the new Tailwind nursery rule when the relevant rule groups are enabled. That closes the loop between detection and migration for this new rule.

### **Other misc changes**
- Updated GitHub Actions workflow dependencies.
- Tightened PR title linting for trailing ellipsis characters.
- Reverted the previously added `noIteratorProperty` rule.
- Bumped `libc` to 0.2.190.
- Added several migration/support metadata updates and minor config plumbing.
