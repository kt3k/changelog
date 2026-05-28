---
date: 2026-05-18
repo: oven-sh/bun
size: L
title: "WebKit upgrade plus parser and runtime fixes"
excerpt: "Major WebKit bump landed alongside several crash fixes in the lexer, parser, password hashing, Blob/FileSink, and dev server."
commits: 11
---

### **WebKit upgraded to 2b257999 with Bun-side API rework** (390e0dc)
Bun picked up a large WebKit autobuild, which brought in upstream engine changes and required matching updates across Bun’s bindings and builtins. The biggest visible fallout is a `JSPromise` rework that removed old intrinsics and replaced them with new host hooks/private globals, so this is a substantive engine/runtime integration update.

### **Fix lexer recovery for bad JSX bytes in debug builds** (4c8a21b)
The main lexer now advances past `TSyntaxError` bytes instead of staying pinned on the same invalid byte, matching the JSX-element recovery fix from earlier. This closes a debug-only panic path where recovery could re-dispatch on the same byte and trip scope monotonicity assertions.

### **Reject out-of-range JSX numeric entities before UTF-16 encoding** (25ad47b)
JSX entity parsing now validates numeric values against the Unicode ceiling and returns a lexer error instead of feeding invalid code points into UTF-16 encoding. This fixes a debug assertion crash on oversized entities and makes the error path consistent for both overflow and out-of-range inputs.

### **Stop class-static-block parsing from firing outside classes** (a7dca12)
The parser now only treats `static { ... }` as a class static block when it is actually inside a class body. That prevents malformed object-literal input from producing an invalid AST and crashing debug builds.

### **Fix `Blob.name` lifetime in borrowed views** (ba15626)
`borrowed_view()` now clones `OwnedStringCell` instead of constructing it from a raw borrowed value, fixing a refcount/lifetime bug that could lead to crashes after GC. This matters because `BunFile.name` was observable across repeated writes and garbage collections.

### **Enforce Argon2 `memoryCost` minimum instead of silently clamping** (c47ec9c)
`Bun.password.hash()` now rejects Argon2 `memoryCost` values below 8 rather than silently rounding them up. That restores correct parameter semantics for the API and avoids producing hashes that misrepresent the caller’s requested settings.

### **Fix `FileSink.start()` when no path/fd is provided** (9ecb985)
`FileSink.start()` now handles the “open writer with empty options” case without hitting a debug assertion, and the stream setup path was simplified to pass the existing options through directly. This removes a crash for a common writer-start workflow.

### **Hoist dev-server stale-client registration out of `debug_assert!`** (31ec206)
The React Fast Refresh runtime registration now runs in release builds too, instead of being accidentally skipped because it was wrapped in `assert`. That fixes stale-client graph setup in the dev server.

### Other misc changes
- Lexer/TOML overflow and error-offset fixes (2 commits)
- Docs and TypeScript types updated for Argon2 minimums
- Added/updated regression tests for the above fixes
- Comment-only repo guidance change
- Package/version bump (1 commit)
