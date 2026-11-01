---
date: 2026-10-31
repo: oven-sh/bun
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Bun adds built-in tooling while hardening core runtime"
excerpt: "October brought native check/lint/format, AOT compile support, a PNG codec rewrite, and a long run of TLS, SQL, install, and safety fixes."
commits: 296
---

### Major new CLI/tooling features
**Built-in type checking, linting, and formatting** — Bun shipped `bun check`, then added native `bun lint` and `bun format`, along with docs, completions, config discovery, and rule parity work. By month’s end, the new tools had picked up faster paths, better TypeScript parity, Svelte formatting, plugin-aware config, and fewer duplicate diagnostics.
**AOT builds for compiled executables** — `bun build --compile --aot` landed, letting Bun emit ahead-of-time machine-code executables without a JIT. The build pipeline and CI were updated to treat hardened/AOT profiles as first-class targets.
**Bake expands into a fuller app framework** — Bake shed old server-components behavior in core and grew pages, frameworks, config plugins, and page data hooks like `getServerSideProps`/`getStaticProps`/`getStaticPaths`, shifting more framework-specific logic out of the runtime and into Bake’s routing layer.

### Runtime correctness and compatibility
**Big TLS and networking hardening pass** — The month was heavy on TLS fixes: early close/EOF races, handshake teardown, client wrapping, certificate/name handling, revoked-key checks, CA precedence, and keepalive behavior all got tightened. Networking also picked up macOS split-DNS failover, HTTP parser compatibility, HTTP/3 GOAWAY/header fixes, socket fairness, and several fetch/stream teardown corrections.
**SQL, install, and package-manager reliability** — Bun SQL, `bun:sqlite`, and `node:sqlite` were consolidated and fixed across MySQL/Postgres edge cases, while `bun install`, `bun add`, `bun update`, `bun pm`, and `bunx` got many lockfile, peer-dep, native-bin, and pnpm/Yarn Berry compatibility fixes.
**Test runner and checker stability** — `bun test` saw multiple crash fixes, coverage wiring, Vitest/Jest compatibility work, and safer isolate/parallel behavior. `bun check` continued a month-long push toward TypeScript parity with major speedups, fewer false positives, project-reference fixes, and better handling of complex generics and control flow.

### Safety, memory, and internal refactors
**Major memory and lifetime cleanup** — Bun spent much of the month removing `unsafe` and raw-pointer plumbing across the runtime, dev server, shell, CLI, bundler, and parser. Related fixes closed use-after-free bugs, improved object lifetime tracking, and made several previously crashy edge cases return normal errors instead.
**Storage, streams, and codecs moved in-tree** — Large native dependencies were replaced or consolidated: `libarchive` gave way to safe Rust tar/gzip, `libspng` was replaced by a new Rust PNG codec, and bindgen was broadened into a single schema-driven pipeline for more core APIs and bindings.
**Engine and build updates** — WebKit/JSC was bumped repeatedly throughout the month, bringing engine fixes and compatibility updates along the way. Bun also added stricter build-time options, CA/root-store updates, Docker build fixes, and hardened release-build support.

### Other misc changes
- Console, diagnostics, `structuredClone`, `TextDecoder`, `TextEncoder`, `Blob`, `Headers`, `fs.realpath`, and `console.groupCollapsed` received targeted bug fixes.
- CSS parsing/minification, JSONL parsing, globbing, stream readers, and React Fast Refresh all got correctness updates.
- Dev-server and Bake UX improved with overlay redesigns, router/file-system fixes, and better error reporting.
- Numerous regression tests, docs, completion files, and CI/build-script updates across the repo.
