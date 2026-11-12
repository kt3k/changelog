---
date: 2026-11-11
repo: nodejs/node
size: L
title: "Node ships security-heavy LTS releases"
excerpt: "Major security fixes, a new X.509 API, and HTTP/TLS/http2 hardening land across the day."
commits: 33
authors: [mcollina, panva, aduh95, pimterry, nodejs-github-bot, RafaelGSS, vedchaudhari, Nashit-h, manusingh090, avivkeller]
commit_authors: {"c207dbf": aduh95, "0d636a2": aduh95, "f4f5a3d": aduh95, "633df28": pimterry, "0d6d38f": mcollina, "3f3c593": mcollina, "5ebf6ad": pimterry, "42213da": pimterry, "ae94cd8": pimterry, "20fd568": mcollina, "9c6e6ef": mcollina, "a69953c": mcollina, "5d6dedb": mcollina, "a92cdeb": mcollina, "00ba7f0": mcollina, "059c801": mcollina, "5498ee6": panva}
---

**Security releases for v26.13.1, v24.22.3, and v22.23.5** (c207dbf, 0d636a2, f4f5a3d)
Node published three LTS security releases covering multiple high-severity issues in http2 and TLS, including header/buffer lifetime fixes, nested parser execution prevention, and mTLS/session-resumption hardening. The release notes call out several CVEs and make this the dominant change of the day.

**Add X.509 certificate generation with CSR support** (5498ee6)
Node now exposes `generateX509Certificate()` and `generateX509CertificateSync()`, producing `X509Certificate` objects for self-signed or issuer-signed v3 certs. The new API accepts subjects, public keys, serials, validity windows, signing digests, and PKCS#10 CSRs, giving users first-class certificate issuance without shelling out to OpenSSL.

**Harden HTTPS agent pooling by TLS policy** (20fd568)
The HTTPS Agent keying logic now encodes TLS option types and values so sockets and cached sessions cannot be reused across distinct trust or identity policies. That closes a subtle policy-confusion class of bugs where different SecureContext/callback objects could previously collapse to the same pool key.

**Fix re-entrant HTTP/TLS parser execution** (5d6dedb, a92cdeb)
HTTP client/server parsing now defers synchronous `data` re-entry instead of running llhttp inside itself, and TLS empty writes no longer trigger nested parser execution mid-callback. This prevents corrupted parser state and memory-safety issues when user JS causes socket activity from within parser callbacks.

**Tighten http2 memory and lifetime handling** (0d6d38f, 3f3c593, 9c6e6ef, 00ba7f0, 059c801)
http2 now retains stream/write objects until socket writes finish, counts paused inbound DATA against `maxSessionMemory`, releases headers when streams are removed, and fixes an ALTSVC buffer overflow. Together these changes plug multiple use-after-free and unbounded-memory conditions in stream teardown and backpressure handling.

**Fix remote TLS server crash and SNI/session edge cases** (633df28, 5ebf6ad, 42213da, ae94cd8, a69953c)
Several TLS fixes land together: a remotely reachable server crash is fixed, mTLS resumption is disabled without a session-id context, and SNI is now pinned so renegotiation, HRR, and resumption cannot change it. SNI contexts with CA-only configuration are also applied correctly for client certificate verification.

### Other misc changes
- Restored stack traces for `fs/promises` `readFile`/`writeFile`/`appendFile` errors.
- Updated bundled deps: nghttp2, nghttp3, ngtcp2, and llhttp.
- Inspector ws frame OOB read fix.
- Permission/watch and proxy credential redaction fixes.
- FIPS/OpenSSL test and tooling adjustments.
- Web Worker API enabled by default.
- Minor crypto/X.509 backend guard cleanup and other changelog/docs updates.
