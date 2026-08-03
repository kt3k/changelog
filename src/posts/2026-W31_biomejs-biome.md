---
date: 2026-08-02
repo: biomejs/biome
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "Biome sharpens formatting, adds new lint rules, and speeds up analysis"
excerpt: "Markdown, YAML, HTML, and CSS formatting got major correctness upgrades, new lint rules landed, and profiling/console output got faster."
commits: 56
---

### Major formatter and parser improvements across core languages
**Markdown prose wrapping and code cleanup** — Biome added configurable prose wrapping for Markdown and tightened blockquote, list, link, inline code, and code-block handling to reduce noisy diffs and improve spec alignment.

**YAML formatting becomes much more robust** — Multiple passes improved quote normalization, explicit entries, comment placement, scalar/collection spacing, document separation, and multiline property attachment, making YAML output far more stable on real-world files.

**HTML fidelity improvements** — The formatter now preserves whitespace-sensitive elements like `textarea`, `xmp`, and `plaintext`, keeps trailing newlines after comments, handles `srcset` as structured candidates, and chooses the cheaper attribute quote delimiter.

**CSS formatting and parsing tighten up** — CSS/SCSS now preserves comment indentation in property values, accepts SCSS variables in rule lists, handles interpolated media-query boundaries better, and avoids crashes on incomplete property values while editing.

### New lint coverage expands across CSS, HTML, and JS
**Tailwind arbitrary values are now linted** — A new nursery rule flags classes like `w-[400px]`, with wiring for config, diagnostics, and ESLint migration.

**Viewport and prototype safety rules land** — Biome added `noNonScalableViewport` for `user-scalable=no` meta tags and `noExtendNative` for extending built-in prototypes.

**Existing lint rules got important correctness fixes** — `useNullishCoalescing` now recognizes `if`-based fallback assignments, `noUnnecessaryConditions` avoids false positives around optional chains and overloads, `noDelete` is more permissive for computed `process.env`, and `noFloatingPromises` handles unions and optional promises more accurately.

### Performance, profiling, and type metadata continue to mature
**Inference profiling is now separate from rule profiling** — `biome check` gained structured type-inference profiling hooks, making it easier to isolate analyzer hotspots.

**Profiling and console output got faster** — Rule profiling now uses thread-local collectors, and console printing batches writes for less contention and overhead.

**Generated global type data keeps expanding** — Several globals and methods, including `WeakMap`, `Date`, `Array`, `Map`, `Set`, and related array methods, were migrated into generated type metadata to reduce manual maintenance and improve consistency.

### Other misc changes
- CLI stdin now respects nested config paths.
- CLI help/reporter docs were clarified.
- CSS module graph work now tracks property references alongside classes.
- Minor release, dependency, test, and snapshot updates throughout the week.
