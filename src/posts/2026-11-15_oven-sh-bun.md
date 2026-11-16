---
date: 2026-11-15
repo: oven-sh/bun
size: L
title: "Huge ownership sweep across Bun runtime"
excerpt: "Major refactors and fixes hardened ownership, removed UAF risks, and tightened safety across bundler, HTTP, DNS, tests, and AOT."
commits: 44
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"d85aed4": dylan-conway, "7bd08b9": dylan-conway, "862278d": dylan-conway, "bbd0017": dylan-conway, "d4796b2": dylan-conway, "8a0ea60": dylan-conway, "6f8424e": dylan-conway, "9dfd5e3": Jarred-Sumner, "44ed28a": dylan-conway, "d401db7": dylan-conway, "ab9b2eb": dylan-conway, "812575d": Jarred-Sumner, "c5e0bbb": dylan-conway, "20e881a": Jarred-Sumner, "24ec418": dylan-conway, "3a133b5": dylan-conway, "861960d": dylan-conway}
---

### **Runtime and bundler ownership was overhauled across the stack** (d85aed4, 862278d, bbd0017, 8a0ea60, 6f8424e, d401db7, c5e0bbb)
Bun spent the day turning raw pointers, shared counters, and hand-freed resources into explicit owners. The biggest moves touched the watcher, bundler parse/link flow, VM/dev server lifetimes, HTTP request ownership, DNS/HTTP3 callbacks, and a wide swath of runtime helpers, cutting a large amount of unsafe code and eliminating several classes of leaks/UAFs.

### **Security and correctness fixes landed in low-level wrappers** (7bd08b9, d4796b2, 44ed28a, 24ec418, ab9b2eb)
Safe wrappers around simdutf/Highway/picohttpparser now validate lengths, closing out-of-bounds risks from short slices. Separate fixes tightened HTTP/2 stream borrowing, DNS keepalive timing, SQL message lifetimes, and BoringSSL handle ownership.

### **AOT and bundler behavior got notable feature-level updates** (9dfd5e3, 812575d, 20e881a, 861960d, 3a133b5)
The AOT compiler picked up broader support for built-ins, frames, async error handling, and more realistic test-run behavior, with fresh fixtures and documentation. Bundler CSS chunk printing and npm-mode tar behavior also got substantial correctness improvements.

### Other misc changes
- Refactors and renames across AST, bundler, CLI, and runtime internals.
- Build/CI fixes, including missing headers and Windows sysroot bump.
- Test updates and new regression coverage.
- Dependency/config churn and small cleanup commits.
