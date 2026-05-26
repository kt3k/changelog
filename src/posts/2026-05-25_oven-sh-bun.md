---
date: 2026-05-25
repo: oven-sh/bun
size: L
title: "Bundler gains stable CSS modules support"
excerpt: "Sample article. CSS modules graduate to stable, plus a faster Bun.serve routing layer."
commit_count: 22
---
> **Sample issue** for layout/testing. Replace with real output via `deno task digest`.

### **CSS modules are now stable in the bundler (a1f9c30)**
`*.module.css` imports now return typed class maps and are no longer behind a
flag. Scoped class names are hashed deterministically, so output is stable
across builds.

### **`Bun.serve` routing rewritten for lower latency (b7e2d11)**
The internal router moved to a radix-tree match, cutting per-request overhead on
apps with many routes. Benchmarks show ~12% higher throughput on a 200-route
app.

### **Fix memory leak in long-running `bun test` watch mode (c4a8f02)**
Module graphs were retained between reruns; they're now released, keeping memory
flat over long watch sessions.

### Other misc changes
- Dependency bumps for `uWebSockets` and `boringssl` (3 commits)
- Improve error message when a lockfile is corrupt (d10ab23)
- Docs: expand the `bun install` workspaces guide (4 commits)
- Internal test refactors and formatting (6 commits)
