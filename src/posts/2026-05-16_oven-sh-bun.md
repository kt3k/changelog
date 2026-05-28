---
date: 2026-05-16
repo: oven-sh/bun
size: L
title: "Security hardening and resolver cleanup"
excerpt: "A major hardening day: 36 security fixes landed alongside a resolver refactor and a few bug fixes for workers, imports, and TLS reuse."
commits: 7
authors: [Jarred-Sumner, robobun]
commit_authors: {"e750984": Jarred-Sumner, "880ee89": Jarred-Sumner, "e520065": Jarred-Sumner, "f7c692a": Jarred-Sumner, "8438ff7": Jarred-Sumner, "f85020a": Jarred-Sumner, "2a3d0e7": robobun}
---

### **Security hardening across runtime, install, parsers, HTTP** (e520065)
36 reachable security issues were hardened across Bun’s runtime, package manager, parsers, HTTP client/server, and SQL drivers. The patch also adds new bounds/lifetime checks in several hot paths, making this the highest-impact change of the day.

### **Resolver port cleanup and module split** (8438ff7)
The large Zig-port wrapper around the resolver was split into real sibling files and the extern-Rust pointer types were tightened. This removes a major port artifact, clarifies ownership/lifetimes, and makes the resolver internals easier to maintain and reason about.

### **Fix worker teardown crash for synthetic module specifiers** (f7c692a)
Synthetic-module paths now duplicate the resolved specifier/source URL instead of borrowing them, matching the destructor’s ownership expectations. This fixes a crash during worker teardown caused by over-dereferencing freed strings.

### **Preserve forward slashes for package-specifier imports on Windows** (2a3d0e7)
When an `imports` target resolves to another package specifier, Bun now keeps POSIX-style slashes instead of normalizing to Windows separators. That fixes a Windows-only resolver bug where package imports could fall through to the wrong entry point.

### **Prevent TLS sockets and H2 sessions from being reused unsafely** (e520065)
HTTP pooling and HTTP/2 coalescing now track whether a connection was established with `rejectUnauthorized=true` and refuse strict reuse when hostname validation never happened. This closes a trust-boundary hole where a CA-valid but wrong-host socket could be reused by a strict caller.

### Other misc changes
- Comment/lint cleanup across AST and bundler code (880ee89)
- `cargo fmt` formatting only (e750984)
- Hook now blocks direct `rustfmt`; use `cargo fmt --all` instead (f85020a)
- Minor formatting-only edits in install/socket/sql code (e750984)
- `bunx`/install/watch-related formatting and style tweaks (2a3d0e7, 880ee89)
