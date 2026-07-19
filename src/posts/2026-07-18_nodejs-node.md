---
date: 2026-07-18
repo: nodejs/node
size: L
title: "REPL overhaul, stream fix, and API bug fixes"
excerpt: "Node switches REPL internals to inspector, fixes a stream stall and Map comparison bug, and adjusts http2 socket proxy behavior."
commits: 6
authors: [avivkeller, MahinAnowar, Trott, bitpshr, mcollina, greenheadHQ]
commit_authors: {"4f844f4": avivkeller, "39f427d": MahinAnowar, "9df0e9b": bitpshr, "fb5d01f": mcollina}
---

### **REPL now uses inspector instead of vm** (4f844f4)
Node’s REPL internals were overhauled to run through the inspector path rather than `vm`, removing the `--experimental-repl-await` flag and making top-level `await` always on. The change also updates REPL completion/eval handling and associated docs/errors, so this is a meaningful behavior and API shift for users of the interactive shell.

### **Stream piping recovers after a destination errors** (39f427d)
`Readable.pipe()` now always runs the drain cleanup when a destination has pending await-drain bookkeeping, instead of gating on `needDrain`. This fixes a stall where one synchronously failing pipe destination could leave the source paused forever and starve the remaining destinations.

### **Deep equality no longer throws for Maps with null keys** (9df0e9b)
`assert.deepStrictEqual`, `assert.notDeepStrictEqual`, and `util.isDeepStrictEqual` now handle the case where a `Map` contains a `null` key alongside object-key comparisons without crashing. That turns a TypeError into a correct comparison result for a subtle but real edge case in Map equivalence.

### **http2 socket proxy can be destroyed safely** (fb5d01f)
Calling `destroy()` on `http2session.socket` now destroys the session instead of throwing `ERR_HTTP2_NO_SOCKET_MANIPULATION`. The proxy behavior and docs were updated accordingly, which closes a long-standing rough edge for code that expects a socket-like destroy path.

### Other misc changes
- Comment/doc typo fixes and wording cleanups (2 commits)
