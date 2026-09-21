---
date: 2026-09-20
repo: denoland/std
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "std stabilizes text/yaml APIs and tightens security checks"
excerpt: "This week std stabilized truncate and YAML quoteStyle, hardened IP parsing and serveDir, and improved retry and JSONC behavior."
commits: 15
---

### Stability upgrades across core APIs
**Text truncate is now stable** — `@std/text/unstable-truncate` was promoted to `@std/text/truncate` and re-exported from the text module.

**YAML stringify quoteStyle is now stable** — `quoteStyle` moved out of the unstable entrypoint into stable `@std/yaml/stringify`, making quote control available without unstable imports.

### Parsing and error handling got stricter
**IP parsing now matches the URL standard** — `unstable_ip` gained dedicated `parseIPv4()` and `parseIPv6()` helpers, and `isIPv4()` now uses the parser. Legacy IPv4 forms and zone IDs are now rejected for better spec compliance.

**JSONC unterminated strings now report cleanly** — malformed strings now fail with an unexpected end-of-input error instead of silently running off the end of the input.

### Security hardening in file serving
**serveDir closes traversal and dotfile gaps** — percent-encoded backslashes are now rejected after decoding, with an extra containment check before files are served. The update also adds clearer dotfile handling, addressing a Windows-specific traversal/disclosure issue.

### Utility behavior improvements
**retry() can now honor custom delays** — a new unstable `getDelay` option lets callers override the wait before each retry while still using the built-in backoff calculation.

**Tree constructors accept array-like inputs** — `BinarySearchTree` and `RedBlackTree` `from()` now support array-like objects via `Array.from()`, not just iterables.

### Other misc changes
- UUID v7 monotonicity and UUID v1 docs updated
- RedBlackTree docs aligned with sibling APIs
- JSONC test harness now compares parsed values
- Deno config and lint-rule updates
- serveDir tests expanded for traversal and dotfile cases
- Markdown/code-fence documentation note
