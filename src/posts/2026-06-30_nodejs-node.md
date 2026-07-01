---
date: 2026-06-30
repo: nodejs/node
size: M
title: "Dgram speeds up IP sends, plus bug fixes"
excerpt: "Node.js fixed a datagram lookup inefficiency, repaired finalization cleanup and recursive VFS symlink handling, and reverted a broken path change."
commits: 10
authors: [nodejs-github-bot, trivikr, addaleax, BridgeAR, joyeecheung, mcollina]
commit_authors: {"75aec8e": trivikr, "c4429c8": addaleax, "1c12dd6": BridgeAR, "ea60060": mcollina, "f2f241a": trivikr}
---

### **Datagrams now skip redundant DNS lookups for literal IPs** (1c12dd6)
`dgram` no longer calls `dns.lookup()` for addresses that are already literal IPs of the socket family, which removes avoidable overhead on every send. The change keeps the async callback contract by deferring completion to the next tick, and preserves custom lookup behavior.

### **Finalization cleanup no longer drops live refs** (75aec8e)
`process` finalization tracking now uses identity-based `SafeSet` collections instead of arrays, so add/remove/emptiness checks line up with how refs are tracked. This fixes a cleanup bug where removing a collected ref could splice away later live refs too.

### **VFS recursive readdir stops following symlink cycles** (ea60060)
The in-memory VFS now tracks the active recursive traversal path and bails out when it encounters a directory symlink cycle. That preserves symlink entries in listings while preventing infinite recursion across sync, promise, and `withFileTypes` modes.

### **Broadcast.from() now normalizes byte-like inputs** (f2f241a)
`stream` broadcast now routes non-Broadcastable inputs through `from()`, so strings and ArrayBuffer views are treated as byte inputs rather than generic iterables. This tightens input handling and aligns validation/tests with the intended behavior.

### **Reverted a broken Windows path normalization fix** (c4429c8)
Node backed out the reserved-name normalization change because it landed without green Jenkins and was breaking subsequent builds. This restores the prior `path` behavior until the fix can be reintroduced safely.

### Other misc changes
- Added a first-time contributor guide and linked it from contribution templates/docs.
- Updated bundled deps: nghttp3, sqlite, and googletest.
- Refreshed nixpkgs in tooling.
