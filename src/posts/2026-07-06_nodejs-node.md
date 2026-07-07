---
date: 2026-07-06
repo: nodejs/node
size: L
title: "QUIC crash fix, zlib safety, faster buffers"
excerpt: "Security fixes, a QUIC crash fix, a zlib hang fix, and buffer/timer performance improvements headline the day."
commits: 19
authors: [mcollina, Ic3b3rg, JamieMagee, Renegade334, efekrskl, trivikr, nodejs-github-bot, Yayapapa, EduardF1, 3zrv, samuel871211, watilde, haramj, sxa, aduh95, avivkeller, gurgunday]
commit_authors: {"1677526": watilde, "ac4acb8": mcollina, "6adfff9": efekrskl, "3d09f01": Ic3b3rg, "1e14be8": Ic3b3rg, "7d941ec": trivikr, "8a84e6b": Yayapapa, "9548cbc": 3zrv, "c9f8721": gurgunday}
---

### **QUIC version negotiation now drops oversized CIDs** (9548cbc)
An unauthenticated UDP datagram with an unsupported QUIC version could previously crash the endpoint by triggering an overlong CID construction before length checks. The fix rejects version-negotiation packets whose DCID/SCID exceed `NGTCP2_MAX_CIDLEN`, closing a remote crash path.

### **Inspector no longer crashes on writes after socket close** (8a84e6b)
The inspector socket now guards against writing through a null TCP handle after EOF. This avoids a Windows access violation when queued writes race with disconnects or EOF handling inside frame parsing.

### **zlib now rejects invalid flush kinds consistently** (1e14be8, 3d09f01)
Brotli flush validation was tightened so invalid kinds are rejected before reaching native code, preventing the 100% CPU hang reported in #63701. The later follow-up extends the same range validation to all stream types and updates tests to cover gzip, brotli, and zstd cases.

### **`buffer.isUtf8()` and `buffer.isAscii()` get fast APIs** (c9f8721)
These validation helpers now use fast API bindings, reducing overhead on hot paths while preserving detached-buffer checks and semantics. The change should speed up common buffer classification without altering behavior.

### **`setStreamTimeout()` reuses Timeout objects** (ac4acb8)
Stream timeouts now rearm an existing `Timeout` object instead of allocating a new one every time. This cuts per-request allocation churn on keep-alive-heavy workloads and keeps async_hooks behavior intact.

### **Async iteration preserves half-open duplex streams** (6adfff9)
Reading a half-open duplex via async iteration no longer destroys the stream just because the readable side has ended. This fixes cases where TCP/server-style duplexes needed the writable side kept alive after consuming input.

### **`validatePort()` now rejects string zero when zero is disallowed** (1677526)
The zero check now coerces the value the same way the rest of the validator does, so string forms like `'0'`, `'00'`, and `'0x0'` are rejected when `allowZero` is false. This closes a subtle API validation bug reachable through dgram and similar callers.

### **VFS rename now blocks moving a directory into itself** (7d941ec)
The in-memory VFS provider now rejects renaming a directory into one of its descendants instead of detaching the subtree from the root. This prevents a destructive tree corruption bug and preserves existing entries.

### Other misc changes
- Updated undici to 8.7.0 (1 commit)
- Docs updates for QUIC, HTTP/2, HTTP/1.1, and contributor guidance (4 commits)
- Build/CI/workflow tweaks and lint fixes (4 commits)
- Minor v8.gyp cleanup for riscv64/loong64 (1 commit)
- Buffer `atob` unreachable overflow check removal (1 commit)
