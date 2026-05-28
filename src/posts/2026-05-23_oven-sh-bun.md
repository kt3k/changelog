---
date: 2026-05-23
repo: oven-sh/bun
size: L
title: "Bun hardens parsers, CSS, install, and runtime APIs"
excerpt: "A security-hardening-style day: crash fixes, parser correctness, a CSRF API extension, install trust checks, and a major ICU runtime feature."
commits: 27
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"5d1d351": Jarred-Sumner, "00e084c": Jarred-Sumner, "f8dcf1a": dylan-conway, "30c0071": robobun, "d1ed86d": robobun, "a4de1eb": robobun, "a06a00a": dylan-conway}
---

### **Frame-pointer crash traces replace brittle backtrace capture** (a06a00a)
Bun’s native crash handling now walks frame pointers directly instead of relying on unwind-table-based backtraces, which were unreliable in release builds and on altstack signal handlers. The change also centralizes source-location/symbol unwinding code in `bun_core`, so crash reports and stack trace tooling share one implementation.

### **CSRF tokens can now be bound to a session/principal** (5d1d351)
`Bun.CSRF.generate()` and `Bun.CSRF.verify()` now accept an optional `sessionId`, mixed into the HMAC as associated data without changing the token format. This closes a common replay gap: tokens can be tied to the requester’s session/user identity instead of being valid for any holder of the secret.

### **Trusted dependency checks now verify the exact package name** (00e084c)
Install-time trusted-dependency lookups no longer rely on a truncated hash alone; they also compare the original dependency name to avoid collisions. That makes `trustedDependencies`, `--trust`, and the install diff summary materially safer and more accurate, while preserving compatibility for legacy lockfiles.

### **Markdown link handling avoids quadratic scans** (30c0071)
`Bun.markdown` now precomputes bracket matches and caps nested link/wiki-link scans, eliminating worst-case quadratic behavior on inputs with lots of unmatched `[` or deeply nested link syntax. This is a performance fix that prevents pathological hangs and makes the API much more robust on untrusted text.

### **ICU runtime now supports per-item compressed data** (f8dcf1a)
Bun adds the runtime-side decompression hook needed for WebKit’s repacked ICU `libicudata` archive, along with broad Intl test coverage. This is a notable platform/runtime feature because it changes how ICU data is loaded at runtime and supports a smaller, compressed distribution format.

### **CSS parser fixes a nested-block backtracking blowup** (a4de1eb)
The CSS parser now remembers when an unclosed block has already been proven to run off the end of input, so backtracking parsers can fail fast instead of rescanning the same truncated suffix repeatedly. That removes an exponential-time hang on deeply nested invalid CSS.

### **YAML stringify now emits re-parsable anchor names** (d1ed86d)
Anchor names derived from property keys now fall back to safe generated names whenever the key contains characters invalid in YAML anchors. This fixes stringify/parse roundtrips for keys with special characters and avoids producing output Bun’s own parser could not read back.

### **Parser and transpiler stop crashing on malformed TS/JS edge cases**
Multiple parser-lowering bugs were fixed where valid or near-valid inputs could panic or emit unparseable output: template-literal/type-argument handling, contextual keywords, `export default interface`, block-scoped exports, and reserved-word class names from decorator lowering. These are correctness and stability fixes that matter because they were reachable through public transpilation paths.

### Other misc changes
- CSS fixes: `oklab()` fallback panic, `@page` selector roundtripping, and deep nested function backtracking
- Parser/transpiler fixes: `using` lowering in `switch`, namespace closure collisions, `this` in REPL, `instanceof`/`in` spacing, shell glob `!` handling
- TOML error surfacing on `Bun.TOML.parse`
- Patch API error propagation fix
- Spawn stdio default changed to inherit
- Semver malformed-range panic fix
