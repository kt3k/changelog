---
date: 2026-06-09
repo: denoland/deno
size: L
title: "Big week for node compat and core safety"
excerpt: "Node compat, module hooks, PFX parsing, and fast-call error handling all got meaningful fixes; several other bugs were tightened up too."
commits: 22
authors: [bartlomieju, lunadogbot, fibibot, divybot, scarf005, reasonableperson, manichandra, crowlbot, crowlKats, bddjr]
commit_authors: {"ba6bb3a": bartlomieju, "10fc2c7": bartlomieju, "9949f15": manichandra, "f424ae4": bartlomieju, "786e6e3": crowlbot, "4c25e11": lunadogbot, "ba5a0e4": bartlomieju, "86eee28": bartlomieju, "4cb40bf": fibibot, "afc421b": divybot, "57272d8": crowlKats, "1e2b845": bartlomieju, "01c3a03": fibibot, "35d3602": lunadogbot, "5fe5b77": bddjr, "70e67e9": bartlomieju}
---

### **Fast-call errors now stay native and avoid JS re-entry** (ba5a0e4)
Deno now builds op2 fast-call exceptions with native V8 APIs instead of re-entering JavaScript through `buildCustomError`. That closes a serious use-after-free class of bug and preserves the fast-call contract while still restoring custom error prototypes and metadata.

### **`module.registerHooks()` redirects now load from the delegated URL** (10fc2c7)
When a load hook calls `nextLoad(newUrl)`, Deno now tracks the redirect target through to the default loader instead of falling back to the original specifier. This fixes “Unsupported scheme” / “Loading unprepared module” failures and makes Node-style hook redirects behave correctly.

### **PFX loading now handles PBES2/AES-CBC bags and tighter KDF limits** (f424ae4)
`tls.createSecureContext()` can now load more PKCS#12 variants, including encrypted key bags that use PBES2/AES-CBC. The implementation also broadens the defense against attacker-controlled KDF cost by capping both PBKDF iterations and scrypt memory use.

### **Type checking now honors `@ts-expect-error` / `@ts-ignore` on unresolved imports** (01c3a03)
Graph-derived missing-import diagnostics now respect suppression comments, and `@ts-expect-error` is treated as consumed so TS2578 isn’t emitted spuriously. That makes `deno check` line up much better with TypeScript’s suppression semantics.

### **WebGPU bind-group offsets no longer panic on out-of-range views** (35d3602)
The Uint32Array fast path now validates against the view length, not just the backing buffer, and surfaces a validation error instead of panicking. This prevents malformed input from aborting the process during compute/render pass setup.

### **ASCII/hex/ucs2 buffer slicing got a major speedup** (5fe5b77)
Node buffer slice decoding was rewritten with new fast paths and zero-copy thresholds, including faster ASCII masking and hex encoding. This should materially improve hot-path string conversion performance for Buffer-heavy code.

### **TCP handle adoption now rejects tracked fds** (1e2b845)
`TCPWrap.open(fd)` now follows the same ownership rules as `PipeWrap.open`, refusing descriptors Deno is already tracking. That closes a double-ownership hole that could lead to fd reuse bugs and heap corruption.

### **HTTP/2 consumeStream now transfers TCP ownership correctly** (70e67e9)
The HTTP/2 session path now takes over the TCP handle’s allocation instead of leaving both sides able to free it. This fixes a double-free risk when a session is closed and the underlying TCP handle is later dropped.

### **`tls.createSecureContext` now accepts non-canonical RSA SPKI keys** (4cb40bf)
Node crypto key parsing was relaxed to accept RSA SPKI keys that weren’t canonicalized the old way. This fixes valid-key rejection in compat cases without changing the API surface.

### **`node:http` retry logic now replays direct writes on stale sockets** (afc421b)
The HTTP client now records direct socket writes so stale keep-alive retries can replay streaming bodies that bypassed the usual output buffer. That makes retry behavior more reliable for long-lived POSTs on reused connections.

### **Coverage HTML reports got a page-speed cleanup** (9949f15)
The coverage reporter’s HTML output was tweaked to score better in PageSpeed audits. It’s a small UX/perf polish, but not a functional change.

### **Node child-process fork sockets are now counted correctly** (ba6bb3a)
Forked child-process sockets are tracked properly so Node compat can pass `test-child-process-fork-getconnections.js`. This fixes a gap in the child-process socket accounting logic.

### **Global install import maps now resolve from the original CWD** (4c25e11)
Global installs now use the original working directory when resolving import maps, which fixes path resolution during install flows. This closes a long-standing install correctness issue.

### **`deno fmt --check` now has an explicit non-modifying test** (786e6e3)
Added coverage to assert that `deno fmt --check` doesn’t rewrite files. This is test hardening rather than product behavior.

### **The raw-mode permission prompt now handles stdin correctly** (86eee28)
The permission prompt no longer hangs when stdin is already in raw mode, which can happen in REPL-like setups. Instead of freezing waiting for a newline that never comes, Deno now detects the terminal mode and adapts.

### **OTEL metric interval `0` is now ignored** (57272d8)
A zero `OTEL_METRIC_EXPORT_INTERVAL` value is now treated as disabled/ignored instead of being accepted literally. That avoids a bad configuration edge case in telemetry setup.

### Other misc changes
- LSP rename/extract-refactor fix
- Flake lock refresh for rusty-v8 and rust-overlay
- Permission prompt wording fix for `-A`
- FFI type update for `Uint8Array<ArrayBufferLike>`
- Zlib/Brotli/Zstd buffer ownership cleanup
- Publish re-export default preservation fix
- Node TCP socket fd duplicate-close regression test
- WebGPU bounds/view tests and support code
- Misc test updates and dependency bumps
