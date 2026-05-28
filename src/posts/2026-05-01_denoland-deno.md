---
date: 2026-05-01
repo: denoland/deno
size: L
title: "Deno lands major Node compat and runtime features"
excerpt: "Big day for Node compatibility, TLS/crypto fixes, and new core/runtime capabilities including OffscreenCanvas, gRPC OTLP, and lazy-loaded ext scripts."
commits: 22
authors: [bartlomieju, divybot, nathanwhit, crowlKats, hunnyboy1217, 7Hazard, nathanwhitbot]
commit_authors: {"be0502b": bartlomieju, "0f570e2": divybot, "cc844ee": divybot, "fd0f204": divybot, "5b43ce5": divybot, "f17673a": crowlKats, "426a0f8": hunnyboy1217, "04f28b9": 7Hazard, "63ce783": bartlomieju, "1d36a12": bartlomieju, "21fb99e": bartlomieju, "9d69a64": nathanwhit, "a09ed54": bartlomieju, "ea33a86": bartlomieju, "04e47ba": divybot, "df8d21c": bartlomieju, "6e3da78": nathanwhit, "14f8ca3": divybot}
---

### **OffscreenCanvas ships in core runtime** (f17673a)
Deno adds OffscreenCanvas support across canvas and WebGPU plumbing, with TypeScript surface updates and substantial new implementation code. This unlocks a key browser API for worker/off-main-thread graphics work and widens compatibility for canvas-heavy apps.

### **Node module.registerHooks() support lands** (63ce783)
Implements CommonJS `module.registerHooks()` with resolve/load hooks, chaining, passthrough, and deregistration behavior. This is a meaningful runtime API addition for advanced loaders and tooling that depend on Node’s modern module hook model.

### **node:test gets far more complete** (be0502b, 21fb99e, 1d36a12)
The `node:test` polyfill picked up several previously missing APIs: test context fields like `name`, `fullName`, and `signal`, assertion planning, suite-level hooks, and `mockImplementation`/`mockImplementationOnce` plus getter/setter mocks. Another fix hardens the runner against unhandled rejections and uncaught errors so tests warn instead of crashing, bringing behavior closer to Node.

### **Node TLS and crypto compatibility improved** (ea33a86, df8d21c, 426a0f8, 04e47ba, 14f8ca3)
Several fixes landed around TLS edge cases and Node internal bindings, including Happy Eyeballs reinitialization, detached ArrayBuffer handling during writes, proper error codes for `setServername()`, and http2 binding exposure. These changes remove real crashers and unblock more node_compat coverage.

### **Node crypto gains more private-key and DH support** (fd0f204, 0f570e2, cc844ee, 5b43ce5)
Encrypted PKCS#8 export/import, PBES2-encrypted PEM export, encrypted private-key handling in `publicEncrypt`/`privateDecrypt`, and DH shared-secret padding/sign-byte fixes all landed. Together they close several compatibility gaps in key generation and cryptographic interop.

### **Telemetry OTLP exporter now supports gRPC** (04f28b9)
The OTLP exporter can now speak gRPC in addition to HTTP-based protocols, with dedicated span/log/metric exporters and gRPC framing implemented without pulling in heavy dependencies. That makes Deno’s OpenTelemetry story much more flexible for production observability setups.

### **Performance work speeds up node:http writes** (6e3da78)
A deeper writev path for TCP sockets landed to make `node:http` use true vectored writes instead of extra copying. This is the kind of low-level change that can pay off in throughput and allocation reduction for network-heavy workloads.

### **Lazy-loaded extension scripts reduce snapshot overhead** (a09ed54)
`Deno.core.loadExtScript()` was added so extension scripts can be loaded on demand without going through the ES module pipeline. The motivating change is explicit: lower snapshot size and faster serialization/deserialization for core initialization.

### **Child-process IPC now supports socket handles on Unix** (9d69a64)
Unix child-process IPC can now send `net.Socket` and `net.Server` handles between processes. That’s a substantial compatibility improvement for Node-style IPC patterns and required coordinated changes across process, tcp, and pipe layers.

### **TLS socket fallback no longer crashes on Happy Eyeballs** (ea33a86)
The TLS socket handle is now re-wrapped correctly when address fallback occurs, preserving TLS behavior after `autoSelectFamily` retries. This fixes an intermittent but severe connection crash on multi-address hosts.

### Other misc changes
- Daily Node compat CI schedule tweak (1 commit)
- Console proxy inspection fix for `nodejs.util.inspect.custom`
- `fs.watch` option validation tightened
- Minor http2 internal binding exposure fix for compat tests
- Node compat test metadata updates
