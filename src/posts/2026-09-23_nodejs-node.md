---
date: 2026-09-23
repo: nodejs/node
size: L
title: "LTS, VFS, and crypto shifts land"
excerpt: "Node 22.23.3 ships alongside VFS cleanup, crypto FIPS fixes, and two embedder-facing runtime changes."
commits: 13
authors: [aduh95, panva, codebytere, pipobscure, mertcanaltin, nodejs-github-bot, motokaneyuki, yunshingng]
commit_authors: {"2899457": pipobscure, "a2c8da5": mertcanaltin, "342bf6d": aduh95, "87a4efb": aduh95, "c362db6": aduh95, "624b447": nodejs-github-bot, "381b962": panva, "6dfe4eb": codebytere, "fd1f3e5": motokaneyuki, "03fcd8b": yunshingng, "305cfcd": codebytere, "18c2b33": panva, "3d85c94": pipobscure}
---

### **Node 22.23.3 LTS release includes core dependency updates** (342bf6d)
Node.js published v22.23.3 "Jod" with refreshed root certificates and major dependency bumps, including Corepack, npm, ICU, OpenSSL, and Undici. This is the day’s broadest user-visible maintenance release and can affect TLS, package management, and runtime behavior.

### **VFS command-line surface is simplified around `--vfs-load`** (2899457)
`--vfs-mount` has been removed in favor of a single load-only flag that mounts source at a reserved Node-assigned mount point and runs from it. This trims an ambiguous CLI API, changes the docs and tests accordingly, and affects how VFS entry points and worker inheritance behave.

### **Recursive ZIP directory listings now work** (3d85c94)
`ZipProvider.readdir()` and `readdirSync()` now support `{ recursive: true }` instead of throwing `ERR_METHOD_NOT_IMPLEMENTED`. ZIP archives now enumerate nested paths and implied directories properly, which makes VFS ZIP support more complete and less surprising.

### **Crypto key availability now tracks current FIPS state** (18c2b33)
The crypto subsystem now refreshes algorithm availability when FIPS state changes, instead of relying on stale cached assumptions. This affects key generation, WebCrypto support checks, and warmed-worker transitions, so FIPS-enabled behavior should be more correct and consistent.

### **Freeing one Environment no longer breaks sibling JS execution** (6dfe4eb)
`FreeEnvironment()` now avoids globally blocking JavaScript in a shared isolate while it drains handles, preventing unrelated sibling Environments from throwing illegal-access errors. This is a real embedder/runtime fix for multi-Environment setups on one thread.

### **Embedder wasm streaming callbacks can now be preserved** (305cfcd)
Node can now skip installing its own wasm streaming callback when requested, letting embedders keep a custom `WebAssembly.compileStreaming()` hook across Node setup. This removes a long-standing integration footgun for hosts with their own fetch/network stack.

### **Other misc changes**
- SecureContext heap snapshot coverage moved to a pummel test (a2c8da5)
- Watch mode tests were deflaked and timing relaxed (381b962)
- Docs clarified Worker `execArgv` vs permission grants (03fcd8b)
- `Blocklist.isBlocklist` docs gained a return type annotation (fd1f3e5)
- WPT URL fixtures were updated (624b447)
- Intel macOS support was downgraded to experimental in build docs (c362db6)
- Reverted a Makefile fat-binary change (87a4efb)
