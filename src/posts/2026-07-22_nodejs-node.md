---
date: 2026-07-22
repo: nodejs/node
size: L
title: "Diagnostics channel fix tops mixed maintenance day"
excerpt: "A process-crashing diagnostics_channel bug was fixed, alongside FFI integer validation, DNS cleanup, and several docs/internal changes."
commits: 7
authors: [aduh95, hanityx, MikeMcC399, trivikr, Qard]
commit_authors: {"15d5b8f": aduh95, "efc0a14": aduh95, "fbab458": trivikr, "594d0c5": Qard}
---

### **Diagnostics channel storage now grows safely** (594d0c5)
Node’s native diagnostics_channel subscriber storage no longer hard-caps at 1,024 channels and aborts the process when exceeded. The binding now allocates slots only for native publishers, grows the backing store as needed, and keeps JS/native channel state in sync across snapshots.

### **FFI fast path now rejects out-of-range integers** (fbab458)
Fast API FFI calls now validate narrow integers and 64-bit BigInt arguments before entering the trampoline, preventing silent truncation or wrapping. This brings the fast path in line with the generic FFI path and avoids hard-to-debug data corruption at the boundary.

### **DNS SetServers stops relying on deprecated c-ares APIs** (efc0a14)
`dns.setServers()` was reworked to build a CSV string and call `ares_set_servers_ports_csv()` instead of the older server-list APIs. This modernizes the implementation and keeps IPv6 handling aligned with c-ares behavior, including the existing limitations around link-local addresses.

### **Web Streams transfer drops the custom cloneable DOMException** (15d5b8f)
The bespoke `CloneableDOMException` wrapper was removed from webstreams transfer handling in favor of the platform `DOMException`. This simplifies the implementation substantially, though the change is mostly internal and aimed at reducing special-case cloning logic.

### Other misc changes
- Docs cleanup: fixed broken links/type-map entries and a typo in the releases guide.
- Added MikeMcC399 to the collaborator list.
