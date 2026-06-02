---
date: 2026-03-24
repo: nodejs/node
size: L
title: "Security fixes land across HTTP, TLS, FS"
excerpt: "Multiple CVEs fixed: header prototype crashes, TLS SNI exception handling, permission gaps, HTTP/2 flow control, and V8 hash collision hardening."
commits: 17
authors: [RafaelGSS, mcollina, joyeecheung, panva, marco-ippolito, juanarbol, aduh95, JLHwung, kovan, nodejs-github-bot]
commit_authors: {"8261536": RafaelGSS, "0d7e4b1": joyeecheung, "b36d5a3": panva, "ef5929b": mcollina, "59c86b1": RafaelGSS, "2e2abc6": mcollina, "dabb2f5": RafaelGSS, "3a04e0f": RafaelGSS, "e4f3c20": RafaelGSS, "7be0e28": marco-ippolito}
---

### **Security release: multiple crash and permission fixes** (7be0e28)
Node.js shipped a security-focused LTS release note summarizing fixes across crypto, HTTP, permissions, TLS, and HTTP/2, including the array-index hash collision hardening. This release marks the day’s main impact and ties together the concrete fixes below.

### **Web Cryptography now uses timing-safe HMAC/KMAC comparison** (b36d5a3)
`memcmp` was replaced with `CRYPTO_memcmp` in the Web Crypto HMAC and KMAC implementations, removing a timing side channel in digest comparison. That’s a meaningful security hardening for cryptographic verification.

### **HTTP/2 now tears down sessions on flow-control overflow** (8261536)
Node now treats `NGHTTP2_ERR_FLOW_CONTROL` as fatal in HTTP/2 frame handling, fixing a case where a connection-level `WINDOW_UPDATE` overflow could leave a session dangling after nghttp2 had already sent GOAWAY. The new regression test confirms the session is destroyed instead of leaking.

### **TLS SNI callback exceptions are now contained** (2e2abc6)
`loadSNI()` now wraps `owner._SNICallback()` in `try/catch` and routes thrown errors through `owner.destroy()` instead of letting them escape as uncaught exceptions. This closes the last gap in the earlier callback-hardening work and prevents a remote client from crashing a TLS server with a bad ClientHello.

### **HTTP header-distinct maps are now prototype-safe** (ef5929b)
`headersDistinct` and `trailersDistinct` now use null-prototype objects, so a received `__proto__` header can’t poison the lookup path and trigger a crash. The accompanying tests verify the object shape and the regression case.

### **Permission checks tightened for pipes, fs.promises, and realpath.native** (59c86b1, 3a04e0f, e4f3c20)
Several permission-model bypasses were closed by adding explicit access checks around pipe binding/listening and filesystem promise APIs, plus `realpath.native`. These changes matter because they stop restricted processes from reaching network or filesystem operations they shouldn’t be able to invoke.

### **URL formatting no longer crashes on unparsable edge cases** (dabb2f5)
`url.format()` now returns the original href when ada can’t reparse a URL instead of asserting, preventing a crash on certain malformed/edge-case URL shapes. The regression test covers an IDN/opaque-path scenario that previously could bring the process down.

### **Array-index hash collision hardening is enabled in V8** (0d7e4b1)
Node backported V8 support for `v8_enable_seeded_array_index_hash` and updated the string/array-index hashing path accordingly, with tests for the collision case. This is a security-relevant engine change that reduces the risk of predictable hash collisions.

### Other misc changes
- Security release metadata/changelog updates for Node 20.20.2, 25.8.2, 24.14.1, and 22.22.2.
- Dev tooling dependency bumps in eslint-related packages and nixpkgs.
- Minor docs clarification for `response.sendDate`.
- Test-only updates around the new security and permission behavior.
