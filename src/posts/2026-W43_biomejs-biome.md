---
date: 2026-10-25
repo: biomejs/biome
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: L
title: "Biome adds a big wave of lint rules and core perf wins"
excerpt: "This week brought major lint expansion across JS/CSS/HTML/Vue/etc., plus formatter, traversal, daemon, and LSP fixes."
commits: 103
---

### Major lint expansion across the ecosystem
Biome added a large batch of nursery rules spanning JavaScript, CSS, HTML, JSON, YAML, Vue, Svelte, and framework-specific domains. Highlights include checks for unsafe returns, boolean sort comparators, unreadable loops/IIFEs, null usage, useless recursion, array-sort and flat-depth footguns, obsolete HTML attributes, invalid package metadata, YAML boolean keys, and Vue/Svelte correctness issues. Many of these ship with autofix support and ESLint/Stylelint migration mappings.

### Formatter correctness got a broad cleanup
Several printer edge cases were fixed across JS/TS, JSX, CSS, Markdown, GraphQL, and Prettier migration output. Notable fixes preserve parentheses in tricky TypeScript expressions, avoid duplicated JSX spread comments, keep CSS selector indentation and cascade-sensitive ordering intact, and make Markdown blockquote/list spacing more stable. GraphQL parsing/formatting also became more robust for descriptions and legacy variables.

### Core traversal and analysis got faster and more flexible
Biome continued optimizing semantic walking and tree traversal. Rowan gained subtree skipping and cheaper traversal paths, multiple rules moved to kind-filtered preorder walks, and CSS lint rules dropped quadratic scans in favor of indexed semantic lookups. The formatter core was also refactored to be generic and less tightly coupled to Rowan, broadening reuse and test coverage.

### Daemon, LSP, and workspace handling improved
The daemon path now uses all CPU cores for `--use-server` work, returns faster on `biome stop`, and reports cancellations more consistently. The LSP now warns when project configuration fails to parse instead of silently stopping, and project-root file exclusion behavior was corrected for nested layouts. Editor-settings lookups were also streamlined to reduce filesystem churn.

### New framework semantics and targeted rule improvements
Vue got a new semantic model that powers more precise linting, along with new rules for transitions, emits, refs, and directive usage. Other rule refinements reduced false positives or sharpened behavior, including `noTsIgnore`, `noUnusedVariables`, `useDomNodeTextContent`, `noDescendingSpecificity`, and CSS irregular-whitespace handling.

### Other misc changes
- Release/workflow and provenance attestation updates
- Migration mapping and rule metadata generation updates
- Documentation, snapshots, and test fixture maintenance
- Minor dependency and housekeeping changes
