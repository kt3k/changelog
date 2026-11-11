---
date: 2026-11-10
repo: nodejs/node
size: L
title: "Linux VFS loader fix, fs and child_process hardenings"
excerpt: "A Linux addon-loading bug, realpath loop fix, abortable fs reads, and env inheritance correction headline the day."
commits: 13
authors: [nodejs-github-bot, pipobscure, christianaurichzm, Fuma2514, aduh95, everett1992, efekrskl, jazelly, yohannesjoya]
commit_authors: {"985ec87": pipobscure, "2aef805": everett1992, "6c8a697": christianaurichzm, "40aad9e": jazelly, "19f2d8e": yohannesjoya}
---

### **Fix Linux VFS addon/library path reuse** (985ec87)
Node now skips `/proc/self/fd/N` numbers that already identify a loaded object, preventing the dynamic loader from treating a freshly materialized memfd image as an already-loaded library. This fixes a Linux-only bug where the second addon or FFI library loaded from a VFS could resolve to the first one instead.

### **Make `fs.realpath()` resolve symlinks before `..` components** (40aad9e)
The JavaScript realpath implementation now mirrors `realpath(3)` more closely by preserving `.` and `..` while walking POSIX paths instead of collapsing them too early. That fixes pathological symlink chains that could loop forever, and keeps the native Windows behavior aligned with the JS implementation.

### **Preserve reassigned `process.env` for spawned children** (2aef805)
Child-process spawning now detects when `process.env` has been replaced with a plain object and copies that object instead of silently inheriting the stale native environment block. This restores consistency between the documented default env behavior and what `spawn()`, `exec*()`, and `fork()` actually pass to children.

### **Keep `fs.readFile()` abortable on FIFOs and devices** (6c8a697)
Non-regular files are now routed through the chunked reader instead of being read to EOF in a single threadpool job, so abort signals can be observed before an endless stream exhausts memory or blocks until the writer closes. This closes a real hang/OOM hazard for FIFOs and similar special files.

### **Prevent `cpSync()` from aborting on dangling symlink destinations** (19f2d8e)
`cpSync()` now uses the non-throwing filesystem equivalence check, so a dangling destination symlink is treated as a replaceable target instead of crashing the process. The copy proceeds normally and overwrites the broken link with the source file.

### Other misc changes
- Docs updates for `readable.read()` one-chunk behavior and contributor/collaborator list additions.
- Nix workflow review output aggregation improved.
- V8 patched to 15.6.75.50.
- simdjson updated to 5.1.1.
- WPT WebCrypto fixtures refreshed.
