---
date: 2026-08-29
repo: denoland/deno
size: M
title: "LSP now resolves prerelease-only JSR packages"
excerpt: "Deno’s LSP and JSR tests now handle packages with no stable release by selecting the newest matching prerelease, aligning with resolver behavior."
commits: 1
authors: [crowlKats]
commit_authors: {"1aa88c0": crowlKats}
---

### **LSP resolves newest prerelease when no stable exists** (1aa88c0)
The LSP cache resolver now uses the same prerelease matching semantics as `deno_graph`, so wildcard JSR requirements can resolve to the newest prerelease when a package has no stable release. This fixes typechecking and import resolution for prerelease-only packages, including cases affected by minimum-dependency-age rules.

### Other misc changes
- Added integration coverage for prerelease-only JSR resolution.
- Updated JSR registry test metadata timestamps.
- Expanded add-spec fixtures for `only_unstable_versions`.
