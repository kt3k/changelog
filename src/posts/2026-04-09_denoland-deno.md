---
date: 2026-04-09
repo: denoland/deno
size: L
title: "Deno lands permissions, Node, and HTTP parser work"
excerpt: "Major runtime fixes plus a new native llhttp HTTP parser and Node fs/crypto improvements landed today."
commits: 14
authors: [bartlomieju, denobot, littledivy]
commit_authors: {"8157260": bartlomieju, "825d264": denobot, "1ececcb": bartlomieju, "ce2e62b": bartlomieju, "bb0e45b": bartlomieju, "bd03673": bartlomieju, "301e224": bartlomieju, "f66ec66": bartlomieju, "241d11f": littledivy, "acdf390": bartlomieju, "c16785b": bartlomieju, "1d69e90": bartlomieju, "b1acf1c": bartlomieju, "34ed78a": bartlomieju}
---

### **Native llhttp HTTPParser added to Node bindings** (34ed78a)
Deno’s Node compatibility layer now ships a native llhttp-based `HTTPParser` backed by cppgc, matching Node’s `internalBinding('http_parser')` API. This is a foundational change for moving HTTP processing off the older hyper-based path and onto direct native socket parsing.

### **Permission checks now block IP alias bypasses** (241d11f)
Resolved addresses are now re-checked after DNS/hostname resolution across TCP, TLS, UDP, and QUIC paths, closing numeric-hostname bypasses like `2130706433` resolving to `127.0.0.1`. This tightens deny rules so network permissions apply to the actual endpoint, not just the string the caller supplied.

### **IPv4-mapped IPv6 addresses are normalized in net permissions** (8157260)
Permission matching now treats `::ffff:127.0.0.1` and `127.0.0.1` as the same host when storing and comparing IPs. That fixes a real allow/deny mismatch on dual-stack systems and makes network permissions behave consistently.

### **Node crypto chacha20-poly1305 switches to aws-lc-sys** (c16785b)
The ChaCha20-Poly1305 implementation in `node:crypto` was replaced with AWS-LC/BoringSSL’s EVP cipher API. This should significantly improve performance on platforms where the previous RustCrypto path was software-only or lacked SIMD acceleration.

### **N-API wrap/unwrap now uses per-isolate keys** (1d69e90)
`napi_wrap` and `napi_unwrap` now share a per-isolate V8 `Private` key instead of creating one per addon load. That matches Node.js behavior and fixes cases where one native addon could not unwrap objects wrapped by another addon in the same isolate.

### **Pipe handles now follow libuv lifecycle semantics** (1ececcb)
`uv_pipe_open` no longer marks handles active immediately, and idle pipe handles are deactivated when they have no pending work. This fixes event-loop liveness issues where an opened but idle pipe could keep Deno running forever.

### **Non-blocking stdio and stdin handling were fixed** (acdf390)
Global stdio statics were removed, stdin now retries on `WouldBlock`, and console sizing now uses a dedicated stderr path. These changes make stdio handling more robust when Node sets file descriptors to non-blocking mode.

### **`op_print` now retries non-blocking writes** (301e224)
Core print writes now loop on `WouldBlock` and `Interrupted` instead of relying on `write_all`. That prevents `EAGAIN` failures when Node-backed stdout/stderr inherit non-blocking descriptors.

### **`process.stdout`/`stderr` get SyncWriteStream for file-backed output** (bb0e45b)
Deno now exports Node’s `fs.SyncWriteStream` implementation and wires it into the Node polyfill layer. This matches Node behavior for stdio redirected to regular files by making writes synchronous.

### **Stdin read/cancel plumbing was simplified** (bd03673)
The `_readWithCancelHandle` path was removed from stdin handling. This is an internal refactor tied to the broader stdio lifecycle cleanup.

### **Task/signals spec test now fails fast in CI** (f66ec66)
The hanging signal test gained a hard timeout and explicit child-process cleanup so CI can terminate it reliably. This is a test-infra fix that reduces the chance of long-running hangs.

### **Permission property tests added** (ce2e62b)
A new proptest suite adds broad invariant coverage for the permission system. The change increases confidence, but it is test-only.

### **Deno 2.7.12 version bump** (825d264)
Version files, release metadata, and generated CI artifacts were updated for the 2.7.12 release. This is mostly release bookkeeping.

### Other misc changes
- Reverted sanitizer-related `deno test` default changes from the previous rollout (b1acf1c)
- Added minor test coverage and fixture updates for permission and Node stdio behavior
- Bumped lockfiles and generated workflow/config outputs
