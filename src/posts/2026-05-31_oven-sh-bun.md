---
date: 2026-05-31
repo: oven-sh/bun
size: M
title: "Bun adds JSC microbenchmark suite"
excerpt: "New benchmark generators and snippet tests target async module linking, star re-exports, and several core JS operations."
commits: 1
authors: [sosukesuzuki]
commit_authors: {"2629789": sosukesuzuki}
---

### **Added microbenchmarks for recent JSC behavior** (2629789)
Bun added a new benchmark generator plus a suite of snippet benchmarks covering module-loader stress cases, array operations, dates, promises, strings, typed arrays, and object property definition. This gives the team a repeatable way to measure WebKit/JSC regressions and performance changes across Bun releases.

### Other misc changes
- None
