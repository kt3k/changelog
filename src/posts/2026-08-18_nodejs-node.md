---
date: 2026-08-18
repo: nodejs/node
size: M
title: "Buffer UTF-8 writes get faster on two-byte strings"
excerpt: "Node speeds up UTF-8 encoding and decoding paths, plus a SQLite statement cache refactor and several docs/test updates."
commits: 15
authors: [codebytere, soreavis, RafaelGSS, Cherry, cookesan, edemaine, leah-1ee, chasetonco, inoway46, geeksilva97, panva, nodejs-github-bot, trivikr]
commit_authors: {"55e4ca3": codebytere, "e19c13b": codebytere, "cf30b2e": geeksilva97}
---

### **Buffer UTF-8 writes now use simdutf for two-byte strings** (55e4ca3)
Node’s Buffer write path now uses simdutf for well-formed two-byte UTF-16 strings instead of routing everything through V8’s slower UTF-8 writer. That should speed up `Buffer.from()`, `buf.write()`, `fs.write*()` with string data, and stream writes when the input is guaranteed to fit.

### **StringDecoder UTF-8 decoding now shares StringBytes::Encode** (e19c13b)
`string_decoder` now uses the same simdutf-backed conversion logic as `Buffer#toString('utf8')`, which should bring ASCII, Latin-1, and UTF-16 inputs onto the faster path. Large invalid inputs still preserve the old `ERR_STRING_TOO_LONG` behavior and replacement-character handling.

### **SQLite statements reuse cached column names** (cf30b2e)
`statement.all()` and `statement.get()` now reuse cached, internalized column names instead of re-interning them on every call. This trims repeated work in the sqlite binding and should help statement-heavy workloads.

### Other misc changes
- Docs clarified `fs.Dirent` type detection, `copyFile` symlink behavior, Windows `setRawMode` write access, per-architecture FFI argument limits, and missing return types in `fs.md`/`buffer.md`.
- Fixed man-page generation on Windows and updated the security release prep command.
- Bumped `undici` in `/tools/doc` and updated vendored googletest.
- Adjusted tests for WPT backend checks and the event loop delay timer race.
