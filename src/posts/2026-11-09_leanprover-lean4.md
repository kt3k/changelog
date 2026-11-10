---
date: 2026-11-09
repo: leanprover/lean4
size: L
title: "HTTP and process APIs get major fixes"
excerpt: "Lean4 tightens HTTP RFC compliance, improves process I/O and kill semantics, and fixes several runtime diagnostics and LSP issues."
commits: 12
authors: [algebraic-dev, TwoFX, david-christiansen, Kha, vihdzp, mhuisi, arthur-adjedj, thorimur]
commit_authors: {"392f865": algebraic-dev, "e5723d5": TwoFX, "bb1f614": Kha, "7c5f588": algebraic-dev, "d5cd016": algebraic-dev, "77ff2c4": TwoFX, "42f3d30": arthur-adjedj}
---

### **HTTP/1.1 server responses and framing now follow RFC 9110/9112** (392f865)
The HTTP server now distinguishes unsupported methods and unsupported transfer codings as 501s, ensures 205 responses carry no content, and adds proper `Date`/plain-text error responses when the server generates them. It also updates request parsing and framing rules to better match RFC semantics, which should make the server behave more predictably with real clients.

### **URI parsing and redirect handling are corrected** (7c5f588)
`Std.Http` now parses and prints URIs, request targets, and `Host` values more consistently, including preserving `=` in queries and treating `Location: /` as a root redirect. `decideRedirect` was simplified by removing two parameters, which changes how redirects are resolved and makes the API less error-prone.

### **HTTP server pipelining no longer waits on each socket write** (d5cd016)
The server can now continue processing the next request while a response is still being written, instead of stalling on every write. That should noticeably improve pipelined and keep-alive throughput, with the commit citing a 15–30% speedup.

### **Process I/O is revamped around concurrent input/output handling** (e5723d5)
`IO.Process` now feeds stdin in a dedicated task while stdout/stderr are read concurrently, avoiding hangs when a child blocks on output before consuming all input. The change also adds `Process.binOutput` for byte-oriented capture, which broadens process support beyond UTF-8 text.

### **`Process.Child.kill` now matches its documented semantics** (77ff2c4)
`kill` now takes a `force` flag and actually uses `SIGTERM` when `force := false`, while keeping `SIGKILL` as the default. This fixes the long-standing mismatch between the implementation and the docs, and the behavior is now explicit across Unix and Windows.

### **Loading `.olean`s now reports allocation and mmap failures clearly** (bb1f614)
If mapping an `.olean` fails and Lean falls back to `malloc`, the loader now checks allocation failure and reports a much more actionable error message. On Linux it also points at `vm.max_map_count` when the process may have hit the mmap limit, which should help diagnose large-project failures.

### **`reduceRec` gets a faster proof check** (42f3d30)
The kernel/meta reduction path avoids an expensive type-inference call when deciding whether a recursor major premise is a proof. This is a performance improvement in proof-heavy reduction, especially for cases that previously triggered repeated inference work.

### Other misc changes
- `Dyadic.toRat` marked as a coercion and related `norm_cast` lemmas added.
- `VersionedTextDocumentIdentifier` reverted back to `version?` after the LSP JSON change broke lean-beam builds.
- Stage0 snapshot updated.
- HTTP semantic-token/docstring theme handling adjusted.
- LSP/file-worker helper renames and JSON field call-site updates.
- HTTP test coverage expanded for the new RFC behavior and URI edge cases.
- Process-kill and process-output tests added.
