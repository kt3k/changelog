---
date: 2026-07-21
repo: oven-sh/bun
size: L
title: "Bun tightens major Node parity and fixes key bugs"
excerpt: "Large day: dead-code purge, Node API fixes, post-quantum crypto support, shell semantics, and several critical runtime/CI bug fixes."
commits: 39
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"85ddc95": Jarred-Sumner, "48362e5": robobun, "6593ca2": robobun, "98fb0ac": robobun, "e84164b": cirospaciari, "2d6899d": robobun, "667074a": robobun, "76a7700": robobun, "4b868ee": robobun, "c07aae7": robobun, "602db99": robobun, "483bb32": robobun, "97935c2": cirospaciari, "a3daa75": cirospaciari, "c3d184f": robobun, "04708f7": robobun}
---

### **Dead Rust purge across the workspace** (85ddc95)
Removed ~39k lines of unreachable Rust from the AST/workspace layer. This is a major refactor that shrinks maintenance surface and reflects Bun’s shipped-artifact reality, where lots of cross-crate `pub` items were never reachable from actual builds.

### **Post-quantum `node:crypto` key support** (a3daa75)
Bun now accepts ML-DSA and ML-KEM key types for generation/import/export/signing paths, matching newer Node behavior and BoringSSL’s capabilities. This unlocks a new class of keys that previously failed with unsupported-key errors.

### **`perf_hooks.performance` now behaves like Node’s real global** (97935c2)
The module now exports the actual global performance object, restores missing Node-only surface area, and fixes entry prototypes/inspection output. That closes a broad compatibility gap for timing APIs and performance entries.

### **WebCrypto compatibility jumps, with error semantics and key ordering fixes** (e84164b)
WebCrypto support was expanded significantly against Node v26.3.0, with broader upstream test coverage now passing. The patch also aligns error behavior and KeyUsage ordering, which matters for apps depending on exact WebCrypto semantics.

### **`child_process` pipes now honor kernel backpressure** (6593ca2)
Stdout/stderr pipes now apply backpressure instead of buffering unboundedly in memory, so chatty children can actually block on a full pipe. This fixes both the memory blow-up case and late-reader data loss.

### **SQLite `serialize()` no longer uses a freed DB handle** (98fb0ac)
`bun:sqlite` now re-checks the database handle after name coercion, closing a use-after-free window when coercion closes the DB mid-call. That fixes an ASAN-reported memory safety bug and a release-build misreporting path.

### **`node:http2` now matches Node for settings and header exceptions** (483bb32, 48362e5)
HTTP/2 connection settings now expose `{}` while connecting instead of `null`, and header `toString()` failures propagate the user’s exception instead of being masked. These are small but important API/behavior corrections for real-world HTTP/2 code.

### **Shell brace expansion now matches bash more closely** (4b868ee, 76a7700)
Brace groups without a top-level comma are treated as literal text, and nested groups keep trailing empty variants instead of dropping them. Together these fixes prevent truncated shell words and incorrect expansion results.

### **YAML parser now rejects NUL bytes** (2d6899d)
`Bun.YAML.parse` no longer silently truncates input at U+0000; it now errors as the YAML spec requires. This prevents partial parses that could hide malicious or malformed trailing content.

### **Install streaming extraction got more robust and faster** (c07aae7, 04708f7, faa80d4)
Streaming tarball extraction now handles tiny first chunks correctly, coalesces drain wakes on the HTTP thread, and hints sequential reads for copy-file fallbacks. These changes reduce flaky install failures and improve large-package throughput.

### **Postgres request accounting is now idempotent** (c3d184f)
`finish_request` now tracks whether a request has already contributed to the in-flight counters, preventing double-decrements and underflow panics. This fixes a subtle connection-failure race in Bun SQL.

### **Diagnostics and CLI edge cases got hardened** (602db99, 667074a)
Parse diagnostics now count columns in UTF-16 code units, matching stack traces and source maps, and interactive update help text no longer overflows on very narrow terminals. Both are correctness fixes that improve developer-facing tooling.

### Other misc changes
- Dead code cleanup in `bun_sourcemap` and assorted Rust AST helpers
- CI/build script updates, release upload tweaks, and formatting changes
- Test maintenance: deflakes, deleted an unnecessary test, and refreshed expectation lists
- `process.reallyExit()` no longer emits `exit` listeners
- `util.types` boxed primitive checks fixed for modified objects
- `sys`: POSIX_FADV_SEQUENTIAL hint for fallback copy-file reads
- Minor shell/test alignment and socket termination regression coverage
