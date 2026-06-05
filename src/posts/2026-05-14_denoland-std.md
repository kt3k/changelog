---
date: 2026-05-14
repo: denoland/std
size: M
title: "YAML parser speeds up mapping writes"
excerpt: "A YAML perf tweak replaces slow property definition with direct assignment, while preserving safe handling of `__proto__` and adding regression tests."
commits: 1
authors: [tomas-zijdemans]
commit_authors: {"5ea9159": tomas-zijdemans}
---

### **YAML mapping creation gets a faster write path** (5ea9159)
The YAML loader now uses direct property assignment for ordinary mapping keys instead of `Object.defineProperty`, which should reduce overhead in V8 during parse/merge operations. It keeps the slower descriptor-based path only for `__proto__` to avoid prototype pollution, preserving the same observable property shape for normal keys.

### Other misc changes
- Added regression tests covering `__proto__` handling in parsed mappings and merge keys.
