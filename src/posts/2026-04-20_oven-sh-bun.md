---
date: 2026-04-20
repo: oven-sh/bun
size: M
title: "Faster Zig builds, cleaner glob errors"
excerpt: "Bun speeds up shard-heavy Zig builds, fixes a glob FD leak, and tightens a Linux memfd test and binary-size CI baseline check."
commits: 4
authors: [dylan-conway, alii, Jarred-Sumner]
commit_authors: {"0fb375d": alii, "13fc588": Jarred-Sumner, "0e2d207": dylan-conway}
---

### **Build skips Zig's shard merge for faster linking** (13fc588)
Bun now avoids Zig’s single-threaded `-r` merge step when codegen is split across multiple threads, emitting shard objects directly and handing them to `lld` instead. The change also updates CI/build scripts to install and link the new shard outputs, which should cut large ASAN build times substantially.

### **Glob walker fixes an FD leak and removes dead arena frees** (0fb375d)
`GlobWalker` now closes `work_item.fd` before returning `NAMETOOLONG`, preventing a file descriptor leak on that error path. It also stops calling no-op arena frees on duplicate-match cleanup, avoiding redundant work and a misleading log-after-free pattern.

### **Memfd-disabled Linux test no longer trips E2BIG** (0e2d207)
The test now generates its 64 KiB payload inside the child process instead of inlining it into `-e`, which keeps argv under Linux’s per-argument size limit. It also relaxes stderr checks for ASAN debug builds, where the runtime can emit an expected warning.

### Other misc changes
- Binary-size CI now avoids comparing canary builds against release baselines, reducing spurious threshold failures on Windows.
- Docs and build-script tweaks related to the binary-size workflow.
