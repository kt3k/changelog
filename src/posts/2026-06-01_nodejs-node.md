---
date: 2026-06-01
repo: nodejs/node
size: L
title: "Stream fixes, HTTP/2 semantics, and a speedup"
excerpt: "Two stream bugs fixed, HTTP/2 abort handling revamped, plus a UTF-8/Latin1 encode fast path and a ppcle build tweak."
commits: 9
authors: [trivikr, addaleax, joyeecheung, nodejs-github-bot, richardlau, aduh95, pimterry, mertcanaltin]
commit_authors: {"6813080": mertcanaltin, "37779fd": trivikr, "bb3f7e8": nodejs-github-bot, "c126cbf": trivikr, "5f96180": pimterry}
---

### **Stream push writer now handles falsy fail reasons** (37779fd)
`writer.fail(0)`, `writer.fail(null)`, and even `writer.fail()` now reliably transition reads to an errored state instead of leaving them pending. The added tests cover both pending and future reads, fixing a subtle hang in the stream iterator push path.

### **`pipeTo()` accepts synchronous `writev()` success** (c126cbf)
A duck-typed `writer.writev()` that returns `undefined` is now treated as synchronous success, matching the existing fallback behavior for `write()`. This avoids trying to attach a `.then()` to `undefined` after a batch write has already been accepted.

### **HTTP/2 abort and reset behavior is now explicit** (5f96180)
`Http2Stream` destruction rules were tightened and documented to distinguish clean exchanges, peer resets, and local teardown. The change adds `ERR_HTTP2_STREAM_ABORTED`, updates compatibility-layer behavior, and deprecates the old `.aborted`/`'aborted'` pattern in favor of error/close state checks.

### **UTF-8 encoding gets a Latin1 fast path** (6813080)
`Buffer` string encoding now tries a prescan-and-convert path that can emit a one-byte string for Latin1-compatible UTF-8 input, avoiding the heavier UTF-16 route. A new benchmark was added, and the fallback path was also reorganized to use a cheaper single-pass UTF-16 strategy for mid-sized inputs.

### **WebCrypto WPT fixtures updated for modern algorithms** (bb3f7e8)
The WebCrypto WPT expectations were refreshed to include post-quantum `ML-DSA` and `ML-KEM` coverage and the new `getPublicKey` operation. This keeps Node’s WebCrypto test matrix aligned with upstream WPT changes.

### Other misc changes
- Release bookkeeping for v26.3.0 and changelog/doc version updates.
- Build tweak: enable Maglev by default on Linux ppc64le.
- Debugger probe tests gained extra logging hooks.
- FFI benchmark option names were updated from `result`/`parameters` to `return`/`arguments`.
