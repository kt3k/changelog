---
date: 2026-06-07
repo: oven-sh/bun
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "Bun hardens crashes, CSS, fetch, and package installs"
excerpt: "A week of major stability work: Bun patched DoS/crash holes in CSS, fetch, VM, and GC paths while tightening installer and bundler correctness."
commits: 71
---

### **Major stability hardening across runtime and tooling**
Bun spent the week replacing crash paths with recoverable errors in several core subsystems: `node:vm` cyclic module linking, sourcemap embedding overflow, Windows path conversion, DNS string handling, unreadable cwd auto-install, and a handful of GC/lifetime hazards. These fixes mostly target fuzzed edge cases and long-standing footguns, but several were user-facing crashes in real workflows.

### **CSS minifier and parser got multiple DoS fixes**
The CSS pipeline saw the biggest security/performance work: vendor-prefix amplification in minification is now capped before it can explode memory use, duplicate-rule merging runs in linear time, nested color/token-list parsing stops exponential backtracking, and grid parsing plus CSS rebuild failure handling were tightened. Together these close several fuzz-found hang/oom classes and make CSS handling more predictable under adversarial input.

### **Fetch, HTTP, and Blob semantics now match real-world expectations better**
Response decoding now honors case-insensitive encodings, empty compressed bodies are treated as empty, multipart metadata parsing is case-insensitive, and Blob slicing preserves its own size instead of widening to the backing store. Proxy handling was also corrected: CONNECT tunneling no longer leaks stale envelope bytes, and proxy Basic auth now uses standard base64 so more servers accept credentials.

### **Installer, resolver, and workspace operations are more robust**
`bun install` no longer panics on stale patch metadata or empty optional dependency names, and the resolver got overflow fixes for filename-store growth and `--bun` workloads. Workspace script spawning also stopped a use-after-free, while lockfile/storage internals were slimmed down with a bitset and other memory-layout fixes.

### **GC, streams, watchers, and worker lifecycle were tightened**
A cluster of lifetime bugs was fixed across Node-API references, `ReadableStream` locking/cancelation, `fs.watch`, zlib accounting, worker create/terminate loops, and bundler output-dir ownership. These changes reduce leak risk, remove GC hazards, and improve long-running process stability.

### **Bundler, REPL, and developer UX improvements**
The bundler now tree-shakes more enum-keyed object literals and avoids repeated path interning across builds; minification also picked up a few correctness/perf tweaks. On the UX side, `bun repl` preserves multi-byte UTF-8 input correctly and `bun update` keeps Unicode arrows intact.

### Other misc changes
- Crash reporting improvements, including better stack trimming and safer VLQ encoding
- NAPI finalizer behavior aligned with Node
- Poll/file watcher teardown fixes on macOS and across unregister races
- CI/test harness guardrails for platform tags, remote Docker, isolated tests, and fuzzing harnesses
- Misc internal refactors, WebKit bumps, and cleanup across parser, CSS, SQL, YAML, and test code
