---
date: 2026-08-23
repo: pnpm/pnpm
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "pnpm adds branch lockfiles, Rust parity, and install fixes"
excerpt: "Major Rust CLI parity, per-branch lockfiles, better install/update correctness, and lower-memory large tarball handling."
commits: 140
---

### Major Rust engine and CLI parity gains
pnpm landed a large Rust-side feature drop: per-branch lockfiles (`gitBranchLockfile` and merge flags), configurable `lockfileDir`, broader env/config support for hooks and materialization settings, and a big CLI parity sweep covering commands like `get/set`, store status, recursive flags, update notifier behavior, and shell-emulator support. PnP execution is also now wired through scripts and `pnpm exec`, closing a major runtime gap for PnP workspaces.

### Install, update, and workspace correctness fixes
The week also focused heavily on user-visible correctness. Installs now report unmet peer deps after resolution, `strictPeerDependencies` is enforced more consistently, and update flows were tightened so tag selectors, build metadata, ignored deps, prerelease ranges, and versioned selectors all behave predictably. Workspace/config handling improved too: unknown workspace settings are classified better, parent-relative package globs are discovered again, inline YAML in `pnpm-workspace.yaml` is preserved, and config inspection now shows the effective values pnpm actually uses.

### Performance and determinism improvements
pnpm reduced install overhead in a few key places: large tarballs now stream into the store to cut peak memory use, metadata resolution skips unnecessary registry requests more often, Linux auto import prefers hardlinks before clone, and packed workspace manifests now preserve dependency order for deterministic output. Lockfile reuse also became less noisy by avoiding unnecessary re-resolves and preserving already-satisfied edges.

### Integrity, auditing, and global workflow fixes
Audit and trust handling were tightened so `pnpm audit` only reports real published patch versions and metadata age checks re-fetch when abbreviated packuments are incomplete. Global and init flows got fixes too, including exact pnpm pinning for Corepack, safer global update handling for local specs, cleaner self-update behavior, and safer bin/shim conflict handling.

### Other misc changes
- Catalog and registry correctness fixes for `outdated`, interactive update, and override drift
- Hoisted installer layout fixes on conflict-heavy dependency graphs
- `pnpm change` prompt cancellation and pagination improvements
- `pnpm patch-commit` support for non-ASCII paths
- Misc dependency bumps, CI/build refreshes, and test-only refactors
