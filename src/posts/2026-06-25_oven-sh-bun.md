---
date: 2026-06-25
repo: oven-sh/bun
size: L
title: "Bun hardens routers, patches, and markdown"
excerpt: "Multiple crash fixes and correctness fixes landed, including a patch-applier guard, router panic fix, and a markdown UAF repair."
commits: 7
authors: [robobun, cirospaciari]
commit_authors: {"5621c5d": robobun, "ed700c2": robobun, "de400b1": robobun, "237de94": robobun, "e112ac7": robobun, "d6a20b6": robobun}
---

### **Fix URLPath::parse panic on `?` and empty-decoding paths** (5621c5d)
`FileSystemRouter.match()` could crash when handed a bare query string or an input that percent-decodes to nothing, because `URLPath::parse` sliced past the start of an empty/short buffer. The fix clamps the slice bounds and adds coverage for the remote-crash cases.

### **Harden patch application against crafted panics** (e112ac7)
`bun install` / `patchInternals.apply()` could panic on malformed patch input, including empty file-creation hunks and headers that claimed more deletions than the target file contained. The applier now treats empty hunks as empty files and uses saturating arithmetic for capacity bookkeeping so untrusted patches fail safely instead of crashing.

### **Fix use-after-free in `Bun.markdown.react()` / `render()`** (d6a20b6)
Reference-style link and image metadata could outlive the temporary span detail they borrowed from, leading to corrupted `href`/`title` data and ASAN-detectable use-after-free. The renderer now stores owned copies for span metadata before building React/render output.

### **Report external crypto wrapper memory to GC** (de400b1)
Several `node:crypto` wrapper classes were allocating OpenSSL contexts and buffers without telling JSC’s GC about the native memory they retained. This change wires up extra-memory accounting across the wrapper types, which should improve GC behavior under crypto-heavy workloads and reduce hidden native-memory growth.

### **Fix `napi_is_arraybuffer` for `SharedArrayBuffer`** (237de94)
Bun was returning `true` for `SharedArrayBuffer`, diverging from Node/V8 semantics. The N-API binding now explicitly excludes shared buffers, aligning addon behavior with Node and tightening the API contract.

### **Remove stale `signal.is_dead()` assertion in blob piping** (ed700c2)
A debug assertion in `pipe_readable_stream_to_blob` was tripping on a synchronous S3-stream failure path, even though the underlying state transition was valid. Removing the assertion prevents the crash; the new test documents the synchronous-close edge case.

### **Other misc changes**
- Removed the `.zig` porting-reference sources and updated related docs/hooks/tooling (1 commit).
- Documentation, skill, and hook rename churn tied to the Rust-only cleanup.
