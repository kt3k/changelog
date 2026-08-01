---
date: 2026-07-31
repo: microsoft/typescript-go
size: S
title: "Composite mapper allocations trimmed"
excerpt: "A small checker optimization avoids building temporary composite mappers during type instantiation, reducing allocation overhead."
commits: 1
authors: [jakebailey]
commit_authors: {"5b1047d": jakebailey}
---

### Other misc changes
- Avoid temporary composite mapper allocations in the checker’s object type instantiation path (#4798) (5b1047d).
- Added a helper to map a type through two mappers without eagerly combining them, preserving behavior while cutting intermediate work.
