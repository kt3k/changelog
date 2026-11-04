---
date: 2026-11-03
repo: oven-sh/bun
size: L
title: "Node crypto fixes and CSS layer ordering"
excerpt: "Compatibility fixes across node:crypto/net/http and CSS layer ordering, plus a cleanup of old duplicate-issue automation."
commits: 7
authors: [dylan-conway, alii]
commit_authors: {"675ee5b": dylan-conway, "a2691bd": dylan-conway, "3bf1a06": dylan-conway, "5e08ec1": dylan-conway, "01ec085": dylan-conway, "6a38049": alii, "6cdb383": alii}
---

### **Node compatibility fixes across crypto, net, http, quic, and workers** (675ee5b)
Bun tightened behavior to match Node in a broad set of runtime APIs, including socket timeout/pending-read handling in `node:net` and agent/request handoff logic in `node:http`. The same commit also updates crypto and certificate-related behavior, plus `worker_threads`/QUIC bindings, which should reduce edge-case incompatibilities for apps relying on Node semantics.

### **CSS bundling now preserves layer order and duplicate-import semantics** (6cdb383)
The CSS linker/printer was fixed so `@layer` statements keep their correct priority relative to `@import`, and duplicate imports retain the layers they introduce. This matters for real-world stylesheets because layer declaration order can change which rules win.

### **Anonymous CSS layer imports no longer lose sublayer declarations** (6a38049)
The bundler now keeps named sublayers that appear after anonymous layers instead of dropping the declaration too early. That fixes cases where duplicated or cyclic imports would previously print the wrong layer structure and alter cascade results.

### **Node crypto/X509 compatibility got another pass** (5e08ec1)
`X509Certificate` argument validation and result handling were aligned more closely with Node, and `Bun.password` / `Bun.CryptoHasher` gained related behavior updates and tests. This is another compatibility-focused crypto fix set, so it should improve correctness for certificate-heavy and hashing code.

### **Node crypto and WebCrypto support expanded further** (01ec085)
This batch adds broader digest/signature support and more Node-compatible crypto plumbing, including RSA PKCS#1 v1.5 cases and related BoringSSL integration changes. It also touches deprecation handling and internal crypto bindings, so it’s a substantive runtime compatibility update.

### **Other misc changes**
- Removed issue dedupe / auto-close workflows and the supporting script/docs (3bf1a06).
- Large internal Rust cleanup removing many `unsafe` blocks across core, resolver, and package manager code (a2691bd).
- Updated BoringSSL vendoring/build metadata and regenerated bindings (01ec085, 675ee5b).
