---
date: 2026-08-13
repo: oven-sh/bun
size: L
title: "Bun fixes worker, HTTP, install, and TLS bugs"
excerpt: "A strong maintenance day: several user-facing correctness fixes landed across workers, serve, install, networking, and URL handling."
commits: 38
authors: [robobun, alii, Jarred-Sumner, dylan-conway, cirospaciari]
commit_authors: {"18391f6": dylan-conway, "508ee60": alii, "c080470": alii, "ada9163": Jarred-Sumner, "40546a0": Jarred-Sumner, "04148c8": Jarred-Sumner, "bdb7382": robobun, "e83105e": robobun}
---

### **Worker stdout/stderr now flush correctly on sync exit** (18391f6)
Bun now preserves buffered `process.stdout`/`process.stderr` output when a worker exits synchronously, matching Node behavior for `process.exit()`, uncaught exceptions, and unhandled rejections. It also honors `exitCode` changes made inside `'exit'` listeners before the final exit path runs.

### **Unicode 16 URL/IDNA behavior now comes from bundled ICU** (04148c8)
Bun removes its bespoke Unicode 16 IDNA pre-pass and bumps the bundled ICU data to 78 so the parser itself produces the updated mappings. This reduces maintenance risk and makes `new URL()`, host/hostname setters, and `domainToASCII/Unicode` rely on the same underlying tables.

### **`Bun.serve` rejects HTTP/1.0 `Transfer-Encoding`** (bdb7382)
The server now rejects `Transfer-Encoding` on HTTP/1.0 requests instead of accepting chunked framing and decoding the body. That closes a protocol-compliance hole that could enable request-smuggling-style behavior.

### **`sql.unsafe()` now supports named parameters in SQLite** (e83105e)
SQLite `unsafe()` queries can now bind named parameters from an object, instead of silently returning no rows for that input shape. The public SQL API and docs were updated alongside regression coverage.

### Other misc changes
- Sourcemap parse-failure bookkeeping cleanup and regression coverage (508ee60)
- Postgres request counter bookkeeping refactor (c080470)
- WebSocket terminate fix for dead `wss://` peers (ada9163)
- Mimalloc fork sync and Android TLS crash fix (40546a0)
- Dependency/hash/install/build/test maintenance and assorted bug fixes across filesystem, resolver, spawn, crypto, TLS, HTTP/2, macOS symbols, Windows handle inheritance, and fake timers (28 commits)
