---
date: 2026-05-06
repo: denoland/std
size: M
title: "Timer types fixed for canary compatibility"
excerpt: "A repo-wide typing cleanup updates timer handles to work with canary return types, touching async helpers, CLI widgets, and testing utilities."
commits: 1
authors: [tomas-zijdemans]
commit_authors: {"a496da2": tomas-zijdemans}
---

**Timer handle typings updated for canary compatibility** (a496da2)
The day’s change replaces several hard-coded `number` timer IDs with `ReturnType<typeof setTimeout>` / `setInterval` or removes unnecessary annotations entirely. This keeps async utilities, CLI progress/spinner helpers, and testing time mocks compatible with canary timer return types without changing runtime behavior.

### Other misc changes
- Type-only cleanup across multiple timer-related files (`async/*`, `cache/ttl_cache.ts`, `cli/*`, `testing/*`, `toml/_parser_test.ts`)
- Documentation example updated in `testing/README.md`
