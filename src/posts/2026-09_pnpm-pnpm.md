---
date: 2026-09-30
repo: pnpm/pnpm
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "pnpm expands to multi-ecosystem workflows and safer installs"
excerpt: "September brought Cargo/PyPI/OCI support, pipeline orchestration, and many install/security/perf fixes."
commits: 1091
---

### **Multi-ecosystem support became a major theme**
Cargo and Python moved from experimental edges into first-class workflows: `pnpm add` learned `crate:` and `pypi:`-style inputs, installs can resolve and lock Cargo/Python deps, Python environments can be created, shared, and stored centrally, and pnpr grew Cargo/PyPI/OCI registry support plus multi-ecosystem publish flows. OCI registry operations, OIDC/keyless publishing, and cargo compiler cache sharing also landed, turning pnpr into a much broader registry/runtime platform.

### **Install, resolve, and workspace performance improved materially**
A lot of the month went into shaving install latency and reducing repeated work in large monorepos: lockfile parsing/rendering was parallelized, workspace discovery and resolver hot paths were trimmed, warm restores skip redundant relinking and verification, Git checkouts are deduplicated, and hoisted/global installs avoid redoing work when nothing changed. `pnpm pipeline` also arrived with task graphs, caching, and reporting, extending pnpm into CI orchestration.

### **Security and correctness hardening across shims, tarballs, and stores**
Several important security/robustness fixes landed, including tarball/runtime extraction symlink hardening, POSIX shim PATH-hijack protection, safer store pruning and blob verification, and stricter network handling in pnpr. Windows and cross-platform filesystem behavior was also hardened with better shim generation, path normalization, lock retries, signal handling, and permissions preservation.

### **Publishing, deploy, and lifecycle behavior got sharper**
`pnpm publish`, `pack`, `deploy`, `remove`, `update`, and `install` picked up a long list of correctness fixes: scoped registry routing, bundled deps with isolated linker, availability waiting, lifecycle hook ordering, uninstall hooks, package.yaml support, and better handling of injected/workspace dependencies. New controls like `--allow-build`, `autoDedupe`, `--save-types`, and improved release-age behavior give users more policy and reproducibility options.

### **Other misc changes**
- `pnpm import`, `audit`, `outdated`, `dedupe`, `sbom`, `version`, `config`, and `exec` saw many bug fixes and parity tweaks.
- Global/runtime shim migration and self-update compatibility were repeatedly cleaned up across pnpm 11/12 transitions.
- Numerous docs, CI, release-packaging, and Rust-style refactors landed throughout the month.
