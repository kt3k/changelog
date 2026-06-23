---
date: 2026-06-22
repo: nodejs/node
size: M
title: "Blob streaming, stream aborts, and libffi 3.6"
excerpt: "Adds Blob.textStream(), improves stream abort handling, and bumps Node’s bundled libffi to 3.6.0 with related fixes."
commits: 11
authors: [trivikr, KhafraDev, anonrig, Han5991, jahanzaib-iqbal-dev, atgreen, nodejs-github-bot, marcopiraccini, louiellan]
commit_authors: {"3d3c7ea": KhafraDev, "db094de": anonrig, "546b596": Han5991, "a0263fe": trivikr, "0dbb5df": trivikr, "e9a9065": atgreen, "d9707af": nodejs-github-bot, "1f806f2": trivikr, "ac6ee05": marcopiraccini}
---

### **Blob gains `textStream()` for UTF-8 reading** (3d3c7ea)
`Blob` now exposes a `textStream()` method that returns a `ReadableStream` of decoded UTF-8 strings, effectively the stream equivalent of `blob.text()`. It’s also wired onto `File`, so callers can consume blob content incrementally without manual `TextDecoderStream` plumbing.

### **TextEncoder.encode() avoids copying source strings** (db094de)
Node’s UTF-8 encoder now inspects V8 string contents directly via `ValueView` instead of first copying them into temporary buffers. That should reduce extra allocations and improve encode performance, especially for larger strings.

### **JUnit reporter now emits suite timestamps** (546b596)
The test runner’s JUnit output now includes standard ISO 8601 timestamps on `<testsuite>` elements. This makes the reporter’s output more compliant and improves CI/test result tooling compatibility.

### **Stream iterators now honor abort signals sooner** (0dbb5df, a0263fe)
Abort handling was tightened in `stream/iter` so pending `next()` calls and `pipeTo()` reads can be interrupted even while waiting on the source. These fixes close real cancellation bugs where an abort could be delayed or ignored until the source produced more data.

### **Debugger startup waits more safely for initial break output** (1f806f2)
The debugger REPL now defers waiting for the initial pause render until that pause is actually observed. This avoids hangs when the target exits early or tests use a minimal mock inspector.

### **Watch mode reports which file triggered a restart** (ac6ee05)
Restart messages in watch mode now include the changed filename, making it easier to understand why the process bounced. It’s a small but practical usability fix when iterating on watched projects.

### **Node bundles libffi 3.6.0** (d9707af, e9a9065)
The vendored `libffi` dependency was updated to 3.6.0, along with a PowerPC/Darwin closure helper fix cherry-picked on top. This is a substantial dependency refresh that can carry platform build/runtime implications, especially for FFI and closure support.

### Other misc changes
- HTTP docs corrected for the `keepAliveTimeout` default
- GCC toolchain docs updated to `gcc-13`/`g++-13`
- Minor libffi release and CI-related upstream churn
