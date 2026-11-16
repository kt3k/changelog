---
date: 2026-11-15
repo: nodejs/node
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "Node hardens TLS/HTTP2 and removes async loader hooks"
excerpt: "Security releases, a breaking loader cleanup, and broad fs/stream/TLS fixes landed this week."
commits: 102
---

### **Security and protocol hardening dominate the week**
Node shipped three LTS security releases and a cluster of fixes across TLS, HTTP/2, and HTTP/1 parsing. The main themes were preventing parser re-entry and lifetime bugs, tightening HTTPS agent pooling and SNI/session behavior, and fixing http2 teardown, memory accounting, and an ALTSVC overflow. TLS also gained safer hostname validation, better session parsing/error handling, and a new certificate generation API for self-signed or issuer-signed v3 certs.

### **Async loader hooks were removed in favor of synchronous hooks**
The biggest breaking change was the removal of `module.register()`, `--experimental-loader`/`--loader`, and the async loader-thread machinery behind them. Module customization now goes through synchronous `module.registerHooks()`, so ESM/custom-loader users will need to migrate.

### **Filesystem, streams, and process behavior got a round of correctness fixes**
Several long-standing edge cases were fixed in `fs` and stream internals: `realpath()` now matches POSIX symlink resolution more closely, `readFile()` remains abortable on FIFOs/devices, `cpSync()` handles dangling symlink destinations, and `fs.writev()` retry logic now resumes from the correct offset. Stream work also improved write-path efficiency, preserved default read high water marks, and fixed `Utf8Stream` close/write races.

### **VFS and single-executable app support improved**
Single-executable applications can now cache code for all VFS-mounted JS and type-stripped TS modules at build time, making `useVfs` plus `useCodeCache` practical. Linux VFS loading was also fixed so repeated addon/library loads don’t collide via reused `/proc/self/fd/N` identities, and VFS mounts gained proper `readv`/`writev` support.

### **Bench, inspector, and docs saw meaningful polish**
`node:bench` gained GC controls, environment snapshots in reporters, and `doNotOptimize()` to help prevent dead-code elimination from skewing results. The inspector got shutdown/order fixes, package export/import docs were clarified, and crypto/X.509 docs and behavior were tightened to fail more predictably on invalid data.

### Other misc changes
- TTY state restoration now only writes back settings Node changed
- URL `href` setter now validates the receiver earlier
- `node --run` now skips filesystem errors more gracefully
- Glob matching and small TLS read buffering fixes
- Platform/build updates, dependency bumps, and assorted test deflakes
