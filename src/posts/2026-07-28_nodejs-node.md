---
date: 2026-07-28
repo: nodejs/node
size: L
title: "Net promises land, SQLite and VFS updated"
excerpt: "New experimental net/promises API, a VFS lchown fix, WebIDL-order URLPattern results, and an SQLite 3.53.4 bump."
commits: 6
authors: [Ethan-Arrowood, jean-michelet, lluisemper, nodejs-github-bot, Archkon, trivikr]
commit_authors: {"6d8baea": Ethan-Arrowood, "b4bbb12": Archkon, "b2a024b": trivikr}
---

### **Experimental `net/promises` API added** (6d8baea)
Node now exposes `node:net/promises` and `net.promises`, bringing promise-based `connect()` and `listen()` helpers to the `net` module. This also adds async-iterator support on servers so incoming sockets can be consumed with `for await...of`, which simplifies one-shot connection workflows.

### **`lchown` now updates symlink metadata in VFS** (b2a024b)
The virtual filesystem’s `lchownSync()` path now routes through dedicated lchown handling instead of following the target like `chownSync()`. That fixes symlink ownership updates across the VFS implementation, including the memory provider and async handler.

### **URLPattern result properties now follow WebIDL order** (b4bbb12)
`URLPatternResult` and `URLPatternComponentResult` are now constructed in lexicographical member order, matching WebIDL requirements. This is a public-shape fix for result objects and the added test locks down the new property order.

### Other misc changes
- SQLite updated to 3.53.4 (1 commit)
- `--disable-warning` documentation marked stable
- fs docs now link MDN for explicit resource management
