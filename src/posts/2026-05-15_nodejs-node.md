---
date: 2026-05-15
repo: nodejs/node
size: L
title: "HTTP adds 1xx response API; streams and QUIC fixed"
excerpt: "New arbitrary 1xx response support landed, alongside stream adapter bug fixes, debugger probe improvements, and QUIC/HTTP2 corrections."
commits: 15
authors: [trivikr, nodejs-github-bot, pimterry, MoLow, richardlau, joyeecheung, mcollina, jasnell, watilde]
commit_authors: {"5750802": MoLow, "6482073": trivikr, "c0327d3": trivikr, "a91d859": nodejs-github-bot, "2d6cbea": trivikr, "be7ded1": trivikr, "e568673": richardlau, "ee11c35": joyeecheung, "03f27fe": pimterry, "c8206c8": nodejs-github-bot, "f190a04": pimterry, "274d799": mcollina, "e9c49ea": jasnell, "fa1e1f4": MoLow, "676e9da": watilde}
---

### **HTTP gains arbitrary informational responses** (03f27fe)
`response.writeInformation()` now lets servers send any HTTP/1.1 1xx status code, not just the fixed helpers like `writeContinue()` or `writeEarlyHints()`. The same capability was added to the HTTP/2 compat layer, giving userland a cleaner way to emit progress-style responses before the final status.

### **Debugger probes now report real hit locations** (ee11c35)
Probe reporting was bumped to JSON schema v2 and now distinguishes the user's requested target from the actual paused location. That matters when a probe suffix matches multiple scripts or when the debugger has to adjust to the first executable column; the output now tells you exactly where execution stopped.

### **Stream iter adapters got two correctness fixes** (2d6cbea, c0327d3, 6482073, be7ded1)
`fromWritable()` now validates options before consulting the cache, caches per backpressure policy, and uncorks properly if chunk conversion throws during `writev()`. `toReadableSync()` also preserves partially drained batches across backpressure, and `PushQueue` avoids an unnecessary array allocation for the single-item case.

### **QUIC behavior was tightened for backpressure and ALPN errors** (e9c49ea, f190a04)
QUIC writes now treat any available capacity as writable instead of rejecting chunks that merely exceed the remaining window, which fixes a stall with variable-sized chunks. ALPN mismatches now send the correct OpenSSL fatal alert, making handshake failures more precise.

### **HTTP/2 early-hints validation is stricter** (274d799)
Non-`link` headers passed to `writeEarlyHints()` are now validated before being forwarded, instead of letting invalid names or values fail deeper in the stack. This brings the compat layer in line with HTTP/1.1 behavior and gives clearer errors.

### **Test runner context tracking fixed** (5750802, fa1e1f4)
Two test runner bugs were corrected: hook context now resolves properly, and diagnostics-channel context tracking no longer loses binding state. These are internal correctness fixes that improve test isolation and observability.

### **SQLite and simdjson deps updated** (a91d859, c8206c8)
Vendored SQLite and simdjson were refreshed to newer upstream releases. These are dependency-sync changes with the usual mix of bug fixes and maintenance updates.

### **Other misc changes**
- REPL history dedup fix for normalized multiline input (676e9da)
- CHANGELOG cleanup for Node.js release columns (e568673)
- Small stream queue optimization in `PushQueue` (be7ded1)
- Misc test additions and doc updates across HTTP, debugger, QUIC, and stream iter APIs
