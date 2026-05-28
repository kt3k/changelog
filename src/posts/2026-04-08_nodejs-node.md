---
date: 2026-04-08
repo: nodejs/node
size: M
title: "ngtcp2 update lands, docs clarified"
excerpt: "ngtcp2 is bumped to 1.22.0 with TLS-integration API updates; docs also clarify UUIDv7 clock behavior and module resolution."
commits: 3
authors: [nodejs-github-bot, nabeel378, mcollina]
commit_authors: {"586403f": nodejs-github-bot, "2f8063e": nabeel378, "ff08094": mcollina}
---

### **ngtcp2 updated to 1.22.0 with handshake/API tweaks** (586403f)
Node’s vendored ngtcp2 is refreshed to 1.22.0, bringing a large set of QUIC/TLS integration changes across crypto backends and example clients/servers. The diff also adds a path-challenge callback variant and updates error-handling/documentation around interrupted handshakes, which may affect embedders using the crypto helpers.

### **UUIDv7 docs now warn about non-monotonic timestamps** (2f8063e)
The `crypto.randomUUIDv7()` docs now explicitly note that its embedded timestamp comes from a non-monotonic clock. This matters for callers relying on strictly increasing values for ordering or key generation.

### Other misc changes
- Module docs updated to match current ESM/CJS resolution rules, including removal of the extensionless CJS exception in `type: "module"` packages (ff08094).
