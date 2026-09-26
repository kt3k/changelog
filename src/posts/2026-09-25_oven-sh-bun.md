---
date: 2026-09-25
repo: oven-sh/bun
size: L
title: "TLS, SQL, and build logic get major fixes"
excerpt: "Bun tightens TLS correctness, fixes SQL queueing and IP parsing, hardens fetch validation, and simplifies the build/link pipeline."
commits: 25
authors: [robobun, alii, dylan-conway, Jarred-Sumner]
commit_authors: {"9730163": dylan-conway, "754ea34": robobun, "e32be5c": robobun, "fda6445": robobun, "c86bd18": robobun, "0d73249": robobun}
---

### **Fix TLS server context updates for new connections** (754ea34)
`tls.Server#setSecureContext()` now actually swaps the default `SSL_CTX` used by newly accepted sockets, instead of leaving the old certificate and trust settings in place. The change also preserves listener-level SNI callbacks and refreshes cluster listen handling so late `addContext()` / `setSecureContext()` calls count.

### **Stop resuming sessions across differently configured SNI contexts** (e32be5c)
Bun now partitions TLS sessions by context configuration, so a session minted under one certificate/CA setup will not resume under a different SNI context. That closes a correctness and auth gap where client certificate verification could be skipped after SNI-based context switching.

### **Strict IP parsing closes host/CERT confusion bugs** (0d73249)
Numeric-host detection now rejects shorthand and ambiguous forms like `127.1`, `0x7f000001`, zero-padded octets, and CIDR-like suffixes. This brings URL/host handling in line with strict IP literals and prevents mismatches across fetch, sockets, SQL, UDP, and proxy/TLS paths.

### **Fetch now rejects invalid `checkServerIdentity` values and truthy returns** (fda6445)
`fetch()` now errors immediately if `tls.checkServerIdentity` is not a function, and it treats any truthy return value as a failure instead of silently approving the certificate. The docs and types were updated to match the stricter behavior.

### **MySQL queued query failures now fail the right request** (c86bd18)
A failed queued MySQL request no longer corrupts the queue by skipping the next query or leaving the bad request unresolved. The fix also preserves thrown non-object values as-is, which matters when parameter encoding throws primitives or `null`/`undefined`.

### **Build/link mode `archive-link` is removed** (9730163)
The build system drops the `archive-link` mode and switches to linking dependency objects as a lazy group. This simplifies the pipeline and removes the extra `libbun-<exe>.a` artifact.

### Other misc changes
- TLS socket error propagation for Duplex transports
- HMR topic unsubscribe fix in bake dev server
- TLS servername handling for IPv6 SQL hosts
- TLS handshake/reap correctness fixes for Bun.serve and WebSockets
- SNI tree lookup/removal now supports arbitrarily deep hostnames
- Proxy credential redaction in `node:http`
- `AbortHandle` ownership/listener refactor
- Dead-code cleanup across bake, WebCore bindings, and Rust crates
- CI / dependency bumps and workflow updates
