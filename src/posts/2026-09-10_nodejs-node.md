---
date: 2026-09-10
repo: nodejs/node
size: L
title: "Crypto fast-paths and startup entropy shift"
excerpt: "Major EC crypto export/import optimizations, a safer V8 entropy source, and a Stop() termination fix headline the day."
commits: 16
authors: [panva, jasnell, codebytere, pipobscure, joyeecheung, inoway46, mcollina, colinhacks, trivikr]
commit_authors: {"0de4fcc": codebytere, "45b4ef2": panva, "bd4f1dc": panva, "7ac27d4": panva, "050a87d": panva, "f372a89": panva, "43d3fe9": colinhacks, "bd9d82d": trivikr}
---

### **Fix Stop() termination from leaking into the next Environment** (0de4fcc)
`Stop()` now cancels any pending isolate termination when an Environment is being freed, preventing the next Environment on the same isolate from being killed before its first script runs. This fixes a subtle lifecycle bug that showed up after uncaught exceptions or idle embedder shutdowns.

### **Speed up EC JWK export/import and key detail lookups** (7ac27d4, bd4f1dc, 050a87d, f372a89, 45b4ef2)
EC key handling was refactored to read curve metadata, public coordinates, private scalars, and signature sizing directly from provider-backed key parameters instead of reconstructing EC objects. That cuts redundant work across JWK export/import, raw export, key detail reporting, and signature sizing, with new benchmarks and regression tests covering the optimized paths.

### **Seed V8 from the OS CSPRNG and avoid startup DRBG churn** (43d3fe9)
Node now feeds V8 entropy from `uv_random()`/the OS source instead of going through OpenSSL’s DRBG, which avoids extra provider initialization on startup and improves `node -e 0` hot-path behavior. The change also preserves early failure when crypto seeding is actually unavailable and keeps the legacy-provider behavior working.

### **Track SQLite user-defined functions for correct cleanup** (bd9d82d)
SQLite-backed JS functions and aggregates are now tracked per `DatabaseSync` instance and untracked on destruction or close. This tightens resource accounting, avoids stale registrations, and makes database teardown safer around deferred SQLite cleanup.

### Other misc changes
- WebCrypto brand-check hardening and internal receiver-check refactor
- Buffer UTF-16LE odd-length decoding fix
- Windows test shim update replacing WMIC
- Commit queue error summary matching fix
- C++ symbol resolution skipped in a tick-processor test
- Bench CLI test split to reduce flakiness
- Rust toolchain bump in CI workflows
- Added a new triager entry in the README
