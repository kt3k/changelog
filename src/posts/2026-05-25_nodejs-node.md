---
date: 2026-05-25
repo: nodejs/node
size: L
title: "Permission model goes stable, plus a V8 bump"
excerpt: "Sample article. The --permission model is unflagged, and V8 updates bring faster array ops."
commit_count: 18
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **Permission model unflagged — now stable (f3a91c4)**
`--permission` with `--allow-fs-read`, `--allow-fs-write`, and `--allow-net`
graduates from experimental. Process-level sandboxing no longer prints a
stability warning.

### **V8 updated to 13.6 (a0c7e89)**
Brings faster `Array.prototype` iteration and improved `Map`/`Set` memory
layout. Embedders should note one removed deprecated API (see the commit).

### **Security: fix path traversal in the fs permission checks (CVE pending) (b51d0aa)**
Symlinks could escape an allowed directory under the permission model. The
checker now resolves the real path before authorizing access.

### Other misc changes
- deps: upgrade `undici` to 7.x (2 commits)
- test: deflake several parallel HTTP/2 tests (4 commits)
- doc: clarify `node:test` mocking API (3 commits)
- build: update CI to Clang 19 (2 commits)
