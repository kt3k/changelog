---
date: 2026-08-30
repo: oven-sh/bun
period: weekly
slug: 2026-W35
period_label: "Aug 24–30, 2026"
size: L
title: "Bun adds HTTP/2 and hardens compile, TLS, and runtime edges"
excerpt: "HTTP/2 lands alongside major compile-bytecode, TLS startup, resolver, and shell/runtime correctness fixes across Bun."
commits: 203
---

### **HTTP/2 support arrives in Bun.serve**
`Bun.serve({ http2: true })` now negotiates HTTP/2 over TLS on the same fetch handler and routing surface as HTTP/1.1, with fallback controlled by `http1`. This is the week’s biggest feature, and it ships with the surrounding client/server plumbing and type updates needed to make it usable.

### **Compiled executables got faster, smaller, and more portable**
Bun kept pushing on `--compile --bytecode`: bytecode is now aliased in place instead of copied, startup bytecode is prefetched, module graphs are laid out in load order, and embedded modules resolve more consistently across `import()`, `require()`, and `Worker` paths. The compiler also picked up cross-platform bytecode support and now embeds lazy builtin dependencies, making standalone binaries more self-contained and less fragile.

### **TLS and networking correctness were tightened**
TLS startup is faster thanks to lazily parsed root CAs and cached system bundles, while fetch now uses the URL hostname for SNI/cert checks instead of `Host`. Bun also fixed keep-alive reuse with custom `checkServerIdentity`, coalesced TLS 1.3 handshake writes, improved Unix-socket pooling after `cwd` changes, and hardened socket close/backpressure behavior in WebSocket and net paths.

### **Resolver, bundler, and transpiler behavior became more deterministic**
The TypeScript resolver now handles more extension rewrite and `exports`/`imports` cases, while the runtime transpiler cache now keys on defines and `--drop` to avoid stale output. Bundling/code-splitting also saw a large correctness pass: chunk naming and folding are more stable, barrel optimizations are safer, and compiled output is laid out more predictably.

### **Core runtime and platform bugs were fixed across fs, shell, and Windows**
Bun fixed several Node-compatibility and crash bugs: `truncate(undefined)` now truncates to zero, async recursive `readdir` fails fast, Git installs run on the install thread loop, shell command substitution no longer splits assignment values, and Windows errno mapping no longer turns real failures into success. There were also fixes for paused sockets, child stdin syscall reporting, `bun sqlite` empty SQL, and WebView process-pool exhaustion.

### **Other misc changes**
- Fake timers and `performance.timeOrigin` now stay in sync, and non-finite `now` values are rejected
- `bun install` got peer-dedupe, GitHub dependency, and lockfile migration fixes
- `bun:ffi`/`--no-addons` sandboxing was tightened with a new `--no-ffi-cc` flag
- Numerous test, docs, WebKit, and internal refactor/dead-code cleanup commits
