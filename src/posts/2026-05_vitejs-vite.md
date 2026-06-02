---
date: 2026-05-31
repo: vitejs/vite
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "Vite sharpens bundled dev, workers, and SSR correctness"
excerpt: "May brought bundled-dev lazy loading, worker config parity, SSR and glob fixes, plus a stream of Rolldown upgrades and release bumps."
commits: 62
---

### Bundled dev gets smarter and more configurable
**Lazy bundling lands in bundled dev** — Vite’s bundled dev mode can now compile modules on demand instead of relying entirely on the initial full build. This was paired with a per-environment `isBundled` resolution change, making bundled behavior more precise across client, worker, and other environments.

**Worker builds now inherit main-build settings** — Worker bundling was brought closer to the main app by forwarding `build.target` and `define` into the worker transform path. That fixed mismatches where workers compiled with different assumptions or missed compile-time replacements.

**Devtools integration moved deeper into the pipeline** — `@vitejs/devtools` is now wired directly into Vite’s plugin/build flow, improving consistency across dev and build usage.

### SSR, module runner, and HTML transforms got several correctness fixes
**SSR re-export race and label rewriting bugs were fixed** — The module runner now detects concurrent circular re-export chains more accurately, avoiding partial-exports races during invalidation. SSR transforms also stopped rewriting labels and `break`/`continue` targets, preventing accidental syntax breakage.

**HTML and proxy handling became more reliable** — `transformIndexHtml` now handles trailing-slash directory URLs correctly, and HTML served through `/@fs/` no longer trips `html-proxy` cache-key mismatches for inline module scripts.

**Globs now behave more predictably** — `import.meta.glob()` fixes covered absolute base paths, relative-glob errors inside virtual modules, and test coverage for more realistic root/base combinations.

### Workers, CSS, and build teardown were hardened
**CSS preprocessor workers now shut down cleanly** — Server/build teardown now waits for Sass/Less/Stylus workers to fully stop, fixing lingering child-process cleanup issues.

**Build output and plugin hooks were tightened** — Vite fixed a rebuild regression where `write=false` could interfere with later public asset copying, and the esbuild-to-rolldown bridge now passes more complete build-result fields to plugin hooks.

**Console forwarding and timeout handling improved** — Dev console forwarding now handles transport send failures more safely, and request timeouts are surfaced as proper HTTP 408 responses.

### Rolldown upgrades and release churn continued
**Rolldown moved through several releases** — The repo advanced from rc builds to 1.0.0, then 1.0.1, 1.0.2, and 1.0.3 across core packages, docs, and playgrounds. These updates came with sourcemap/test expectation adjustments and reflect Vite tracking upstream bundler changes closely.

**Multiple patch releases shipped** — Vite 8.0.11, 8.0.12, and 8.0.14 landed during the month, along with a create-vite release. These releases mostly bundled the bug fixes and dependency updates above into formal patch cuts.

### Security, CI, and docs
**CI supply-chain hardening improved** — Official GitHub Actions were pinned to exact commit SHAs, reducing exposure to upstream tag drift. There were also pnpm workflow updates and other release automation tweaks.

**Docs and scaffolding were kept in sync** — The repo updated guidance for `build.rolldownOptions`, pnpm overrides, plugin ordering examples, and create-vite/TanStack scaffolding behavior.

### Other misc changes
- Dependency refreshes across linting, types, testing, CSS tooling, and workspace lockfiles.
- Miscellaneous release-note cleanup, changelog pruning, and wording fixes.
- Minor test fixture updates for Sass, glob imports, and worker behavior.
