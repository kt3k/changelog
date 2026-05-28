---
date: 2026-04-10
repo: nodejs/node
size: L
title: "SQLite serialization lands; watch and stream fixes"
excerpt: "Adds sqlite serialize/deserialize APIs, fixes watch-mode ENOENT crashes, and patches a webstreams unhandled rejection."
commits: 15
authors: [panva, aduh95, nodejs-github-bot, efekrskl, thisalihassan, Han5991, Rohan5commit, JamieMagee, pimterry, ronag]
commit_authors: {"726b220": efekrskl, "4a41a00": thisalihassan, "20cacec": Han5991, "4dc18ef": ronag}
---

### **SQLiteSync gains serialize/deserialize APIs** (4a41a00)
`DatabaseSync` can now serialize an in-memory database to a `Uint8Array` and deserialize it back into a live connection. This enables cloning, snapshots, and transfer of databases without filesystem I/O.

### **watch() no longer crashes on missing --env-file-if-exists** (726b220)
`fs.watch()` and watch mode now expose a `throwIfNoEntry` option, defaulting to `true`, with Linux-specific handling for missing env files. The fix prevents a crash when the file is absent while keeping the existing error behavior configurable.

### **Fix unhandled rejection in Web Streams fromWeb adapters** (20cacec)
`Writable.fromWeb()` and `Duplex.fromWeb()` no longer assume `_writev()` errors are arrays, avoiding a `TypeError` when destruction races with batched writes. This closes a crashy unhandled-rejection path in cork/uncork flows.

### **Fix pause/resume on destroyed readable streams** (4dc18ef)
`Readable.prototype.pause()` and `.resume()` now become no-ops after destruction instead of re-entering stream state transitions. That avoids spurious events and aligns the API with destroyed-stream behavior.

### Other misc changes
- OpenSSL upgraded to 3.5.6, including generated arch/config updates and test expectation adjustments.
- Nix/V8 build stability improvements and backport script tweaks.
- WPT runner/status updates, CODEOWNERS change for QUIC, and minor docs/test cleanup.
