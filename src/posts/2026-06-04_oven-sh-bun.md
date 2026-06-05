---
date: 2026-06-04
repo: oven-sh/bun
size: L
title: "Proxy auth, crash fix, and tree-shaking win"
excerpt: "Bun fixed proxy Basic auth encoding, aarch64 crash-handler traps, and a bundler DCE bug; poll teardown got safer too."
commits: 6
authors: [robobun, alii, dylan-conway]
commit_authors: {"29f2c7e": dylan-conway, "977f054": robobun, "a3464c6": robobun, "59ec626": robobun}
---

### **Proxy Basic auth now uses standard base64** (a3464c6)
Bun now encodes `Proxy-Authorization: Basic ...` credentials with standard base64 instead of base64url, which fixes proxies that reject credentials containing `+`, `/`, or padding. The update also tightens the proxy tests to clear ambient proxy env vars so the explicit `proxy` option is actually exercised.

### **Crash-handler trap reset prevents aarch64 spin loops** (977f054)
The crash handler now resets `SIGTRAP` alongside other signals before its final trap, so aarch64 crashes terminate instead of re-entering signal delivery forever when a JS `SIGTRAP` listener exists. A regression test now spawns a child process and asserts it dies rather than spinning.

### **Bundler can tree-shake enum-keyed unused objects** (59ec626)
The JS parser now unwraps inlined enum-member keys when deciding whether a computed object key is side-effect-free, letting the bundler DCE unused objects that were previously kept alive. This fixes a real dead-code-elimination hole and adds coverage for both the removal case and the side-effectful key case.

### **Poll unregister now treats already-gone registrations as success** (29f2c7e)
`FilePoll::unregister_with_fd_impl` now treats `ENOENT` and `EBADF` from kqueue/epoll delete calls as successful teardown when the kernel-side registration is already gone. That avoids turning routine close/unregister races into errors and keeps the internal registration state from getting stuck.

### Other misc changes
- CLAUDE.md guidance updates (2 commits)
