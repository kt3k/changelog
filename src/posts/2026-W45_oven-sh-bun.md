---
date: 2026-11-08
repo: oven-sh/bun
period: weekly
slug: 2026-W45
period_label: "Nov 2–8, 2026"
size: L
title: "Bun rewrites AOT compiler and hardens runtime compatibility"
excerpt: "Major AOT compiler work lands alongside Node crypto/CSS fixes, safer Rust internals, stricter downloads, and tarball auth improvements."
commits: 23
---

### **AOT compiler rewrite lands**
Bun introduced the new ahead-of-time lowering pipeline, with rewritten program scanning/linking/walking, closure capture handling, straight-line block joining, and CommonJS/ESM graph support. The rollout also added bench tooling and refreshed docs/completions around the new flow.

### **Runtime compatibility improved across crypto, net, HTTP, and CSS**
A broad set of Node-compat fixes tightened behavior in `node:crypto`, X509 handling, `node:net`, `node:http`, QUIC, and worker bindings. On the frontend side, CSS bundling now preserves `@layer` ordering and duplicate-import semantics, fixing cascade bugs in layered stylesheets.

### **Package installs and downloads are safer**
The package manager now applies configured credentials to project tarball URLs, closing an auth gap for tarball-based dependencies. Bun also hardened Windows bootstrap downloads by verifying xwin archive SHA-256s before unpacking and reusing the same checksum flow for Ninja.

### **Rust internals continue a large unsafe cleanup**
Several commits removed or narrowed unsafe code across the VM, DNS, timers, event loop, fs, fetch/Response, streaming, AOT, zlib, c-ares, BoringSSL, QUIC, and parser/printer paths. A few low-level interfaces were also reclassified as unsafe-to-call where the preconditions were previously implicit.

### **Other misc changes**
- Crash traces on Linux arm64 now strip PAC signatures from return addresses.
- Windows image CI moved to Azure OIDC/federated auth.
- Linux CI images now exclude the SSH server.
- Prisma guides were updated for Prisma ORM 8.
- Misc bundler, docs, build, and lint/config cleanup.
