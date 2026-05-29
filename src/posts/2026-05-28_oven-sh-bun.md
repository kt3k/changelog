---
date: 2026-05-28
repo: oven-sh/bun
size: L
title: "Security hardening and SIMD wins"
excerpt: "Major hardening across HTTP, parsers, SQL, and CSS, plus new Highway-powered SIMD paths for hashing, escaping, and header iteration."
commits: 14
authors: [robobun, Jarred-Sumner, alii, dylan-conway, sosukesuzuki]
commit_authors: {"002dd41": Jarred-Sumner, "843549b": alii, "a740d91": robobun, "d632fc5": robobun, "63d5cd4": robobun, "29e38e9": alii, "67d6021": robobun, "510b517": alii, "f20c8dc": Jarred-Sumner, "472a06a": robobun}
---

### **High-impact changes**

**Highway SIMD xxHash3 replaces twox-hash** (63d5cd4)
Bun’s `xxHash3` implementation was rewritten around a runtime-dispatched Highway kernel, removing the Rust `twox-hash` dependency entirely. This improves throughput on CPUs with wider SIMD and makes hash performance adapt to the machine instead of compile-time backend selection.

**Bun.escapeHTML moves to a dedicated SIMD C++ binding** (472a06a)
`Bun.escapeHTML` was ported from Rust into a new C++ binding backed by Highway SIMD, with a fast passthrough path when no escaping is needed. That trims overhead on common inputs and makes the implementation faster than the previous Rust/Zig versions.

**Header iteration now lowercases faster with Highway SIMD** (67d6021)
WHATWG `Headers` iteration paths such as `Object.fromEntries(headers)` and `headers.toJSON()` now use a SIMD-accelerated lowercase path for uncommon header names. This speeds up repeated header enumeration and also adjusts the internal header map/bindings to support the optimized flow.

**CSS minification now keeps selector expansion bounded through nesting at-rules** (d632fc5)
The CSS minifier now recurses through `@container`, `@scope`, `@starting-style`, `@nest`, and related nested rule forms so selector expansion is counted against the cap even when an at-rule sits between nesting levels. This fixes a serious blow-up where small stylesheets could hang and expand into enormous output.

**StringJoiner now uses lifetimes instead of raw borrowed pointers** (f20c8dc)
The string-joining helper was refactored to track borrowed slices with Rust lifetimes rather than lifetime-erased raw pointers and manual drop logic. That closes off a class of unsafe aliasing/lifetime bugs while preserving the same joiner behavior for bundling and blob/sourcemap paths.

**HTTP, sockets, and package install hardening across many subsystems** (002dd41)
This round tightens validation and state handling across the package manager, HTTP stack, sockets/TLS, SQL clients, and parsers. It’s a broad security/stability sweep with regression tests, aimed at preventing malformed inputs from slipping through or corrupting protocol/state handling.

**Buffer.lastIndexOf now honors the encoding-as-second-arg overload** (843549b)
`Buffer.prototype.lastIndexOf(value, encoding)` was incorrectly searching from offset 0, which could return `-1` or the wrong match for valid substrings. The fix restores Node-compatible behavior for the documented overload and adds targeted coverage for encodings and offset edge cases.

**SQLite now decodes invalid UTF-8 leniently instead of dropping data** (29e38e9)
Short non-UTF-8 SQLite text values and schema strings now decode with replacement characters instead of collapsing to empty strings or disappearing. That fixes data-lossy behavior around both result values and metadata, and keeps behavior consistent across the short/long decode paths.

**Sourcemap VLQ parsing now fails on truncated segments** (510b517)
A truncated base64 VLQ segment could previously be treated as decoded zero, letting malformed sourcemaps parse successfully with wrong or empty mappings. The parser now rejects the truncated case instead of silently accepting bad input.

**CSS parsing avoids a forward-declared-function scope crash** (a740d91)
The TypeScript transpiler now discards a fake `if`-block scope created around a forward-declared function when the following statement opens a real block scope. This prevents an internal scope-stack panic during dead-code elimination/transformation.

### Other misc changes
- CI/build: cross-compile Windows artifacts from Linux (1 commit)
- Hardening sweep: input validation/protocol tightening across 24 subsystems (1 commit)
- Route large ANSI scans through Highway SIMD (1 commit)
- Embed browser polyfills as zstd-compressed blobs (1 commit)
- YAML parser refactor and empty-node anchor/tag fix (1 commit)
- Buffer/string/headers test additions and baseline allowlist updates
