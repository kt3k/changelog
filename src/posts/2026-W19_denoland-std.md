---
date: 2026-05-10
repo: denoland/std
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: S
title: "Timer typings updated for canary compatibility"
excerpt: "A small maintenance week: std adjusted timer handle typings across async, CLI, cache, and testing helpers to match canary return types."
commits: 1
---

### Compatibility cleanup
**Timer handle typings updated for canary compatibility**
The only code change this week replaced hard-coded `number` timer IDs with `ReturnType<typeof setTimeout>` / `setInterval` or removed unnecessary annotations. This keeps async utilities, CLI spinner/progress helpers, cache TTL logic, and testing time mocks compatible with canary timer return types without affecting runtime behavior.

### Other misc changes
**Type-only cleanup and docs touchups**
Minor type cleanups landed across `async/*`, `cache/ttl_cache.ts`, `cli/*`, `testing/*`, and `toml/_parser_test.ts`, plus a small `testing/README.md` example update.
