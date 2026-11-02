---
date: 2026-11-01
repo: pnpm/pnpm
period: weekly
slug: 2026-W44
period_label: "Oct 26 – Nov 1, 2026"
size: L
title: "pnpm tightens install correctness, shims, and security"
excerpt: "A week of install fast-path fixes, safer shims, smarter overrides, and security patches across pnpm and pnpr."
commits: 117
---

### Install correctness and repeat-install freshness got a big overhaul
**Scope-routed installs now re-resolve when registries move** — pnpm now tracks which registry routes produced lockfile entries and refreshes stale entries when scope routing changes, avoiding cross-registry reuse of old versions or integrity data.

**Repeat-install now invalidates on more state changes** — the fast path now accounts for more settings and inputs, including workspace layout flags, hook-added local deps, injected copies, runtimes, and missing `workspace:`/`link:` targets, closing several false “Already up to date” cases.

**Filtered and hoisted installs are safer after partial failures** — filtered installs now fail instead of breaking skipped workspace projects when layout drifts, hoisted installs forget half-replaced packages after interruption, and repeat installs relink missing direct dependencies instead of trusting stale state.

**Store prune and side-effects cache handling were hardened** — prune now preserves packages still needed by installed projects and avoids deleting configured data, while side-effects restores keep bundled dependencies intact.

### Shims, bins, and package linking were made more reliable
**Workspace and global bin links now stay in sync** — pnpm now removes stale workspace `.bin` shims when commands disappear, relinks renamed bins in dedicated-lockfile workspaces, and refreshes privately hoisted bins after builds replace placeholders with native executables.

**Generated shims and global installs behave better across environments** — POSIX shims now quote paths safely, global installs expose hoisted dependencies to direct bin shims, and `.cmd` wrappers work correctly even when MSYS path conversion is disabled.

**Broken link and path edge cases were fixed** — installs now recover when `node_modules` is symlinked, importer overwrites fall back cleanly on overlayfs `EXDEV`, and relink logic now handles missing `workspace:` and `link:` dependencies.

### Updates, overrides, and runtime handling became smarter
**Overrides can now target dependency types and wildcards** — v12 overrides support `:prod`, `:optional`, and `:peer`, plus wildcard matching on parent and target package names.

**`update --latest`, `outdated`, and Cargo flows were expanded** — pnpm now refreshes matching subtrees under selected packages, includes runtime/package-manager deps in update/outdated, and avoids Cargo rewrites that would break feature resolution or multiline inline tables.

**Runtime and version resolution improved** — Node and pnpm version selection now prefer stable releases, `gitTagVersion` is honored again for `pnpm version`, and `get-pnpm` can install without touching PATH.

### Security and process/runtime fixes landed
**Local patches closed dependency advisories** — pnpm patched `deepmerge`, `minimatch`, and `glob` to block prototype poisoning and address the latest reported vulnerabilities.

**Process lifetime and runtime installs were corrected** — script children now outlive pnpm only when semantics require it, and pinned runtime installs no longer loop on a global pnpmfile.

**Windows and container ergonomics improved** — worker pools respect cgroup CPU quotas, Windows CI now captures crash dumps, and file modes/umask handling was fixed for workspace state and project files.

### pnpr storage and hosting changed substantially
**pnpr storage layout was refactored** — team rosters, rule overrides, tombstones, and other internal data now live under a new unversioned layout, with canonical package-name handling updated accordingly.

**Hosted tar registries now use zstd tar blobs** — pnpr can store published versions as `.tar.zst` and serve either compressed bytes or decoded tar content, with stricter router validation.

### Other misc changes
- Proxy settings are now honored during bootstrap/self-update and Corepack downloads.
- `pnpm link` now rejects invalid package names up front.
- `pnpm peers check` gained a `--global` mode.
- Various release notes, docs, tests, dependency bumps, and CI workflow updates.
