---
date: 2026-09-16
repo: oven-sh/bun
size: L
title: "Security, stream, and zlib fixes land"
excerpt: "Notable TLS/CVE hardening, stream lifecycle fixes, and zlib performance work, plus several API/behavior corrections."
commits: 28
authors: [robobun, dylan-conway, Jarred-Sumner, cirospaciari]
commit_authors: {"1332495": robobun, "e7b1525": robobun, "91b9734": robobun, "1e31339": robobun, "baa67e3": robobun, "5f7cae4": robobun, "8705d89": robobun, "b8eacea": robobun, "a8e4e90": dylan-conway, "bec98aa": dylan-conway, "c6b7fcb": Jarred-Sumner, "55c1106": Jarred-Sumner, "403f36d": robobun, "9059e86": robobun, "cbf0119": robobun, "63a495c": Jarred-Sumner, "3397d0c": robobun, "a105560": robobun, "cf16723": robobun, "877a3f9": robobun, "f937cf4": robobun, "553523b": dylan-conway, "68d0888": dylan-conway, "f5649a7": cirospaciari, "b841a68": robobun, "ebc8dae": robobun, "c5d6ae7": robobun}
---

### **TLS hostname checks now IDNA-normalize and block wildcard edge case** (8705d89)
Bun now normalizes hostnames with `domainToASCII()` before server-identity checks, matching Node’s CVE-2026-48618 fix. It also stops `*` wildcards from matching the empty label produced by IDNA punctuation mapping, closing a certificate-validation bypass.

### **Fetch gains proxy env handling, NO_PROXY, and FetchSession** (63a495c)
`fetch()` now honors `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`, `NO_PROXY`, and explicit proxy overrides more consistently, and exposes `Bun.FetchSession` for per-session TLS/proxy/keep-alive settings. The patch also tightens error reporting for proxy tunnel failures, connection errors, file URL host validation, and server-identity behavior.

### **HTTP streams and request teardown stop leaking or hanging** (1e31339, cf16723, 9059e86)
Direct readable streams now settle ownership when the controller closes, rather than waiting on `pull()` to return, which fixes stuck requests and graceful shutdown hangs. Related HTTP/2/HTTP/3 work ensures responses end cleanly when streams close and that every decoded QUIC header block is delivered in order.

### **Node:zlib one-shot paths avoid an extra slice** (baa67e3)
`node:zlib` now takes output directly from the chunk instead of slicing it first, reducing allocation churn on small inputs. That should recover some of the regression introduced by earlier heap-sizing changes.

### **Node API shutdown gets stricter at teardown** (b841a68)
N-API calls are now rejected earlier and more consistently once the VM is stopping, matching Node’s teardown rules more closely. This prevents addons from calling back into JS after natural exit or finalizer teardown.

### **Bundler fixes invalid async-wrapper output** (5f7cae4)
`bun build` now avoids emitting `__INVALID__REF__` for dead top-level `await` and top-level `using` cases. That turns a broken generated module into a correct failure mode for edge-case inputs.

### **Node VM string joins now fail safely instead of aborting** (ebc8dae)
Several `node:vm` code paths that joined JS-provided strings now return an OOM-style error instead of crashing once they hit the string-length limit. This makes huge compile/error-message paths behave like other oversized string APIs.

### Other misc changes
- Faster zlib leak test coverage and output assertions (e7b1525)
- CI symbol-order lookup fix and post-link scan test adjustment (91b9734, 877a3f9, 553523b)
- `fs.open*` and watcher/resolver file descriptors now use `O_CLOEXEC` in more places (ebfad4e, 1332495, f937cf4)
- TLS session identity re-check behavior tightened for resumed sessions (b8eacea)
- `url.parse()` crash fix when argument validation throws primitives (a8e4e90)
- `util.aborted()` listener creation hardened against patched `Function.prototype.bind` (bec98aa)
- LLVM/Rust/WebKit toolchain upgrades and mimalloc bump (c6b7fcb, 55c1106)
- QUIC header delivery and send-headers ordering fixes (403f36d, 9059e86)
- React compiler operand ordering fix (3397d0c)
- `Bun.wrapAnsi` now throws `RangeError` instead of aborting on huge inputs (a105560)
- Install/test cache isolation and assorted test updates (cbf0119, c5d6ae7, 68d0888, f5649a7, b841a68)
