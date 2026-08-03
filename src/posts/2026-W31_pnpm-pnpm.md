---
date: 2026-08-02
repo: pnpm/pnpm
period: weekly
slug: 2026-W31
period_label: "Jul 27 – Aug 2, 2026"
size: L
title: "pnpm tightens lockfile safety and speeds up peer resolution"
excerpt: "This week brought faster, more deterministic peer resolution, safer registry/lockfile handling, CA fallback, and a bundled node-gyp for the Rust CLI."
commits: 121
---

### Major resolver and peer-hoist performance gains
**Big peer-resolution speedups and lower memory use** landed throughout the week, with multiple passes made incremental, memoized, and deterministic. Large workspace installs now avoid repeated tree walks, re-read less state, and build peer graphs from settled data, which cuts both runtime and lockfile churn.

**Peer-hoist output is now steadier** by resolving importer waves sequentially, deriving candidates from the settled tree, and stabilizing package ordering. That removes a source of nondeterministic lockfile rewrites and makes repeated installs more reproducible.

**Dedupe and override flows got smarter** with safer override reuse, preserved locked peer contexts, and catalog pins that survive tree rebuilds. This reduces unnecessary re-resolution while keeping optional peer suffixes and catalog snapshots intact.

### Lockfile and registry safety hardening
**Registry-qualified lockfiles now separate named registries** so packages from different registries can no longer collapse onto the same entry. The change closes a package-substitution risk and also adds a built-in `npmjs:` alias while rejecting shadowing of reserved specifier prefixes.

**Lockfile verification and recovery got stricter and more resilient**: tarballs missing integrity are now rejected up front, malformed lockfiles can be ignored and regenerated during normal installs, and `--lockfile-only` now writes integrity hashes even when the registry omits them. Very large lockfiles also gained YAML and parser budget fixes so huge workspaces are less likely to fail on structural limits.

**Workspace link handling was corrected** so internal links stay stable during partial re-resolution and exclude/remap logic no longer corrupts peer IDs. This eliminates a class of lockfile path and persistence bugs.

### CLI, config, and platform compatibility improvements
**The Rust CLI and N-API surface gained a few notable integration upgrades.** `@pnpm/napi` now exposes `readConfig(options)` for embedders, reports which settings were explicitly set, and can list deps requiring build scripts. On the CLI side, npm-style `--prefix` and `--store` flags are now accepted, recursive `--parallel` works correctly, and `pnpm login` web auth no longer needs a TTY.

**Install-time behavior became more robust across environments.** pnpm now falls back to bundled CA roots when the system trust store is missing, bundles `node-gyp` with the Rust CLI, preserves `scriptShell` and `TMPDIR` for lifecycle scripts, and fixes local tarball installs that were previously skipped.

### Other misc changes
**Licenses and reporting parity** improved, including workspace-wide license scanning, alias-safe package tracking, more accurate metadata, and output formatting closer to TypeScript pnpm.

**Additional fixes and cleanup** included exact-pinned updates preserving `=` semantics, better handling of minimum release age messaging, deduped deprecated-package warnings, config/reporting refactors, dependency bumps, and workflow/release tooling updates.
