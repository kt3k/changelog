---
date: 2026-06-09
repo: oven-sh/bun
size: L
title: "SQL errors split startup failures from closed sockets"
excerpt: "Bun now distinguishes refused/early-close SQL connection failures, adds a new JS-visible error code, and tightens ArrayBuffer FFI safety."
commits: 4
authors: [alii, robobun]
commit_authors: {"88d48c2": alii, "0c6eefd": alii, "717542f": robobun, "0e95920": alii}
---

### **SQL now reports failed startup connections distinctly** (88d48c2)
Bun.SQL now separates a connection that was already established and later closed from one that never finished connecting. Postgres and MySQL startup failures like `ECONNREFUSED` or an early socket close now map to new `ERR_*_CONNECTION_FAILED` errors, while server-side startup errors keep surfacing separately.

### **ArrayBuffer no-copy constructors are marked unsafe** (717542f)
The JSC bindings now treat the no-copy ArrayBuffer/TypedArray constructors as unsafe, reflecting that they accept raw pointers that JS will dereference and later free through a callback. The Rust wrappers keep the safety contract at the public API boundary, reducing the chance of accidentally minting invalid JS-backed memory.

### Other misc changes
- Raised Darwin test step timeout from 30 to 40 minutes (0c6eefd)
- Fixed MySQL TLS test image config to write a valid `[mysqld]` section (0e95920)
