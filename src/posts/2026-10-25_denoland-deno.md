---
date: 2026-10-25
repo: denoland/deno
size: L
title: "Brotli sync decompression now rejects bad input"
excerpt: "Deno patched node zlib brotli sync decompression to throw on malformed streams, closing a security-relevant correctness gap."
commits: 1
authors: [bartlomieju]
commit_authors: {"6e9f66f": bartlomieju}
---

### **Brotli sync decompression now errors on invalid streams** (6e9f66f)
`brotliDecompressSync` now surfaces an error instead of returning partial output when Brotli input is malformed, matching the async path. The patch also updates the Brotli dependency and adds unit coverage for invalid-input cases, addressing a security-relevant bug in Node compatibility.

### Other misc changes
- Brotl i crate version bump and lockfile updates
- Small internal zlib FFI/type adjustments
- New/updated unit tests for brotli decompression
