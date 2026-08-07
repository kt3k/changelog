---
date: 2026-08-06
repo: denoland/deno
size: M
title: "Release automation and bundle deadlock fix"
excerpt: "Updated release tooling for renamed crates and no-verify publishing, plus a bundle-side esbuild client upgrade to fix a protocol deadlock."
commits: 4
authors: [bartlomieju, denobot, nathanwhit]
commit_authors: {"903d670": denobot, "72516b6": bartlomieju, "ec98b03": bartlomieju, "8af9351": nathanwhit}
---

### **Bundle fix: avoid an esbuild protocol deadlock** (8af9351)
Updated `esbuild_client` to 0.7.2, bringing in a protocol-reader/writer deadlock fix. This matters for bundle builds under load, where packet forwarding could stall while response delivery waited on bounded channel capacity.

### **Release tooling now handles renamed crates correctly** (ec98b03)
The version-bump script now special-cases crates like `deno_v8` that are renamed in the root `Cargo.toml`, so release automation can bump their versions without failing on missed manifest entries. That prevents release bumps from getting stuck on dependency declarations that don't match the crate name.

### **Dependency crates are published with `--no-verify`** (72516b6)
Release publishing now skips cargo's standalone tarball verification for dependency crates, while still verifying the top-level `deno` crate. This works around a packaging limitation where these crates can't be built in isolation because engine selection happens only at the workspace top level.

### **Main branch release commit forwarded to sync generated files** (903d670)
Brought the v2.9.5 release commit onto `main`, including the release notes, version files, lockfile updates, and generated CI cache-key refreshes. This is mostly bookkeeping to keep the branch aligned with the tagged release.

### Other misc changes
- CI cache key/version bumps across generated workflows and Cargo metadata (1 commit)
