---
date: 2026-03-08
repo: oven-sh/bun
period: weekly
slug: 2026-W10
period_label: "Mar 2–8, 2026"
size: L
title: "Bun hardens bundling, Windows I/O, and TLS handling"
excerpt: "This week brought a new bundler control for unresolved imports, plus several security and crash fixes across Windows, parsing, and TLS."
commits: 30
---

### **Bundler gains finer control over dynamic imports and manifest output**
Bun added an `allowUnresolved` bundler option/CLI flag to selectively permit non-literal `import()`, `require()`, and `require.resolve()` patterns via glob matching. It also fixed dynamic import export tracking for barrel modules and ensured HTML-referenced assets are carried into bundle manifests so `Bun.serve()` can keep serving them.

### **Windows runtime stability improved across file, path, and process APIs**
Several Windows-specific crash and correctness bugs were fixed: async `Bun.file()` reads now stay alive until completion and avoid leak/UAF paths, `fs.watch()` retries no longer segfault on poisoned watcher entries, `realpath`/`readlink` now return `ENOENT` instead of panicking on nulls, and process exit uses safer termination to avoid addon crashes. Path handling also preserves UTF-8 on `stat()`/`delete()`, and ARM64 builds now generate native `.bin` shims.

### **Security and parser hardening across buffers, HTTP, CSS, and RESP**
Buffer search APIs were made detachment-safe, closing a use-after-free class of bug. The HTTP chunked parser now handles split CRLF boundaries safely, RESP parsing caps nesting depth to 128, and CSS parsers were cleaned up to free partially built state on errors while fixing shorthand parsing regressions.

### **SQL, stdin, shell, and publish workflows got correctness fixes**
Large PostgreSQL batch queries now fail cleanly with a descriptive error instead of panicking past the 65,535-parameter limit. Linux pipe-backed stdin sizing now preserves unknown-size streams, shell interpolation keeps empty arguments intact, and `bun pack`/`bun publish` now refresh package metadata after lifecycle scripts mutate `package.json`.

### **TLS correctness tightened for proxy tunnels and custom DNS lookup**
Bun fixed an SSLConfig intern/deref race that could segfault during proxy tunnel setup, and preserved the original hostname for certificate verification when a custom DNS `lookup` returns an IP.

### **Other misc changes**
- Chunk watcher CPU spin fix on Linux inotify.
- Markdown list callback metadata now includes index, depth, ordered status, and start value.
- Vite 7 test integration updates and a Buildkite artifact lookup fix for CI links.
- Small docs, fixture, and typo cleanups.
