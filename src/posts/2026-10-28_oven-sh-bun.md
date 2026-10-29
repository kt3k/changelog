---
date: 2026-10-28
repo: oven-sh/bun
size: L
title: "Bun tightens safety, lifetimes, and path rules"
excerpt: "Security/path handling hardens, key unsafe APIs disappear, and shell I/O gets simpler; plus a WebKit bump."
commits: 10
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"37a5e3a": dylan-conway, "d472c5b": dylan-conway, "563272e": dylan-conway, "3e2d53c": dylan-conway, "c49cc85": dylan-conway, "73b5310": dylan-conway, "2871f0c": dylan-conway, "60ca742": dylan-conway, "6c3d1bf": Jarred-Sumner, "11c3671": Jarred-Sumner}
---

**Archive extraction and route serving now stay inside the root more consistently** (6c3d1bf)
Bun tightened archive extraction and directory-route semantics to prevent escapes through existing symlinks/junctions, with platform-specific behavior now documented and enforced. The change also adds sparse-file hole limits for `files()`, which matters for avoiding pathological memory use while reading archives.

**Resolver filesystem APIs are now safe and less mutation-heavy** (d472c5b)
`Entry::kind` and `Entry::symlink` no longer require `unsafe` or `&mut RealFS`, and the resolver callback surface was reshaped so read-only access is explicit. That removes a lot of unsafe call sites and makes the caching/stat-on-first-use path easier to use correctly.

**Hashers drop an unused engine parameter** (563272e)
The EVP-backed SHA hash APIs no longer take a dummy `ENGINE` argument, so callers stop wrapping hash operations in `unsafe` just to pass null. This simplifies integrity checks and Mach-O/build-id hashing across the codebase without changing the hashing behavior.

**JS printer callback lifetimes are modeled explicitly** (3e2d53c)
`RequireOrImportMetaCallback` now carries the lifetime of the printer context, and `print_code_for_file_in_chunk_js` no longer needs a mutable borrow just to read linker state. This removes a set of lifetime erasures and makes the printer/linker boundary safer.

**`uws::Loop` methods can now take shared borrows** (73b5310)
Loop fields were moved into `Cell`s so methods like `tick` no longer need `&mut self`, matching how callbacks and the C side already access the loop. This is a major internal refactor that deletes a lot of unsafe raw-pointer plumbing around event-loop access.

**Shell subprocess I/O switches from `Arc` to `Rc`** (2871f0c)
The shell’s I/O objects are single-threaded, so the refcounting was simplified to `Rc` and the compensating `Send`/`Sync` workarounds went away. That makes the shell’s ownership model more honest and trims some clippy suppressions and test baselines.

### Other misc changes
- Zero-initialize plain C structs with safe `ffi::zeroed()` and expand `Zeroable` coverage (37a5e3a)
- Remove now-unneeded `detach_lifetime` uses in install/parser/runtime code (c49cc85)
- Give crash reasons a borrowed lifetime instead of forcing `'static` (60ca742)
- Upgrade WebKit to fcc1ea0973a4 (11c3671)
