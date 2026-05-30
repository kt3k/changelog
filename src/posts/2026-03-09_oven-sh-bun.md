---
date: 2026-03-09
repo: oven-sh/bun
size: M
title: "CI flake fixes and a Bun HTTP compile fix"
excerpt: "A test timeout was relaxed and made more diagnosable, while http.zig got a small compile fix for TLS server_name handling."
commits: 2
authors: [cirospaciari, robobun]
commit_authors: {"5ad21a1": cirospaciari, "11bc2d9": robobun}
---

### **Fix HTTP TLS server_name access in `http.zig`** (5ad21a1)
A one-line fix restores compilation by reading `server_name` through `props.get()` instead of accessing the field directly. This appears to correct a merge-conflict-related regression in Bun's HTTP/TLS path.

### **Harden and deflake the stdio passthrough test** (11bc2d9)
The flaky `it accepts stdio passthrough` test got a longer timeout for slow CI environments, especially Windows aarch64. The install step now pipes stderr and throws a clearer error on failure, which should make future CI diagnosis easier.

### Other misc changes
- Test cleanup and logging tweaks in `child_process.test.ts`
- Increased test timeout from 10s to 30s
- Minor internal variable renaming
