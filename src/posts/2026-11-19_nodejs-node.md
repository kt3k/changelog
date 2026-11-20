---
date: 2026-11-19
repo: nodejs/node
size: L
title: "Node 15.8 lands with crypto, HTTP2, and V8 work"
excerpt: "Major V8 bump plus new HTTP/2 callbacks, crypto API cleanup, SSRF hardening, and several correctness fixes."
commits: 42
authors: [legendecas, panva, joyeecheung, inoway46, pimterry, mcollina, Ethan-Arrowood, araujogui, martenrichter, farisbasha, vladfrangu, gurgunday, aduh95, jackyzha0, targos, Manishearth, Renegade334, ronag, MikeMcC399, trivikr, vedchaudhari]
commit_authors: {"3c26849": panva, "17443a3": panva, "b85995c": panva, "c54c948": panva, "360bd63": panva, "f0eb690": araujogui, "eda8de7": pimterry, "42800b6": vladfrangu, "db671bb": pimterry, "88b034f": Ethan-Arrowood, "f442b5a": inoway46, "585e39e": legendecas, "0402a6f": joyeecheung, "16a3a6a": joyeecheung, "92ca838": Manishearth, "57e6b3c": joyeecheung, "cb5e7a8": joyeecheung, "441a758": legendecas, "8a0a9da": legendecas, "c3db6d5": legendecas, "ecb98ee": legendecas, "c91d8aa": Renegade334, "029acbf": ronag, "d9e18d5": trivikr, "c47b8d8": mcollina, "cdd0687": vedchaudhari, "371ac09": inoway46, "3f61461": inoway46}
---

### **V8 15.8 update and ABI refresh** (ecb98ee, 441a758, c3db6d5, 8a0a9da, 57e6b3c, cb5e7a8, 92ca838, 585e39e, 0402a6f, 16a3a6a)
Node is now aligned with V8 15.8.62.44, including a NODE_MODULE_VERSION bump to 155 and a set of build/dependency adjustments needed to keep the embedder toolchain and V8 patches compiling cleanly. This is the biggest change of the day and will matter to native addon maintainers and anyone tracking V8/ABI compatibility.

### **HTTP/2 gains callback support for informational responses** (f442b5a)
`writeContinue()`, `writeEarlyHints()`, `writeInformation()`, and `http2stream.additionalHeaders()` now accept optional callbacks that fire when the `HEADERS` frame is actually written, or on error. The compat API now matches HTTP/1 behavior more closely, which helps code that depends on write completion semantics.

### **Crypto options and provider handling were substantially reworked** (360bd63, c54c948, 17443a3, 3c26849, b85995c)
The crypto stack was refactored to use provider/settable parameter descriptors for digests, MACs, signatures, and cSHAKE-style options, with clearer docs and expanded native coverage. It also tightens XOF length error handling and standardizes how required vs optional parameters are validated, so the public API behaves more predictably across backends.

### **`http2` stream close/read behavior is fixed for clean resets and buffered data** (eda8de7, db671bb, 88b034f)
HTTP/2 streams now preserve readable data after a clean close/reset instead of turning it into premature-close errors, and a separate fix prevents early stream destruction from taking down an entire H3 session. These are correctness fixes for real-world request/response teardown races.

### **URL-to-options conversion no longer copies transport options from duck-typed objects** (c47b8d8)
`urlToHttpOptions()` now only carries over own enumerable properties from genuine WHATWG `URL` instances, not arbitrary URL-shaped objects. That closes an SSRF footgun where attacker-controlled objects could smuggle `socketPath`, `method`, `headers`, or `agent` into an HTTP request.

### **TLS and socket teardown are safer after fatal errors** (371ac09, 3f61461)
Fatal TLS failures now destroy sockets in a way that preserves connection details for error handlers while preventing stale handles from being accessed during close. This fixes crash-prone edge cases around post-error cleanup and handshake failure reporting.

### **OS and filesystem APIs get correctness fixes and a new exported helper** (42800b6, d9e18d5, f0eb690, cdd0687, c91d8aa, 029acbf)
`os.guessFileDescriptorType()` is now public, and a handful of smaller but user-visible bugs were fixed in vfs, sqlite, abort-signal handling, and fs promises error stacks. These are mostly targeted correctness and ergonomics improvements rather than major API shifts.

### Other misc changes
- Documentation updates for crypto, QUIC, V8 maintenance, and SEA links.
- Build/tooling tweaks for Windows, GHA, Rust backtrace crates, and V8 GN scraping.
- Misc test updates and removals, including deprecated V8 behavior cleanup.
- Buffer BigInt accessor benchmark/runtime optimization.
- Source map trailing-segment bug fix.
