---
date: 2026-07-05
repo: pnpm/pnpm
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "pnpm adds new CLI commands, faster installs, and safer parsing"
excerpt: "This week brought new commands, workspace/filter fixes, install perf wins, and several CLI compatibility and auth/runtime improvements."
commits: 52
---

### New commands broaden pnpm’s CLI surface
**`repo`, `bin`, `prefix`, `bugs/issues`, `sbom`, and `peers` landed** — pnpm gained several useful commands in one week: opening a package repo, printing bin/prefix paths, generating SBOMs, checking peer dependency problems, and jumping to bug trackers. `issues` now aliases `bugs`.

### Workspace filtering and recursive execution are now much more correct
**Filtered recursive commands finally respect selection and graph order** — `run` and `exec` now narrow execution to selected projects, bare `--filter` promotes recursive mode, and filtered `run`/`exec`/`publish`/`pack`/`rebuild` preserve transitive workspace order. This closes correctness gaps for filtered workspace automation.

### Install and resolver performance improved
**Offline and cold-cache paths got faster** — pnpr now streams tarballs while hashing/caching them, avoids redundant re-hashing and packument parsing on cache hits, and caches metadata in memory for offline/prefer-offline resolution. pnpr’s registry surface was also simplified around mount-driven routing.

### CLI compatibility and parsing got tighter
**pnpm now matches expected flag and version behavior** — `-v` prints a bare version, boolean flags automatically accept hidden `--no-<flag>` forms, and top-level fallback commands now resolve like native pnpm/exec behavior. That reduces breakage for scripts and forwarded commands.

### Auth, runtimes, and policy models advanced
**Web auth and runtime install flows grew up** — the web auth flow was ported into pacquet, non-interactive OTP errors now preserve auth URLs, and global runtime installs work. pnpr also moved through a major registry/package policy model refactor toward RFC-style `registries` and per-registry package maps.

### Important fixes and quality-of-life improvements
**Targeted update, patch, and peer dependency behavior were corrected** — `pnpm up` now re-resolves like a fresh install, patch paths resolve from the lockfile directory, workspace version mismatches show local versions, and a new peer-checking command can fail CI on conflicts. Reporter rendering and lifecycle output were also stabilized.

### Other misc changes
- Registry mock routing/test fixture fixes and broader test coverage
- Release workflow, pack-app, and signing-key handling updates
- Security advisory allowlist updates and dependency/toolchain bumps
- Small docs, CI, and internal refactors
