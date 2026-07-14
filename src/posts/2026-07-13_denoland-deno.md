---
date: 2026-07-13
repo: denoland/deno
size: M
title: "Crypto UUID batching lands; prebuilt retries added"
excerpt: "Deno sped up randomUUID generation, added retry logic for flaky prebuilt downloads, and aligned a Node deprecation warning."
commits: 3
authors: [nathanwhit, Medo-ID]
commit_authors: {"7e571f0": nathanwhit, "2c7aa39": nathanwhit, "e5aed78": Medo-ID}
---

### **Batch `crypto.randomUUID()` to cut native overhead** (2c7aa39)
Deno now generates UUIDs in 128-value batches, serving normal `randomUUID()` calls from JavaScript slices after each native refill. This reduces native transitions and improves throughput, while preserving exact RNG ordering for seeded runtimes and honoring `disableEntropyCache: true`.

### **Retry flaky prebuilt tool downloads** (7e571f0)
Prebuilt downloads now retry with exponential backoff on transient failures like network errors, 408, 429, and 5xx responses. That makes bootstrap/install flows more resilient to temporary CDN or network issues without hiding permanent 4xx errors.

### **Emit DEP0201 warning for `Duplex.toWeb({ type })`** (e5aed78)
Node-compat now warns when `options.type` is passed as the deprecated alias for `options.readableType`. This closes a compatibility gap for DEP0201 and should reduce surprises in code relying on Node’s deprecation behavior.

### Other misc changes
- Node compat test config updated to un-ignore the DEP0201 duplex stream test.
