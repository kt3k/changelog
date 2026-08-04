---
date: 2026-08-03
repo: denoland/deno
size: L
title: "Node compat gets sorted readdir, faster UDP send"
excerpt: "Deno adds Blob/Body text streaming, aligns fs.readdir ordering with Node, speeds UDP sends for literal IPs, and refreshes compat tests."
commits: 5
authors: [bartlomieju, badgerbees, nathanwhitbot]
commit_authors: {"9dfa86f": bartlomieju, "98bcf83": badgerbees, "a44432c": bartlomieju, "8da7d1f": nathanwhitbot, "bca6182": bartlomieju}
---

**Blob and Body now expose `textStream()`** (8da7d1f)
Deno adds a streaming text decoder API for both `Blob` and fetch `Body`, returning a `ReadableStream<string>` that decodes UTF-8 on the fly. This gives users a non-buffering alternative to `text()` for large payloads and expands the public web-compatible API surface.

**`fs.readdir` now matches Node’s sorted entry order** (9dfa86f)
Node polyfills now sort directory entries returned by `readdir`, including recursive sync/async paths, so results are deterministic and aligned with Node.js behavior. The change also adds explicit handling for astral/surrogate-containing names to preserve the same ordering semantics as libuv.

**UDP default lookup skips DNS for literal IPs** (98bcf83)
The dgram polyfill now detects literal IPv4/IPv6 addresses and schedules the callback directly instead of performing a DNS lookup. That trims unnecessary work on a common path and should make UDP send/connect flows a bit faster.

**`fmt --unstable-component` fixes Svelte top-level blocks** (a44432c)
Updating the lax-* formatter crates fixes a bug where a top-level Svelte block could prevent the rest of the file from being formatted. The new regression test locks in the corrected behavior.

**Node compat suite refreshed to Node.js 26.5.1** (bca6182)
The vendored Node test suite was bumped and Deno’s compatibility layer was adjusted to satisfy newly added upstream assertions. This improves coverage against newer Node behavior, including updates across zlib, TLS, sqlite, URL, and other polyfills.

### Other misc changes
- Dependency bumps for formatter crates.
- Node compat test suite config updated and one upstream-removed test dropped.
- Minor test additions and internal polyfill refactors.
