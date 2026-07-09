---
date: 2026-07-08
repo: oven-sh/bun
size: L
title: "Bun tightens streams, fetch, and Windows I/O"
excerpt: "Clone/body stream fixes, fetch timeout and decompress behavior, plus several crash, leak, and Windows path bug fixes."
commits: 18
authors: [robobun, Jarred-Sumner]
commit_authors: {"3353737": Jarred-Sumner, "4924862": robobun, "d996ec7": robobun, "807493b": robobun, "c03fea0": robobun, "cf5bf1b": robobun, "71867d9": robobun, "eead2f6": robobun, "f2a8df9": robobun, "5cede9c": robobun, "3ef9c08": robobun, "46ed10f": robobun, "bca6cd9": Jarred-Sumner, "d4bae54": robobun, "e10d444": robobun, "d5f3e79": robobun, "d14b997": Jarred-Sumner}
---

### **Fix `Response.clone()` from emptying observed bodies** (4924862)
`Request.clone()` / `Response.clone()` now tees an already-observed `.body` stream instead of detaching the cached stream first. This fixes a subtle 0-byte regression in common cache/proxy patterns where reading `res.body` before cloning used to silently drain the original.

### **Make upload aborts and TransformStream controller calls survive native teardown** (c03fea0, 807493b)
Bun.serve no longer crashes when an upload is aborted while a tee branch or transform controller is still in flight. The stream plumbing now tolerates controller access after the native sink tears down the readable, preventing SIGABRT/segfault cases during client disconnects.

### **Respect per-request fetch timeouts as idle deadlines** (3353737)
`fetch(..., { timeout })` now actually extends the socket idle timer instead of falling back to the global 5-minute default. This makes long-lived streaming responses, long polls, and LLM-style requests behave as callers expect.

### **Resolve fetch early when headers arrive, even if decompression later fails** (eead2f6)
Fetch now resolves once response headers are available, and body decompression errors surface on the body reader instead of rejecting the whole request. That aligns error timing with WHATWG fetch and removes packet-timing-dependent behavior for corrupt compressed responses.

### **Fix `bun build --compile` path rewriting for out-of-root entries** (71867d9)
Compiled entrypoint names no longer rewrite leading `..` segments to `_.._`, which had broken runtime resolution for things like workers targeting paths outside the bundle root. This removes a regression that made compiled artifacts fail to locate their own entrypoints.

### **Close leaked `fs.promises.FileHandle`s on GC** (46ed10f)
Dropped `FileHandle`s now get finalized: the fd is closed and an `ERR_INVALID_STATE` is raised, matching Node’s modern behavior. This plugs a real descriptor leak and makes forgotten `close()` calls visible instead of silently persisting until process exit.

### **Fix Windows HANDLE-backed stat/futime without leaking CRT fds** (d4bae54)
Windows `fstat`/`futimens` now operate directly on HANDLE-backed descriptors instead of creating throwaway CRT fds that could not be safely closed. This removes a per-call CRT slot leak and fixes HANDLE-backed file metadata calls for `openat`/`NtCreateFile` paths.

### **Fix N-API finalizer cleanup after pending exceptions** (cf5bf1b)
N-API cleanup now clears stale VM exceptions between finalizers so one addon’s failure doesn’t poison the next finalizer call. This prevents env teardown panics in addon-heavy worker exits and aligns Bun more closely with Node’s cleanup semantics.

### **Fix Unicode escape overflow and unterminated `\u{...}` acceptance** (d14b997)
The JS and TOML lexers now saturate on huge `\u{...}` escapes instead of overflowing, and they reject escapes that run off the end before `}`. This closes a parser crash and a correctness bug where malformed escapes could be accepted as valid characters.

### Other misc changes
- Fix nested `--bun` install self-referential node shim loop (d996ec7)
- Stop re-applying isolated-install patches once per peer variant (bca6cd9)
- Preserve `url()` query/fragment suffixes when rewriting CSS asset refs (3ef9c08)
- Fix `pbkdf2` keylen/iterations integer validation and `keylen=0` rejection (f2a8df9)
- Reset writable state after `end()` on file-backed stdout/stderr (5cede9c)
- Keep `StringDecoder.lastTotal` in sync after buffered partial completion (e10d444)
- Allow `bun:ffi` `dlopen()` of non-ASCII Windows paths via `LoadLibraryExW` (d5f3e79)
