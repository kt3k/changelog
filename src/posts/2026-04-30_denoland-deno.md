---
date: 2026-04-30
repo: denoland/deno
size: L
title: "Deno adds compile, transpile, why, and audit fix"
excerpt: "Big CLI expansion plus several Node/web compat fixes and performance wins across compile, package tooling, and runtime internals."
commits: 28
authors: [divybot, crowlbot, bartlomieju, nathanwhitbot, crowlKats, littledivy, fibibot]
commit_authors: {"8a9b71f": crowlKats, "56b88b4": crowlbot, "89a21c5": bartlomieju, "2ecf293": bartlomieju, "b5a6955": bartlomieju}
---

**`deno compile` now auto-detects frameworks in directories** (8a9b71f)
`deno compile .` can now detect supported web frameworks, run the app’s build step, synthesize a temporary entrypoint, and bundle the right build artifacts automatically. It also adjusts type-checking for Next.js and resolves included build output relative to the app directory, making directory-based compilation much smoother.

**New `deno transpile` subcommand for JS output** (89a21c5)
Deno now has a standalone transpiler for TypeScript, JSX, and TSX, with support for single-file output, output directories, source maps, and declaration emission. This adds a first-class build-tool path for producing JavaScript without relying on external tooling.

**`deno why` explains why a package is installed** (2ecf293)
A new package-manager command traces dependency chains from direct dependencies to a target package, including version filtering and multiple-version cases. That makes it easier to understand lockfile state and why a transitive package is present.

**`deno audit --fix` can now auto-upgrade vulnerable deps** (b5a6955)
Audit gains a fix mode that upgrades vulnerable direct dependencies to patched versions while avoiding major-version jumps and unsupported spec forms. It also reports cases it can’t safely rewrite, which turns audit from a read-only report into a remediation tool.

**Node compatibility improves across TLS, HTTP/2, timers, and crypto**
Several compatibility fixes landed for Node polyfills, including `tls.getCaCertificates()`, SNI handling, `setImmediate` callback binding, HTTP/2 flow-control behavior, and stricter crypto input validation. These changes unblock or stabilize a number of node_compat tests and bring behavior closer to Node.

**Inspector REPL no longer loses promises to GC** (56b88b4)
The REPL event loop now drains microtasks immediately after polling inspector sessions, closing a race that could surface `-32000 "Promise was collected"` in external debugger sessions. A regression test was added under forced GC to keep the fix from regressing.

### Other misc changes
- Node compat and web polyfill fixes: Event.returnValue flags, MessageEvent ports, EventTarget listener initialization, structuredClone fast path, WebIDL dictionary conversion fast path, root CA retrieval, and more.
- HTTP/2 compatibility follow-ups: internal bindings/constants, stream window handling, timeout/proxy behavior, and several test-suite skips/enables.
- Minor test/config cleanup and compatibility gating updates across node_compat.
