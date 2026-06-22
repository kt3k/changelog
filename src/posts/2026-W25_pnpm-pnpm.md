---
date: 2026-06-21
repo: pnpm/pnpm
period: weekly
slug: 2026-W25
period_label: "Jun 15–21, 2026"
size: L
title: "pnpm week: install parity, security fixes, and Rust gains"
excerpt: "Dry-run installs, security hardening, SBOM upgrades, package maps, and big pacquet parity improvements landed this week."
commits: 118
---

### Major install and dependency-resolution improvements
**Dry-run installs for safer previews** — `pnpm install --dry-run` now resolves the graph and reports planned changes without touching lockfiles, `node_modules`, or workspace state.

**Parity fixes for add/update behavior** — dependency saving and update semantics were tightened across the board: explicit specs resolve to concrete versions, existing ranges are preserved on re-add, `--save-prefix` is supported, and `--latest` now preserves catalog references and existing semver operators.

**Repeat installs are more correct** — warm and incremental installs now detect local file/tarball dependency edits, lockfile-only changes, stale transitive pins, and partial virtual-store imports, reducing false “up to date” results and install churn.

### Security, policy, and trust hardening
**Path traversal and bootstrap trust issues fixed** — config-derived dependency names/versions are validated before path use, and package-manager auto-switch bootstrapping now only trusts approved registry/config sources.

**TLS and quarantine handling improved** — pacquet now honors `NODE_EXTRA_CA_CERTS`, while macOS imports strip Gatekeeper quarantine from native binaries so verified artifacts stay usable.

**Policy and audit correctness** — exact-version policy exclusions now merge correctly, `pnpm audit` handles cyclic graphs safely, and `audit --fix` writes canonical merged exclusion entries.

### SBOM and package metadata grow up
**More useful SBOM output** — `pnpm sbom` gained per-package output via `--out`/`--split`, optional peer exclusion, and issue-tracker references from `bugs` URLs.

**Node package maps introduced** — installs now write `.package-map.json` and expose experimental flags to inject package maps into Node scripts, enabling early experimentation with Node’s package map feature.

### Pacquet keeps closing the parity gap
**More CLI coverage** — the Rust implementation added pnpm-style reporter output, `why`, `create`, `restart`, `stop`, `cat-file`, and better support for hosted git specs and Windows/WSL shims.

**Install/runtime behavior tightened** — fresh-lockfile builds now run lifecycle scripts, `--ignore-scripts` is supported, warm side-effects caches restore overlays, and hoisted installs better match pnpm’s version selection.

### Other misc changes
- Deterministic peer reuse and transitive peer propagation fixes.
- Global virtual store bookkeeping and stale symlink cleanup.
- PR/CI automation updates, release 11.8.0, and assorted docs/tests/refactors.
