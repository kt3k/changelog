---
date: 2026-05-07
repo: denoland/deno
size: L
title: "TLS, test timeouts, and cloneable blobs land"
excerpt: "Major Deno and Node compat work: TLS handshake fixes, test timeouts, Blob/File cloning, and more lazy-loading/perf wins."
commits: 20
authors: [bartlomieju, nathanwhit, divybot, hunnyboy1217]
commit_authors: {"06c1659": nathanwhit, "0f4c9de": bartlomieju, "2721b66": bartlomieju, "428ce52": bartlomieju, "3a76e62": hunnyboy1217, "e40b1b1": bartlomieju, "739f11a": bartlomieju, "1492b0c": bartlomieju}
---

### **TLS server callbacks now work correctly** (2721b66)
Deno now implements Node's `ALPNCallback` and `SNICallback` for `tls.createServer()`, and `getServername()` reflects the client's SNI on server-side connections. This unblocks server-side certificate/protocol selection that previously existed only as accepted-but-unused options.

### **Deno.test() gets a per-test timeout** (3a76e62)
Tests can now be failed automatically after a configured deadline, catching both async hangs and sync hot loops. The new API includes validation and surfaces a clear timeout failure message, making stuck tests much easier to diagnose.

### **Blob and File are now structured-cloneable** (1492b0c)
`structuredClone()` and `postMessage()` now support `Blob` and `File`, using shared blob part storage instead of copying data. That makes large binary payload cloning effectively O(1) per part and brings these web types in line with other cloneable host objects.

### **Custom ESM loader hooks get broader module support** (428ce52)
`module.registerHooks()` now handles custom loaders for non-JS file types more correctly, including proper resolution behavior and format propagation into load hooks. This fixes a class of hook-based workflows for YAML/TOML-style loaders and similar custom sources.

### **Node TLS JS-stream writes no longer deadlock** (06c1659)
The TLS wrapper now drives the cleartext/encrypted write cycle for JS-backed streams during writes, matching Node's TLS write-completion behavior more closely. This fixes a deadlock that could happen when both sides waited on write callbacks in multi-write TLS exchanges.

### **HTTP server diagnostics_channel events are emitted** (0f4c9de)
HTTP server paths now emit the expected `diagnostics_channel` events, improving observability for Node-compatible instrumentation. This closes a compatibility gap for tooling that listens to those lifecycle hooks.

### **TLS server handshake deadlock path is fixed** (2721b66)
The TLS server handshake path now invokes client-hello handling from JS so callback-driven protocol and certificate selection can proceed. This is a substantial compat fix for server configurations that rely on handshake-time decisions.

### **Other misc changes**
- More Node polyfills converted to lazy-loaded JS for startup wins (4 commits)
- Numeric IP aliases now respect `--deny-net` after resolution (e40b1b1)
- V8 external-memory panic workaround for huge TypedArrays (739f11a)
- `diagnostics_channel`/HTTP observer and TCP parser compat fixes (2 commits)
- Minor test and header behavior updates, including a local-only SSL test and Vary header tweak (3 commits)
