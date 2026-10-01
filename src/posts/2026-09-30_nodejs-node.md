---
date: 2026-09-30
repo: nodejs/node
size: L
title: "Node tightens crypto, fs, and spawn performance"
excerpt: "Major fixes land for process spawning, crypto encoding validation, recursive mkdir hangs, and FFI safety, plus a large embedder-isolate test update."
commits: 30
authors: [panva, codebytere, aduh95, joyeecheung, richardlau, kyungrae2002, christianaurichzm, marcopiraccini, maruthang, trivikr, Renegade334]
commit_authors: {"5e3bbc4": aduh95, "d7ea02d": joyeecheung, "a3219b6": aduh95, "9c67491": richardlau, "bd83a5c": codebytere, "d782ae6": kyungrae2002, "b9bb1bd": christianaurichzm, "69f3ae9": marcopiraccini, "8bf7793": codebytere, "70d8850": codebytere, "670a077": codebytere, "ae70f7e": codebytere, "6fbab72": codebytere, "524eb24": panva, "929b39c": panva, "e878931": panva, "8e51a61": panva, "76a5db6": panva, "aae38e4": panva, "d595888": panva, "81f15ff": panva, "37a0b0d": aduh95, "fa3e4c9": panva, "822e8ef": panva, "718f044": panva, "6b8001d": panva, "127f79a": maruthang, "f71d644": trivikr, "6b8bc0a": Renegade334}
---

**Spawn default env now uses a native fast path** (bd83a5c)
`child_process` no longer clones `process.env` when spawning with the default inherited environment. It pulls env pairs in one native pass, which should cut the JS-side overhead of process creation significantly on env-heavy systems.

**Crypto now rejects invalid update/digest encodings** (127f79a, 6b8001d, 718f044)
`Cipher`/`Decipher`, `Hash`, `Hmac`, `Sign`, and `Verify` now throw `ERR_UNKNOWN_ENCODING` for bad string encodings instead of silently accepting them and producing wrong output. This closes a correctness hole that could yield incorrect ciphertext/plaintext or digest results without any error.

**Recursive mkdir stops spinning forever on ENOENT** (69f3ae9)
`fs.mkdir({ recursive: true })` now retries a path that failed with `ENOENT` only once, preventing infinite loops like the procfs hang on Linux. That turns a potential 100% CPU lockup into a normal error path for both sync and async APIs.

**FFI rejects unsafe integer lengths and offsets** (b9bb1bd)
The FFI bindings now reject values above `Number.MAX_SAFE_INTEGER` before they can round into dangerous `size_t` conversions. This closes a real memory-safety bug where `2 ** 64` could be misread as `0` on 64-bit builds.

**Add embedder-isolate coverage for sibling Environment behavior** (70d8850, 670a077, 6fbab72, ae70f7e, 8bf7793)
Node adds substantial coverage for multiple `Environment`s sharing one embedder-owned isolate and event loop, including cleanup ordering and inspector behavior. The runtime also switches handle-cleanup tracking to a thread-local counter and asserts `IsolateData` outlives its Environments, making a tricky embedder lifecycle safer and better documented.

### Other misc changes
- QUIC build macros simplified to use `OPENSSL_NO_QUIC` (37a0b0d)
- Build fix for configs without SSL and SQLite (fa3e4c9)
- SQLite property-key caching cleanup (d782ae6)
- Nix/benchmark workflow tweaks (5e3bbc4, a3219b6)
- Docs updates for Node.js 27 toolchains and FreeEnvironment notes (9c67491, 8bf7793)
- Several test deflakes and expectation updates across inspector, HTTP, debugger, watch mode, cluster, and styleText (929b39c, e878931, 90c1ff6, 8e51a61, 76a5db6, aae38e4, d595888, 81f15ff, 524eb24)
- FFI and SQLite test maintenance (f71d644, 6b8bc0a, 822e8ef)
- Minor histogram test adjustment for V8 GC behavior (d7ea02d)
