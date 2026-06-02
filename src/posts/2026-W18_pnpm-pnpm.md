---
date: 2026-05-03
repo: pnpm/pnpm
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: L
title: "Audit signatures land as self-update and CI get safer"
excerpt: "pnpm adds registry signature checks, fixes self-update downgrades and workspace ci, and tightens release signing on macOS."
commits: 29
---

### Security and install integrity
**`pnpm audit signatures` verifies registry ECDSA signatures** — A new audit subcommand checks installed packages against registry key metadata, respecting scoped registries and skipping registries without keys.
**`minimumReleaseAge` now defaults to strict mode when set** — Explicitly configuring release-age limits no longer silently falls back to younger versions unless strictness is overridden.

### Core workflow fixes
**`pnpm self-update` no longer downgrades by accident** — The updater now avoids moving backward when `latest` is older than the installed version and handles project-pinned versions more accurately.
**`pnpm ci` reinstalls workspace package dependencies** — Clean installs now cover linked workspace package `node_modules` as expected, fixing broken monorepo CI runs.
**`pnpm clean` stops deleting lockfiles unless requested** — Lockfile removal now requires the CLI flag, instead of inheriting workspace config unexpectedly.

### Reporting and pacquet plumbing
**Pacquet reporter events now match pnpm's contract more closely** — Install runs emit `pnpm:context`, `pnpm:summary`, and `pnpm:package-import-method`, improving NDJSON and downstream reporter behavior.
**Progress reporting expanded in pacquet** — The Rust port now emits `pnpm:progress` imported events and `pnpm:fetching-progress`, making install progress more observable.

### Release and maintenance
**macOS release builds now use native signing** — Release artifacts move to `macos-latest` so darwin binaries are signed with native `codesign`, fixing a real startup crash on newer Node.js layouts.
**Pacquet tests were reorganized into external files** — A repo-wide refactor moved inline Rust test modules into dedicated files and updated the style guide accordingly.

### Other misc changes
- Dependency/security policy updates, including `hickory-proto` advisory handling
- Star-import cleanup and a compile fix after the refactor
- Lockfile, cspell, workflow, and changelog maintenance
