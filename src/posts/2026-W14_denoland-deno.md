---
date: 2026-04-05
repo: denoland/deno
period: weekly
slug: 2026-W14
period_label: "Mar 30 – Apr 5, 2026"
size: L
title: "Deno leans hard into Node compatibility and production installs"
excerpt: "This week brought prod installs, default Node timers, fd-based I/O, broader crypto/process support, and a new native TLS foundation."
commits: 53
---

### **Production workflows got first-class support**
`deno install` now has `--prod` and `--skip-types`, and unprefixed packages in `deno install`/`deno add` default to npm. The week also added alpha/beta upgrade channels and then briefly introduced, then reverted, an unstable `deno tsconfig` command.

### **Node runtime compatibility moved forward in several big areas**
Global timers now use Node timer APIs by default, `node:fs` switched to real OS file descriptors, and sync child_process APIs gained Node-like `timeout`, `killSignal`, and `pid` behavior. The runtime also tightened fd handling across sockets, stdio, pipes, and TCP, centralizing ownership so Node and Deno layers see the same underlying files.

### **Crypto, TLS, and process plumbing saw major upgrades**
Node crypto compatibility improved with ChaCha20-Poly1305 support, stronger GCM validation, and better sign/verify behavior. Native TLSWrap landed in Rust as the foundation for Node TLS support, alongside secure-context normalization and more fd-based stdio plumbing for child processes.

### **Test, tooling, and interactive workflows got cleaner**
`Deno.test()` no longer fails by default on leaked ops/resources, REPL and Jupyter completions no longer need an embedded LSP, and `deno outdated` now reads npm’s `latest` dist-tag correctly. The forked TypeScript-go path was removed entirely, simplifying the type-checking stack.

### **Other misc changes**
Windows path permissions now compare case-insensitively; npm-linked package resolution and lockfile caching were fixed; BYONM shadowing now matches Node built-ins; WebTransport datagram overflow no longer hangs; notebook-cell URIs normalize correctly; `FileHandle.readLines()` lifecycle behavior was fixed; TCP `ref()`/`unref()` behavior was corrected; and several small docs, lint, CI, and internal binding cleanups landed.
