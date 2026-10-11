---
date: 2026-10-10
repo: oven-sh/bun
size: L
title: "TLS fixes, faster bun check, memory leak fix"
excerpt: "Big TLS consolidation, two bun check performance/correctness fixes, and a Blob ownership leak fix."
commits: 5
authors: [Jarred-Sumner, robobun]
commit_authors: {"6c1eb06": Jarred-Sumner, "71d0d43": Jarred-Sumner, "c6da4a4": Jarred-Sumner, "d2035cc": Jarred-Sumner, "1f6987c": robobun}
---

### **Major TLS hardening and API/docs cleanup** (6c1eb06)
Bun consolidated a large batch of TLS fixes across `fetch`, `node:tls`, `node:https`, WebSocket, and SQL, with new/clarified certificate handling and SNI behavior. The docs and types now cover `SSL_CERT_FILE`, `SSL_CERT_DIR`, mTLS `requestCert`, `rejectUnauthorized`, CRLs, Redis `serverName`, and stricter SQL SSL-mode precedence, so TLS configuration is both more capable and less ambiguous.

### **Fix Blob string ownership leaks on dropped bodies** (1f6987c)
`blob::Any` now owns its string arm correctly, so dropping a rejected `fetch()`/`Bun.spawn`/shell body releases the underlying string instead of leaking a ref. This closes a significant RSS growth bug and adds regression coverage for the affected request/body paths.

### **Make bun check handle deep interface chains in linear time** (c6da4a4)
Type relation and shape instantiation now avoid cubic blowups on long inheritance chains, which cuts `bun check` time dramatically on generated typings and similar code. The change also adds a targeted benchmark-style regression test to guard the fast path.

### **Fix bun check error handling and per-file flow state** (d2035cc)
`bun check --threads=1` no longer masks real errors, and files that hit TS2563-style flow limits stop poisoning later files. This makes diagnostics more reliable in long files and restores correct behavior for single-threaded checks.

### Other misc changes
- Version bump (`71d0d43`)
