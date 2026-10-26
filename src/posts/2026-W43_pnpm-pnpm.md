---
date: 2026-10-25
repo: pnpm/pnpm
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: L
title: "pnpm tightens installs, deploys, and pnpr backend plumbing"
excerpt: "A packed week of install correctness, faster linking, reproducible deploys, and major pnpr storage/auth/API changes."
commits: 172
---

### Install correctness and performance got a broad upgrade
**Install, repeat-install, and validation were unified**: `run`/`exec`/`restart` now forward install flags into `verifyDepsBeforeRun`, frozen installs catch more stale transitive local deps, and repeat-install freshness checks were tightened across workspace scenarios.
**Fast paths improved**: bin linking now uses precomputed metadata during extraction, workspace discovery became a single-pass walk, and cold installs/`pnpm fetch` no longer stall downloads while APFS linking runs.
**Several hard-to-debug install bugs were fixed**: `pnpm add` now preserves the exact resolved version for tags/ranges, mutating commands refuse incompatible `node_modules` layouts, `git` deps rebuild in every slot they’re linked into, and `workspace:` resolution/injected-package behavior was corrected.

### Workspace maintenance and package management behavior matured
**Prune, patch, dedupe, and why were made more reliable**: `pnpm prune` now actually removes extraneous deps and respects filters/workspace modes, patch flows work in `sharedWorkspaceLockfile: false` setups, `dedupe` refreshes stale registry metadata, and `why` reads the right lockfile per project.
**Global and local config handling was tightened**: global installs now use the global virtual store, `login` writes tokens back to `auth.ini`, `--env-file` is supported, and several ignored or misread config values (`tag`, `strictSsl`, `localAddress`, `runtime`, etc.) were fixed.
**`pnpm pack`/`publish` got more consistent**: file selection rules were unified, numeric brace ranges are now expanded, and `pnpm.config` is preserved in published tarballs.

### Deploy and store behavior became more reproducible and safer
**Deploy now carries its own settings and preserves links**: deployed trees retain workspace settings, dependency resolutions, internal symlinks, and reproducible bookkeeping via `SOURCE_DATE_EPOCH`.
**Store and importer security got harder**: `store prune` is resilient to symlink swaps, tar extraction now fails fast on rejected paths, and import locking was simplified to reduce lock-file churn.
**Hoisted/split-lockfile edge cases were fixed**: filtered hoisted installs preserve unselected groups, symlinked `node_modules` roots are accepted, and `pnpm why`/patch/deploy flows behave better with `sharedWorkspaceLockfile: false`.

### pnpr saw major backend, auth, and storage work
**Storage and routing were substantially redesigned**: pnpr now uses readable on-disk package paths, per-ecosystem namespaces, new tarball/revision routes, and registry-aware lockfile keys; `serverType: pnpr` is now recognized.
**Auth and startup are more robust**: OIDC workload issuers no longer need an authorization endpoint, libsql auth uses pooled/reused connections with timeouts and retries, and token last-used updates were moved off the request path.
**Metrics and config are more controlled**: metrics now require explicit configuration, secrets/config validation is stricter, and protocol/versioning changes landed alongside `pnpr serve`.

### Other misc changes
- Native binary/runtime and signing dependency updates, including a newer standalone Node.js bundle and p256 bump.
- `pnpm setup`/docs/CI/test fixture updates across the workspace.
- Small fixes for licenses, help output, macOS permissions, signal handling, and miscellaneous resolver/hook edge cases.
