---
date: 2026-04-13
repo: oven-sh/bun
size: M
title: "Bundler etags fixed; mimalloc bumped"
excerpt: "HTML import manifests now revalidate correctly across rebuilds, mimalloc moves to dev3, and several flaky tests were rooted out."
commits: 3
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"ccbaed9": Jarred-Sumner, "f7e9441": dylan-conway, "d35774f": dylan-conway}
---

### **Bundler: fix stale HTML-import etags across rebuilds** (d35774f)
HTML chunk manifests now derive their etag from the placeholder hash that includes referenced chunk paths, instead of the isolated hash that could stay stable when child JS/CSS changed. This prevents `Bun.serve` from 304-ing to a cached HTML body that points at chunks no longer served, which could leave rebuilt pages blank.

### **Mimalloc upgraded to dev3 with allocator integration changes** (ccbaed9)
Bun bumped its vendored mimalloc to a newer dev3 snapshot, bringing upstream thread-safety fixes and the 1025th-heap initialization bugfix. The integration also adjusts macOS zone setup and allocator wiring so Bun can keep using mimalloc safely across platforms and architectures.

### **Root-cause fixes for 7 flaky tests** (f7e9441)
Several CI flakes were fixed in the tests themselves by making them wait on the real async signal or by exercising the failing path deterministically. The changes target race-prone cases in chunked trailing headers, fetch upgrade handling, terminal subprocess output, and a couple of Bun internals tests.

### Other misc changes
- Dependency bumps / build config updates for mimalloc
- AArch64 baseline allowlist updates
- Test expectation and timing adjustments across bun/http, bun:jsc, terminal, and fetch suites
