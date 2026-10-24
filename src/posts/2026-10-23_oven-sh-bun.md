---
date: 2026-10-23
repo: oven-sh/bun
size: L
title: "Bun tightens bindings and CA handling"
excerpt: "Major bindgen schema overhaul, WebKit bump, and a fix for OpenSSL CA selection; CI pins and docs were updated too."
commits: 4
authors: [dylan-conway, sosukesuzuki]
commit_authors: {"6292c65": dylan-conway, "5c6d4e2": sosukesuzuki, "b70684d": dylan-conway, "1917b1a": dylan-conway}
---

### **Bindgen moves JS-callable Rust onto schemas** (6292c65)
Every Rust function callable from JavaScript now goes through a `*.bind.ts` schema instead of `#[host_fn]`/JS2Native helpers. That’s a structural API/codegen change that centralizes argument and return conversion, removes `CallFrame` from most Rust bindings, and expands bindgen support for things like `passThis`, `passCallee`, `rejects`, and `requiredArguments`.

### **`--use-openssl-ca` now actually excludes bundled roots** (b70684d)
Bun’s OpenSSL CA mode no longer silently appends the bundled Mozilla certificates, so restricted trust stores can truly replace Bun’s defaults. This is a security-relevant behavior fix for installs and runtime TLS, and the docs now spell out the new `SSL_CERT_FILE`/`SSL_CERT_DIR`/`NODE_USE_SYSTEM_CA` precedence.

### **WebKit upgraded to upstream 33ce3bf11a71** (5c6d4e2)
Bun pulled in a large WebKit refresh, which means a new JavaScriptCore base with hundreds of upstream changes. The repo also adjusted the AArch64 allowlist and added a new regression test for the upgrade.

### **Tooling images and Node were repinned** (1917b1a)
The repo’s CI and release tooling moved to Bun 1.4.4, and the bundled Node.js version jumped to 26.12.1. Because this touches the build images, headers, and several workflows, it’s a meaningful maintenance update even though the code changes are mostly pin updates.

### Other misc changes
- Updated bindgen docs for the new schema-driven model.
- Regenerated binding code for CSS, HTTP, and core runtime pieces.
- Added CLI documentation for CA-related flags across install/link/add/bunx/etc.
- Minor test and workflow updates around the new pins and WebKit refresh.
