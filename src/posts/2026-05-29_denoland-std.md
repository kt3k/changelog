---
date: 2026-05-29
repo: denoland/std
size: M
title: "Fix varint overflow and buffer handling"
excerpt: "`encodeVarint()` now rejects uint64 overflows up front and throws a clearer error when the buffer is too small."
commits: 1
authors: [truffle-dev]
commit_authors: {"cdf74a8": truffle-dev}
---

### **Fix `encodeVarint()` overflow and buffer-size handling** (cdf74a8)
`encodeVarint()` now checks for values above `uint64` before writing, preventing the silent truncation that could happen with the default 10-byte buffer. It also tightens the write loop to stop at the actual buffer length and returns a clearer error when the buffer can't hold a full varint, making failures explicit instead of inconsistent.

### Other misc changes
- Added regression tests for `uint64` overflow with the default buffer and for undersized buffers.
