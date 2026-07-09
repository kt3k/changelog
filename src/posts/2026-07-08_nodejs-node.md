---
date: 2026-07-08
repo: nodejs/node
size: L
title: "Crypto backend split, QUIC fixes, and stream perf"
excerpt: "Major crypto backend cleanup plus QUIC correctness fixes, stream iterator behavior tweaks, and a TLS IPv6 SAN bug fix."
commits: 17
authors: [trivikr, nodejs-github-bot, anonrig, sxa, panva, pimterry, npm-cli-bot, martenrichter, MayaLekova, ShogunPanda, JumpLink]
commit_authors: {"1912893": anonrig, "0032189": trivikr, "db7cc5b": panva, "0792ee5": pimterry, "1d87a24": JumpLink, "91b65a4": trivikr}
---

### **Crypto now splits OpenSSL, BoringSSL, and legacy paths** (db7cc5b)
Node’s native crypto layer was reworked to separate OpenSSL 3+, BoringSSL, and older OpenSSL code paths. This is a substantial compatibility/refactor change that also tightens the OpenSSL 3 build by using deprecated-API guards, while preserving ENGINE support in a dedicated compatibility target.

### **QUIC transport logic moved deeper into Session with callback fixes** (0792ee5)
Transport responsibilities were extracted from `Application` into `Session`, shrinking the application layer and consolidating QUIC behavior. The commit also adds a correctness guard after `StreamCommit()` because JS callbacks can destroy the session mid-flow, which matters for stability during packet/session handling.

### **WHATWG stream queues switch to a ring buffer** (1912893)
Readable and writable stream queues were redesigned to use a power-of-two ring buffer instead of array shift/pop semantics. That reduces per-chunk allocation and avoids expensive re-linearization on dequeue, which is a meaningful performance improvement for Web Streams-heavy workloads.

### **TLS now matches IPv6 hosts against IP SANs correctly** (1d87a24)
`checkServerIdentity()` now checks the original hostname for IP-literal matching instead of the IDNA-normalized form, restoring IPv6 `IP Address` SAN verification. This fixes a real certificate-validation regression that could incorrectly reject valid IPv6 connections.

### **Stream merge no longer drains sources while idle** (0032189)
`stream/iter` merge now waits until the consumer resumes before pulling the next item from each source. That prevents unintended eager draining/backpressure violations and aligns the behavior with the expectation that only one item per source is active at a time.

### **`fromSync()` prefers synchronous iterators over async-like extras** (91b65a4)
`fromSync()` now consumes `Symbol.iterator` even if the input also exposes `Symbol.asyncIterator` or `then()`. This is a behavior fix for mixed-protocol inputs, preventing accidental rejection of valid sync iterables.

### Other misc changes
- c-ares bumped to 1.34.8
- npm upgraded to 11.18.0
- QUIC HTTP/3 callback semantics corrected and related shutdown/stream tests adjusted
- Stream/readable-path performance hoists in `readable.js`
- Added FFI `getCurrentEventLoop`
- Release/process docs updated; emeritus collaborator metadata changed; note added about restricted CI
- Increased a flaky HTTP server timeout test
- New module tests for eager imports with `import defer`
- Changelog/versioning updates for 26.5.0
