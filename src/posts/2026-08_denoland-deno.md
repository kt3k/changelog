---
date: 2026-08-31
repo: denoland/deno
period: monthly
slug: 2026-08
period_label: "August 2026"
size: L
title: "Deno adds QuickJS, hardens security, and speeds core ops"
excerpt: "August brought an experimental QuickJS backend, major Node/web compat fixes, stricter permissions and security, plus notable runtime performance wins."
commits: 150
---

### **Experimental QuickJS backend and desktop/runtime expansion**
Deno introduced an experimental `quickjs` engine alongside V8, with `--engine v8|quickjs` support for `deno compile` and `deno desktop`, plus CI/release packaging for the new artifacts. Desktop also gained first-class runtime behavior for HMR servers, a clipboard API, richer menu item metadata, better packaging/signing behavior, and several fixes around window closing, binary value transport, and error handling.

### **Security and permission hardening across CLI, networking, and runtime APIs**
This month tightened a wide range of privilege boundaries: terminal output now escapes untrusted metadata, npm bin targets and tarball extraction are checked for path escape issues, inspector access validates host/origin and requires sys permission for `open`, `bundle()` correctly honors filesystem permissions, and fetch/module resolution now enforces deny rules after DNS resolution. Process spawning, package publishing, proxy handling, and various Node compatibility paths also picked up stricter input validation and auth checks.

### **Major Node/web compatibility improvements**
Deno continued closing gaps with Node and browser behavior across core APIs. Highlights include better `fs` ordering and `readdir` semantics, more accurate DNS error codes and `lookupService` behavior, safer `readv`, `require.resolve` permission checks, improved TLS, domains, `MessagePort`, `IncomingMessage`, `Buffer`, `TextDecoder`, `Blob`/`Body`, `Storage`, `EventTarget`, and HTTP/2/header handling. The Node compat suite was also refreshed to newer upstream releases, and JSR/LSP resolution now better handles prerelease-only packages and stable-vs-prerelease selection.

### **Performance and runtime correctness wins**
Several hot paths got faster or leaner: base64/base64url encoding moved to native Rust-backed ops, `SafeArrayIterator` was optimized, `AsyncRefCell` gained an uncontended fast path, the op future arena now grows on demand, snapshot rehydration dropped bincode, and compression no longer flushes on every write. Deno also fixed timer wakeups, HTTP keep-alive/body lifetime issues, code cache keying, UDP send/connect overhead, and a few memory-safety/race bugs in timers, decoding, and concurrency-heavy paths.

### **CLI, release tooling, and workspace ergonomics**
The CLI finished removing clap in favor of `deno_cli_parser`, with dynamic completions updated accordingly, and added workspace/task improvements like `task --members`. Release automation got a number of fixes for renamed crates, provenance reporting, cached publish retries, CDN purging, and manual post-publish reruns. Formatting and bundling also saw consistency fixes around stdin, `.editorconfig`, `--sourcemap`, and `deno outdated` behavior.

### **Other misc changes**
- Various internal refactors and test coverage updates across Node compat, fetch, crypto, FFI, N-API, and LSP.
- Dependency bumps and generated workflow/lockfile refreshes.
- Small docs fixes and baseline updates for newer Node types/tests.
