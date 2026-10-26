---
date: 2026-10-25
repo: nodejs/node
size: L
title: "OpenSSL overhaul, sqlite fixes, VFS polish"
excerpt: "Node drops legacy OpenSSL 1.x/engine support, tightens FIPS/build rules, and ships notable sqlite, stream, and VFS fixes."
commits: 19
authors: [panva, lazerg, araujogui, christianaurichzm, aduh95, mcollina, nodejs-github-bot, TrevorBurnham, trivikr]
commit_authors: {"d630b5d": lazerg, "a2cd8aa": panva, "21cfb2a": panva, "8be36fb": panva, "85bfe9a": panva, "34e3b90": panva, "e20da72": araujogui, "c7ae7ab": christianaurichzm, "60e6c84": mcollina, "45ae12c": TrevorBurnham, "cfb2de3": trivikr}
---

### **Node removes legacy OpenSSL engine/backend support** (a2cd8aa)
Node.js now drops the ENGINE-based crypto/HTTPS/TLS APIs, native bindings, and implementation paths entirely, and explicitly fails former engine options instead of silently ignoring them. This is a major compatibility break for old OpenSSL integrations, but it aligns Node with OpenSSL 4’s removal of engines and clarifies the deprecation path for DEP0183.

### **FIPS support is simplified to provider-based OpenSSL builds** (21cfb2a)
The bundled FIPS-provider build machinery is removed, and `--openssl-is-fips` is now only valid with `--shared-openssl`. The docs and configure logic now reflect that Node can use an externally provided FIPS-capable OpenSSL provider, but does not build or validate its own FIPS module.

### **Node requires OpenSSL 3+ and trims legacy OpenSSL branches** (34e3b90, 8be36fb, 85bfe9a)
The build now rejects shared OpenSSL 1.x early, while the crypto codebase sheds a large amount of OpenSSL 1.x-era compatibility logic and switches remaining version checks to backend-specific guards. This is a substantial refactor that reduces backend ambiguity, keeps BoringSSL support explicit, and standardizes on the supported OpenSSL 3/provider model.

### **sqlite backup() is hardened against type confusion** (e20da72, d630b5d)
`backup()` now verifies its source is actually a `Database`, closing a type-confusion hole that could be reached by passing a `Statement` or `Session`. Backup steps also retry on busy/locked conditions, improving resilience under contention.

### **VFS path encoding now behaves consistently** (c7ae7ab)
`readlink()`, `realpath()`, and `mkdtemp()` on mounted VFSs now honor encoding options consistently, including `'buffer'` and non-default encodings. This fixes cases where the VFS would previously ignore the requested encoding or return the wrong type/path.

### **TransformStream preserves async context across parked writes** (60e6c84)
Writes resumed after backpressure now continue in the writer’s async context rather than the reader’s. That makes the web streams implementation match the spec’s backpressure reaction semantics and fixes context leakage in `transform()`/`flush()` chains.

### **diagnostics_channel no longer dangles native bindings** (45ae12c)
The diagnostics channel binding now detaches channel back-pointers during teardown, and sqlite’s trace channel is downgraded to a weak reference. This prevents native holders from reading freed binding state during environment cleanup, closing a shutdown-time crash hazard.

### **sqlite virtual table cleanup now matches iterator semantics** (cfb2de3)
Virtual table iterators are no longer asked to run `return()` after they have already been exhausted, and invalid iterator protocol cases now drop the iterator so it won’t be closed later. This avoids spurious failures from custom iterables with throwing cleanup logic.

### Other misc changes
- OpenSSL/FIPS docs and error text updates
- Legacy OpenSSL 1.x test cleanup and coverage pruning
- googletest dependency update
- libuv 1.53+ test adjustment for blocklist
