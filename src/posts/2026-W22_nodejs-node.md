---
date: 2026-05-31
repo: nodejs/node
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "Node hardens QUIC, adds runtime permission revocation"
excerpt: "QUIC gets major validation, rate limiting, and error reporting upgrades alongside permission dropping, HTTP header controls, and a few security fixes."
commits: 83
---

### **QUIC gets a major hardening and observability pass**
Node expanded QUIC with hostname verification and peer-cert validation modes, better endpoint abuse resistance, structured error reporting, and endpoint listing. New controls include block lists, per-host session rate limits, idle stream timeouts, and clearer failure messages for sessions, streams, and writers.

### **Runtime permissions can now be revoked**
`process.permission.drop()` lets apps irreversibly reduce granted permissions after startup. The docs clarify that already-open resources are unaffected, making the permission model more practical for least-privilege deployments.

### **HTTP and buffering behavior got notable updates**
Node added configurable HTTP header-value validation with `strict`, `relaxed`, and `insecure` modes, giving server and client code explicit control over parsing behavior. Separately, `Buffer.poolSize` increased to 64 KiB, widening slab pooling and likely improving throughput for common mid-sized allocations.

### **Security and correctness fixes tightened core data paths**
A TOCTOU race was fixed in SharedArrayBuffer-backed Buffer encoding/slicing, and crypto APIs now normalize `-0` key lengths to avoid native assertions. Root certificates were refreshed to NSS 3.123.1, which can change TLS trust outcomes for built-in CA users.

### **Stream, iterator, and async cleanup improved**
Several stream iterator edge cases were fixed so pending reads now settle correctly on cancel, error, or return, including shared and broadcast iterators. HTTP/2 session failure handling was also adjusted to fail asynchronously, and `compose()`/push-based stream paths were refined for saner backpressure and shutdown behavior.

### **Other misc changes**
- VFS now routes `fs` and `fs/promises` through mounted providers
- `TextDecoder` fatal fast path avoids duplicate UTF-8 validation
- ESM snapshot loading was made eager
- WebCrypto/docs/test coverage and assorted SQLite, FFI, storage, and vm fixes
- npm was bumped to 11.16.0 and several docs/tests/build tweaks landed
