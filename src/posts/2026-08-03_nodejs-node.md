---
date: 2026-08-03
repo: nodejs/node
size: L
title: "Crypto, SQLite and TLS fixes land"
excerpt: "Several security-relevant bug fixes shipped alongside a shared library cross-compile fix and a major SQLite session safety patch."
commits: 27
authors: [trivikr, aduh95, greenheadHQ, mcollina, panva, Renegade334, RafaelGSS, pimterry, PickBas, Rawal27]
commit_authors: {"f00fb75": trivikr, "745d896": mcollina, "a937758": panva, "b6a9111": panva, "dbfdac3": PickBas, "d2e4682": trivikr}
---

### **SQLite sessions are now invalidated correctly on close** (f00fb75)
Closing a `DatabaseSync` now deletes attached session wrappers instead of only freeing the native SQLite handles. That prevents reopened databases from leaving stale session objects behind and crashing when their methods are called.

### **TLS SNI callbacks now select the right certificate** (745d896)
The SNI path now clears existing certificates before loading the callback-provided secure context, so credentials from the default context can't leak through when a different key type is selected. This fixes incorrect certificate presentation for HTTPS/TLS servers using `SNICallback`.

### **OpenSSL error details are preserved for KDF failures** (a937758)
Argon2, HKDF, PBKDF2, and scrypt failures now keep the underlying OpenSSL error stack instead of returning bare errors. The updated tests assert the specific OpenSSL error codes/messages, improving debuggability for crypto failures.

### **Argon2 now respects FIPS and OpenSSL config** (b6a9111)
Argon2 only creates a private OpenSSL library context when it actually needs multithreaded derivation, and availability is checked against the default context first. That closes a gap where Argon2 could bypass FIPS mode and `--openssl-config`.

### **Zero-byte broadcast writes no longer bypass backpressure** (d2e4682)
The stream broadcast iterator now treats empty chunks as no-ops, preventing `write('')`/`writev([])` from accumulating unbounded buffered entries without consuming byte budget. This fixes a backpressure hole in the internal broadcast stream implementation.

### **Shared-library cross-compilation is fixed** (dbfdac3)
The build tooling for generating node definitions was adjusted to work correctly during shared-library cross-compiles. That unblocks a build configuration that previously failed.

### Other misc changes
- Documentation updates and typo fixes across QUIC, test runner, security release process, and other API docs.
- CI/workflow dependency bumps: actions/stale, setup-python, CodeQL actions, sccache-action, install-nix-action, harden-runner, scorecard-action.
- ESLint/tooling dependency updates in `tools/eslint`.
- Changelog/version entry updates for 26.6.0 and 24.19.0.
- Test flake fixes for debugger and REPL coverage.
- Doc type-map reference cleanup.
