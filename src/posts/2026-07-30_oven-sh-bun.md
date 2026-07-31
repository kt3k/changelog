---
date: 2026-07-30
repo: oven-sh/bun
size: L
title: "GC, search, and compile fixes land"
excerpt: "Major GC and string-search performance work, plus fixes for Windows compile checksums, timeout lifetimes, and lockfile cleanup."
commits: 22
authors: [robobun, Jarred-Sumner]
commit_authors: {"bbe3f6a": robobun, "c08f665": Jarred-Sumner, "30485cb": robobun, "b996add": robobun, "e7ddfeb": robobun, "176fc3f": Jarred-Sumner, "6b463d0": Jarred-Sumner, "070b0c9": robobun, "68ec9e5": robobun, "38e7e6f": robobun, "9a568e7": robobun, "53cb064": robobun, "ced23d8": robobun, "8fd862d": robobun, "bd548b5": robobun, "5b82486": robobun, "cb11e6c": robobun, "012a916": robobun, "fb03d39": robobun, "92cb332": robobun}
---

### **String search gets an O(n+m) worst-case path** (012a916)
`Buffer#indexOf`/`includes`/`lastIndexOf` now use a rare-byte SIMD filter with a guaranteed-linear Two-Way fallback across forward and reverse searches. This closes an adversarial O(haystack × needle) case and should improve both correctness under load and performance on hostile input.

### **GC scheduling is simplified to idle-only collection** (68ec9e5)
Bun drops the old per-tick heap sampler and one-shot GC timer in favor of an idle timer that only calls into JSC when the event loop is actually idle. That should cut unnecessary stop-the-world collections and reduce CPU/latency spikes in steady-state servers.

### **`Strong` now uses block-backed roots, reducing handle overhead** (b996add)
`bun_jsc::Strong` is reworked to allocate from `StrongRootBlock` instead of one handle node per strong reference, and `AbortSignal.timeout()` no longer keeps itself alive through an extra self-reference. This is a substantial runtime refactor that should lower GC-marking overhead and also fixes wrapper lifetime cleanup for timeout signals.

### **Windows `--compile` now truncates the emitted PE correctly** (30485cb)
After writing a compiled Windows executable, Bun now truncates the output file to the in-memory PE size before continuing. This fixes checksum validation failures caused by stale trailing bytes and should make generated `.exe` files match the expected PE layout.

### **PE checksums are corrected for compiled Windows binaries** (38e7e6f)
Bun fixes `OptionalHeader.CheckSum` calculation for `bun build --compile --target=bun-windows-*`, which had been emitting invalid values in every output executable. This matters because Windows tooling verifies the checksum, and incorrect values can break downstream validation.

### **Node `fs` BigInt stats now preserve pre-epoch nanoseconds** (8fd862d)
`BigIntStats` now computes timestamps from full second+nsec pairs instead of losing precision or mis-handling negative times around the Unix epoch. That brings Bun's `fs.stat`-style BigInt fields closer to Node behavior for older files and unusual timestamps.

### **`fetch()` idle timeout now enforces header-block deadlines** (5b82486)
The HTTP client now treats the response-header idle timer as an absolute deadline for the header block instead of re-arming on each trickled byte. This closes a stall where a server could keep `fetch()` alive indefinitely by dripping headers just often enough.

### **Dotenv no longer panics on nested default expansions** (bd548b5)
Parsing of nested `${...}` inside `${VAR:-default}` is hardened so malformed or nested expansions don’t crash the loader. This fixes a user-facing parser panic in `.env` handling.

### **Bundler naming templates stop crashing on unterminated `[`** (cb11e6c)
`[name`, `[dir`, `[ext`, `[hash`, and `[target` placeholders at the end of a naming template now degrade gracefully instead of panicking. The CLI and JS build API now return a valid result even when users pass malformed naming strings.

### **`bun lock` cleanup now removes orphaned optional-peer packages** (bbe3f6a)
`bun remove` no longer leaves behind `packages` entries that only existed because of optional-peer resolution slots. That keeps `bun.lock` stable and prevents stale package records from accumulating after dependency removal.

### Other misc changes
- Update mimalloc to upstream dev3 sync (c08f665)
- Test harness updates for async spawn/run helpers (e7ddfeb)
- Memory-measurement test harness switch to `rss()` (176fc3f)
- Deflake a few tests (6b463d0)
- `--no-orphans` Windows job-object fix and related test (070b0c9)
- Skip a flaky macOS no-orphans daemon test (ced23d8)
- Speed up and de-flake HTTP abort tests (9a568e7)
- Stop racing issue 20144 against the SIGKILL guard (53cb064)
- Freeze leaked fake timers between isolated test files (fb03d39)
- Remove dead code from webcore/ZigSourceProvider/react compiler (92cb332)
