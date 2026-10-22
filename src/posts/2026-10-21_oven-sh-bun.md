---
date: 2026-10-21
repo: oven-sh/bun
size: L
title: "Bun tightens core runtime, TLS, and parser fixes"
excerpt: "Notable fixes span PostgreSQL race handling, TLS shutdown safety, fetch keep-alive behavior, structured clone validation, and hardened build options."
commits: 21
authors: [dylan-conway, robobun, Jarred-Sumner]
commit_authors: {"9634520": dylan-conway, "49b80f5": dylan-conway, "5738e23": robobun, "cb1c0a2": dylan-conway, "491aaad": dylan-conway, "6fbfdcd": robobun, "ebcd487": robobun, "e350ec3": dylan-conway, "1f21b90": dylan-conway}
---

### **PostgreSQL bind results now wait for RowDescription** (49b80f5)
Fixes a race in `Bun.SQL` on PostgreSQL when the same parameterless query is run again before the first `RowDescription` arrives. Bun now reads bind results as text in that case, preventing wrong rows or rejected queries.

### **HTTP fetch no longer lets `Connection: keep-alive` override `keepalive: false`** (6fbfdcd)
`fetch()` on HTTP/1.1 now consistently honors `keepalive: false`, even if a request sends `Connection: keep-alive`. That stops Bun from reusing and leaving behind idle connections when callers explicitly opted out.

### **TLS streams keep their native context alive through close-path callbacks** (ebcd487)
This fixes a use-after-free class of bug when a TLS socket over a JS stream re-enters the event loop during close handling. The native duplex context now stays alive while its entry points run, avoiding crashes and borrow panics.

### **`structuredClone` rejects malformed `CryptoKey` records** (cb1c0a2)
Bun now refuses malformed serialized `CryptoKey` data instead of reconstructing bogus or null keys. That closes a correctness and safety gap for structured clone input, including advanced IPC serialization.

### **Class decorators now bind the decorated class inside the class body** (5738e23)
Standard class decorators that return a replacement class now expose that decorated class to static initializers, methods, and field initializers inside the class body. This brings Bun in line with other toolchains and the TC39 lowering semantics.

### **`bun build --react-compiler` and coverage source maps get finer locations** (491aaad, e350ec3)
React Compiler output now records more precise source-map positions for `catch`, and coverage mapping now includes `case`, `default`, object literal braces, and `finally`. This improves debuggability and makes coverage reports line up more accurately with source.

### **Build hardening option lands for Linux x64 glibc release builds** (9634520)
Bun adds `--hardened=on`, enabling stack protection, `_FORTIFY_SOURCE`, stack clash protection, and zeroed locals for supported release builds. It is off by default, so it’s opt-in hardening rather than a behavior change.

### **TLS certificate validation now blocks revoked public keys** (1f21b90)
Bun now rejects certificate chains containing blocked public keys, matching Node’s check. The bundled root store is also refreshed to NSS 3.131.1.

### Other misc changes
- Fix `bun:sqlite` `Statement#run` segfault before any `Database` is opened.
- Fix `TextEncoder.encodeInto` panic on a detached destination.
- Fix `FileSink` panic when moving from a TTY to a regular file.
- Coverage/source-map and React Compiler bookkeeping fixes.
- CI buildkite-agent bump and build script updates.
- Bindgen/schema refactor for outliving Rust-backed JS classes.
