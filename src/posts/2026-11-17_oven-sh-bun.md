---
date: 2026-11-17
repo: oven-sh/bun
size: L
title: "Bun rewires core parsers and state machines"
excerpt: "Major refactors land across HTTP, Redis, SQL, DNS, shell, S3, and tests, plus crash-reporting and image-decoding fixes."
commits: 25
authors: [alii, dylan-conway, robobun]
commit_authors: {"30261e2": alii, "bd0219e": dylan-conway, "67d1f55": alii, "d567513": dylan-conway, "7bc51bb": alii, "aab4cd6": alii, "8b92a2b": alii, "61ef7e1": alii, "dc4a34e": dylan-conway, "93c2ed1": alii, "cc9beee": alii, "a6cf912": alii, "122cd81": alii, "5ada9ff": alii, "30bd4bc": alii, "d3d074e": alii, "52cf8be": dylan-conway, "9183b4e": dylan-conway, "f0b87b5": alii, "7ca8771": dylan-conway, "77ad7a5": dylan-conway, "0dff10a": dylan-conway}
---

### **HTTP/2 and HTTP parser internals move off C libs** (7ca8771, 9183b4e)
Bun replaces llhttp and ls-hpack with Rust implementations for HTTP/1 and HTTP/2. That removes the external parser dependencies and changes core request framing/compression behavior, including Node-compatible header-table handling and connection-close semantics.

### **Redis/Valkey command handling is refactored and fixed** (aab4cd6, 67d1f55, 93c2ed1, d3d074e)
The Redis client core and JS bridge were split into clearer state machines with less shared mutable state, and command generation now uses shared bodies instead of per-method copies. The follow-up fixes argument-shaping bugs around nullish values and tightens GC ownership so callbacks keep the right JS object alive.

### **Postgres and MySQL protocol cores are rewritten as enum-driven state machines** (7bc51bb, 122cd81)
Both SQL clients move protocol/session logic out of JS-coupled code into Rust crates with explicit enums and fewer borrowed JS types. This is a substantial internal simplification that should make the database paths easier to reason about and less error-prone.

### **HTMLRewriter sheds VM-level sink tracking** (30261e2)
The HTMLRewriter implementation is heavily reorganized: pipe state is consolidated into enums, handler wrappers now carry their pipe more directly, and a pile of old indirection types and VM bookkeeping disappears. This is a deep refactor of a hot API surface that should reduce complexity and leaked-state hazards.

### **Shell, S3 upload, cron, DNS, and test runner all get major state-machine simplifications** (5ada9ff, 30bd4bc, cc9beee, a6cf912, 8b92a2b, 61ef7e1)
Several subsystems were rewritten to remove JS-coupled state and duplicate control flow: shell builtins share one output path, S3 uploads are driven by a single sink-backed state machine, cron jobs move into a standalone crate, DNS resolves after c-ares returns, parallel test scheduling gets its own crate, and matcher logic is centralized. These are broad maintainability wins with direct behavior fixes mixed in.

### **CSS property tables become data-driven** (f0b87b5)
CSS property metadata is collapsed into one generated table instead of thousands of hand-written enum/match lines. This is a major codegen refactor that reduces drift and should make property additions and parsing changes much easier.

### **Crash reports now preserve signed return addresses** (bd0219e)
Crash handling is updated for WebKit builds that sign return addresses on arm64, and Bun now strips those signatures before walking frames or printing faulting registers. That makes stack traces and crash reports accurate again on PAC-enabled systems.

### **WebP lossy decoding matches libwebp for large coefficients** (d567513)
Large-lossy WebP coefficient handling is corrected so decoded pixels line up with libwebp again across CPUs. The fix adjusts the inverse-DCT path and adds golden coverage for the regression.

### **Filesystem, syscalls, and Windows wrappers are hardened** (77ad7a5, 0dff10a, 52cf8be, dc4a34e)
A broad cleanup routes libc/Win32 calls through `bun_sys`, tightens which wrappers are safe, and fixes a few Node-visible behavior differences like retry-on-`EINTR` and correct `rmdir`/`mkdtemp` semantics. The Windows and POSIX wrappers are also made safer and more explicit about ownership and handle behavior.

### Other misc changes
- Test-only JavaScriptCore regression bundle added.
- Dependency/version bumps and build-script updates.
- License/documentation updates for newly embedded third-party code.
- Small internal refactors and cleanup across bindings and helpers.
