---
date: 2026-10-04
repo: pnpm/pnpm
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: L
title: "pnpm tightens install correctness, updates, and self-management"
excerpt: "A week of install/dedupe fixes, faster resolution, safer self-update/login flows, and a WebContainers split."
commits: 165
---

### Install, dedupe, and frozen-lockfile correctness
**Peer/optional dependency handling got much more consistent** — pnpm fixed several cases where peer variants, optional peers, and injected workspace deps could leave behind stale duplicates or fail frozen installs. Deduped peer suffixes now converge, optional peers follow the provider’s resolved version, and injected peers are accepted more often in fresh lockfiles.

**Filtered and recursive installs are safer** — filtered installs no longer drop unrelated hoisted packages or skip everything at filesystem roots, and recursive `run`/`exec` now verify transitive workspace dependencies before starting. `verifyDepsBeforeRun` also handles touched lockfiles and forwarded config better, preventing unnecessary reinstalls and wrong install destinations.

**Deploy, publish, and unpublish got important fixes** — deploy stopped copying the workspace package-manager pin into targets, works better with injected packages and path-based repos, and `pnpm unpublish` now deletes tarballs correctly under registry path prefixes. Publish also now recognizes npm-style README filenames.

### Resolver and install performance improved
**Resolver hot paths got faster** — pnpm reduced allocation churn, coalesced concurrent metadata misses, improved registry version selection, and sped up offline range picking and repeat lockfile-only runs. Metadata revalidation also now prefers conditional requests over full redownloads when packuments are uncacheable.

**Workspace installs and relinking are cheaper** — global virtual-store installs run more concurrently, symlink relinking avoids unnecessary recreate attempts, and pinned pnpm commands skip the shell shim for faster startup. The install pipeline also got a compile-size simplification that trims binary weight.

### CLI behavior, self-update, and security
**Self-update became stricter and more predictable** — pnpm now refuses to self-update when managed by Homebrew or corepack, and Windows updates no longer rerun awkwardly through old shims. `pnpm login` also fixed a redirect-related credential leak.

**Command-line and lifecycle edge cases were hardened** — `--config.*` now reaches verify-deps installs, `failIfNoMatch` works from workspace config, `?` works in package filters, `pnpm run` no longer reports Ctrl+C as a lifecycle failure, and lifecycle handling fixed a handful of shell/path quirks across platforms.

### WebContainers, platform support, and ecosystem polish
**WebContainers were split out into a separate package** — pnpm’s WASM runtime for StackBlitz is now published as `@pnpm/wasm`, shrinking the native packages while keeping browser/WebContainer support available as an opt-in dependency.

**Platform and ecosystem support expanded** — Android file locking now uses `flock`, Quay CDN redirects are allowed for OCI pulls, GitLab provenance includes the required invocation parameters, and docs sync/release automation was tightened.

### Other misc changes
- Store/index cleanup and prune fixes, including better handling of undefined rows and concurrent readers
- Windows Ctrl+C and batch-shim fixes, plus a few self-update and cmd.exe regressions
- Changelog/docs/test maintenance, dependency bumps, and internal refactors
