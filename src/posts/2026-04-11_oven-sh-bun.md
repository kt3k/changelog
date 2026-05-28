---
date: 2026-04-11
repo: oven-sh/bun
size: L
title: "WebCrypto, CSS, and HTTP method fixes"
excerpt: "Bun adds X25519 deriveBits, preserves CSS @layer ordering, accepts MKADDRESSBOOK, and lands a few targeted runtime/perf fixes."
commits: 6
authors: [robobun, Jarred-Sumner, sosukesuzuki, dylan-conway]
commit_authors: {"2324731": robobun, "6b9ee63": robobun, "4b1d889": Jarred-Sumner, "0ffd1b1": sosukesuzuki, "5c885fc": dylan-conway, "b930838": robobun}
---

### **X25519 deriveBits now works in SubtleCrypto** (6b9ee63)
Bun now implements `deriveBits()` for X25519 instead of falling back to an unsupported path, using OpenSSL's `X25519()` to derive the shared secret. The WebCrypto normalization path also gained exception checks, and there’s new coverage for the API behavior.

### **Bundler preserves leading `@layer` ordering rules** (2324731)
The CSS bundler no longer strips top-level `@layer theme, base, components, utilities;` statements when removing leading `@import`/ignored rules. This fixes a real Tailwind/cascade-layers regression where layer ordering declarations were disappearing from bundled output.

### **Bun accepts the `MKADDRESSBOOK` HTTP method** (b930838)
`Bun.serve` and `fetch()` now recognize `MKADDRESSBOOK` across Bun's duplicated HTTP method allowlists instead of dropping or rewriting it. That unblocks CardDAV clients and similar WebDAV-style workflows that depend on the method.

### **JSArray iteration gets a butterfly fast path** (0ffd1b1)
`JSArrayIterator` can now read directly from a JSArray's butterfly for `Int32` and `Contiguous` arrays when the prototype chain is safe, avoiding per-element `getIndex()` calls. This should improve array iteration-heavy paths, including the new blob-array benchmark and fetch regression coverage.

### Other misc changes
- CI/test failure previews now surface unchecked JSC exceptions more clearly. (4b1d889)
- macOS arm64 CPU feature detection now checks the correct `AdvSIMD` sysctl key, restoring NEON detection. (5c885fc)
