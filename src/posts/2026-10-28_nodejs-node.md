---
date: 2026-10-28
repo: nodejs/node
size: L
title: "Node tightens zlib, crypto, and WASM caching"
excerpt: "Big zlib throughput gains, safer X.509 handling, HTTP/2 timeout cleanup, TLS session fix, and WASM compile cache support."
commits: 21
authors: [anonrig, aduh95, panva, HoonDongKang, harjothkhara, Huang-404-Q, richardlau, guybedford]
commit_authors: {"1ef43ae": harjothkhara, "48cb57d": aduh95, "c7b1b62": anonrig, "cbe5585": anonrig, "0160710": anonrig, "663f666": Huang-404-Q, "0fc3102": panva, "3f02738": panva, "2ebf49f": richardlau, "ec7a28f": guybedford}
---

### **zlib convenience APIs get faster on large inputs** (cbe5585, 0160710, c7b1b62)
Node’s one-shot zlib helpers now avoid an extra stream round trip, skip the stream machinery when no options are passed, and grow their output buffers for large async results. Together these changes cut overhead and improve throughput for large compress/decompress workloads while preserving existing behavior and limits.

### **WebAssembly modules are now cached in the compile cache** (ec7a28f)
The module compile cache now covers WebAssembly modules loaded through ESM, storing and restoring compiled wasm code when V8 can serialize it. The docs and translator path were updated to explain the new behavior and the required wasm flags, which can make repeat loads substantially faster.

### **X.509 cloning now preserves certificate chains across isolates** (3f02738)
Node now snapshots X.509 certificates as DER and reparses them per isolate, instead of sharing a native X509 object. That fixes missing issuer chains across structured clone, MessagePort, workers, and TLS inspection, and avoids cross-isolate object sharing bugs.

### **TLS session reuse keeps the original host with provided sockets** (1ef43ae)
`net.Socket` now retains the host before the IP fast path, so TLS session identity stays bound to the right peer when `tls.connect()` is given an existing socket. This fixes session reuse mismatches for literal IP hosts and covered localhost variants.

### **HTTP/2 sessions clear idle timers before destruction** (663f666)
`closeSession()` now clears timeout state before marking a session destroyed, preventing the idle timer from lingering until the server timeout fires. This fixes a retention bug that could keep closed sessions alive longer than intended.

### **Issuer checks stop wiping unrelated OpenSSL errors** (0fc3102)
X.509 issuer verification now preserves the caller’s error queue instead of clearing it on entry and exit. The added coverage checks successful matches, mismatches, malformed extensions, and null inputs without losing earlier diagnostics.

### **Node 26.13.0 enters LTS as Lithium** (2ebf49f)
The 26.x line transitioned into Long Term Support and updated release metadata accordingly. No functional code changes were included beyond the LTS bookkeeping.

### Other misc changes
- Node 24.22.2 LTS release metadata/changelog update (48cb57d)
- Dependency bumps in GitHub Actions and tooling (7 commits)
- Docs and test-only cleanup around sqlite examples, Nix comparison logic, and assorted workflow files (5 commits)
