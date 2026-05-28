---
date: 2026-05-14
repo: oven-sh/bun
size: L
title: "Rust port lands fixes across server, HTTP, and build"
excerpt: "Notable Rust-port followups: HTTP keepalive, Bun.serve config rename, Android/Linux cfg fixes, and build pipeline changes."
commits: 11
authors: [dylan-conway, Jarred-Sumner, Boshen, robobun]
commit_authors: {"8093571": dylan-conway, "428f61e": dylan-conway, "175f62a": dylan-conway, "952d337": dylan-conway, "fd0b6f1": dylan-conway, "63035b3": dylan-conway, "11a2e2c": Boshen, "d5c692a": dylan-conway, "e872030": robobun, "19d8ade": Jarred-Sumner, "23427db": Jarred-Sumner}
---

### **Bun.serve config rename is finished** (428f61e)
The internal `ServerConfig` fields are now `http3`/`http1` end-to-end, matching the public JS option names and the existing validation/error strings. This removes the last `h3`/`h1` holdouts in the Rust server path and avoids confusion between user-facing and internal names.

### **HTTP fetch now restores TCP keepalive** (fd0b6f1)
The Rust HTTP client now enables TCP keepalive on open sockets when keepalive is allowed, matching the behavior that was present in the Zig implementation. This fixes half-open connections hanging until higher-level timeouts, which was causing the keepalive fetch test to fail on Linux.

### **Build pipeline is reworked around Rust cross-compilation** (23427db)
CI now distinguishes Rust-only builds from the old Zig flow, adds a native macOS Rust build path, and retunes Linux/ASAN agent sizing for `libbun_rust.a` LTO pressure. The commit also updates build args and comments throughout the pipeline to reflect the Rust rewrite.

### **Android is included in Linux-kernel cfg paths** (8093571)
A broad set of `target_os = "linux"` checks were widened to include Android where Bun intentionally shares Linux kernel semantics. This prevents Android builds from falling into the wrong code paths, including the standalone executable graph case noted in the commit message.

### Other misc changes
- TinyCC extern is cfg-gated to match `cfg.tinycc` on targets where libtcc is not built (175f62a).
- `CallFrame::describe_frame` is now debug-only to match the C++ binding and avoid release/link errors (952d337).
- Dead unsafe `ArrayList`/`SmallList` shallow APIs removed as part of the `unsafe_code` cleanup (63035b3).
- Workspace lints are inherited by all member crates (11a2e2c).
- WebKit configure gets `-no-pie` to work on PIE-default distros (d5c692a).
- Contributing docs updated for the Rust rewrite (e872030).
- Stray workflow/script files deleted (19d8ade).
