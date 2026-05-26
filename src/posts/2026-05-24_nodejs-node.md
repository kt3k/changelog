---
date: 2026-05-24
repo: nodejs/node
size: M
title: "Built-in SQLite gets prepared statement caching"
excerpt: "Sample article. node:sqlite caches prepared statements; plus assorted test and doc fixes."
commit_count: 7
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **`node:sqlite` caches prepared statements (7c2f110)**
Repeated queries with the same SQL text now reuse a compiled statement,
measurably speeding up hot read paths in the built-in SQLite module.

### Other misc changes
- Bump `npm` bundled version (1 commit)
- Fix typo in `process.report` docs (2 commits)
- test: stabilize a timing-sensitive timers test (2 commits)
