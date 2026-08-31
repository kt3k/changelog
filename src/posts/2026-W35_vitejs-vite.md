---
date: 2026-08-30
repo: vitejs/vite
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: M
title: "create-vite adds nub support, Vite fixes URL parsing"
excerpt: "This week brought nub support to create-vite, a URL query bugfix in Vite core, and a handful of docs and cleanup updates."
commits: 19
---

### create-vite supports nub package management
**nub support lands in create-vite 9.2.0** — The scaffold generator now recognizes the nub package manager and emits the right command forms for both create-style and normal invocations, making new-project setup work cleanly with nub.

### Core fix for asset URL parsing
**Timestamp query stripping is now safer** — `removeTimestampQuery()` only removes `t=...` when it is an actual query parameter, avoiding accidental removal of similarly named text like `current-t` and preserving hash fragments.

### Dependency and tooling updates
**Rolldown and related packages were bumped** — The repo, playgrounds, and docs picked up Rolldown and parser/tooling updates, along with a general round of non-major dependency refreshes.

### Docs and repo cleanup
**Documentation and workflow polish continued** — A series of small updates cleaned up docs wording and capitalization, removed obsolete banner/config pieces, pruned outdated locale links, trimmed unused plugin-container types, and adjusted workflow handling for semantic PRs and bot skip labels.

### Other misc changes
- Removed `markdown-it-image-size` from docs and shrank the lockfile
- CONTRIBUTING guidance updated for binary/type-bearing dependencies
- CSS async-order test adjusted
