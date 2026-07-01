---
date: 2026-06-30
repo: pnpm/pnpm
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "pnpm hardens security while the Rust CLI reaches parity"
excerpt: "June focused on security hardening, faster/more deterministic installs, and a huge expansion of pacquet/pnpr command parity."
commits: 402
---

### Security and trust boundary hardening
**Signature verification and safer bootstraps** — pnpm started verifying Node.js runtime downloads and package-manager binaries, hardened package-manager bootstrap metadata, blocked untrusted env expansion into auth/registry settings, and tightened trust-aware lockfile handling.
**Path, auth, and integrity fixes** — The month closed multiple traversal and escape issues around env lockfiles, patch removal, reserved bin names, hoisted alias joins, staged tarballs, and patch/build approvals. pnpr also hardened registry auth, tarball integrity, and route separation.
**TLS and store trust** — pacquet gained `NODE_EXTRA_CA_CERTS` support, and read-only store installs became possible with `--frozen-store`.

### Install speed, determinism, and reliability
**Faster repeat and cold installs** — pnpm/pacquet added lockfile reuse, smarter freshness checks, parallel tarball extraction/CAS writes, better warm/cold linking, higher default network concurrency, and faster metadata parsing off the reactor thread.
**More deterministic output** — Lockfile emission was repeatedly aligned with pnpm byte-for-byte: canonical map ordering, exact YAML writer parity, preserved integrity on tarball re-resolve, and several peer/dedupe fixes to reduce machine-dependent churn.
**Better install correctness** — Fixes landed for optional deps with missing platform metadata, local file dependencies and lockfile-only changes on repeat installs, workspace state races, Windows shutdown hangs, and partial virtual-store recovery.

### Rust pnpm/pacquet command parity jumps forward
**Major CLI surface expansion** — pacquet gained `run`, `exec`, `dlx`, `create`, `restart`, `stop`, `why`, `audit` (with fix/ignore), `config`, `pack`, `publish`-adjacent flows like `dist-tag`, `link`/`unlink`, `prune`, `fetch`, `cache`, `cat-file`, `cat-index`, `find-hash`, `bin`, `repo`, `ping`, `docs/home`, `deploy`, `setup`, `with`, `logout`, `set-script`, `import`, and `dedupe`.
**Dependency editing and publishing parity** — `add`, `remove`, `update`, `outdated`, `patch`, `patch-remove`, `patch-commit`, `approve-builds`, `ignored-builds`, `rebuild`, `pack-app`, `publish` batching, and catalog/save-catalog flows were all fleshed out. The Rust CLI now handles much more of day-to-day pnpm usage.
**Global and workspace workflows** — Global package management, recursive/filter handling, deploy safety checks, dry-run install, `--ignore-scripts`, `--save-prefix`, `--trust-lockfile`, and setup/bootstrap flows all moved closer to pnpm behavior.

### pnpr architecture and deployment shifts
**Server simplification and performance** — pnpr moved from inline install delivery toward resolve-only streaming, added gzip/NDJSON protocols, conditional GET revalidation, streaming tarball serving, and a one-round-trip cold path for installs.
**Storage/auth rework** — Hosted packages can now live in S3-compatible object storage, proxy cache and published-package storage were split, auth storage became backend-selectable, bearer auth replaced request-time Basic auth, and resolver/cache auth became stricter.
**Operational maturity** — The server gained registry/resolver toggles, better benchmarking, Docker image publishing, musl builds, and new deployment options across SQLite/Postgres/MySQL/libsql backends.

### Other misc changes
**Docs, CI, and release plumbing** — Numerous benchmark, release, and CI workflows were updated; docs were refreshed around parity, security, and setup; and the Rust port began shipping as `pnpm`/`@pnpm/exe` on the v12 next channel.
**Small fixes and polish** — Commit-message hooks, reporter output, Windows path handling, package-map generation, SBOM enhancements, audit improvements, and assorted test/manifest bumps rounded out the month.
