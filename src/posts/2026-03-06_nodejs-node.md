---
date: 2026-03-06
repo: nodejs/node
size: L
title: "Compression, REPL, and HTTP fixes land"
excerpt: "Node tightened web compression compliance, removed REPL’s domain dependency, and fixed an HTTP parser use-after-free."
commits: 14
authors: [panva, addaleax, efekrskl, mcollina, aduh95, Aditi-1400, Flarna]
commit_authors: {"3725bd2": panva, "7991cd2": panva, "a9da9ff": mcollina, "83f5cc7": Aditi-1400, "a06e789": Flarna}
---

### **Web Compression now matches spec error semantics** (7991cd2, 3725bd2)
Node’s Compression/Decompression streams now reject trailing garbage correctly and surface brotli decode failures as `TypeError`, aligning with the Compression Streams spec. The adapter also destroys the underlying stream on synchronous write errors so the readable side doesn’t hang.

### **REPL drops its dependency on `domain`** (a9da9ff)
The REPL now uses `AsyncLocalStorage` plus uncaught-exception capture callbacks instead of the deprecated `domain` module, while preserving async error handling, top-level await errors, and multiple REPL instances. This is a meaningful internal cleanup with API documentation updates and broad test coverage.

### **HTTP parser use-after-free fixed during pipelined request parsing** (a06e789)
A synchronous `close` during `llhttp_execute()` could free parser state while parsing was still on the stack, risking a crash. The fix marks parsers as being freed, aborts further callbacks, and adds a regression test for pipelined requests.

### **Crypto CA handling becomes per-environment** (83f5cc7)
`--use-system-ca` is now tracked per environment instead of globally per process, which matters for workers and other isolated environments. The change also reworks certificate store cleanup/loading paths and updates several TLS/system-CA tests.

### Other misc changes
- AsyncWrap internal-field refactors and leak hardening, plus a new debugging-only async context frame getter.
- WPT compression fixture/status updates and report-runner improvements.
- Added a new triager entry in docs.
- Minor crypto WebCrypto dictionary/importKey fixes.
- Shell/Nix builtin-modules-path tweak.
