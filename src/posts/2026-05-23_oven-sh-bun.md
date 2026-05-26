---
date: 2026-05-23
repo: oven-sh/bun
title: "node:crypto compatibility nears completion"
excerpt: "Sample article. More node:crypto APIs land, closing a long-standing compatibility gap."
commit_count: 11
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **`node:crypto` KeyObject and X25519 support added (9ad3e71)**
`createPublicKey`, `createPrivateKey`, and X25519 key exchange now work,
unblocking several popular auth and JWT libraries that previously failed under
Bun.

### Other misc changes
- Bump TypeScript types to 5.9 (1 commit)
- Fix flaky Windows file-watcher test (e22b40a)
- Minor docs and changelog updates (3 commits)
