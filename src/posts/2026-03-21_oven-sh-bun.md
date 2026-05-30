---
date: 2026-03-21
repo: oven-sh/bun
size: M
title: "WebKit bump and FFI crash fixes"
excerpt: "Bumped WebKit and shipped two FFI crash fixes plus safer FD validation for huge floats."
commits: 6
authors: [robobun, dylan-conway]
commit_authors: {"69e92c7": robobun, "8f0fd0c": robobun, "70a2a77": robobun}
---

### **Safer FFI symbol validation and cleanup** (70a2a77)
`Bun.FFI.viewSource()` now rejects non-object symbol descriptor values up front instead of crashing on primitive values like numbers, strings, or booleans. The change also deinitializes `arg_types` when symbol maps are cleared, fixing a likely resource leak during cleanup.

### **FFI linkSymbols now errors on primitive property values** (8f0fd0c)
`Bun.FFI.linkSymbols()` now throws a TypeError when a symbol property value is not an object, rather than hitting a debug assertion failure. This closes a crash path for malformed FFI inputs and makes the API fail predictably.

### **FD validation no longer panics on huge floats** (69e92c7)
`FD.fromJSValidated` now checks the float range before converting to `i64`, preventing panics when a user passes extremely large finite floats like `1e308`. That fixes crashes in APIs such as `S3Client.write` and keeps out-of-range file descriptors returning a normal range error.

### Other misc changes
- Bumped WebKit to `b55703a58c8e57ac3479b9ba5cd434386a298965` (1 commit)
- Cron docs formatting/admonition cleanup (3 commits)
