---
date: 2026-08-26
repo: nodejs/node
size: L
title: "Crypto gets safer, faster, and more correct"
excerpt: "Major crypto hardening and perf work lands alongside an HTTP/2 async-context fix, a glob API enhancement, and a release patch."
commits: 21
authors: [panva, nodejs-github-bot, pimterry, jasnell, JLHwung, ndossche, orgads, mcollina, nhjbest22, christianaurichzm, TheAlexLichter, RafaelGSS, jakecastelli]
commit_authors: {"fe6a4cd": panva, "3541d5d": panva, "13220e2": orgads, "6737aa3": mcollina, "37887a3": pimterry, "a00cf06": TheAlexLichter, "4d95cec": jasnell}
---

### **Crypto X509Certificate internals are hardened** (fe6a4cd)
X509Certificate now builds directly on the native X.509 wrapper with lazy cached values kept in private state, and brand checks were switched to a non-throwing native path. This tightens invariants around subclassing, structured cloning, and receiver validation while preventing internal state from being poked through reflection.

### **Hmac.digest() no longer risks leaking stack memory** (6737aa3)
After an Hmac stream is finalized, a later `digest()` call now returns an empty buffer instead of re-reading freed state. This fixes a real memory-safety bug where uninitialized bytes could be returned after stream use.

### **HTTP/2 preserves AsyncLocalStorage context at end-of-stream** (13220e2)
Trailing-headers end-of-stream handling now runs `stream.push(null)` inside the request async scope, so the `'end'` event fires in the right context. This matters for gRPC-style responses where END_STREAM arrives on trailers, and fixes AsyncLocalStorage context loss.

### **HTTP/2 write deadlock removed for larger windows** (37887a3)
The session-side guard blocking reads while a write is pending was removed because it could deadlock full-duplex traffic under larger window sizes. The change comes with new regression coverage and a benchmark to exercise the path.

### **glob gains a maxDepth option** (a00cf06)
`fs.glob()` now supports limiting traversal depth. That gives callers more control over search scope and can prevent unexpectedly deep or expensive directory walks.

### **crypto key-slot caching is optimized** (3541d5d)
KeyObject and CryptoKey initialization now cache constructor-known slot data earlier and fall back to native lookup only when needed. This reduces overhead on common construction and method paths.

### **perf_hooks histograms can be exported/imported via CBOR** (4d95cec)
Histograms now have a binary interchange format for moving stats across processes or runtimes. Using CBOR keeps the payload compact and avoids adding a new dependency.

### Other misc changes
- Release bumps/changelog updates for v26.8.1, v26.8.0, and v24.20.0.
- Benchmark added for crypto class construction/method paths.
- ESLint concurrency enabled in the build.
- Null checks added for `OPENSSL_INIT_new()`.
- Typings added for the internal permission binding.
- Async context frame activation optimized internally.
- Test flake fixes and coverage additions for WPT, stream iteration, and fastutf8stream.
- Security triage docs clarified.
- Documentation-only updates across HTTP2, perf_hooks, WPT, and other APIs.
