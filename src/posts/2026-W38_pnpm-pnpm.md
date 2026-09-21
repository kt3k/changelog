---
date: 2026-09-20
repo: pnpm/pnpm
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: L
title: "pnpm expands Python, relocatable installs, and better shims"
excerpt: "A week of major Python/package-routing work, relocatable installs, and multiple install, store, and SBOM fixes."
commits: 198
---

### **Python support took a major leap forward**
pnpm’s Python workflow grew from basic installs into a much more complete resolver: it now supports per-project interpreter selection, shared workspace environments, filtered installs, source distributions, overrides/constraints, explicit index routing, and `pkg:pypi`-style overrides. It can also fetch a missing interpreter, persist environments in the store, and replay lockfiles across compatible targets instead of re-resolving on small environment changes.

### **Package routing and binary shims got much more flexible**
`pnpm add` now understands Package URLs and routes them across npm, Cargo, and PyPI, while `pnpm-workspace.yaml` catalogs can point at local `file:`/`link:` entries. On the tooling side, project bin shims became relocatable on macOS/Linux, `pn`, `pnpx`, and `pnx` now resolve the sibling pnpm binary more reliably, and shell/script handling improved for Windows paths and brace-expanded env vars.

### **Installs are more correct, more relocatable, and less wasteful**
This week fixed several long-standing install edge cases: frozen installs now compare against importer-reachable graphs, repeat installs validate against the lockfile, moved `node_modules` trees can be reused after relocation, and standalone projects outside a workspace are handled correctly. pnpm also reduced unnecessary work in hoisted installs, stopped fetching dev-only tarballs for `--prod`, and improved cache keying, build-denial handling, and Windows link/symlink repair races.

### **Store, SBOM, deploy, and publish behavior tightened up**
`pnpm store prune` now reclaims unreferenced CAS data, SBOM output was corrected to emit valid repository URLs and proper license classifications, and `pnpm deploy`/`publish` picked up cleaner specifier and detached-HEAD handling. There were also fixes for `pnpm audit --fix=update`, `pnpm change check`, recursive run/list behavior, and a number of workspace/catalog/lockfile consistency bugs.

### Other misc changes
Dependency bumps, CI/test coverage, docs, and monorepo refactors, plus cargo resolution improvements, task concurrency groups, signal handling fixes, and assorted platform-specific bug fixes.
