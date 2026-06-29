---
date: 2026-06-28
repo: denoland/deno
period: weekly
slug: 2026-W26
period_label: "Jun 22–28, 2026"
size: L
title: "Deno lands watch, task caching, security hardening, desktop overhaul"
excerpt: "This week added watch/test/deps workflows, hardened npm resolution, and made desktop packaging/runtime much more robust."
commits: 68
---

### **Workflow and dependency tooling gets much better**
Deno added a package-oriented `deno list` for declared deps, plus selective `deno test --changed/--related` runs and a dedicated `deno watch` entry point. `deno task` also gained input-based caching, making repeat builds and generators much faster.

### **Node/npm and JSR compatibility continues to expand**
JSR packages can now install through `node_modules`, `node:test` picked up better nested test handling and mocked `AbortSignal.timeout()`, and `node:vm`, `process.resourceUsage()`, `console` internals, and `Headers` inspection all got compatibility fixes. `module.registerHooks()` also now receives full import-attribute context.

### **Security and resolver behavior were hardened**
The npm resolver now uses trust-policy metadata, supports an opt-in no-downgrade policy, and defaults to a 24-hour minimum age for fresh npm releases. `Deno.serve` automatic compression was also flipped off by default, with explicit opt-in still available.

### **Runtime and server correctness improved**
Web Locks API support landed, `Deno.serve` shutdown now closes active WebSockets, remote `Deno.openKv()` URLs validate up front, timer races were fixed, and streamed HTTP responses/Response reconstruction were optimized for better throughput and fewer unnecessary copies.

### **Desktop packaging and runtime saw a major push**
Desktop apps can now be compressed, Linux Wayland support arrived for webview/CEF backends, serving moved to in-process memory channels instead of TCP loopback, Vite apps are better detected, and several packaging/runtime fixes landed to avoid data loss, stale paths, and platform-specific breakage.

### **Other misc changes**
- `deno pack` now includes published assets.
- `deno publish` continues past one failing package in a workspace.
- LSP gained inferred-type actions, `.d.ts` missing-import diagnostics, and `.wasm` watch updates.
- JSDoc event tags are now documented in `deno doc`.
- Small packaging, parser, and test fixture updates across the week.
