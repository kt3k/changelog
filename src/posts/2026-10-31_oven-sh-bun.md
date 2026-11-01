---
date: 2026-10-31
repo: oven-sh/bun
size: L
title: "PNG rewrite, test-mode compatibility, crypto fixes"
excerpt: "Bun swaps in a safe Rust PNG codec, adds Vitest/Jest-compatible test behavior, and lands more Node crypto, tty, and websocket fixes."
commits: 12
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"2b0ace8": dylan-conway, "9e76acc": Jarred-Sumner}
---

### **Safe Rust PNG codec replaces libspng** (2b0ace8)
Bun.Image now uses a new `bun_png` crate instead of `libspng`, with Rust decoder/encoder code, Highway kernels, and updated bindings in `highway_png.cpp`. This removes the old dependency while keeping PNG read/write support and adds benchmarks plus docs updates for the new codec.

### **`bun test` now runs Vitest suites** (9e76acc)
`bun test` gains a much broader compatibility layer for Vitest and Jest, including missing APIs, cheaper `--isolate` / `--parallel`, and the new `
