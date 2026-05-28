---
date: 2026-05-06
repo: denoland/deno
size: L
title: "Pack lands, perf work and Node fixes"
excerpt: "Deno adds npm tarball packing and package.json controls, while Node compatibility and startup performance keep improving."
commits: 23
authors: [bartlomieju, nathanwhit, seroperson, marvinhagemeister, nathanwhitbot]
commit_authors: {"6238501": bartlomieju, "030c822": nathanwhit, "df92ffe": bartlomieju, "82588c3": bartlomieju, "2802b56": bartlomieju, "6100ec3": bartlomieju, "b422a1f": seroperson, "b285828": bartlomieju, "2aa2842": bartlomieju, "e481bf7": bartlomieju, "8595dec": bartlomieju, "0b92830": marvinhagemeister, "7b82b09": bartlomieju, "78ee331": bartlomieju}
---

### **Deno gets `pack` for npm tarballs** (0b92830)
Adds a new `deno pack` command that builds npm-compatible `.tgz` artifacts from Deno/JSR projects. It transpiles sources, rewrites specifiers, generates package metadata, and can optionally skip type extraction, source maps, or the Deno shim.

### **`module.register()` now works in compiled binaries** (8595dec)
`deno compile` binaries can now use `module.registerHooks()` and `module.register()`, letting user hook modules intercept loads inside standalone apps. This is a meaningful unlock for compiled tools that need runtime transpilation or custom module resolution.

### **`NODE_EXTRA_CA_CERTS` is now honored** (b422a1f)
Deno now supports Node's `NODE_EXTRA_CA_CERTS` at the root certificate store level, so extra CA certs apply to all TLS paths. That closes a compatibility gap for `fetch()`, `Deno.connectTls()`, and Node TLS/HTTPS polyfills.

### **Node sockets and IPC handle passing get broader support** (df92ffe, 82588c3, 7b82b09)
Node compatibility was expanded to handle abstract Unix sockets on Linux and to preserve expected `child_process.send()` backpressure behavior. The IPC work also adds support for passing `dgram.Socket` handles over child-process IPC, which fixes real-world Node ecosystem breakage.

### **Major startup and runtime memory reductions** (2802b56, 6100ec3, e481bf7, 2aa2842, 78ee331, b285828)
A large chunk of Node and runtime internals were moved to lazy-loaded scripts instead of being eagerly included in snapshots, including `events`, `util`, `assert`, `buffer`, `process`, and several runtime JS files. This should improve startup cost, reduce snapshot size, and lower memory use for workloads that don't touch those modules.

### **HTTP autodetect gets a faster connection path** (030c822)
The clear-text HTTP server path now splits autodetection work so it avoids allocating the HTTP/2 future when the connection is plainly HTTP/1. That's a targeted performance win for a very hot network path.

### **`deno compile` shows progress while building** (6238501)
Compiled builds now surface a progress bar in TTYs and phase-by-phase log output in non-interactive environments. This makes long compile jobs much less opaque, especially for projects with large dependency trees.

### Other misc changes
- Fixed a Node backpressure edge case in `child_process.send()`.
- Bumped `openssl` and `aws-lc-rs/aws-lc-sys` dependencies.
- Disabled a couple of flaky Windows tests.
- Small build/runtime fixes and internal refactors.
