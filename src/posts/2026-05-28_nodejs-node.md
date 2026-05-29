---
date: 2026-05-28
repo: nodejs/node
size: M
title: "QUIC error codes, HTTP/2 ordering, more"
excerpt: "QUIC gets proper failure codes, HTTP/2 session close ordering is fixed, and stream/share iteration plus test runner coverage improve."
commits: 12
authors: [mcollina, trivikr, pimterry, legendecas, aduh95, joyeecheung, RafaelGSS, Renegade334, junius-sec]
commit_authors: {"e1ae3a5": pimterry, "5174c66": trivikr, "d854212": joyeecheung, "bac704d": mcollina, "d8ac301": junius-sec}
---

### **QUIC failures now surface proper error codes and messages** (e1ae3a5)
QUIC session, stream, and writer failures now map to structured Node errors instead of generic transport/application messages, with decoded error names and peer reasons attached when available. This should make QUIC failures much easier to diagnose and assert in tests.

### **HTTP/2 client requests now fail asynchronously when sessions die** (bac704d)
`ClientHttp2Session.request()` no longer throws immediately for destroyed/closed sessions; it defers those failures onto the returned stream so request retries from callbacks can run without tripping synchronous exceptions. The session close path also now emits errors before close, aligning event order with the updated behavior.

### **Concurrent `share()` reads are serialized** (5174c66)
Overlapping `next()` calls on a shared async iterator now resolve in request order instead of racing each other. That fixes a real consumer ordering bug for stream iteration and reduces the chance of skipped or prematurely terminated reads.

### **ESM snapshot loading is eager now** (d854212)
The ESM loader now eagerly imports its cache/job helpers so they can be captured in the snapshot instead of being lazily required at runtime. This trims runtime bytecode noise and should make startup behavior a bit more consistent.

### **SQLite changeset application gets a corrupt-input fix** (d8ac301)
Node picks up a SQLite backport that avoids binding NULL old-values while applying malformed UPDATE changesets, preventing a bad session payload from slipping through incorrectly. The added test confirms malformed changesets now surface `SQLITE_CORRUPT` as expected.

### Other misc changes
- Build tweak: scope `NODE_USE_NODE_CODE_CACHE` to `node_mksnapshot` only.
- Docs updated for `git node land` security-release flow.
- Added an ESLint rule for aborted `AbortController` usage.
- Test updates for QUIC abort/error handling and stream-close behavior.
- Added `vfs` subsystem label metadata.
- Test runner coverage now ignores erased TypeScript lines.
- Minor net pipe error-path test adjustment.
- Permission docs note dropped `--experimental` wording.
