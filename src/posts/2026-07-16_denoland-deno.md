---
date: 2026-07-16
repo: denoland/deno
size: L
title: "Native check lands, plus key runtime fixes"
excerpt: "Deno adds the native TypeScript compiler path for check and ships several meaningful fixes across errors, TLS, Node crypto, and N-API."
commits: 19
authors: [nathanwhit, bartlomieju, nathanwhitbot, mattiasrunge]
commit_authors: {"7324701": nathanwhit, "426a216": bartlomieju, "6db846b": bartlomieju, "6f570cf": nathanwhit, "091b01c": bartlomieju, "c9b8dca": nathanwhitbot, "a253d1a": nathanwhit, "3aa600e": nathanwhit, "4d05e00": nathanwhit, "803a3c9": mattiasrunge, "e6a0143": nathanwhit, "ea35f49": nathanwhit, "7fcf79c": nathanwhit, "207d7ee": nathanwhit, "e3ec070": nathanwhit, "0e572f4": nathanwhit}
---

### **Native `deno check` starts using a pinned TypeScript compiler** (6db846b, 426a216)
Deno now knows how to download a pinned native TypeScript compiler, run it, and map its diagnostics back into Deno’s error format. This is a major step in the `deno check` split: the compiler execution and diagnostic parsing are in place, with an env override for prebuilt binaries and path handling tuned for stable output.

### **Error conversion is now bounded and cycle-safe** (6f570cf, e6a0143)
The core error tree conversion was hardened against recursive and malformed exception graphs by preserving cycle tracking, capping depth and total nodes, and containing failures from tricky constructors/getters. This reduces the risk of runaway formatting work or pathological crashes when user code throws unusual errors.

### **`deno x` and `deno add/remove` now respect minimum dependency age** (c9b8dca, 091b01c)
`deno x` now forwards explicit config and minimum-dependency-age settings into its re-run path, so it no longer silently falls back to the default release-age policy. Separate flag support was added for `deno add/remove`, making the dependency-age policy consistent across these package-management flows.

### **WebTransport certificate and datagram handling was tightened** (4d05e00, ea35f49, 7fcf79c)
WebTransport now validates certificate `notBefore`/`notAfter` timing, handles failed datagram setup cleanly, and avoids a URL parsing panic when `URL.prototype.toString` is overridden. These fixes close correctness and safety gaps in connection setup and teardown.

### **TLS SNI lookups no longer block each other** (207d7ee)
Dynamic SNI resolution now runs independently so a slow certificate lookup doesn’t stall unrelated handshakes on the same listener. That improves latency for TLS servers that resolve keys asynchronously.

### **N-API callback state is now scoped per invocation** (7324701)
Callback metadata is no longer shared mutable state across invocations, which prevents nested re-entry from clobbering arguments seen by the outer call. This is an important correctness fix for native addons that synchronously call back into the same exported function.

### **Node crypto gained raw ChaCha20 support** (803a3c9)
`crypto.createCipheriv`/`createDecipheriv` now recognize `chacha20` alongside existing ChaCha20-Poly1305 support, backed by a Rust implementation and updated polyfill metadata. This expands compatibility with Node APIs that depend on the raw stream cipher.

### **Desktop and HTTP behavior were corrected** (3aa600e, a253d1a, e3ec070, 0e572f4)
Desktop binding wrappers survive lazy op upgrades, trust-proxy env handling no longer mutates process state, app names drop the runtime extension suffix, and HTTP/2 file responses stop reading after stream close. These are targeted runtime fixes that remove surprising side effects and resource leaks.

### **Other misc changes**
- Release tooling adjusted for semver ordering and re-stamping promoted binaries.
- Promoted binaries now use standard executable permissions.
- Small release/tooling and test updates.
