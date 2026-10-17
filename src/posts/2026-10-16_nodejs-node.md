---
date: 2026-10-16
repo: nodejs/node
size: M
title: "Node adds mock helpers and SEA VFS fixes"
excerpt: "Test runner mock conveniences, a SEA vfsArchive fix, and several reliability test hardenings landed today."
commits: 17
authors: [panva, RafaelGSS, araujogui, rozzilla, legendecas, dsanders11, HoonDongKang, nodejs-github-bot, bitpshr, pipobscure, Trott]
commit_authors: {"4096767": nodejs-github-bot, "f513ec7": araujogui, "f59539b": rozzilla, "9f2fb93": pipobscure}
---

### **Test runner mocks gain shorthand value helpers** (f513ec7)
`MockFunctionContext` now includes `mockReturnValue()`, `mockResolvedValue()`, and `mockRejectedValue()` as direct shorthand helpers for common `mockImplementation()` patterns. That makes test doubles easier to read and reduces boilerplate in the test runner API.

### **SEA vfsArchive mounts are now consistent across threads** (9f2fb93)
Single-executable apps built with `"vfsArchive"` now mount their archive at the `--vfs-load`-reserved layer in both the main thread and workers, so paths like the main script’s `__filename` remain loadable from workers. The change also blocks `--vfs-load` from being combined with `vfsArchive`, preventing conflicting mount-point usage.

### **URL percent-scan avoids rescanning plain prefixes** (f59539b)
`decodeFormComponent()` now passes the first percent position into the percent-hex check instead of rescanning the whole string from the beginning. This trims redundant work on long query strings while keeping decoding behavior unchanged.

### **Undici updated to 8.12.2** (4096767)
Node’s vendored `undici` dependency was bumped, bringing in the upstream 8.12.2 release and a large internal dependency refresh. This is a notable dependency update, but the commit itself doesn’t advertise a Node API change.

### **Worker timeout and inspector tests were hardened**
Several test fixes landed to make timing-sensitive cases less flaky under load: shared-isolate Worker exit waiting, inspector restart timing, report timeout retries, local port reservation, and periodic flush completion. These are reliability improvements rather than production behavior changes.

### Other misc changes
- Documentation updates for V8 backport guidance, `vfsArchive` behavior, and module hook deadlock warnings.
- Benchmarks adjusted for URL percent scanning, CPU pinning, and hidden-stack-frame error cases.
- Added an ABI registry entry and a new triager credit.
- Small test maintenance for SQLite statement placement and datagram membership coverage.
