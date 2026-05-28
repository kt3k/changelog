---
date: 2026-05-03
repo: oven-sh/bun
period: weekly
slug: 2026-W18
period_label: "Apr 27 – May 3, 2026"
size: L
title: "Bun adds experimental HTTP/3 and tightens memory safety"
excerpt: "HTTP/3 and HTTP/2 client work landed alongside major security, lifetime, and parser fixes across networking, workers, SQL, and shell paths."
commits: 198
---

### **Networking gets a big protocol boost**
Bun introduced experimental HTTP/3 serving via `Bun.serve({ h3: true })` and experimental HTTP/2 client support in `fetch()`, including protocol pinning and Alt-Svc-driven upgrades. Under the hood, the HTTP stack was hardened with stricter frame/body parsing, more defensive stream handling, and dedicated HTTP/3 client plumbing.

### **Security and memory-safety fixes were a major focus**
The week closed multiple high-severity bugs across core APIs and networking: `Buffer#copy`/`fill`, `Buffer.concat()`, structured-clone and deserialization paths, `crypto.randomFill`, WebSocket upgrades, TLS-over-duplex, HTTP/2 padding/chunk parsing, and MySQL/Postgres parsers. Several crashes and potential data disclosures were turned into safe errors or bounds-checked failures.

### **Worker, socket, and server lifetime handling was hardened**
Bun tightened teardown and refcounting in workers, MessagePorts, timers, server reload paths, WebSocket CONNECTING/terminate flows, and socket internals. That includes waiting for workers before VM shutdown, dropping stale refs on worker-owned ports, preserving socket handler state across reloads, and cleaning up upgrade/request objects more reliably.

### **Runtime and platform behavior expanded**
`process.execve()` landed for Node compatibility, `bun run` gained clearer `--no-orphans` behavior, and Bun.Image shipped as a full decode/transform/encode pipeline with ICC-preserving re-encode support. The week also brought a new rough tick-count timer backend and a compiled-binary fix for WSL1.

### **Filesystem, shell, and install correctness improved**
`fs.watch()` was decoupled from the bundler watcher and rewritten around native backends, shell path handling now rejects oversized `cd` inputs safely, brace expansion got a nesting fix, and `bun install --force` now properly overwrites corrupted global-store entries. There were also several targeted fixes for recursive `cp`, `readdir`, `readlink`, and watcher edge cases.

### Other misc changes
Various CI hardening, leak fixes, dependency bumps, test flake reductions, SQL cleanup, and minor parser/runtime refactors landed throughout the week.
