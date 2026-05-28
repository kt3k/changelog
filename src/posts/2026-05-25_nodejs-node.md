---
date: 2026-05-25
repo: nodejs/node
size: L
title: "QUIC gets a major hardening pass"
excerpt: "QUIC gained hostname verification, new rate limits, block lists, and idle stream timeouts; WebCrypto tests/docs were also tightened."
commits: 21
---

### **QUIC adds hostname verification and peer cert modes** (430f89e)
Client sessions can now choose how server certificate validation is handled via `verifyPeer: 'strict' | 'auto' | 'manual'`. This changes connection failure behavior and gives applications a way to either fail fast, inspect validation details, or enforce their own trust policy.

### **QUIC picks up new endpoint controls for abuse resistance** (866caa6, 59a4ec1, 15ad3a6, e883466, 444ba16, 0520174, 38e852c, 495e534, 813e42f)
The QUIC endpoint API gained block-list filtering, per-host session-creation rate limiting, retry/version-negotiation/stateless-reset/immediate-close rate limit docs, and a default flip for preferred-address policy. A new stream idle timeout also helps shut down peer-initiated streams that go silent, with matching stats exposed for observability.

### **QUIC stream shutdown now waits for drain in push mode** (8c495c8)
Push-writer fallback handling was adjusted so `end()` waits for buffered data to drain, while `close()` no longer blocks on that drain path. That avoids a deadlock scenario when the peer only starts reading after close resolves.

### **WebCrypto names, behavior, and coverage were tightened** (ecee55e, 742849d)
The WebCrypto implementation and docs were aligned with spec terminology, and the prototype-pollution regression test was expanded to systematically cover all supported algorithms. This improves maintainability and makes missing coverage for new algorithms much harder to slip through.

### Other misc changes
- Removed a stale V8 warning test no longer reachable in practice (e2ad744)
- Fixed sqlite `xFilter` handling when no callback is provided (b9203ee)
- Updated WPT / test fixtures and a handful of docs
- Deflaked the async-hooks statwatcher test (c55b126)
- Minor doc typo cleanup in TLS error text (15d0c61)
