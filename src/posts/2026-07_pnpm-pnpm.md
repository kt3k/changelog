---
date: 2026-07-31
repo: pnpm/pnpm
period: monthly
slug: 2026-07
period_label: "July 2026"
size: L
title: "pnpm’s Rust CLI nears parity with a big release push"
excerpt: "July brought native release/versioning, registry management, security hardening, faster resolution, and major workspace/install parity fixes."
commits: 482
---

### Native CLI parity and new commands
July was dominated by the Rust CLI gaining major pnpm surface area. New native commands landed for **publish**, **pkg**, **view**, **ci**, **search/find**, **licenses**, **install-test**, **clean/purge**, **owner/owners**, **team**, **access**, **unpublish**, **stage**, and **peers/check**, while existing flows like `login`, `add`, `update`, `rebuild`, `dlx`, and `runtime set` were filled out with pnpm-compatible flags, aliases, and output. The N-API side also expanded, with a new engine wrapper and config reader for embedders, plus support for workspace linking, build tracking, and config access.

### Release, versioning, and monorepo workflows were overhauled
Release management moved much closer to a single native flow. pnpm added **`change`** and **recursive versioning**, improved changelog handling so notes are composed at publish time, and tightened release automation around draft release verification, tarball checks, provenance signing, and safer self-update/version switching. Workspace release flows also gained changeset generation, from-git versioning, npm-style bump support, and better handling of `publishConfig.name`, first-release versions, and multi-tag publishes.

### Resolver, install, and lockfile correctness got a big sweep
A large chunk of the month focused on correctness in resolution and install behavior. Fixes covered peer dependency hoisting and cycles, exact-pin preservation, git/specifier normalization, lockfile freshness, missing versions, bundled deps, optional deps, workspace filter ordering, recursive installs with dedicated lockfiles, `--frozen-lockfile` edge cases, and global virtual store behavior. pnpm also fixed broken lockfile recovery, preserved workspace links during partial re-resolution, improved repeat installs, and aligned lifecycle-script selection and shell handling more closely with the TypeScript CLI.

### Security and auth were hardened
Several security-related fixes landed around path traversal, untrusted config expansion, tarball verification, and auth flows. pnpm now rejects crafted names and segments that could escape the virtual store or `node_modules`, blocks proxy env expansion from repo-controlled config, tightens tarball integrity checks, and hardens web auth/login/self-update behavior against malicious registries and project-controlled config. Registry tokens, trusted updates, and auth URL handling also got safer and more consistent.

### Performance and reporter quality improved
Resolver performance saw meaningful gains, especially for large workspaces and offline/cached metadata paths. pnpm reduced repeated packument parsing, shrank in-memory metadata retention, sped up peer resolution and multi-selector add flows, and fixed a tarball cache wakeup race. Reporter output was also cleaned up throughout the month: lifecycle streaming, redraw behavior, prompts, summaries, stats, and license/dedupe output all became more stable and less noisy.

### Other misc changes
- Windows install/symlink/junction handling was repeatedly hardened.
- Global install/bootstrap and `pnpm setup` flows were fixed.
- CLI parsing/parity gaps were closed for flags like `--no-*`, `--if-present`, `--parallel`, `--silent`, and `-v`.
- CI, release, and benchmark workflows were updated extensively.
- Numerous tests and fixtures were added or repaired across resolver, workspace, registry, and reporter paths.
