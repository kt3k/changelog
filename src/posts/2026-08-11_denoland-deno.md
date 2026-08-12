---
date: 2026-08-11
repo: denoland/deno
size: L
title: "Node fixes land across fs, require, fetch"
excerpt: "Signal cleanup, readv semantics, require resolution permissions, Brotli validation, and proxy permission checks improved Deno runtime behavior."
commits: 6
authors: [nathanwhit]
commit_authors: {"978d2e6": nathanwhit, "fa9119e": nathanwhit, "40862be": nathanwhit, "f135fc0": nathanwhit, "2cccbb8": nathanwhit}
---

### **Signal handlers now unregister when resources are dropped** (978d2e6)
Dropping a signal stream resource now unregisters its process-wide handler, closing a leak where termination or table teardown could leave signals active after ownership ended. This matters for worker shutdown and other lifecycle paths where cleanup used to depend on explicit close calls.

### **node:fs readv now handles short reads correctly** (fa9119e)
`readv`/`readvSync` were reworked to stop after a single read and preserve EOF/short-read behavior instead of looping through descriptors. The new staging/scatter logic also keeps callback reads non-blocking while preserving empty, mixed-view, and overlapping-buffer semantics.

### **Node require resolution now enforces read permissions consistently** (40862be)
Filesystem stats and package metadata reads used during `require.resolve`/package lookup now go through Deno's existing read-policy checks instead of bypassing them for runtime-selected paths. That closes a permission hole where `node_modules` and `package.json` probing could proceed without the expected read authorization.

### **Brotli encoder operations are validated before use** (f135fc0)
The Node zlib Brotli path now rejects invalid operation values and unknown parameter indices instead of transmuting raw integers into encoder enums. This reduces the chance of misinterpreted native calls and adds regression coverage for both sync and async encoder flows.

### **Proxy transports now enforce permissions before connecting** (2cccbb8)
Fetch client proxy handling now checks the actual SOCKS, Unix, and VSOCK endpoints before opening connections, and rejects legacy proxy URLs with unsupported schemes up front. That aligns proxy validation with the transport actually used and prevents permission bypasses through direct-connect proxy paths.

### Other misc changes
- Removed unused internal HTTP raw-upgrade machinery and related tests/dependencies.
- Added/updated unit coverage for the changed Node and fetch behaviors.
- Minor refactors and cleanup in HTTP internals and supporting JS/Rust glue.
