---
date: 2026-03-30
repo: nodejs/node
size: M
title: "Crypto raw keys and simdjson 4.5 land"
excerpt: "Keygen now accepts raw key formats, simdjson and ngtcp2 were bumped, and libuv’s TCP keepalive customization was reverted for CI stability."
commits: 9
authors: [aduh95, nodejs-github-bot, panva, inoway46, jasnell]
commit_authors: {"0474a27": aduh95, "c3042c6": panva, "bdd1099": nodejs-github-bot, "b4387bd": nodejs-github-bot}
---

### **Crypto key generation now supports raw formats** (c3042c6)
Node’s key generation path now recognizes `raw-public`, `raw-private`, and `raw-seed` formats, with validation for public-vs-private usage and key type options. This expands what can be imported/exported through the crypto APIs and adds dedicated coverage for raw keygen behavior.

### **simdjson updated to 4.5.0** (bdd1099)
The embedded simdjson dependency was refreshed to 4.5.0, bringing a large upstream sync to Node’s JSON parsing internals. The update includes notable support changes in the vendored library, including bigint handling related to parser behavior.

### **TCP keepalive customization in libuv was reverted** (0474a27)
Node backed out libuv’s support for customizing `TCP_KEEPINTVL` and `TCP_KEEPCNT` after it caused Windows CI flakiness. This is a stability-focused revert, trading away the newer socket tuning knobs to keep the test and build pipeline reliable.

### **ngtcp2 bumped to 1.21.0** (b4387bd)
The bundled ngtcp2 dependency was updated to 1.21.0, pulling in a broad upstream refresh across connection, logging, packet, and BBR code. This matters for QUIC maintenance and keeps Node aligned with the latest library fixes and behavior.

### Other misc changes
- WPT URL fixture update
- Debugger restart test timing fixes
- libuv docs/API cleanup after keepalive revert
- CI/build tweak for duplicate checking
- configure.py libname handling fix
- Flaky AIX WPT Blob test disabled
