---
date: 2026-11-11
repo: biomejs/biome
size: L
title: "Biomes adds a new HTML a11y rule and fixes parser gaps"
excerpt: "New disabled-attribute linting, a plugin API cleanup, and fixes for nullish-coalescing, class `this`, CSS hashes, and Astro comments."
commits: 11
authors: [ematipico, dyc3, vibbix, ashokram-si, pkallos, arendjr]
commit_authors: {"2468384": vibbix, "d3be626": ashokram-si, "acdb7b2": dyc3, "7a795d0": ematipico, "7fdb28f": pkallos, "f6cf28e": arendjr}
---

### **New HTML rule expands disabled-attribute linting** (acdb7b2)
Biome replaces `noDisabledButton` with `noDisabledAttribute` and broadens the rule to cover buttons plus other form controls. The rule now warns on native `disabled` across HTML, Astro, Svelte, and Vue, nudging users toward `aria-disabled` or `readonly` where appropriate.

### **`useNullishCoalescing` avoids unsafe partial null checks** (7fdb28f)
The rule now skips fixes when a strict `=== null` or `=== undefined` check could still match the other nullish variant in the inferred type. That prevents `??`/`??=` suggestions from changing behavior in mixed `null | undefined` cases.

### **`useThisInClassMethods` now sees `this` in default params** (d3be626)
This lint fix now counts `this` used in method, setter, and class-field parameter defaults, not just inside bodies. It also treats decorators as separate from the member’s lexical `this`, which tightens correctness for modern class syntax.

### **CSS parser now accepts digit-led hash values in custom properties** (2468384)
Biome fixes SCSS custom property parsing so values like `#4566a8` no longer get split into a fake unit suffix. The same parser adjustment also handles legacy IE `filter` values with unquoted hex colors, reducing false positives in `noUnknownUnit`.

### **Astro comment-only JSX expressions parse cleanly** (7a795d0)
The JSX parser now skips Astro HTML comments immediately after `{` in expression children, fixing a parse failure for cases like `<span>{<!-- x -->}</span>`. This removes diagnostics for a real-world Astro/compiler interop edge case.

### **JS plugin API drops `semantic()` in favor of `ast(..., { semantic: true })`** (f6cf28e)
The runtime and type definitions remove the standalone `semantic()` query function and consolidate semantic access onto `ast()`/`grit()`. That simplifies the API surface and aligns JavaScript plugins on one query style.

### Other misc changes
- Release automation / changelog housekeeping.
- Dependency advisory lockfile update.
- SCSS formatter indentation tweak for map comments.
- `noDisabledButton` feature launch, then immediate rename to `noDisabledAttribute` in the same day.
- Minor config/docs/test snapshot updates around the above changes.
