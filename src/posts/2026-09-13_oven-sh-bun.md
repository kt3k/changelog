---
date: 2026-09-13
repo: oven-sh/bun
size: L
title: "Decorators, mocks, and stream fixes land"
excerpt: "Bun fixed a decorator lowering bug, made async module mocks work when promises settle later, and patched several runtime crashes and stream lifetimes."
commits: 6
authors: [robobun, Jarred-Sumner]
commit_authors: {"3f7f046": robobun, "051e39c": robobun, "0cbeffd": robobun, "09bb546": Jarred-Sumner, "a22b2aa": robobun, "f04caca": robobun}
---

### **Standard decorators now lower without reordering class members** (a22b2aa)
Bun’s decorator transform no longer moves decorated fields, static blocks, or decorator lists out of the class body. That preserves `this`/lexical context and member execution order, fixing incorrect runtime behavior for standard decorators and bare `accessor`s.

### **`mock.module()` now patches loaded modules after async factories resolve** (09bb546)
If a module is already imported and the mock factory returns a pending promise, Bun now updates the existing module exports when that promise settles instead of spinning forever. The API now returns a promise in that case, which makes async module mocking usable without hanging test runs.

### **Error printing no longer crashes on `error.code` String objects** (051e39c)
Bun now only treats `error.code` as a printable code when it’s a primitive string, avoiding `String` objects that can throw or abort during inspection. This fixes crashes in `Bun.inspect()`, `console.error()`, uncaught throws, and unhandled rejections.

### **HTTP/2 fetch avoids freeing a stream twice on terminal callbacks** (0cbeffd)
The HTTP/2 client now keeps streams alive through a re-entrant deliver loop when a terminal callback closes the session, preventing a use-after-free. This is a direct memory-safety fix for ASAN-reported heap corruption during `fetch()` over h2.

### **Native-locked readable streams are closed or errored when their sink ends** (f04caca)
Bun now tracks the stream locked by a native sink and ends it when that sink detaches, instead of leaving the stream hanging open. That tightens lifecycle handling for byte streams, file readers, and other native-backed readable streams.

### **Mimalloc is bumped and purge behavior is corrected** (3f7f046)
Bun updates its mimalloc fork and adds tests for forced purges waiting on an in-progress pass, plus purging memory freed during a pass on the next cycle. The change also keeps startup working with smaller JSC structure-heap reservations by enabling pagemap-backed frees.

### Other misc changes
- Documented the new async `mock.module()` behavior.
- Added TypeScript typings for `mock.module()` returning a promise in the pending-factory case.
- Expanded test coverage for the decorator transform, error printing, HTTP/2 fetch, streams, and mimalloc integration.
