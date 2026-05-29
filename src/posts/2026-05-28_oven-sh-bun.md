---
date: 2026-05-28
repo: oven-sh/bun
size: L
title: "Bun tightens parsing, hashing, and HTTP paths"
excerpt: "Major hardening and performance work landed across HTTP, CSS, hashing, YAML, SQLite, and string handling."
commits: 14
authors: [robobun, Jarred-Sumner, alii, dylan-conway, sosukesuzuki]
commit_authors: {"002dd41": Jarred-Sumner, "843549b": alii, "a740d91": robobun, "d632fc5": robobun, "63d5cd4": robobun, "29e38e9": alii, "67d6021": robobun, "f472981": Jarred-Sumner, "79a4029": dylan-conway, "510b517": alii, "b69085e": robobun, "3ec6669": sosukesuzuki, "f20c8dc": Jarred-Sumner, "472a06a": robobun}
---

### **Highway SIMD hash overhaul** (63d5cd4)
Bun replaced the `twox-hash` crate with a runtime-dispatched C++/Highway xxHash3 implementation, removing the compile-time SIMD split that hurt baseline Linux throughput. This is a major performance and architecture change for `Bun.hash.xxHash3`, and it also consolidates hash codepaths into the new `bun_highway` binding.

### **Bun.escapeHTML rewritten on Highway SIMD** (472a06a)
`Bun.escapeHTML` moved out of Rust into a new C++ binding backed by Highway SIMD, with a fast passthrough path when nothing needs escaping. The rewrite deletes the old Rust/Zig implementation path and should materially improve string-escaping throughput across workloads.

### **CSS nesting expansion is now bounded correctly** (d632fc5)
The CSS minifier now recurses through container, scope, nesting, and starting-style at-rules so selector expansion is counted even when nesting is interrupted by holding at-rules like `@starting-style`. This fixes a severe exponential blow-up that could hang builds and generate gigabytes of output from small inputs.

### **HTTP routing and client/socket handling hardened** (002dd41)
HTTP request routing now normalizes absolute URLs to path-only form before handing them to the router, which fixes mismatches for proxy-style request targets. The same round also tightens socket lifecycle handling and request-body/header behavior, reducing edge-case failures in the HTTP stack.

### **StringJoiner now carries lifetimes instead of raw pointers** (f20c8dc)
`StringJoiner` was refactored from lifetime-erased raw slices into a typed borrowed/owned model, removing a large unsafe ownership convention. That makes the data flow much harder to misuse and better matches how the joiner is actually used across bundler/runtime code.

### **SQLite now decodes invalid text and names leniently** (29e38e9)
Short non-UTF-8 `TEXT` values, error strings, column names, and declared types are now decoded with replacement instead of collapsing to empty strings or dropping fields. This fixes correctness bugs that could lose data or collide column names when Bun reads SQLite databases containing raw non-UTF-8 bytes.

### **Headers iteration and case-folding sped up with Highway** (67d6021)
WHATWG `Headers` iteration paths now use Highway SIMD to lowercase uncommon header names faster. This improves `Object.fromEntries(headers)`, spread iteration, `keys()`, and `toJSON()` for mixed-case headers, especially in header-heavy browser workloads.

### **YAML anchor/tag parsing fixed on empty nodes** (79a4029)
The YAML parser now correctly preserves anchor/tag properties on empty nodes instead of greedily attaching the next sibling as content. This fixes malformed parse trees for valid YAML constructs involving `-`, `?`, and `:` blocks.

### **Buffer.lastIndexOf now honors the documented 2-arg form** (843549b)
`Buffer.prototype.lastIndexOf(value, encoding)` now searches from the end when the second argument is actually an encoding string. That fixes wrong `-1` results and incorrect indices for the documented overload across common encodings.

### **Truncated sourcemap VLQs now fail instead of decoding as 0** (510b517)
The base64 VLQ decoder now rejects truncated segments rather than treating them as a successful zero-value decode. This closes a correctness hole where malformed sourcemaps could parse silently with bad or empty mappings.

### **TypeScript forward-declared function scope crash fixed** (a740d91)
The transpiler now discards the fake `if`-block scope introduced for forward-declared functions in single-statement branches. That resolves an internal scope-stack panic during TS transforms involving `if/else` followed by block-opening statements.

### **xxHash3, ANSI scanning, and browser fallback packing expanded** (b69085e, 3ec6669, f472981)
Bun added more SIMD-dispatched Highway kernels, compressed browser fallback bundles with zstd at build time, and switched Windows artifact production to Linux cross-compilation. These are mostly build/runtime infrastructure improvements, but they support the larger performance and distribution changes landed today.

### Other misc changes
- HTTP/TLS/socket hardening across package manager, parsers, and SQL clients (002dd41)
- Baseline allowlist and build metadata updates for new SIMD symbols (63d5cd4, 67d6021, b69085e, 472a06a, f472981)
- Small parser/minifier/internal cleanups and test additions
- Dependency and build-script adjustments
