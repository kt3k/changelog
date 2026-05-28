---
date: 2026-04-11
repo: nodejs/node
size: M
title: "SQLite and Buffer get faster searches"
excerpt: "Buffer search APIs gain an end bound, while SQLite speeds up ASCII text handling and row key reuse. Streams callback plumbing is simplified."
commits: 3
authors: [ronag, aduh95, thisalihassan]
commit_authors: {"f2fda60": ronag, "0fea430": aduh95, "ef8f8f8": thisalihassan}
---

### **Buffer search APIs now accept an `end` bound** (f2fda60)
`buf.includes()`, `buf.indexOf()`, and `buf.lastIndexOf()` now support an `end` parameter, letting callers limit the search range without creating a subarray first. The implementation and docs were updated across JS, C++, and typings, which makes the search APIs more flexible and can avoid extra allocations.

### **SQLite rows use cheaper strings and cached column names** (ef8f8f8)
SQLite now detects ASCII text and creates one-byte V8 strings when possible, reducing memory overhead for common query results. It also internalizes column names and caches them on `StatementSync`, invalidating the cache on reprepare so repeated `iterate()` calls can reuse row keys more efficiently.

### Other misc changes
- Simplified `createPromiseCallback` in webstreams util (0fea430)
