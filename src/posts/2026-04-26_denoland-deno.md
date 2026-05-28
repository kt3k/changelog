---
date: 2026-04-26
repo: denoland/deno
size: L
title: "Deno lands big Node compat and perf push"
excerpt: "A heavy day of Node.js compatibility fixes, plus worker/message passing performance work and a few broader runtime bug fixes."
commits: 36
authors: [divybot, bartlomieju, fibibot, nathanwhitbot, lunadogbot]
commit_authors: {"3818362": divybot, "dcc8fb7": divybot, "efa25f5": divybot, "bf216e0": bartlomieju, "9e9a919": bartlomieju, "98e65bc": nathanwhitbot, "3c8c5cf": divybot, "92661f2": bartlomieju, "dde034d": divybot, "79d3405": divybot, "6568c65": divybot, "fb7be9c": divybot, "52a849d": divybot, "81790b0": bartlomieju, "3ed99fd": fibibot, "3d766d5": bartlomieju, "52eb81d": fibibot, "2ea8741": fibibot, "987c1e8": divybot, "4b78e6f": divybot, "caf98c5": divybot, "48f0300": fibibot, "79df2ac": divybot, "f47b48b": nathanwhitbot, "a1468b2": bartlomieju, "44cd971": divybot}
---

### **Worker and MessagePort messaging gets faster** (81790b0)
Deno adds raw post-message ops and synchronous drain loops to cut serde and async round-trip overhead for the common case. This should noticeably improve worker and `MessagePort` throughput, especially for chatty ping-pong patterns.

### **Node worker_threads parentPort is isolated from globalThis** (3d766d5)
`parentPort` is now a separate delegate object instead of an alias of the worker global, which avoids recursion and double-delivery bugs when libraries monkey-patch `postMessage` or mix Node-style and web-style handlers. That brings Deno closer to Node's worker semantics and fixes tricky Emscripten/z3-solver cases.

### **HTTP/2 compatibility fills in multiple protocol gaps**
A cluster of commits tightened Deno's `node:http2` behavior around headers, ALPN fallback, push streams, invalid frame limits, GOAWAY payloads, and socket lifecycle handling. These fixes unlock several compat tests and close real interoperability/security-adjacent gaps like response splitting and header validation. (efa25f5, 79d3405, 6568c65, fb7be9c, 52a849d, 987c1e8, 79df2ac, caf98c5, 44cd971, 3818362, dcc8fb7, 3c8c5cf)

### **Node fs and child_process behavior gets closer to Node**
`fs.mkdtempDisposable*`, `fs.readdir` encoding shorthand, `child_process.spawn()` stdio piping, and `reusePort` listen flags were all aligned with Node's behavior. The Windows `writeFileSync` fix is particularly important: it prevents a misleading `EEXIST` error and avoids data loss when truncation happens before CRT fd creation succeeds. (98e65bc, f47b48b, bf216e0, 92661f2, a1468b2)

### **TLS/socket flow control and close handling are corrected**
TLS `readStop` now truly stops delivery, buffers pending plaintext/EOF, and flushes it on the next `readStart`, fixing backpressure and lifecycle edge cases. There were also socket-write/shutdown fixes for HTTP/2 and X.509v1 cert acceptance updates that improve real-world TLS interop. (9e9a919, dcc8fb7, 4b78e6f, fb7be9c)

### **fs.Utf8Stream lands** (dde034d)
Deno adds `fs.Utf8Stream`, a new internal stream helper needed for Node compat coverage. The implementation is large and suggests a new supported behavior surface rather than a small internal tweak.

### **Task filtering now matches workspace directory names** (3ed99fd)
`deno task --filter` now matches on workspace directory names, fixing a real usability bug for monorepos with directory-based workspace layouts. This makes task selection behave more intuitively in common workspace setups.

### **Coverage no longer counts injected helper code** (52eb81d)
`deno coverage` now excludes SWC-injected decorator helpers from reported results, preventing artificial drops in coverage percentages. This is a correctness fix for reporting, not user code execution.

### **Import wildcard matching and bundle diagnostics improved**
npm package import resolution now handles single-character wildcard segments, and `Deno.bundle` reports a clearer error when invoked from a compiled binary. These are useful edge-case fixes, but narrower in scope than the main runtime work. (2ea8741, 48f0300)

### Other misc changes
- Node compat test enrollments/ignores and config updates across multiple HTTP/2, timers, worker, and child_process cases
- Small internal alignment fixes in `ext/node` process/module, timers, HTTP server, and fetch client option handling
- Bundle/CSS fragment URL handling tweak
- Dependency/Cargo lock bumps
- Minor test fixture additions and expected-output updates
