---
date: 2026-06-30
repo: denoland/deno
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Deno shipped major runtime, tooling, and desktop upgrades"
excerpt: "June brought big gains in WebCrypto, fetch/serve, test tooling, Node compat, and a new desktop app workflow."
commits: 589
---

### **Runtime and web platform moved forward a lot**
Deno made major internal shifts by porting WebCrypto and console/inspect work into Rust, rewriting the Jupyter kernel in JS, and adding Web Locks, parameterized tests, browser-style `Request` fields, `navigator.userAgentData`, and improved WebCrypto algorithm coverage. Fetch and serving also saw substantial work: HTTP/1 moved to a runtime-owned path, compression defaults were adjusted, decompression and header handling were tightened, buffered observers and stream/body behavior were fixed, and `Deno.serve` gained new controls and more correct shutdown/error handling.

### **Node compatibility got a long run of important fixes**
The Node polyfills were hardened across HTTP/S proxying, child-process IPC, `node:test`, `node:vm`, `node:tls`, `node:net`, `node:http2`, V8 serializer behavior, native addon support, and Buffer decoding. Several long-standing edge cases were closed, including better workspace and package resolution, improved `require()` handling in compiled output, TLS close notifications, `process.resourceUsage()`, `mock.module()`, `runOnly(true)`, and more accurate permission enforcement for Node-facing network and filesystem APIs.

### **Compile, bundle, and install workflows became much more capable**
`deno compile` gained better worker/npm reachability, CJS handling, minification, declaration output, watch mode, persistent app storage for compiled apps, and fixes for bundled binaries and node-style interop. `deno install` and package resolution were also expanded: workspace-local `node_modules`, lockfile seeding from npm/pnpm/bun, `links`/catalog support, better global installs, and more predictable lifecycle/env handling. The monthly arc clearly pushed Deno closer to first-class app packaging and Node-style project layouts.

### **The language server and editor experience improved broadly**
LSP got more stable and more useful: it survived malformed files and OOMs better, used less idle memory, fixed notebook/workspace scoping, improved auto-import/completion behavior, surfaced docs and lint diagnostics, added inferred-type support, and handled `node_modules` and `.wasm` watching more correctly. These changes were paired with a lot of correctness work around diagnostics, refactors, and editor-visible edge cases.

### **Desktop app support emerged as a major new surface**
A new `deno desktop` workflow landed and then grew quickly: app building, compressed bundles, `.deb`/`.rpm`/`.msi` outputs, deep-link registration, in-process memory serving, Wayland support, launcher/runtime fixes, and better framework detection for Vite apps. Alongside that, `deno check --desktop` and packaging-related fixes made the desktop story much more complete and distribution-ready.

### **Security, permissions, and update policy were tightened**
The month also brought supply-chain and sandbox hardening: npm trust-policy metadata, default minimum dependency age, React CVE patching, Unix socket permission requirements, safer `Deno.symlink()` semantics, better net-deny enforcement, and more defensive handling in crypto, sqlite, and V8 deserialization paths. Update/publish commands became stricter and more transparent, with better skipping, diagnostics, and metadata handling.

### Other misc changes
- New CLI parser foundations and startup-time refactors to reduce `deno run` overhead.
- `deno task` gained `--env-file`, `--if-present`, `--jobs/--concurrency`, caching inputs, and more npm-like env behavior.
- `deno test` added snapshots, retries, repeats, sharding, `--changed`/`--related`, and better hook/timeout handling.
- `deno list`, `deno watch`, `deno link`/`unlink`, and `deno remove --global` filled out CLI ergonomics.
- Lots of smaller fixes across fetch, fs, formatting, doc extraction, coverage, permissions, and test coverage.
