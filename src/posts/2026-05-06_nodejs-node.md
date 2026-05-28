---
date: 2026-05-06
repo: nodejs/node
size: L
title: "QUIC lands, crypto gets faster, sqlite safer"
excerpt: "Major QUIC implementation work, crypto/webidl performance wins, Promise.race leak fix, and a sqlite backup lifetime fix."
commits: 15
authors: [panva, jasnell, marco-ippolito, aduh95, mcollina, ljharb, RafaelGSS, Anshikakalpana, mertcanaltin, Felipeness]
commit_authors: {"b5da751": mcollina, "0bd46c1": panva, "fa17dc2": panva, "e46e0d1": panva, "1aebbde": Felipeness, "cf91d18": jasnell}
---

**QUIC implementation reaches completion** (cf91d18)
Node.js filled in the internal QUIC stack and expanded the public docs with new endpoint limits and error codes. This is the biggest change of the day: it adds substantial QUIC behavior, documents new stream/session errors, and adjusts the bundled ngtcp2 build setup.

**Crypto/WebCrypto hot paths are faster and more accurate** (e46e0d1, 0bd46c1, fa17dc2)
Several changes tighten WebCrypto behavior and remove allocation-heavy patterns in normalization and Web IDL conversion. `SubtleCrypto.supports()` now returns more precise results for some key/algorithm combinations, while algorithm lookup and converter option handling were optimized for hot paths.

**Promise.race no-op callbacks no longer leak memory** (1aebbde)
Node now filters resolved-after-resolved and rejected-after-resolved promise events in C++ instead of bouncing them into JS. That closes an OOM-prone leak in tight `Promise.race()` loops with immediately settled promises.

**sqlite backup keeps the source database alive** (b5da751)
The sqlite backup job now holds a managed reference to the source `DatabaseSync`, preventing it from being garbage-collected mid-backup. This fixes a use-after-free crash during in-flight backups and adds a regression test that forces GC while a backup runs.

### Other misc changes
- `node:ffi` is now excluded from `builtinModules` unless the feature is enabled.
- Child-process permission flag propagation now handles `--permission-audit`.
- Added documentation-only Hmac.digest deprecation entry.
- QUIC coverage exclusions for non-built files.
- CLI config docs/schema now support version-targeted `node.config.json` configs.
- macOS x64 downgraded to Tier 2; `BUILDING.md` version list removed.
- Minor internal cleanup in `node_task_queue` and `node_task_queue.cc`.
