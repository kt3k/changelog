---
date: 2026-09-29
repo: vitejs/vite
size: M
title: "Vite fixes built URLs, optimizer fallbacks, sourcemaps"
excerpt: "Built URL queries now survive asset rewrites, optimize-deps keeps optional peer fallbacks, and bundled dev serves lazy chunk maps."
commits: 5
authors: [sapphi-red, james-elicx, tbvjaos510, h-a-n-a]
commit_authors: {"744269e": sapphi-red, "a2bd6fa": james-elicx, "eb7aa9a": tbvjaos510}
---

**Preserve query postfixes in `renderBuiltUrl` asset rewrites** (744269e)
Vite now carries asset query/postfix information through JS, CSS, and HTML URL rewriting, so `renderBuiltUrl` can see the full request shape instead of just the bare filename. This fixes cases where plugins need query-aware output for emitted assets.

**Keep excluded optional peer `require()` fallbacks working** (a2bd6fa)
The optimizer now distinguishes `require()` calls that resolve to an excluded optional peer and routes them through the same CJS stub behavior used by pre-bundling. That lets packages keep their `try/catch` fallback logic instead of failing eagerly when the optional dependency is absent.

**Serve sourcemaps for lazy chunks in bundled dev** (eb7aa9a)
Bundled dev now registers each lazy chunk’s in-memory `.map` file so the `sourceMappingURL` behind `/@vite/lazy?...` resolves correctly. This makes lazy-loaded code debuggable instead of leaving sourcemap requests to 404.

### Other misc changes
- Added/updated bundled-dev and optimize-deps playground coverage for the new behaviors.
- Bumped the Vitest monorepo to v5 and adjusted related workspace/package metadata.
- Minor test cleanup in plugin hook coverage.
