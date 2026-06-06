---
date: 2026-06-05
repo: nodejs/node
size: L
title: "Node fixes addon unload, UTF-8 length, and HTTP idle"
excerpt: "A security-stability day: fixes a worker addon unload crash, speeds Buffer.byteLength on large strings, and closes idle pre-request sockets correctly."
commits: 14
authors: [mohd-akram, addaleax, ndossche, mertcanaltin, semimikoh]
commit_authors: {"be7ea27": mohd-akram, "215027c": addaleax, "25ffc1a": ndossche, "4035c57": mertcanaltin, "d3a822a": semimikoh}
---

### **Worker-safe ObjectWrap cleanup prevents addon unload crashes** (215027c)
`node::ObjectWrap` now registers environment cleanup hooks so legacy addons can be torn down safely in Worker threads and other embedder-controlled Node instances. This fixes a crash where weak callbacks could run after an addon had already been unloaded.

### **Add regression coverage for ObjectWrap in Workers** (be7ea27)
A new addon test reproduces the unload-after-Worker scenario and verifies the fix under GC-triggered teardown. This locks in the crash prevention for the legacy `ObjectWrap` path.

### **Buffer.byteLength gets a SIMD fast path for large UTF-16 strings** (4035c57)
`Buffer.byteLength(..., 'utf8')` now uses simdutf for sufficiently large two-byte strings, while keeping V8's path for small or one-byte inputs. The change also adds tests covering lone surrogates and large mixed inputs to ensure byte counts still match `Buffer.from` semantics.

### **closeIdleConnections now catches pre-request sockets** (d3a822a)
HTTP idle-connection cleanup now tracks sockets that connected but had not yet sent request data, so `server.closeIdleConnections()` can close them too. This fixes a gap that could leave idle pre-request connections hanging open.

### Other misc changes
- SQLite changeset callback lifetime fix (`25ffc1a`)
- GitHub Actions dependency bumps and workflow refreshes (6 commits)
- ESLint toolchain dependency group updates (`26f6c76`)
