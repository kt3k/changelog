---
date: 2026-03-01
repo: oven-sh/bun
size: L
title: "Security, TLS, and install fixes land"
excerpt: "Several high-impact fixes: TLS cert handling, path overflow hardening, WebSocket handshake validation, zlib bounds checks, and install/CLI correctness."
commits: 40
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"5479251": robobun, "8501392": robobun, "9245860": robobun, "2cae6c3": robobun, "04eaa6c": robobun, "3101b80": robobun, "226d26f": Jarred-Sumner, "e5ac0ee": robobun, "553a5e0": robobun, "dff7191": robobun, "cda1e97": dylan-conway, "6cb9d5e": robobun, "f56700f": robobun, "4de50d2": Jarred-Sumner, "3e1e287": robobun, "bf5025b": robobun, "cd3f036": robobun, "61f3bcb": robobun, "915749f": robobun, "a393039": robobun, "9f88b3f": robobun, "488ef6d": robobun, "668d960": robobun, "c5f0e4a": robobun, "106a953": robobun, "0e98e44": robobun, "dc31aa1": robobun, "68d8bb5": dylan-conway, "977506c": robobun, "f06119a": robobun, "7ef4b1b": robobun, "f931515": robobun, "ea212ca": robobun, "1034fc9": Jarred-Sumner}
---

### **TLS `getPeerCertificate()` now matches Node and avoids handshake crashes** (2cae6c3)
`TLSSocket.prototype.getPeerCertificate()` now returns `{}` when a TLS handle exists but no peer cert is available, and `null` only when there is no handle. The TLS handshake paths also gained a null guard before `checkServerIdentity()`, fixing a crash during certificate verification.

### **Path resolution no longer overflows fixed-size buffers** (04eaa6c)
`path.resolve`, `path.relative`, and `path.toNamespacedPath` now size their work buffers with the current CWD and worst-case expansion in mind. This closes a heap overflow that could lead to nondeterministic segfaults on long relative paths.

### **WebSocket clients now validate `Sec-WebSocket-Accept`** (3101b80)
The upgrade handshake now checks the server’s `Sec-WebSocket-Accept` against the expected RFC 6455 value, instead of only checking that the header exists. That prevents stale or mismatched 101 responses from being accepted as valid upgrades.

### **Native zlib bindings now enforce bounds and argument validation** (8501392)
The native `write()`/`writeSync()` paths replace `bun.assert()` checks with real runtime errors for invalid flush values, buffer types, and slice bounds. That turns a release-build OOB risk into ordinary JS exceptions.

### **`writeEarlyHints()` is hardened against header injection** (9f88b3f)
`ServerResponse.prototype.writeEarlyHints` now validates both header names and values before serializing the 103 response. This closes a CRLF injection path that could smuggle arbitrary headers.

### **Shell interpolation and object-reference handling are stricter** (977506c)
Shell lexing and redirection now bound-check JS object references against the actual `jsobjs` array length, and the sentinel character is treated as special input. This tightens defense-in-depth around shell interpolation with user-controlled references.

### **Transpiler tsconfig lifetime bugs are fixed** (dc31aa1)
Async transform tasks no longer free `tsconfig` ownership prematurely, and `JSTranspiler` now cleans it up centrally. This fixes a use-after-free/double-free class of crashes when reusing a transpiler across multiple async and sync transforms.

### **Install, HTTP, S3, and CLI correctness fixes** (e5ac0ee, 553a5e0, 9245860, 5479251, 68d8bb5, 61f3bcb, 106a953, 0e98e44, a393039, cda1e97, cd3f036, f56700f, 668d960, f06119a, ea212ca, c5f0e4a, 3e1e287, bf5025b, 6cb9d5e, 915749f, 488ef6d, f931515, dff7191, 7ef4b1b, 1034fc9, 4de50d2, 226d26f)
### Other misc changes
- Reverted two previously landed fixes: `bun` default import bytecode handling and direct ReadableStream cancel behavior.
- Dependency bump: lolhtml to v2.7.2.
- CI/test harness tweak: use dots reporter in CI to reduce log volume.
- Docs/type cleanup: bcrypt rounds wording, S3 `contentEncoding` type, dead feature flag removal, and a no-validate leak snapshot update.
- Additional bug fixes across install, HTTP/2, dgram, S3 streaming, shell `rm`, crypto key parsing, CSS, fs path length validation, bundle output URLs, and transpiler decorator parsing.
