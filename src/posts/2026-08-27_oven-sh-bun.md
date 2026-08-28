---
date: 2026-08-27
repo: oven-sh/bun
size: L
title: "HTTP/2 lands, plus several bug fixes"
excerpt: "Bun adds HTTP/2 serving, strengthens fs/tls/stream handling, and ships a handful of bundler and compile fixes."
commits: 25
authors: [robobun, Jarred-Sumner, dylan-conway, jvitormelo]
commit_authors: {"09559ed": robobun, "81d8663": robobun, "6d9577b": robobun, "3777bf0": robobun, "7fd3b23": robobun, "cc1853c": robobun, "ec70edb": robobun, "72ffcd8": robobun, "bedc5c0": dylan-conway, "c6f335f": Jarred-Sumner, "65362b5": dylan-conway, "595f97b": Jarred-Sumner, "0e395c2": dylan-conway}
---

### **Bun.serve gains HTTP/2 support** (c6f335f)
`Bun.serve({ http2: true })` now negotiates HTTP/2 over TLS on the same routes and fetch handler as HTTP/1.1, with fallback behavior controlled by `http1`. This is a major networking feature and a large surface-area change, including new client/server plumbing and type/docs updates.

### **Standalone `--compile --bytecode` works across target platforms** (65362b5)
Compiled executables can now carry portable JSC bytecode that launches on a different OS/arch than the build host. The change fixes a real crash class for cross-compiled binaries and adds a substantial new test matrix around bytecode portability.

### **`bun build --compile --bytecode` now embeds builtin module bytecode for non-host targets** (595f97b)
The compiler now serializes builtin module sources into a dedicated executable section so target builds can preload their internal modules, not just host-matching ones. That removes a major limitation in bytecode-backed standalone builds and makes the output more self-contained.

### **TLS 1.3 handshake writes are coalesced into one segment** (6d9577b)
Bun now sends the TLS 1.3 final handshake flight and the first `secureConnect` write together, avoiding the reset/error mismatch seen when a server rejects the client cert. This aligns Bun’s behavior with Node and fixes a user-visible connection teardown bug.

### **`--no-addons` now blocks `bun:ffi` `cc()`, and `--no-ffi-cc` is added** (72ffcd8)
Bun gets a dedicated `--no-ffi-cc` flag to disable runtime C compilation, and `--no-addons` now also disables `cc()`. This closes an important sandboxing gap for users running untrusted JS.

### **Async `fs.readdir(..., { recursive: true })` now stops on the first error** (09559ed)
The async recursive directory walk no longer spins forever when it hits a failing entry in a symlink loop-heavy tree. Instead of burning worker threads indefinitely, it now settles promptly with the underlying error, matching `readdirSync`’s fail-fast behavior.

### **A failed stream body no longer gets sent as a complete response** (ec70edb)
`Bun.serve` now treats body-stream failures before the first byte as incomplete responses instead of clean chunked terminators. That prevents clients from accepting truncated content as success and improves error handling for proxied and direct streaming responses.

### **Source errors now reach native stream sinks** (cc1853c)
When a `ReadableStream` feeding a native sink errors, the sink now sees the source failure instead of a clean close. This fixes corrupted/partial successes in cases like S3 uploads and HTMLRewriter transforms.

### **Recursive fs calls with Buffer paths no longer leak the Buffer forever** (0e395c2)
Async `node:fs` operations now release their pinned Buffer/TypedArray arguments correctly after dispatch. This fixes a long-lived GC-rooting bug that could keep large path buffers alive for the life of the process.

### **Async recursive readdir stops at the first error** (09559ed)
The recursive async readdir path now fails fast instead of letting all pool threads keep spinning after one entry errors out. That makes the promise settle correctly and avoids a hang on pathological directory trees.

### **CommonJS import rejection is checked after parsing/transpile normalization** (81d8663)
Bun now waits until after the import scanner/type-only import pruning to reject CommonJS files that still contain real import statements. That fixes false positives for TypeScript files whose import is erased during transpilation.

### **Bundler barrel optimizations are made more deterministic and safer** (3777bf0, 7fd3b23, bedc5c0)
One fix removes a nondeterminism source in barrel alias propagation, another prevents `sideEffects` arrays from incorrectly enabling barrel optimization, and a third ensures a redirect-style CommonJS entry still emits a real module instead of an empty file. Together these are important correctness fixes for build output.

### Other misc changes
- WebSocket proxy tests tightened and now record CONNECT requests.
- `bun install` peer-deduping fix for folder packages.
- FreeBSD release linking fix for `libutil`.
- LeakSanitizer suppression updated for renamed internal module generation.
- Several dependency, CI, docs, and dead-code cleanup commits.
