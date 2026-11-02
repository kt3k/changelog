---
date: 2026-11-01
repo: biomejs/biome
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: L
title: "Biome lands major Vue lint expansion plus key perf wins"
excerpt: "This week added a large wave of Vue/TanStack rules, improved lint/JS runtime performance, and tightened markdown/formatter correctness."
commits: 98
---

### Major Vue linting expansion
Biome spent the week shipping a big batch of Vue rules, covering deprecated APIs, invalid macros, emit/slot usage, refs, computed properties, router guards, and template patterns. New checks like `noVueUndeclaredEmits`, `useVueValidDefineOptions`, `useVueRenderReturn`, `noVueRefObjectReactivityLoss`, and `noVueRestrictedVOn` significantly deepen Vue coverage, with migration mappings and config/diagnostic updates throughout.

### Performance and memory improvements
Several hotspots were optimized across lint and runtime paths. Switch/branch rules such as `noDuplicateCase`, `noDuplicateElseIf`, and `noFallthroughSwitchClause` were rewritten to scale linearly, unused-member/import traversal was streamlined, rowan node/text access got faster, and daemon/parser caching was reworked to reduce memory growth in `biome check --use-server`. JavaScript plugins also got a speedup by making `.kind` reads static data properties.

### Correctness fixes across markdown, JS, CSS, and editor tooling
Markdown formatting/parsing saw multiple fixes for nested lists, block quotes, frontmatter in embeds, and blank-line edge cases. The JS formatter now preserves required optional-chain parentheses, CSS gained new checks for Tailwind variable shorthands, SCSS interpolation, and functional pseudo-class selectors, and EditorConfig glob braces now parse more reliably. The LSP also stabilized dynamic capability registration to avoid duplicate watcher churn.

### Broader analyzer and tooling upgrades
Biome can now surface rule panics as structured diagnostics, and its configuration/deserialization layer was extended to accept YAML. Rule documentation generation was refactored to use Biome’s own parser/modeling pipeline, and release/security maintenance included dependency bumps plus a fixed advisory in `Cargo.lock`.

### Other misc changes
- Added TanStack Query rules for void query functions and stable `QueryClient` creation
- Added more Vue/HTML nursery rules and migration metadata
- Minor rule metadata, schema, changelog, and test snapshot updates
