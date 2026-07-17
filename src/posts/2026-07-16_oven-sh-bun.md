---
date: 2026-07-16
repo: oven-sh/bun
size: L
title: "TOML rewrite lands; cron and buffers hardened"
excerpt: "Major parser/API additions plus fixes for cron overflow, fs mkdir on Windows, buffer limits, tty raw mode, and more."
commits: 36
authors: [robobun, cirospaciari, Jarred-Sumner, dylan-conway]
commit_authors: {"3903978": robobun, "4951445": robobun, "7246266": robobun, "8215078": robobun, "dc5748f": robobun, "57e30a5": cirospaciari, "f6f22f1": cirospaciari, "e8404c1": robobun, "a85068c": robobun, "8c170f6": robobun, "2f5e810": robobun, "299cdaf": robobun, "8a68c60": robobun, "000407f": robobun, "7340e5d": robobun, "6ad467f": robobun, "aca54d5": dylan-conway, "0ecd508": robobun, "4bbe075": cirospaciari, "adbaf41": robobun, "57f349f": robobun, "2f4f45e": robobun, "fbe467c": robobun, "c4fad46": robobun, "075f56c": robobun, "36364f7": robobun, "10ff028": robobun, "3057da0": robobun, "d29b050": Jarred-Sumner, "d93b4cc": robobun, "a754790": cirospaciari, "f6f1523": robobun, "7c78335": robobun, "6173d64": robobun}
---

### **Bun.TOML is now a full v1.1.0 parser with stringify** (aca54d5)
Bun replaces its old TOML implementation with a spec-exact v1.1.0 parser and adds `Bun.TOML.stringify()`. The new API supports the official conformance suite, broader input types, and clearer errors, which is a meaningful upgrade for config-heavy apps.

### **Bun.cron.parse now rejects out-of-range `from` values safely** (dc5748f)
`Bun.cron.parse()` now validates `from` against the ECMAScript Date range instead of only checking non-finite numbers, preventing a crash/abort path from extreme inputs. It also returns `null` when the next match would fall outside representable time instead of producing an invalid date.

### **node:fs writev/readv now chunk at IOV_MAX like libuv** (e8404c1)
Vectored I/O no longer fails as soon as the buffer array exceeds the platform iovec limit. Bun now batches writes and truncates reads to match libuv behavior, fixing compatibility for code that relies on large `readv`/`writev` calls.

### **node:http2 fixes cross-session corked-frame bleed** (a85068c)
Corked HTTP/2 frames are now kept per session instead of leaking between connections. This addresses a Windows CI backpressure regression and fixes a subtle transport-layer correctness issue.

### **Buffer offsets/toString/write stop wrapping at 2^32** (36364f7)
Buffer validation and string/write paths now carry `size_t` through instead of truncating to 32 bits. That fixes incorrect empty-string results and out-of-range behavior for extremely large buffers near 4 GiB.

### **Tty raw mode is tracked per handle, not per process** (3057da0)
`setRawMode()` now preserves state per `tty.ReadStream`, matching libuv’s per-handle behavior. This avoids one stream silently forcing another stream back to cooked mode and breaking interactive apps.

### **Error.captureStackTrace now matches V8’s property semantics** (8215078)
Captured `.stack` is installed as a non-enumerable property, including on plain objects. That brings Bun in line with Node/V8 and avoids surprising object serialization behavior.

### **Mach-O compile templates are validated before growth** (8c170f6)
The Mach-O packer now checks that the template’s `__BUN` segment is actually in-bounds before doing size arithmetic, and it rejects shrinking templates rather than panicking. That turns a crashy path in `--compile` into a proper error.

### **node:http/https/http2 compatibility jumps again** (4bbe075)
Bun syncs the upstream Node v26.3.0 HTTP suites and lands a large set of transport fixes across HTTP, HTTPS, and HTTP/2. Compatibility moves materially closer to Node’s behavior across teardown, TLS, and socket-handling edge cases.

### Other misc changes
- node:dgram suite/compat sync and UDP internals updates (57e30a5)
- node:crypto suite sync and compatibility fixes (f6f22f1)
- wrapAnsi/sliceAnsi formatting edge-case fixes (000407f, 299cdaf, 2f5e810)
- fs.mkdir Windows read-only directory fix (3903978)
- child_process stdin EPIPE handling cleanup (075f56c)
- worker/timer/leak and race fixes; test timeout adjustments (c4fad46, d93b4cc, fbe467c)
- parser/lexer test expectation and error-message fixes (57f349f, f6f1523, 7c78335, a754790, 6173d64)
- terminal write/drain behavior fix and related typings (2f4f45e)
- buffer signal/string-object assertion fixes (4951445)
- misc build/dependency/test maintenance (0ecd508, d29b050, 7340e5d, 6ad467f, 10ff028, 8a68c60, adbaf41, 7246266)
