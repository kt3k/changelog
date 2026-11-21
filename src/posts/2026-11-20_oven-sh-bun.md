---
date: 2026-11-20
repo: oven-sh/bun
size: L
title: "Bun tightens AOT, IO, and compression behavior"
excerpt: "Major runtime refactors and behavior fixes land for AOT, fetch/archive decoding, and descriptor ownership; plus a zstd rewrite."
commits: 8
authors: [dylan-conway, alii, Jarred-Sumner]
commit_authors: {"a6c0af8": dylan-conway, "fee33bc": alii, "b116ab7": Jarred-Sumner, "3f3202e": dylan-conway, "09ad577": alii, "7bb427f": Jarred-Sumner, "1a07d0e": alii, "eaeb856": dylan-conway}
---

### **Replace zstd C library with Rust codec** (eaeb856)
Bun swaps out zstd 1.5.7 for in-tree Rust encoder/decoder crates, affecting `Bun.zstd*`, `node:zlib`, `fetch()`, `CompressionStream`, embedded assets, source maps, and ICU data. This is a substantial dependency and runtime change that should improve maintainability and makes the compression stack much more native to Bun.

### **fetch(), S3, and Archive get decompression and slice fixes** (3f3202e)
Compressed responses now decode at the consumer's pace across HTTP/1.1, HTTP/2, and HTTP/3, with damage detected when the body is actually read instead of earlier. `Bun.Archive` also starts honoring `Blob` slice ranges and adds limits for repeatedly gzipped inputs, tightening behavior and reducing edge-case surprises.

### **AOT now rejects incompatible flags and fixes compiler paths** (b116ab7)
`--aot` can no longer be combined with `--bytecode`; Bun now errors instead of silently preferring one mode. The change also updates compiler internals and test coverage around flag handling, making build-time compilation behavior more explicit and less error-prone.

### **IO pipes and readers now own descriptors by type** (a6c0af8)
Pipe readers/writers and several call sites move from bare descriptors plus side-channel ownership flags to `File`/`MaybeOwnedFile` types, removing a lot of manual hand-off and close logic. That’s a meaningful correctness refactor: ownership is now encoded in the type system, which should make descriptor lifetime bugs harder to introduce.

### **Blob file reads and writes share one fd job** (09ad577)
The blob subsystem consolidates POSIX read/write job plumbing into a single generic `FdJob<Op>` abstraction. This is a large internal refactor with no intended behavior change, but it significantly reduces duplicated park/wake/cancel/close logic and should make future file IO work easier to maintain.

### **AOT compiler mocks, diagnostics, and engine fixes** (7bb427f)
Bun adds more `bun test --aot` coverage around mocked preloads/hooks and tightens several compiled-program behaviors. It also brings in the corresponding WebKit updates, so this looks like an important follow-on stabilization pass for the experimental AOT path.

### **Redis retry state is modeled more explicitly** (1a07d0e)
The Valkey client moves retry counters into the states that can actually retry, instead of keeping a separate mutable field on the client. This is a refactor, but it makes the connection state machine harder to misuse and should reduce state bookkeeping bugs.

### **Other misc changes**
- Trusted dependency list update removed one package entry (fee33bc)
- Small dependency/workflow/package metadata updates around the zstd/WebKit tooling (eaeb856, 7bb427f, b116ab7)
- Minor docs/type updates for compiler/archive behavior (3f3202e, b116ab7)
