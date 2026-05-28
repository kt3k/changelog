---
date: 2026-04-10
repo: oven-sh/bun
size: L
title: "Security fixes and crash hardening"
excerpt: "Bun fixes a TLS hostname-verification bypass, plus several crashes and double-free bugs in string decoding, websockets, and socket cleanup."
commits: 11
authors: [alii, dylan-conway, Jarred-Sumner, robobun, cirospaciari, ant-kurt]
commit_authors: {"ccfe269": alii, "534982b": Jarred-Sumner, "75e94b0": Jarred-Sumner, "ad909ae": robobun, "d81b0ca": dylan-conway, "775a368": cirospaciari, "4c90617": alii, "f0c014a": ant-kurt, "8e65e47": dylan-conway, "a6ef65c": dylan-conway, "a1d1af9": alii}
---

### **TLS hostname verification now runs for `tls.connect({host, port})`** (75e94b0)
`tls.connect` was skipping `checkServerIdentity` entirely when `servername` was omitted, which could mark attacker-controlled CA-signed certs as trusted. The fix derives a hostname from `servername` or the connection host, rejects IP literals as SNI, and updates tests to cover the verification path.

### **StringDecoder no longer segfaults on oversized output** (ad909ae)
`StringDecoder.write()` could crash when decoding produced a string larger than JSC's max string length and the internal encoder returned an exception instead of a value. This change propagates failures safely instead of treating them like an empty result, closing a memory-safety bug in a common Node API.

### **WebSocket proxy close re-entrancy double-free fixed** (8e65e47)
Closing a `wss://` socket mid-handshake through an HTTP CONNECT proxy could re-enter cleanup and free proxy state twice. Bun now detaches the tunnel's back-reference before shutdown and adds a regression test that stresses the race.

### **Runtime transpiler job dispatch stops touching freed state** (d81b0ca)
The transpiler job now snapshots VM/store references before queueing work to the main thread, avoiding use-after-free after publication. This is a targeted concurrency fix for a cross-thread lifecycle hazard.

### **uSockets snapshot prevents loop dereference after unref** (775a368)
`us_connecting_socket_free()` now saves the loop pointer before unlinking the context, so cleanup no longer dereferences a possibly-freed `context`. It's a small hardening fix for a crashy socket teardown path.

### Other misc changes
- Build script revert: gate parallel Zig compiler back to darwin-only (ccfe269)
- Build/tooling tweaks: Zig commit bump and Rust `cargo --locked` pinning (4c90617, f0c014a)
- PR comments script/docs cleanup and output format changes (534982b, a1d1af9)
- Release/version bump to 1.3.13 (a6ef65c)
