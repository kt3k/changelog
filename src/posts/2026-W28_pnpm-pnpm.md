---
date: 2026-07-12
repo: pnpm/pnpm
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: L
title: "pnpm adds native release management and registry ops"
excerpt: "Rust and TypeScript CLI parity expanded with workspace release flows, team management, plus several security and peer-resolution fixes."
commits: 72
---

### Major new CLI capabilities
**Native workspace release management arrives** — `pnpm change` and `pnpm version -r` now provide built-in release-intent and version-bumping flows for monorepos, including dependency propagation, fixed groups, filters, changelogs, caps, and dry-run support.

**Registry team management is now built in** — A new `team` command landed for creating, listing, modifying, and deleting npm registry teams/memberships, with scoped-registry handling and JSON/parseable output.

**Pacquet keeps filling out core command parity** — The Rust CLI gained `pkg`, `search`, `access`, `login/adduser`, and a fuller `stage` flow, moving it much closer to pnpm’s TypeScript command set and making it increasingly usable for real registry and release workflows.

### Security, correctness, and install behavior
**Multiple traversal and trust-boundary fixes** — pnpm and pacquet now reject crafted names/path segments that could escape the virtual store or `node_modules`, block env expansion in workspace proxy config, and tighten git build-approval matching.

**Peer resolution is stricter and less error-prone** — Fixes landed for peer-context leakage, peer hoisting choosing incompatible versions, and cross-pass peer-dependency deadlocks, reducing the chance of subtly broken installs.

**Lockfile and optional-dependency handling improved** — Optional deps that fail re-resolution now error instead of silently disappearing, and injected workspace deps serialize more cleanly when aliases match package names.

**Self-update and standalone downgrade paths were hardened** — Version switching, trust-policy checks, cached-slot recovery, and downgrade handling for standalone `pnpm`/`@pnpm/exe` all got fixes to make upgrades and downgrades more reliable.

### Performance and cache improvements
**Resolver memory use was reduced** — The npm resolver no longer retains raw registry response bodies for the entire resolution phase, which should help on large cold-cache installs.

**Cache and runtime handling got smarter** — `pnpm cache delete` now clears all metadata cache directories, runtime tarballs persist synthesized manifests for warm installs, and `runtime:` saves now pin the resolved Node version.

### Other misc changes
**CLI/runtime polish** — Added `--store-dir` support, improved `pn` completion coverage, accepted more real-world flag positions, fixed workspace filtering/listing edge cases, and expanded tests/CI coverage across the new Rust and registry code paths.
