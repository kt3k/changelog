---
date: 2026-07-19
repo: nodejs/node
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Node adds REPL overhaul, QUIC cert compression, and memory fixes"
excerpt: "Weekly release brings a REPL runtime switch, QUIC TLS certificate compression, stream/HTTP2 fixes, and several leak and perf improvements."
commits: 56
---

### **REPL runtime overhaul and CLI polish**
Node’s REPL now runs through the inspector instead of `vm`, which removes `--experimental-repl-await` and makes top-level `await` always available. The CLI also got styled `node --help` output for color terminals, improving usability without changing plain-text behavior.

### **Security and correctness fixes in HTTP/2, streams, and async state**
This week closed a serious `http2` use-after-free during `rst_stream` handling and fixed a long-standing `http2session.socket.destroy()` rough edge by making it destroy the session safely. Streams saw multiple correctness fixes too: `Readable.pipe()` now recovers after one destination errors, stream iterators validate `signal` and reject `throw()` properly, and virtual read streams no longer race async iteration.

### **TLS, QUIC, and crypto behavior tighten up**
Node added TLS certificate compression support, including for QUIC sessions, which can reduce handshake size and help under anti-amplification limits. TLS docs were expanded to describe `servername` and `alpnProtocol`, legacy `_tls_common` and `_tls_wrap` are now end-of-life, and WebCrypto now enforces the 512-byte `KangarooTwelveParams.customization` limit.

### **Memory and performance work across core hot paths**
Several hot paths were optimized: EventEmitter no longer retains removed event names, `once()`/`removeListener()` got faster, WHATWG stream queues moved to a ring-buffer-backed structure, writable backpressure updates were simplified, and `fs` now caches compiled glob matchers. Node also fixed a timer/AsyncLocalStorage retention issue and improved `VirtualReadStream`, `net.Socket` behavior from `BoundSocket`, and deep equality handling for Maps with null keys.

### **API cleanup and compatibility updates**
Legacy internal TLS modules are now treated as end-of-life, `appendFile()` docs were aligned with `writeFile()`-style input types, and `node inspect` gained per-probe `--cond` support for better conditional probing on hot paths. Bundled libffi was updated to 3.7.1 with native-addon and FFI correctness fixes, and V8 CET/x64 wasm jump-table overflow handling was corrected.

### Other misc changes
Docs and test coverage were updated across crypto, TLS, streams, and fs; assorted typos and benchmark additions were also landed.
