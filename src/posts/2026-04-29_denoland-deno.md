---
date: 2026-04-29
repo: denoland/deno
size: L
title: "Deno adds version bumping and install targeting"
excerpt: "New CLI subcommands and install flags landed, alongside a wave of Node compat fixes and a few performance wins."
commits: 33
authors: [divybot, bartlomieju, nathanwhitbot, crowlbot, JLCarveth, Tango992]
commit_authors: {"1ab3b70": bartlomieju, "59b5848": bartlomieju, "ad3ee5e": JLCarveth}
---

### **`deno bump-version` lands as a new CLI subcommand** (ad3ee5e)
Adds a dedicated version-bumping command with semver increments like major, minor, patch, and prerelease. This gives Deno a built-in workflow similar to `npm version` for updating package/workspace version fields.

### **`deno install` can now target other OS/arch combos** (1ab3b70)
Adds `--os` and `--arch` flags for cross-platform npm installs, making it possible to preinstall dependencies for deployment targets from another machine. It also wires the target system info through the installer so local installs resolve packages for the requested platform.

### **`deno install` gains production-only and type-skipping modes** (59b5848)
Introduces `--prod` to skip devDependencies and `--skip-types` to exclude `@types/*` packages during installation. That makes installs smaller and more deployment-focused, while keeping the more aggressive type-skip behavior opt-in under `--prod`.

### **Node compat coverage gets a large batch of fixes**
A number of Node.js compatibility bugs were fixed across DNS, HTTP/2, TLS, fs, sqlite, and inspector behavior, unblocking many more upstream tests. Standouts include preserving AsyncLocalStorage across HTTP/2 client streams, honoring `signal` in `fs.watch`, fixing TLS SECLEVEL key-strength validation, and aligning inspector websocket URLs with Node.js.

### **Performance work trims runtime overhead**
Deno capped V8’s background thread pool at 4 threads to avoid wasting cores on small workloads, and lazy-loaded WebSocket-related JS to cut snapshot size by about 50 KB. TextEncoder’s `encodeInto` also got a fast path for the common string-to-Uint8Array case, reducing per-call overhead.

### Other misc changes
- Enabled multiple already-passing Node compat tests
- Added Node `internal/priority_queue` polyfill exposure
- Switched `http2.resolveAny` handling to support real ANY queries and retry/maxTimeout behavior
- Added `import defer` experimental support
- Disabled two lint rules by default via `deno_lint` upgrade
- Minor test/config updates and other Node compat expectation changes
