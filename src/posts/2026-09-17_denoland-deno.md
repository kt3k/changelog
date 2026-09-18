---
date: 2026-09-17
repo: denoland/deno
size: M
title: "Deno forwards v2.9.7 to main"
excerpt: "Release-forward commit updates versioning, releases, and CI cache keys for v2.9.7."
commits: 1
authors: [denobot]
commit_authors: {"abd2207": denobot}
---

### **Forward v2.9.7 release commit to main** (abd2207)
This change syncs main with the v2.9.7 release state, updating version metadata, release notes, Cargo manifests, and generated CI config. It also bumps CI cache key prefixes from 124 to 125 so old caches won’t be reused across the release boundary, which helps avoid stale build/test artifacts.

### Other misc changes
- Release metadata and version files updated across the workspace.
- Cargo.toml/Cargo.lock and multiple crate manifests refreshed for the release.
- Generated CI workflow cache key prefixes bumped across Linux/macOS jobs.
