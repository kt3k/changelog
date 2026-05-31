---
date: 2026-05-30
repo: nodejs/node
size: L
title: "HTTP header validation lands, plus a security fix"
excerpt: "Node adds configurable HTTP header value validation and fixes a SAB-backed Buffer TOCTOU race, alongside cleanup and build/docs tweaks."
commits: 9
authors: [aduh95, legendecas, joyeecheung, mcollina, RajeshKumar11]
commit_authors: {"17e4196": aduh95, "51c89fa": RajeshKumar11}
---

### **Add configurable HTTP header value validation** (51c89fa)
Node now accepts an `httpValidation` option on `http.createServer()` and outgoing client requests, with `strict`, `relaxed`, and `insecure` modes. This gives apps explicit control over header-value validation, including a Fetch-aligned relaxed mode and an insecure mode that matches the parser leniency path.

### **Fix TOCTOU race when encoding SAB-backed Buffers** (17e4196)
The encoding path now snapshots shared backing memory before decoding UTF-8, and `Buffer` string slicing does the same for SharedArrayBuffer-backed views. That removes a race condition where the data could change mid-operation, which is important for correctness and safety.

### **Other misc changes**
- Build cleanup: removed duplicated `node_use_sqlite` / `node_use_ffi` conditions from `node.gyp`.
- Nix/V8 source definition refined for tarball-aware file handling.
- Duplicate sentences removed from a contributing doc.
- `internal/util` cleanup: removed unused helpers and tightened `kEnumerableProperty` initialization.
- Streams internals now reuse the shared internal `sleep` binding.
- Mailmap email entries flipped for Matteo Collina.
