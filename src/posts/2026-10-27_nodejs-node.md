---
date: 2026-10-27
repo: nodejs/node
size: M
title: "zlib gets raw zip reads and event fixes"
excerpt: "Node adds raw-content zip entry APIs, fixes once-listener removal reporting, and plugs an ffi dlopen leak amid several dependency updates."
commits: 13
authors: [nodejs-github-bot, trivikr, panva, aduh95, RafaelGSS, pipobscure, vedchaudhari]
commit_authors: {"c9b3082": trivikr, "7622ebb": pipobscure, "98dbf60": vedchaudhari}
---

### **zlib: add raw content read APIs for ZipEntry** (7622ebb)
`ZipEntry` now exposes `rawContent()`, `rawContentSync()`, and `rawContentIterator()` so callers can read the stored bytes exactly as they appear in the archive, without decompressing or verifying them. This fills a gap for file-backed and streaming entries that previously had no way to retrieve raw compressed content.

### **events: report the original once() listener on removal** (98dbf60)
`removeListener` now receives the user-supplied function for a removed `once()` handler instead of the internal wrapper. That makes the event consistent with the single-listener path and fixes observable listener bookkeeping for apps that inspect removals.

### **ffi: free libuv error message after failed dlopen** (c9b3082)
A failed `ffi.dlopen()` call was leaking the error message allocated by `uv_dlopen()` because the failure path returned before `uv_dlclose()` could release it. The fix explicitly closes the libuv handle after throwing, preventing the leak on repeated load failures.

### Other misc changes
- Update bundled dependencies: zlib, brotli, undici, npm engine range, gyp-next, and remark-preset-lint-node.
- Build/tooling cleanup: remove an unused FIPS export condition, stop linting GYP JS files, and refresh nixpkgs.
- Test fixture refresh for `test426`.
