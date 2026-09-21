---
date: 2026-09-20
repo: oven-sh/bun
size: L
title: "Build, CI, and runtime compat all moved"
excerpt: "Major build-system and CI-image overhauls landed, plus Node compatibility fixes for http2/http timeout handling and spawn signals."
commits: 12
authors: [dylan-conway, robobun, Jarred-Sumner]
commit_authors: {"f49019c": dylan-conway, "8fa88e3": dylan-conway, "5a79d68": dylan-conway, "4353c91": Jarred-Sumner, "4283a64": dylan-conway, "501152c": Jarred-Sumner, "fc297d4": dylan-conway, "42cc173": robobun, "c1bfea6": robobun, "cf71211": dylan-conway, "c508647": robobun, "d7ce9b0": robobun}
---

### **Build now re-runs when the toolchain itself changes** (f49019c)
Bun’s build graph now records tool identities from configure and uses them as implicit inputs for compile, PCH, link, and shim steps. Replacing `cc`, `cxx`, `nasm`, or `ld` should now rebuild only what that tool produced, instead of leaving stale outputs behind.

### **Rust crates are built as individual ninja edges** (4283a64)
The Rust half of the build was split from one opaque `cargo build` edge into per-compilation-unit ninja edges, with Cargo acting as planner and ninja as executor. That’s a big build-system refactor that improves graph accuracy and makes Rust work more incremental and observable.

### **CI machine images became content-addressed** (fc297d4)
CI images are now named by content hash, so Buildkite can detect missing images and bake them before the rest of the pipeline runs. This makes image selection deterministic and ties the cache/bake flow to the exact inputs that produced each machine image.

### **Node http2 option validation now matches Node more closely** (42cc173)
`http2.connect()`, `createServer()`, `createSecureServer()`, and related paths now validate more session options at every entry point, including `strictSingleValueFields` and HTTPS-only initialization behavior. This closes compatibility gaps where Bun previously accepted values Node rejects.

### **HTTP pipelining timeouts now hit the right request** (c1bfea6)
When a pipelined request stalls, the timeout is now associated with the request still being received rather than the response that already owns the socket. That fixes cases where `req.setTimeout()` never fired on the pending request and the server handled the socket timeout incorrectly.

### **Spawn signal codes now preserve platform-specific names and numbers** (d7ce9b0)
Signal handling was refactored so Bun reports the correct signal names for each platform’s numbering, and unnamed signals can surface as their numeric code. The public types were updated accordingly, which matters for process APIs and cross-platform correctness.

### Other misc changes
- WebKit bumped to `63a807e88ce0` with bytecode/codeblock changes and updated bytecode portability fixtures (501152c)
- CI/build scripts moved further toward TypeScript and new image-spec plumbing (cf71211, 5a79d68)
- A bytecode memory test was tightened to subtract on-disk control memory more precisely (4353c91)
- ConPTY mouse-tracking limitations on Windows 10 / Server 2019 were documented (c508647)
- Various build/docs/test cleanup and renames, including toolchain notes and cache-path docs (8fa88e3, 4283a64-related, f49019c-related)
