---
date: 2026-06-18
repo: nodejs/node
size: L
title: "Security-heavy day with TLS and crypto fixes"
excerpt: "Multiple CVEs landed across TLS, crypto, HTTP/2, permissions, and HTTP agent handling, plus a native IPC serializer refactor."
commits: 22
authors: [mcollina, aduh95, RafaelGSS, panva, anonrig, ShogunPanda, trivikr]
commit_authors: {"a1074b8": anonrig, "6a8808a": panva, "179ddae": mcollina, "9cc4e32": mcollina, "c68711f": mcollina, "6cde237": aduh95}
---

### **Native IPC serialization moved into C++** (a1074b8)
Node’s advanced child process IPC codec now runs in a native `ipc_serdes` binding instead of JavaScript. That removes repeated JS/C++ crossings and per-message wrapper allocation, so advanced IPC should be faster and more consistent for complex messages.

### **WebCrypto cipher output lengths are now bounded** (6a8808a)
WebCrypto AES and ChaCha20-Poly1305 code now rejects inputs whose computed output would exceed `INT_MAX` before calling OpenSSL. This closes a signed-overflow risk and turns oversized cipher requests into clean failures.

### **HTTP agents now destroy poisoned idle sockets** (179ddae)
Idle keep-alive sockets in `http.Agent` now watch for unexpected incoming data and immediately destroy the socket if it appears. This prevents response queue poisoning, where attacker-controlled bytes could be misread as the next response on a reused connection.

### **TLS session reuse is tied to the authenticated host** (9cc4e32)
Reusable TLS sessions are now wrapped with the host they were authenticated against and refused if reused for a different server name. This blocks cross-host session reuse mistakes that could undermine certificate-based origin checks.

### **TLS SNI context matching is case-insensitive** (c68711f)
`server.addContext()` now builds case-insensitive hostname regexes, so mixed-case or uppercase SNI values select the intended TLS context. That fixes a standards violation and closes a bypass where case changes could route clients to the default context.

### **Callback exceptions in TLS event handlers are routed safely** (6cde237)
TLS now catches synchronous exceptions from key server-side event handlers like `resumeSession`, `OCSPRequest`, and `newSession`, and forwards them through error handling instead of letting them escape unpredictably. This makes callback failures safer and more consistent under load.

### **Other misc changes**
- Security release/changelog updates for 26.3.1, 24.17.0, and 22.23.0
- DNS/net hostname NUL-byte rejection
- Permission-model hardening for pipe open/chmod, `FileHandle.utimes`, and `process.chdir` in write reports
- HTTP/2 origin-set cap and related docs/tests
- Proxy credential redaction in tunnel errors
- Native FFI fast-path support expanded to more platforms
- llhttp dependency bump
- Debugger probe startup pause handling tweak
- Documentation and test-only updates for the above fixes
