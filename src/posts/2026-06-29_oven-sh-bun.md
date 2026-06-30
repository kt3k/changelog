---
date: 2026-06-29
repo: oven-sh/bun
size: L
title: "Bun lands stream, WebSocket, and runtime fixes"
excerpt: "Major runtime polish: HTMLRewriter refactor, stream/error semantics, WebSocket delivery fixes, Buffer bounds parity, and more."
commits: 18
authors: [robobun, Jarred-Sumner, pxseu]
commit_authors: {"86d32c8": robobun, "d843870": robobun, "daa4473": robobun, "a0f922a": robobun, "0640273": robobun, "f789198": robobun, "20d649f": robobun, "e323e73": robobun, "a401ba3": robobun, "15a5926": robobun, "c6c4210": robobun, "d1e8adf": robobun}
---

### **HTMLRewriter switches to the Rust lol_html crate** (86d32c8)
Bun’s HTMLRewriter was refactored to use `lol_html` directly instead of going through its C API, cutting out a large FFI layer and a lot of unsafe binding code. This is a substantial internal simplification that should make the HTML stack easier to maintain and safer to evolve.

### **Streams now reject, not throw, when already errored** (d843870)
The `Bun.readableStreamTo*` helpers now return rejected promises for already-errored streams instead of throwing synchronously. That aligns them with the rest of the API surface and prevents `.catch()` handlers from being bypassed.

### **Bun.color now treats 24-bit number inputs as opaque** (daa4473)
Number inputs like `0xff0000` now serialize with an opaque alpha channel instead of being treated as fully transparent. This fixes a user-visible mismatch between `Bun.color` output and the documented behavior.

### **Buffer.from(arrayBuffer, byteOffset, length) matches Node bounds rules** (a0f922a)
Bun now mirrors Node’s handling of fractional, negative, NaN, and out-of-bounds offsets/lengths when slicing an `ArrayBuffer`. This closes a compatibility gap for code that computes defensive lengths and expects empty views rather than exceptions.

### **stringWidth ignores bidi controls and invisible format chars** (0640273)
`Bun.stringWidth` now counts bidi control characters and other invisible format characters as zero-width, matching terminal width expectations. That improves TUI layout for text containing RTL markers and similar formatting code points.

### **FormData multipart serialization now normalizes lone CR/LF** (f789198)
Multipart form-data encoding now follows the spec more closely by normalizing lone CR and LF to CRLF for names and string values before escaping. This fixes malformed serialization differences that could affect interoperability with servers.

### **Linux fs.watch now emits the missing self-delete rename events** (20d649f)
On Linux, Bun now delivers both self-events when a watched path is deleted, including the basename for the watched file or directory. That brings `fs.watch` closer to Node/libuv behavior for an important edge case.

### **WebSocket publish() works from sockets with no subscriptions** (a401ba3)
A socket that has never subscribed to anything can now still call `publish()` and deliver to other subscribers, instead of silently no-oping. This fixes a real messaging bug in Bun.serve WebSocket servers.

### **WebSocket unsubscribe() no longer drops queued publish() messages** (e323e73)
Queued publishes are now delivered even if a socket unsubscribes from its last topic in the same tick. The fix preserves messages that had already been accepted by the publish path, avoiding silent loss.

### **Shell IOWriter stops accepting chunks after fatal write errors** (15a5926)
After a fatal write failure, the shell writer now rejects new enqueued chunks instead of letting them pile onto a dead writer. This closes a state-machine hole that could surface in fault/fuzz scenarios.

### **console.table only reads getters once per cell** (c6c4210)
`console.table` and `Bun.inspect.table` now format each cell exactly once, matching Node and avoiding duplicate getter invocations. That removes a subtle correctness issue for objects with observable getters or custom inspect behavior.

### **node:dgram now throws ERR_SOCKET_DGRAM_NOT_RUNNING after close()** (d1e8adf)
Several `dgram.Socket` methods now check for a closed socket up front and throw the proper Node error code instead of an internal TypeError. That tightens API compatibility and improves error clarity after shutdown.

### Other misc changes
- Docs updates: base64 guide, runtime docs, and “Bun is written in Rust” wording.
- `bun pm pack --quiet` no longer prints a leading newline.
- `bun-plugin-svelte` test loosened to avoid pinning wrapper syntax.
- `bun_core::strings` alias cleanup and related internal refactors.
- Formatter/config/test maintenance around the lol_html migration and assorted docs tweaks.
