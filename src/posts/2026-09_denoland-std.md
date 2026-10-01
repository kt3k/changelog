---
date: 2026-09-30
repo: denoland/std
period: monthly
slug: 2026-09
period_label: "September 2026"
size: L
title: "Std hardens HTTP, async, and parsing APIs"
excerpt: "September brought stable text/yaml APIs, tighter URL/HTTP correctness, safer directory serving, and circuit-breaker fixes."
commits: 26
---

### **Stable APIs and cleaner entrypoints**
A few previously unstable pieces graduated this month: `@std/text/truncate` is now stable and re-exported from the text module, while YAML’s `stringify()` now exposes `quoteStyle` on the stable entrypoint. These changes make the APIs easier to discover and use without reaching for unstable modules.

### **HTTP serving gets more correct and more secure**
`serveDir()` and `serveFile()` saw the biggest hardening work. Directory serving now blocks percent-encoded backslash traversal, adds an extra containment check, supports filesystem roots, and tightens dotfile handling. On the response side, conditional HEAD requests now honor validators properly, bringing cache semantics closer to normal HTTP behavior.

### **Async resilience and timing correctness**
The circuit breaker implementation was refined to count requests when they complete rather than when they start, fixing segment accounting for long-running in-flight work. A generation guard also prevents stale half-open requests from affecting later breaker states, making recovery behavior more reliable.

### **Parsing, encoding, and UUID correctness fixes**
Several low-level helpers were tightened for standards compliance and robustness: IPv4/IPv6 parsing now follows the WHATWG URL rules, `parseCacheControl()` tolerates malformed directives instead of throwing, JSONC reports unterminated strings cleanly, and the CBOR encoder now sizes buffers correctly for UTF-8 object keys. UUID v7 generation also now rejects timestamps that exceed the 48-bit field.

### **Data structures and test utilities improve performance and compatibility**
Binary search tree traversal was made linear by replacing an O(n²) queue pattern, and tree constructors now accept array-like inputs via `Array.from()`. `FakeTime` was fixed to preserve `Date` subclass prototypes, which avoids subtle issues in tests and code that extends built-ins.

### **Other misc changes**
- UUID docs and RedBlackTree docs were updated for consistency
- JSONC tests and serveDir coverage were expanded
- Deno config, lint rules, and assorted comments/docs were refreshed
- `crypto/_wasm` got a small keccak dependency bump and rebuild
