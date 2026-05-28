---
date: 2026-04-19
repo: oven-sh/bun
size: L
title: "Bun lowers Linux floor and adds build overrides"
excerpt: "Linux binaries now target glibc 2.17, memfd calls can be disabled/cached, Zig builds gained an override, and ReadableStream got a GC fix."
commits: 8
authors: [dylan-conway, Jarred-Sumner, carlsmedstad]
commit_authors: {"d398bd5": carlsmedstad, "7a79050": dylan-conway, "f53ef36": dylan-conway, "91d066b": dylan-conway, "55b62ef": dylan-conway}
---

### **Linux binaries now target glibc 2.17** (f53ef36)
Bun lowered its minimum supported glibc from 2.26 to 2.17, expanding compatibility to older enterprise distros like RHEL/CentOS 7 and Amazon Linux 1. The build now wraps additional glibc symbols (`getrandom`, `quick_exit`) and provides runtime fallbacks so newer features still work when available without forcing a newer link-time dependency.

### **memfd_create is now cacheable and disableable** (91d066b)
Bun now remembers `ENOSYS` for `memfd_create`, so repeated Blob/spawn fallbacks stop retrying a syscall that isn't available on older kernels or seccomp-restricted environments. A new `BUN_FEATURE_FLAG_DISABLE_MEMFD` also lets users force the fallback path for testing or sandboxing.

### **Bun builds can now use an external Zig install** (d398bd5)
`BUN_ZIG_PATH` now overrides the vendored Zig compiler, letting builds reuse an existing Zig installation instead of fetching Bun's pinned copy. The path handling covers `~` expansion and repo-relative paths, which makes the override usable in both configure-time and Ninja regen flows.

### **Parallel Zig is enabled on Linux local builds** (7a79050)
Bun bumped its parallel Zig commit and removed the Linux gate for local builds now that the self-hosted ELF merge produces a complete `bun-zig.o`. That should speed up Linux developer builds while CI and Windows stay on the stable compiler.

### **ReadableStream close callbacks no longer form a GC cycle** (55b62ef)
The WebCore stream source now stores `onclose` in a cached slot instead of a rooted `Strong`, breaking a reference cycle that could keep stream sources alive after release. The fix also adjusts close handling so callbacks are queued once and then cleared.

### Other misc changes
- Reverted the previous ReadableStream/Windows ref fix workarounds, replaced by the new cycle fix.
- Added and expanded docs for bunfig and install/kernel compatibility.
- Updated lifecycle/install configuration docs.
