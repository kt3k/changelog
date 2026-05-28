---
date: 2026-05-04
repo: nodejs/node
size: L
title: "HTTP correctness, WebIDL refactor, and Blob fix"
excerpt: "Several user-facing correctness fixes landed, plus a large WebIDL converter refactor and related test coverage."
commits: 15
authors: [aduh95, nsinfoPRO, deepak1556, ronag, mcollina, legendecas, panva, vassudanagunta, MikeMcC399, Renegade334, thisalihassan, marco-ippolito]
commit_authors: {"c21c664": ronag, "e0200f2": mcollina, "ff10199": panva, "9390c81": thisalihassan}
---

### **HTTP drain now waits for actual buffer drain** (c21c664)
Node now only emits `'drain'` for `OutgoingMessage`/`ServerResponse` once `writableLength` reaches zero, fixing cases where the event could fire while data was still buffered. That restores the expected backpressure invariant for callers relying on `write()`/`drain` behavior.

### **HTTP client now defends against prototype pollution in options** (e0200f2)
`http.request()` now merges request options into a null-prototype object instead of a normal object. This avoids inherited properties from `Object.prototype` being observed during option parsing, closing off a subtle correctness and hardening issue.

### **Blob rejects SharedArrayBuffer-backed parts per spec** (9390c81)
`Blob` construction now rejects `SharedArrayBuffer` inputs and SAB-backed typed array/DataView parts instead of accepting them through the generic buffer-source path. This aligns Blob behavior with the Web platform spec and prevents unsupported shared-memory inputs from slipping through.

### **Internal WebIDL converters were heavily refactored** (ff10199)
`lib/internal/webidl.js` was reworked into a documented shared converter module with broader coverage for primitives, dictionaries, enums, sequences, interfaces, integer coercion, and buffer sources. WebCrypto and other internals now use the shared converters, which should make behavior more spec-aligned and reduce duplication; the change also comes with new benchmarks and extensive test coverage.

### Other misc changes
- Workflow fix: pin notify-on-push to LTS Node.js to avoid false invalid-commit alerts.
- Inspector GN inputs fixed for PDL file regeneration.
- WebStreams helper cleanup and utility deduplication.
- Misc CI/workflow updates and dependency bumps.
- Build config tweak: remove armv6 from experimental platforms.
- Doc/manpage typo fix and license-header cleanup.
