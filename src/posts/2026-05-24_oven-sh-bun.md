---
date: 2026-05-24
repo: oven-sh/bun
size: L
title: "Bun hardens against fuzzed crashes"
excerpt: "Multiple crash, hang, and OOM fixes landed across the transpiler, CSS, markdown, HTTP/2, crypto, and patching paths."
commits: 30
---

### **Transpiler and parser stack-overflow fixes** (159a4b7, 41aa672, 06b141d, 81a811b, 5da1ff8, 24e94ad, 9d5356a, 80df5b1, 08652f2)
Bun hardened several deeply recursive transpiler/parser paths that could crash on fuzzed input, including nested statements, nested expressions, TypeScript type recursion, decorator-related scope mismatches, and a few printer edge cases. These changes turn hard crashes into controlled errors and fix invalid printed output that could not be reparsed.

### **CSS minifier/printer got a broad safety pass** (2fbfcb9, dd0883d, 8dcbb44, 5bf4941, 543f2f9, 14b398c, a207a77, 02380d3)
The CSS pipeline picked up multiple fixes for OOMs, hangs, and panics in nested-rule expansion, container queries, color fallback handling, selector parsing, angle serialization, and vendor-prefixed nesting. Together they make minification much more robust against adversarial stylesheets and prevent exponential expansion in older-target compilation paths.

### **HTTP/2 framing now buffers complete header blocks** (3fa9635, af054d4)
The node:http2 implementation now reassembles HEADERS + CONTINUATION fragments before HPACK decoding, which avoids truncating header lists and keeps the dynamic table in sync. It also fixes GOAWAY framing so stream ID 0 is used in the header as required by RFC 9113.

### **Markdown rendering and parsing were de-quadraticized** (0deaf0b, aff1bb1)
Bun.markdown now caps deeply nested ANSI list indentation and memoizes failed inline HTML opener scans, removing two fuzzed hangs that could turn small inputs into linear-time or quadratic-time work. These fixes make markdown rendering far more predictable on hostile or malformed content.

### **WebCrypto and crypto input validation tightened** (39a8e56, 0179127)
Oversized BufferSource inputs are now rejected before they can trip allocator crashes in WebCrypto, and CryptoHasher no longer crashes on non-latin1 algorithm names. This closes two API-reachable crash vectors.

### **Patch application and renegotiation handling hardened** (d2f274d, a8aec30)
Patch application now avoids panicking when a rename target overflows the path buffer, and libusockets/OpenSSL renegotiation handling now enforces renegotiation limits to prevent server-driven CPU pinning. Both changes improve resilience against malicious inputs.

### Other misc changes
- Dependency update: elysia 1.4.28 (f271ddc)
- Input-validation and bounds-tightening sweep across 31 subsystems (a8aec30)
- Various test additions and internal refactors supporting the fixes above
