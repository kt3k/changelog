---
date: 2026-09-04
repo: denoland/deno
size: M
title: "pnpm lockfile import gets a real-world fix"
excerpt: "Deno's pnpm lock importer now handles more lockfile shapes, including pnpm v6 quirks, and skips unsupported dependency specs safely."
commits: 1
authors: [MLuc24]
commit_authors: {"83bb8d5": MLuc24}
---

### **Fix pnpm lockfile import for real-world lockfiles** (83bb8d5)
The pnpm-to-deno.lock importer was reworked to handle several lockfile formats that show up in practice, including pnpm v6 root dependencies and package/snapshot key normalization edge cases. It also now skips unsupported dependency specs more deliberately, which avoids generating malformed entries while preserving the rest of the lockfile conversion.

### Other misc changes
- None; this day consisted of a single substantial importer fix.
