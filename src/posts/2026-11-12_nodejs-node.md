---
date: 2026-11-12
repo: nodejs/node
size: M
title: "HTTP/2 close fix headlines a mixed day"
excerpt: "Node fixes deferred GOAWAY flushing and an inspector teardown race, plus docs updates and tooling/test tweaks."
commits: 7
authors: [emerzon, manusingh090, fatihguzeldev, aduh95, sxa, nodejs-github-bot, bobnil]
commit_authors: {"6728a1c": emerzon, "4ad8171": manusingh090, "f4e89e7": fatihguzeldev, "8aa19d2": bobnil}
---

### **HTTP/2 now waits to flush the final GOAWAY until pending writes finish** (6728a1c)
If a close is requested while an outgoing write is still in flight, Node now keeps the session open just long enough to serialize the terminal GOAWAY after the buffer clears. That preserves the requested error code and avoids retrying writes against a failed transport or dropping the close notification.

### **Inspector handle teardown now happens before interface release** (f4e89e7)
The inspector client explicitly disconnects its main-thread handle before the interface can lose its last strong reference, preventing cross-thread posts from calling into a dying object. A new regression test covers the shutdown ordering.

### **Package docs now explain fallback arrays in exports/imports** (4ad8171)
The packages documentation now describes how target arrays are resolved: Node tries entries in order, skips only invalid targets or unmatched conditions, and does not fall through on missing files. This closes a long-standing gap in how conditional package resolution is documented.

### **TLS callback docs now spell out the `this` binding** (8aa19d2)
The TLS API docs now say that `SNICallback` and `ALPNCallback` are invoked with `this` bound to the `tls.TLSSocket` instance. That removes ambiguity for callback authors relying on instance context.

### Other misc changes
- Release/changelog updates for 27.0.0-alpha.0.1.0.
- Enabled strict yamllint in tooling and adjusted related workflow/Makefile comments.
- Bumped a histogram test iteration count after snapshot changes.
