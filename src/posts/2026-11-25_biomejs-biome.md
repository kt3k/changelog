---
date: 2026-11-25
repo: biomejs/biome
size: L
title: "Biome ships a batch of new lint rules"
excerpt: "Several new nursery rules landed across JS, CSS, and HTML, plus a Svelte parse fix and a few formatter/refactor improvements."
commits: 17
authors: [dyc3, siketyan, atharv1205, kristoferma, ematipico, yeliex]
commit_authors: {"1001924": dyc3, "1413bf8": dyc3, "025c012": dyc3, "c3bd8ba": dyc3, "d82324e": dyc3, "5201ae5": dyc3, "19fb503": dyc3, "2d30ad9": dyc3, "b7a3678": dyc3, "6b63f72": atharv1205, "addf04a": dyc3, "e97ca39": kristoferma, "0ba4d9a": siketyan, "f46a41d": siketyan, "446c083": siketyan, "4de11d2": ematipico, "16aaa88": yeliex}
---

**Biome adds a wave of new nursery lint rules across JS, CSS, and HTML** (1413bf8, 025c012, c3bd8ba, d82324e, 1001924, 5201ae5, 19fb503, 2d30ad9, b7a3678, 16aaa88)
These commits add multiple new rules, including Vue, TanStack Query, loop-control, SCSS, and existence-checking rules, each wired into config/schema/migration paths and backed by new tests. Together they expand Biome’s coverage substantially and should surface real bugs or questionable patterns in user code.

**Fix Svelte `{#each}` parsing and embedded bindings** (4de11d2)
Biome now correctly parses Svelte `{#each}` blocks when keys use more advanced syntax, and the embed/binding plumbing was updated to recognize the Svelte-specific each-binding root. This matters because it fixes a parser bug that could break analysis or formatting for valid Svelte components.

**Improve `noUnnecessaryConditions` to allow `while (true)`** (addf04a)
The rule no longer flags constant-true loop conditions, which removes a false positive for a common control-flow pattern. That makes the diagnostic more accurate without weakening the rule’s intended checks.

**`useErrorCause` now accepts a trailing options argument** (e97ca39)
The rule was updated to handle an options object in the trailing position, alongside new coverage for shadowed globals. This aligns the lint rule with a wider set of valid call shapes and reduces incorrect reports.

**JS formatter flattens parenthesized logical operands earlier** (6b63f72)
The formatter rewrite now handles parenthesized logical expressions on the first pass, improving how nested logical chains are normalized. That should reduce churn in formatted output for affected expressions.

### Other misc changes
- CI workflow tweak for musl binaries to use RELR relocations (0ba4d9a)
- Large refactor to reduce generated Debug impl code for AST nodes (f46a41d2)
- Shared empty rule-options types to reduce binary size (446c083)
