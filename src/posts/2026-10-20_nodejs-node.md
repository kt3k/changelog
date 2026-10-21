---
date: 2026-10-20
repo: nodejs/node
size: L
title: "Security-heavy day with zlib API expansion"
excerpt: "Node ships a new crc32c API, blocks revoked TLS intermediates, and pulls in multiple security-dependent updates."
commits: 18
authors: [nodejs-github-bot, aduh95, HoonDongKang, UlisesGascon, RafaelGSS, nigrosimone, mcollina, ryanaslett, pipobscure, efekrskl]
commit_authors: {"6698675": mcollina, "3e5c8af": nodejs-github-bot, "ae22341": aduh95, "d9a3f3d": UlisesGascon, "5a566ac": nigrosimone, "df2ea49": pipobscure}
---

### **Add `zlib.crc32c()` for CRC-32C checksums** (df2ea49)
Node.js now exposes `zlib.crc32c(data[, value])`, adding a Castagnoli-polynomial checksum API alongside `crc32()`. This is useful for protocols and formats that require CRC-32C, and the implementation is backed by new docs, tests, benchmarks, and binding updates.

### **Block compromised TLS public keys during certificate verification** (d9a3f3d)
TLS verification now rejects certificate chains containing a compiled-in blocklist of SubjectPublicKeyInfo SHA-256 hashes, covering compromised intermediates that would otherwise still validate under the Mozilla root store. This is a security hardening change that closes a revocation gap in Node’s default trust model.

### **Update bundled c-ares to 1.34.9, a security release** (3e5c8af)
Node pulls in c-ares 1.34.9, which is explicitly a security release with multiple memory-corruption, use-after-free, and DNS validation fixes. This directly affects DNS resolution behavior and significantly reduces exposure to resolver-side vulnerabilities.

### **Refresh root certificates to NSS 3.131.1** (ae22341)
The embedded root store is updated to NSS 3.131.1, and several emSign roots are removed. This keeps Node’s trusted CA set aligned with upstream Mozilla data and reflects certificate trust changes.

### **Make `node::MakeCallback` cheaper on the hot path** (5a566ac)
The callback path now avoids unnecessary context entry and trims async-context bookkeeping overhead when nothing changes. This is a performance-focused internal optimization that should shave costs from common addon and callback flows.

### **Use `AsyncLocalStorage` in the test runner** (6698675)
The test runner replaces an `async_hooks`-based ownership map with `AsyncLocalStorage` for tracking the current test context. That simplifies the harness and removes a bespoke async hook setup, which should make the runner more robust.

### **Other misc changes**
- Updated sqlite to 3.54.1 and simdjson to 5.0.5.
- Added support work for c-ares’ Apple availability checks.
- QUIC, permission, inspect, ffi, and build/tooling tweaks.
- Test fixture and WPT updates; OpenSSL test matrix restored on nix-based CI.
