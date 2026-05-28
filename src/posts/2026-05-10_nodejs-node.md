---
date: 2026-05-10
repo: nodejs/node
size: S
title: "Docs cleanup and SEA platform clarification"
excerpt: "Mostly documentation cleanup, plus a clarification that SEA on macOS x64 isn’t supported."
commits: 3
authors: [aduh95, mokashang]
commit_authors: {"e15f905": mokashang}
---

### Other misc changes
- Documentation cleanup across many API pages: removed obsolete eslint magic comments and fixed code-snippet inconsistencies (2 commits).
- Clarified SEA platform support to note macOS arm64 only; x64 remains unsupported and skipped in CI (e15f905).
- Broke out a few example-style fixes in docs, including JSON/code fence corrections and small snippet rewrites.
