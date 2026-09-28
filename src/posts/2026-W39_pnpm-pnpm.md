---
date: 2026-09-27
repo: pnpm/pnpm
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: L
title: "pnpm adds build approvals, offline reliability, and major fixes"
excerpt: "A packed week: new build-script approvals and auto-dedupe, plus major install, publish, Windows, cache, and security fixes."
commits: 536
---

### **New controls for installs and package authoring**
`pnpm install` gained `--allow-build`, letting teams approve or deny lifecycle build scripts per package and persist those decisions in `pnpm-workspace.yaml`. `pnpm add` also learned `--save-types`/`saveTypes` to auto-add matching `@types` packages when available, while `autoDedupe` now deduplicates compatible versions during install without changing frozen lockfiles.

### **Publish, pack, and audit behavior got more precise**
Publishing and packaging were tightened so bundled deps work correctly with the isolated linker, scoped `publishConfig` registries win for scoped packages, and `publish --publish-wait-timeout` can wait for tarballs and versions to become available. Audit commands now respect `--filter`, `--filter-prod`, and `--workspace-root`, making results match the selected workspace scope.

### **Install correctness and resolver bugs saw broad fixes**
A lot of work went into preventing silent dependency-tree drift: optional deps and peers are handled more correctly, repeat installs relink dangling deps, frozen installs catch missing or drifting workspace projects, stale patch hashes are repaired or rejected, and named registries, catalog edges, build metadata, and override semantics are handled more consistently. pnpm also now reuses in-flight tarball reads, honors Cache-Control for tarball installs, and can stream large gzips to cut memory use.

### **Windows, filesystem, and store handling were hardened**
Windows received a large round of fixes for cmd shims, path normalization, long directories, Unicode/percent escaping, and safer setup/self-update behavior. The shared store now preserves group-write/setgid permissions, `store prune` cleans dlx cache correctly, and hoisted/junction handling was improved to avoid stale links, race conditions, and cleanup problems.

### **Scripts, lifecycle, and workspace behavior were refined**
Root `preinstall` now runs before linking deps, `remove` runs uninstall lifecycle hooks, `run` preserves global options and passes Windows args correctly, and `npm_command` is restored for scripts. Workspace filtering, recursive task ordering, completion, version tagging, and `package.yaml` support were also tightened so CLI behavior matches expectations more consistently.

### **Security and network behavior improved**
`pnpr` now blocks loopback/private/internal targets unless explicitly allowed, and tarball/metadata fetching fails fast on untrusted TLS certificates instead of retrying uselessly. Git/SSH fetches also fail fast on hidden prompts, reducing hangs and surfacing auth problems sooner.

### Other misc changes
- CI, benchmark, and release-note housekeeping
- Dependency bumps and lockfile churn
- Smaller docs, tests, and internal refactors
