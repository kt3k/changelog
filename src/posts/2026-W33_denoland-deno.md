---
date: 2026-08-16
repo: denoland/deno
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "Deno hardens permissions, cache behavior, and native APIs"
excerpt: "A security-leaning week of fixes tightened permission checks, cache semantics, tar extraction, and N-API/FFI teardown and safety."
commits: 36
---

### Security and permission hardening
**Import, require, and fetch checks got stricter** — `--deny-import` now applies after DNS resolution, `require.resolve`/package probing consistently honors read permissions, and proxy transport validation checks the actual endpoint before connecting.

**Archive extraction is now path-safe** — npm tarball extraction rejects traversal paths up front, closing a directory escape class before any parent directories are created.

**FS open permissions better reflect real effects** — open options that can create, truncate, or otherwise mutate files now require write access even when paired with read-only flags.

### Cache and fetch semantics are more correct
**Cache Vary handling matches Fetch better** — `Vary: *` is treated as an automatic miss, and repeated headers are compared using full header-list semantics across both cache backends.

**Fetch retries are narrower and more predictable** — retries now only happen for reused pooled connections, reducing spurious retry behavior on fresh connections.

**Offline npm resolution is less fragile** — cached abbreviated npm metadata can now be reused under `--cached-only`, avoiding unnecessary refetch failures.

### Native/runtime safety and lifecycle fixes
**N-API teardown and finalization got a major cleanup** — finalizers are now tracked and claimed so they run exactly once across GC and shutdown paths, with additional fixes for unsafe JS-calling finalizers, string/result handling, and typedarray coverage.

**FFI struct returns now validate buffers** — struct-return writes check for a present, sufficiently large output buffer and preserve typed-array offsets/lengths, preventing bad writes and wrapper bugs.

**Timer and signal/event lifecycles are more robust** — timer wakeups were made thread-safe to avoid lost notifications, signal handlers unregister when dropped, and EventTarget abort handlers are cleaned up when listeners are removed or consumed.

### Node compatibility improvements
**Node shims and polyfills picked up correctness fixes** — `readv`/`readvSync` now respect short reads, `dns.lookupService` accepts string ports, CLI args preserve `--`, domains behave closer to Node’s uncaught-exception model, and Brotli/zlib validation was tightened.

### Performance and developer-experience improvements
**Base64 and primordials got faster paths** — base64 encoding/decoding now uses buffer-oriented ops, and `SafeArrayIterator` was rewritten to avoid extra iterator allocations and patchable `next()` calls.

**Formatting and environment handling were smoothed out** — `deno fmt -` now honors `.editorconfig`, process environment updates are serialized across workers, and timezone/env reload behavior is made atomic.

### Other misc changes
- `Deno.FsFile` construction now uses an internal token
- `text/x-component` is recognized as compressible
- `perf_hooks` URL reporting for proxied requests was corrected
- Workspace npmrc no longer affects bundler helper acquisition
- REPL regex-literal validation and several object-creation/polyfill edge cases were fixed
- Test coverage, fixtures, and minor cleanup across the affected areas
