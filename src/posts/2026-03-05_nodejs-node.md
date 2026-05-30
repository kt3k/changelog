---
date: 2026-03-05
repo: nodejs/node
size: M
title: "Node 22.22.1 lands UTF-8 fix"
excerpt: "A UTF-8 stream corruption bug is fixed, alongside release-note updates and lint dependency bumps."
commits: 4
authors: [mcollina, aduh95, marco-ippolito]
commit_authors: {"8edeff9": mcollina, "4431abc": aduh95}
---

### **Fix UTF-8 partial writes in fast-utf8-stream** (8edeff9)
`Utf8Stream` now backs up to a valid UTF-8 boundary when a partial write splits a multi-byte character, preventing dropped CJK bytes and broken emoji/surrogates. A new regression test covers both sync and async partial-write paths.

### **Publish 22.22.1 LTS release notes** (4431abc)
The v22 LTS changelog was updated for the 22.22.1 release, including the stable status change for `--heapsnapshot-near-heap-limit` and the latest root certificate updates. This is mostly release-management work, but the CLI stability note is user-visible.

### Other misc changes
- Lint toolchain bumps in `tools/eslint` (2 dependency updates).
