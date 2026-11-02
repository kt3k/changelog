---
date: 2026-11-01
repo: oven-sh/bun
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: L
title: "Bun ships AOT builds, safer internals, and codec overhauls"
excerpt: "Major new AOT compilation, large Rust safety refactors, PNG/tar replacements, plus crypto, test, and release pipeline fixes."
commits: 56
---

### Major build/runtime additions
**Ahead-of-time compilation for `bun build --compile --aot`** brought a new machine-code build path that ships executables without a JIT, with dedicated test coverage and hardened-build support.
**`bun test` expands compatibility** to run more Vitest/Jest suites, while CLI and test-runner internals were refactored away from raw pointers and unsafe ownership patterns.

### Safety and memory-model cleanup
**Large Rust safety refactors landed across core subsystems**, replacing unsafe pointer plumbing with typed borrows/lifetimes in the runtime, dev server, shell, printer, resolver, and event loop.
**Core lifetime bugs were fixed** in string/source handling, closing use-after-free issues in error printing and build message paths.
**Archive and path handling were hardened** so extraction and route serving stay rooted more reliably, and filesystem resolver APIs became safer and less mutation-heavy.

### Native dependency replacements
**`libarchive` was replaced with safe Rust tar/gzip code**, reducing the C dependency surface and moving archive logic in-tree.
**PNG support was rewritten in Rust** with a new `bun_png` codec for Bun.Image, replacing `libspng` while preserving encode/decode support and adding benchmarks.
**`bytemuck` was replaced by an in-tree POD crate**, continuing the push toward repo-owned, compiler-checked low-level primitives.

### Compatibility and correctness fixes
**Node compatibility improved in crypto, WebCrypto, fs, and observability APIs**, including Win32 handle support for file streams, histogram behavior fixes, and more accurate crypto edge-case handling.
**WebKit/JavaScriptCore was bumped multiple times** this week, including fixes for `RegExp.lastMatch`, `Math.sumPrecise`, async stack traces, and other engine regressions.
**CSS parsing/printing and lint behavior were corrected** with broad parser fixes, TypeScript AST position data for plugins, and quieter install output for `.env` loading.

### Release and CI hardening
**Release and CI flows were tightened** with Buildkite OIDC image lookup, GitHub App-based canary uploads, trusted npm publishing, and cleaner release-environment handling.

### Other misc changes
- `bunx` now resolves more native-dependency bin links.
- Small build-script, docs, test, and version-bump updates across WebKit, AOT snapshots, and Windows paths.
