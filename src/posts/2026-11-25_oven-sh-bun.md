---
date: 2026-11-25
repo: oven-sh/bun
size: M
title: "Redis binary replies and DNS safety land"
excerpt: "Redis got buffer-aware replies and TLS verification updates, while DNS and entropy handling were hardened against rare OS failures."
commits: 5
authors: [alii, dylan-conway]
commit_authors: {"0966e99": alii, "2e321d8": dylan-conway, "c87c8f7": alii, "d3588a3": alii, "12ebf31": alii}
---

### **Redis replies can now return buffers with `{ buffer: true }`** (c87c8f7)
Bun’s Redis client now supports buffer-mode for commands that return stored data, including transactional replies and `send()`. The types and docs were expanded heavily to model buffer-returning overloads and to make binary reply handling explicit.

### **Redis TLS now calls `checkServerIdentity`** (12ebf31)
The Redis client now exposes `tls.checkServerIdentity`, matching Node-style certificate hostname checks. This tightens TLS verification and lets callers customize or replace the name check during connection setup.

### **DNS and RNG no longer panic when the OS can’t provide entropy** (2e321d8)
Bun now treats missing system randomness as a recoverable failure instead of panicking, returning an error from DNS paths and deferring fast-random seeding until bytes are available. That avoids crashing under low-FD conditions, old Linux kernels, or restrictive seccomp setups.

### **Bun.diff gets broader tokenization and stricter option handling** (d3588a3)
Word diffs now behave better for non-Latin scripts and unsupported options are rejected more consistently instead of being silently accepted. The patch APIs also got clearer edge-case behavior around trimming and repeated application.

### **Other misc changes**
- `getBuffer()` deprecated in favor of `get(..., { buffer: true })` (0966e99)
- Docs and type updates for Redis binary replies and TLS verification (0966e99, 12ebf31)
