---
date: 2026-08-24
repo: nodejs/node
size: L
title: "Permissions, fs speed, and HTTP/tls fixes"
excerpt: "Node tightened permission checks, sped up UTF-8 file reads and res.end(), and fixed TLS ALPN and Windows realpath bugs."
commits: 12
authors: [RafaelGSS, mcollina, ChocoChip0519, hamidrezaghavami, sankalpsthakur, pimterry, nodejs-github-bot, codebytere, jazelly, dushyant-hada-90, Cherry]
commit_authors: {"18eaa73": RafaelGSS, "f2c7f1b": mcollina, "f509cf1": hamidrezaghavami, "278ead1": sankalpsthakur, "46a7dbd": RafaelGSS, "214cf06": pimterry, "18fb35a": codebytere, "2dbf9d7": jazelly, "5b316e5": dushyant-hada-90, "5e48fb3": Cherry}
---

### **FS UTF-8 reads get a big-file fast path** (18fb35a)
`fs.readFileSync(path, 'utf8')` now switches from repeated 8 KiB appends to a sized heap buffer once a file grows past the initial stack buffer. That should cut syscall count and reallocations dramatically for large files while preserving the old behavior for small ones.

### **HTTP `res.end(data)` is faster for known-length bodies** (214cf06)
Outgoing responses can now finish a single final string/Buffer write without the extra send/tick path when the length is already known. The change is aimed at the common `res.end(body)` case and benchmarks claim up to 9% higher RPS.

### **TLS now rejects malformed ALPN inputs instead of aborting** (278ead1)
`tls.convertALPNProtocols()` validates empty strings, truncated wire-format entries, and zero-length protocol records in JS before the C++ layer sees them. That turns a process-killing abort into a recoverable `ERR_INVALID_ARG_VALUE` and closes a nasty input-validation hole.

### **Windows realpath handles namespaced drive roots correctly** (2dbf9d7)
`fs.realpath()` now uses a regular drive-root spelling only for the root probe, avoiding a Windows path-resolution quirk that stripped the trailing separator from namespaced drive paths. This fixes failures for extended-length paths and long-path entrypoints on Windows.

### **Permission model now covers UDP handle adoption and linked bindings** (18eaa73, 46a7dbd)
Node tightened permission checks around adopting existing UDP handles and loading linked bindings. These changes prevent permission bypasses when a socket or addon is introduced through an API path that previously skipped the expected net/addon gate.

### **TextEncoderStream and `inspect()` got correctness fixes** (f2c7f1b, f509cf1, 5b316e5)
`TextEncoderStream` now encodes whole chunks more efficiently while preserving surrogate-handling behavior across chunk boundaries. Separately, `util.inspect()` allows single-line output when the break length is infinite, and `stripVTControlCharacters()` now strips OSC 8 hyperlinks more reliably.

### **`--run` lists scripts when no command is provided** (5e48fb3)
Running `node --run` without a target now prints available scripts instead of failing silently. That makes the CLI easier to discover and use when a project has defined runnable tasks.

### **Other misc changes**
- Updated AHAFS docs reference link.
- Refreshed WebCrypto WPT fixtures and status files.
- Added/updated tests for the permission, TLS, fs, util, and CLI changes.
