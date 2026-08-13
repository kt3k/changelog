---
date: 2026-08-12
repo: microsoft/typescript-go
size: M
title: "Memory fix for deprecated property diagnostics"
excerpt: "Typescript-go fixes a contextual property memory regression and tightens diagnostic deduping and lookup behavior."
commits: 1
authors: [jakebailey]
commit_authors: {"34ffe2a": jakebailey}
---

### **Fix deprecated contextual property memory regression** (34ffe2a)
A regression in diagnostic handling was fixed by indexing diagnostics by source file pointer and location, with added deduplication for equal diagnostics at the same spot. The change also updates lookup/sorting paths and adds tests around deprecated contextual property overload behavior, addressing the memory growth without changing the intended diagnostics output.

### Other misc changes
- None
