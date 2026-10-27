---
date: 2026-10-26
repo: nodejs/node
size: L
title: "Major engine, OpenSSL, and sqlite updates"
excerpt: "V8 and OpenSSL were bumped, sqlite got a performance fix, and release/docs were updated for the new alpha flow."
commits: 13
authors: [aduh95, nodejs-github-bot, richardlau, RafaelGSS, dualfroz, ravi-arnan]
commit_authors: {"3983092": nodejs-github-bot, "352e814": nodejs-github-bot, "7abbd56": RafaelGSS, "eb663fe": dualfroz, "79239a4": nodejs-github-bot}
---

### **V8 patched to 15.6.75.25** (352e814)
Node now carries a newer V8 patch-level update with a broad set of engine-side changes across parsing, codegen, Maglev, and verifier paths. This is a substantial runtime refresh that can include correctness fixes and behavior changes in JS execution.

### **OpenSSL upgraded to 4.1.0** (79239a4, 3983092)
The bundled OpenSSL sources and generated arch configs were updated to 4.1.0, a major upstream security and feature release. This brings in a large set of TLS/crypto changes and regenerated platform-specific artifacts needed to build against the new upstream.

### **sqlite binding resets now avoid invalidating query plans** (eb663fe)
Node's sqlite binding no longer calls `sqlite3_clear_bindings()` before each execution, because newer SQLite versions can invalidate cached query plans when it does. Instead, only omitted parameters are rebound to `NULL`, which preserves performance and is covered by a new regression test.

### **Release process docs updated for the alpha workflow** (7abbd56)
The release documentation and supporting scripts/workflows were updated to describe the new alpha release process for Node.js 27 and related semver-major handling. This matters for maintainers because it codifies the updated tag/promote flow and keeps automation aligned with the new schedule.

### **Other misc changes**
- Documentation/test housekeeping: doctool generation check, release-changelog/release-npm tests, and a small grammar fix in `typescript.md`.
- Reverts to the earlier doc/build redesign and doc-kit verbosity changes, plus related `tools/doc` dependency lockfile churn.
