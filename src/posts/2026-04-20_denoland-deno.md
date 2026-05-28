---
date: 2026-04-20
repo: denoland/deno
size: M
title: "Deno tightens node:tls compatibility"
excerpt: "Node TLS APIs now match Node validation more closely, and TLS can attach to Unix domain sockets plus JS stream plumbing was reworked."
commits: 1
authors: [bartlomieju]
commit_authors: {"ac0a7e6": bartlomieju}
---

### **Improve `node:tls` compatibility and Unix socket support** (ac0a7e6)
Deno’s Node TLS layer picked up broad Node.js parity fixes: stricter option validation for cipher, key/cert/CA, curve, engine, session, and server name inputs; immutable `tls.rootCertificates`; and export of `convertALPNProtocols`. It also adds TLS attachment for `PipeWrap`, enabling encrypted I/O over Unix domain sockets, plus a pull-based drain path for encrypted output on JS streams to avoid reentrancy issues.

### Other misc changes
- Node TLS internals refactored to share UV stream attachment logic between TCP and pipe handles.
- TLS write/enc-out handling adjusted for JS streams to use buffered draining instead of direct callbacks.
- Test config updated for the new node:tls behavior.
