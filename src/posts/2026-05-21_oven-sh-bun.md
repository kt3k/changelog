---
date: 2026-05-21
repo: oven-sh/bun
size: L
title: "Security hardening and crash fixes land"
excerpt: "Bun tightened request handling, fixed two rare Linux crash paths, and corrected macOS statfs results."
commits: 4
---

### **Fix rare concurrent transpile segfault in AST allocation** (12d77d1)
A rare crash in heavily concurrent transpile workloads was traced to mimalloc thread-local slot reuse, and the AST allocator was restructured to carry its own scoped state more safely. This also updates the bundled mimalloc revision and cleans up allocator ownership so the fix sticks across the runtime’s parser/bundler paths.

### **Stop forwarding SIGPWR in spawnSync signal handling** (832edbc)
Bun’s signal-forwarding path was inadvertently clobbering Linux’s SIGPWR, which JSC relies on for GC and scavenger thread suspend/resume. Excluding it prevents detached `openInEditor` flows from leaving the process vulnerable to GC-related termination.

### **Hardening pass across input validation and bounds checks** (0b20408)
This broad security-focused sweep tightens parsing and protocol handling across HTTP, websockets, SQL, path templating, CSS nesting, and package/install code. The biggest user-facing changes are an added MySQL auth option for RSA key retrieval, stricter HTTP/header validation, and safer path output to avoid escaping the intended output root.

### **Fix macOS x86_64 statfs layout mismatch** (753f1c4)
`fs.statfs` now calls `statfs64` on darwin-x64 so Bun reads the correct 64-bit-inode struct layout instead of a shifted legacy one. That restores accurate filesystem stats and prevents obviously wrong values like `bsize = 0`.

### Other misc changes
- Updated `statfs` tests to assert sane block-size/block-count values on POSIX.
- Added a regression test for `openInEditor` + GC signal handling.
- Misc internal allocator, runtime, and test cleanup across the above changes.
