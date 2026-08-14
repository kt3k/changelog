---
date: 2026-08-13
repo: denoland/deno
size: L
title: "FFI, N-API, and Node shims get safer"
excerpt: "Three user-facing fixes land: safer FFI struct returns, one-time N-API finalizers, and better Node-style CLI/crypto behavior."
commits: 4
authors: [nathanwhit, bartlomieju]
commit_authors: {"8c80e98": bartlomieju, "33ff918": nathanwhit, "c64bb8e": nathanwhit, "08df179": nathanwhit}
---

### **FFI struct returns now validate output buffers** (33ff918)
The FFI layer now checks that a caller-provided buffer is present and large enough for the ABI result size before writing a struct return. It also preserves typed-array offsets/lengths and keeps the primordial `Uint8Array` constructor in generated wrappers, preventing incorrect writes and view handling bugs in sync and async calls.

### **N-API teardown no longer double-invokes finalizers** (8c80e98)
Reference finalizers now coordinate between GC cleanup and env shutdown so whichever path runs first “claims” the callback and the other skips it. This fixes a teardown race where a wrapped object could be finalized at shutdown and then finalized again later if GC ran afterward.

### **Node shims preserve explicit `--` argument delimiters** (c64bb8e)
The Node CLI argument translator now tracks when parsing crossed a `--` delimiter and re-inserts it when forwarding the remaining args. That keeps script arguments from being reinterpreted as options and matches Node’s delimiter semantics more closely.

### **Crypto key export keeps binary passphrases intact** (08df179)
Encrypted private-key export now passes the exact byte range of buffer/view passphrases through to native code instead of stringifying them first. That avoids silently changing binary passphrase bytes and improves compatibility with Node-style passphrase inputs.

### Other misc changes
- Dependency/update plumbing for FFI dev tooling (1 commit)
- Test coverage additions and internal refactors around the above fixes
