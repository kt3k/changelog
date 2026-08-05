---
date: 2026-08-04
repo: biomejs/biome
size: L
title: "Type inference refactor, HTML/CSS fixes"
excerpt: "Major type-inference cleanup plus HTML formatter/lint improvements, CSS-style parsing for HTML style attributes, and a new code-review skill."
commits: 9
authors: [ematipico, dyc3, Bishwas-py]
commit_authors: {"6556ca3": ematipico, "12ce933": ematipico, "9c93f91": ematipico, "af16a0b": dyc3, "abfbb11": dyc3, "77035bb": dyc3, "4afd901": ematipico, "0e80610": Bishwas-py}
---

**Prepare legacy type inference for removal** (6556ca3)
Large internal refactor of `biome_js_type_info` to simplify the type-inference architecture and remove legacy machinery ahead of cleanup. The change rewires core type-data handling and updates snapshots, so it’s a meaningful step toward a leaner inference pipeline rather than a user-facing feature.

**Treat HTML `style` attributes as CSS** (af16a0b)
Biome now parses HTML `style` attribute values as CSS and applies CSS lint rules to them, while intentionally avoiding treating component-style props in Svelte/Astro as CSS. This broadens lint coverage for real DOM styles and required coordinated updates across CSS parsing, formatting, syntax generation, and CLI behavior.

**Fix HTML blank-line preservation before text** (77035bb)
The HTML formatter now preserves a blank line when text follows an element, matching the behavior already used for element-to-element spacing. That avoids collapsing intentional whitespace in formatted HTML and Svelte templates.

**Handle Svelte array-pattern holes in formatting** (abfbb11)
The Svelte/HTML formatter no longer fails on `each` blocks that skip positions in destructuring patterns, such as `[, value]`. This is a targeted correctness fix for a previously unformattable Svelte syntax case.

**Make `noPositiveTabindex` suppression work on multiline tags** (0e80610)
Suppression comments now correctly apply when an HTML element’s attributes span multiple lines. That closes a real linting gap for accessibility checks on multiline tags.

**Add a Biome code-review skill** (12ce933)
Introduced a new Claude skill for reviewing Biome changes, along with a README entry and contributor guidance updates. This is tooling/docs work for maintainers, not a product change.

### Other misc changes
- Performance work for several lint rules, including `noArguments`, `noGlobalAssign`, `noUndeclaredVariables`, `noRestrictedGlobals`, `noInvalidUseBeforeDeclaration`, `noShadow`, and `noRedeclare` (4afd901).
- Fixed a merge-related issue in HTML formatter attribute handling (9c93f91).
- Release/changeset cleanup from the publish workflow (191d051).
