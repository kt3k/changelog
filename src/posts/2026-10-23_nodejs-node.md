---
date: 2026-10-23
repo: nodejs/node
size: L
title: "OpenSSL 4.1 prep and test runner guard"
excerpt: "A sizable day with OpenSSL 4.1 plumbing, a new `--test-forbid-only` safeguard, and several build/test fixes."
commits: 18
authors: [panva, aduh95, RafaelGSS, legendecas, lazerg, inoway46, StefanStojanovic, mertcanaltin, joao-oliveira-softtor]
commit_authors: {"b12bad4": panva, "6511fb8": panva, "5741b0e": aduh95, "262e9ac": aduh95, "6353f40": mertcanaltin, "45b6626": joao-oliveira-softtor}
---

### **Prepare the tree for OpenSSL 4.1** (b12bad4)
Node’s OpenSSL update tooling and generated config templates were adjusted ahead of the 4.1 bump, including workflow support for prerelease updates and cleanup rules for regenerated files. This is a broad prerequisite change for the next OpenSSL upgrade, touching the updater script, config generation, docs, and install tooling.

### **Add `--test-forbid-only` to catch exclusive tests in CI** (45b6626)
The test runner now has a new flag and matching `run()` option to fail when `only` tests or `runOnly(true)` are used. That closes a common CI footgun where accidentally committed exclusive tests can hide the rest of the suite.

### **Optimize `TextEncoder.encode()` for short strings** (6353f40)
`TextEncoder.encode()` now uses a reusable scratch buffer for short inputs instead of always going through the slower general path. This should reduce allocation overhead for small strings while keeping behavior covered by new regression tests.

### **Revert the V8 entropy source change** (6511fb8)
Node backs out the change that seeded V8 from the OS CSPRNG instead of OpenSSL’s DRBG, restoring the previous startup entropy behavior. The revert also removes now-obsolete tests and fixtures that depended on the reverted path.

### **Tighten QUIC/DTLS configure validation** (5741b0e, 262e9ac)
Configure now errors out for incompatible QUIC combinations instead of merely warning, and warns on the analogous DTLS mismatch. This makes invalid build configurations fail earlier and more clearly.

### **Add the `--test-forbid-only` docs and API surface** (45b6626)
The CLI, test API, and manpage were updated to document the new option and its `forbidOnly` counterpart. The change also wires the flag through node options so it is available consistently across invocation styles.

### Other misc changes
- Perfetto Windows build/test setup and related trace-event adjustments.
- TLS coalescing test updated for OpenSSL 4.1 behavior.
- Security release steward docs updated.
- Shared Brotli/zlib build fixes and constant-generation cleanup.
- Perfetto/V8 build integration tweaks.
- Test flake fixes and allocation-failure handling updates.
- Misc lint/CI workflow and config-schema/doc updates.
