---
date: 2026-08-30
repo: pnpm/pnpm
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "pnpm adds task orchestration, artifact pins, and auth overhaul"
excerpt: "This week brought recursive task scheduling, remote build artifacts, registry revision support, and a move to config.yaml-based auth."
commits: 138
---

### **Recursive work now schedules per task, with resume/bail support**
`pnpm -r run` and `pnpm -r exec` moved from coarse topological chunks to per-task scheduling, so independent work can start sooner and task-specific concurrency limits are honored. The new workspace `tasks` graph also adds explicit dependencies, cycle handling, dry-run/json output, and persisted resume state, while bail now cancels in-flight child process trees cleanly.

### **Remote build artifacts became a first-class, reproducible protocol**
Shared build artifacts were pinned in `pnpm-lock.yaml`, given signed provenance in the store, and expanded to support macOS and Windows alongside Linux. The protocol was generalized to cover task artifacts too, with write-once overlap checks and stricter conflict handling, but this is a breaking pnpr client/server change that requires matched versions.

### **Registry revisions, update behavior, and install safety got tighter**
pnpm added support for explicit `<version>+rN` registry revisions across npm, JSR, aliases, and named registries, and `pnpm update --patches` can now refresh revision-addressed artifacts without changing package versions. Install safety improved as well: archive decoding now has memory ceilings, `--frozen-lockfile` is less brittle around package-manager pins, and incremental installs validate patches and merged lockfiles more correctly.

### **Auth and global config were reworked**
`pnpm login`/`adduser` now store credentials in `config.yaml` instead of `auth.ini`, with logout cleaning up both new and legacy locations. Global update behavior was also corrected so `pnpm update -g --latest` won’t downgrade packages or pnpm itself, and users are directed to `pnpm self-update` for pnpm upgrades.

### **Performance and correctness fixes landed across install/deploy**
Large workspaces got faster via linear-time dependency graph sorting, parallelized direct-dependency linking, and fewer relink passes. Deploy and fetch were tightened too: deploy now prunes excluded peers and unreachable deps correctly, fetch links virtual-store bins for lifecycle scripts, and `pnpm install --fix-lockfile` is now supported in the Rust CLI.

### Other misc changes
**CLI and config polish:** `pnpm init` now pins the latest pnpm version, `--production` works as a `--prod` alias, `pnpm dlx` catalog resolution was fixed, and config/auth parsing got several correctness fixes.

**pnpr and NAPI improvements:** the Rust pnpr codebase was split into smaller crates/modules, hosted registries gained digest-addressed artifact support, and N-API bindings picked up better option handling and typed validation.

**Misc fixes and maintenance:** package-manager pin metadata was cleaned up, bundledDependencies reuse was preserved, workspace catalogs now accept `workspace:` entries, release tooling and CI got several fixes, and assorted test/dependency updates landed.
