---
date: 2026-05-31
repo: oven-sh/bun
period: weekly
slug: 2026-W22
period_label: "May 25–31, 2026"
size: L
title: "Cross-builds, SIMD rewrites, and major hardening land"
excerpt: "Bun shipped cross-compiled macOS/Windows builds, sped up core codecs and string ops, and fixed a wide set of parser, SQL, and HTTP bugs."
commits: 80
---

### Build and release pipeline leaps forward
**Cross-compiled macOS and Windows builds from Linux** — Bun’s release pipeline now produces both macOS and Windows artifacts from Linux hosts, keeping native fleets focused more on testing while broadening CI/build capacity. This is a major distribution and maintenance shift for release engineering.

**Cross-language LTO is back on Linux** — The Rust release link now participates in full LTO alongside C/C++ objects, with compatibility fixups for linker summary checks and renewed support on linux aarch64-musl. This should improve optimized release builds while simplifying the mixed-language toolchain story.

### Core performance gets a SIMD-heavy overhaul
**Buffer, hashing, escaping, and headers all got faster** — Bun expanded SIMD use across binary/text conversion and string processing, including faster base64/base64url/hex Buffer paths, a Highway-backed xxHash3 replacement, a Highway SIMD rewrite of `Bun.escapeHTML`, and faster lowercase/header iteration. These changes target common hot paths in app and framework workloads.

**FormData and other serialization paths were tuned** — Multipart serialization avoids extra formatting and allocation work, and browser fallback bundles are now compressed at build time. Together with the string and header work, this points to a broad pass on throughput and startup efficiency.

### Parsers, minifiers, and runtime APIs got much safer
**Large hardening sweep across runtime subsystems** — The week brought a broad validation and bounds-check pass across install, networking, TLS, HTTP, shell, SQL, and several Node/web APIs, plus more targeted fixes for unsafe constructors, FFI callback ownership, module registry GC races, and main-thread teardown. This is the week’s biggest reliability/security theme.

**Several crash and hang bugs were closed** — Bun fixed quadratic transpiler hangs on duplicate-binding errors, exponential CSS nesting and `atan2()` parsing blowups, out-of-bounds/highlighter issues, nested JSX stack overflows, and a deleted-cwd crash in compiled executables. These are important stability wins for fuzzed and edge-case inputs.

**Parser and serialization correctness improved** — YAML conformance was tightened across multiple edge cases, sourcemap VLQs now fail on truncation, CSS custom pseudo names print correctly, and `Buffer.lastIndexOf` now honors its documented encoding overload.

### SQL, fetch, and text handling were corrected
**Database decoding got several accuracy fixes** — MySQL and PostgreSQL decoding saw multiple corrections: small NUMERICs preserve leading zero groups, YEAR values decode properly, DECIMALs now stringify correctly, and MySQL/Pg datetime handling now round-trips in UTC. SQLite also became more tolerant of invalid text and names, preventing data loss on non-UTF-8 input.

**Fetch and HTTP semantics were tightened** — `fetch()` now waits for TLS identity checks before writing the request, and HTTP routing normalizes absolute URLs before dispatch. Bun.serve also regained correct GC memory accounting under load, reducing RSS regressions.

### Other misc changes
- `fs.watch`/`watchFile` were lazily loaded to cut startup work
- `Bun.stringWidth` moved from Rust to C++ with explicit SIMD
- TextDecoder/TextEncoder legacy streaming and astral-buffer handling were fixed
- Inspect/debug adapter and shell glob behavior were hardened
- A new JSC microbenchmark suite was added to track engine regressions
