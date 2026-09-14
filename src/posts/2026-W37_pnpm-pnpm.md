---
date: 2026-09-13
repo: pnpm/pnpm
period: weekly
slug: 2026-W37
period_label: "Sep 7–13, 2026"
size: L
title: "pnpm hardens installs and expands pnpr registry features"
excerpt: "This week brought major pnpr auth/OCI upgrades, several install/security fixes, and a broad Rust style/cleanup push."
commits: 130
---

### **pnpr becomes a real hosted registry platform**
pnpr added OIDC sign-in and keyless publishing, plus much broader OCI support: push/pull, referrers, blob mounts, ranged reads, pagination, and resumable S3/offline GC operations. Registry config also got more structured with ecosystem-scoped registries and a browsable directory/search endpoint, making hosted npm, Cargo, PyPI, and OCI registries easier to operate and navigate.

### **Security and correctness fixes landed across extraction, shims, and installs**
pnpm patched several high-impact safety issues, including tarball/runtime extraction hardening against symlink tricks, safer copy/import paths, and POSIX shim helper lookups that no longer trust PATH. It also tightened global bin mutation on partial reads and fixed a number of install-time correctness bugs around ignored optional deps, CA handling, update behavior, dedupe selection, and Ctrl+C shutdown.

### **Performance work focused on warm installs and large workspaces**
Warm restore/install paths were trimmed by deferring unnecessary store verification, reusing global virtual-store metadata, and skipping redundant writes. Git-based dependencies now deduplicate checkout acquisition per install, Cargo installs reuse workspace metadata and can vendor git-pinned crates, and lockfile hashing now uses less memory.

### **Resolver, workspace, and registry routing behavior got cleaned up**
This week also fixed workspace peer resolution, preserved version operators and prefixes during updates, restored `pnpm t`/`pnpm tst`, and improved native workspace discovery so excluded Cargo/Python projects stay out of generated config. Config handling became more consistent too, with `updateConfig` seeing resolved settings and node download mirrors now configurable globally or via env.

### **Other misc changes**
- Rust internals saw several refactors, including splitting Python install logic into its own crate and tightening nesting/field/method-chain style rules.
- CI, workflow, and formatting tooling were updated, including committed Cargo source config and a pnpm-managed rustfmt setup.
- Added new native build targets and assorted dependency, lockfile, docs, and test updates.
