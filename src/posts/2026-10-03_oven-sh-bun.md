---
date: 2026-10-03
repo: oven-sh/bun
size: L
title: "Bun fixes DNS, TLS, bundler, and plugin regressions"
excerpt: "A packed day of regression fixes across core runtime, bundling, DNS, TLS, HTMLRewriter, and plugin auto-install behavior."
commits: 15
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"0ba17d5": Jarred-Sumner, "bb35d1b": dylan-conway, "77ec53a": robobun, "83b2d4f": robobun, "8f6a13a": dylan-conway, "355a86e": robobun, "403209c": robobun, "f4281d1": dylan-conway, "272ff43": dylan-conway, "519963e": robobun}
---

### **Fixes multiple core regressions in runtime, bundler, and plugins** (272ff43)
Bun now resolves module specifiers once instead of re-resolving answers from plugins or `require()` hooks, which fixes a segfault and prevents plugin namespaces from being mishandled. The change also updates plugin docs/types to clarify when a bare path is treated as a package versus a virtual module.

### **macOS DNS lookup now follows split-DNS failover** (0ba17d5)
On macOS, `dns.lookup()`, `fetch()`, and sockets now use `DNSServiceQueryRecord` so split-DNS names can fail over correctly instead of returning `ENOTFOUND`. This closes a real connectivity gap for VPN/private-relay setups where the system resolver already knew how to answer.

### **TLS shutdown now waits for the first handshake flight** (77ec53a)
A client calling `end()` before the first TLS handshake step now sends the ClientHello first and only then finishes with FIN, matching Node's behavior. This fixes a regression that could leave connections hanging or silently skip certificate refusal paths.

### **`tls.connect({ socket })` no longer drops the wrapped Duplex on early end** (355a86e)
Bun now half-closes the wrapped transport even if `end()` happens before the handshake completes, instead of leaving the peer waiting forever. The fix adds staged shutdown handling so deferred FINs are replayed once the TLS engine exists.

### **`bun test --coverage-reporter` now actually enables coverage** (83b2d4f)
Passing `--coverage-reporter` now implies `--coverage`, so Bun emits reports instead of running tests and exiting successfully with no output. That aligns the CLI with its help text and avoids a silent footgun.

### **`bun build --sourcemap` no longer segfaults on link-step failure** (8f6a13a)
When bundling with source maps and the link step fails, Bun now reports the error cleanly instead of crashing. This is a straight reliability fix for a user-visible build failure mode.

### **`clone()` of a `Bun.file()` body no longer freezes file metadata** (bb35d1b)
Cloning a `Bun.file()` response no longer pins stale size/seekability answers, so later reads reflect the file's actual state. The fix also preserves the right behavior for files, slices, and non-seekable sources when computing body length.

### **HTMLRewriter stops leaking and reusing dead rewrite streams** (403209c)
`element.onEndTag()` callbacks are now tracked in a visited slot instead of keeping the whole callback chain rooted, and collected rewrites no longer keep using dead streams. This fixes a leak and prevents crashes/assertions when a rewrite is abandoned early.

### **Runtime plugins are no longer auto-installed under their own virtual names** (f4281d1)
A bare plugin return value that points back to the plugin's own virtual module is now recognized as plugin-owned and skipped by auto-install. This prevents Bun from downloading a real package just because a plugin served a virtual bare specifier.

### **`node:http` no longer segfaults when a queued request throws** (519963e)
Bun now detects whether a response is queued using the response flags instead of comparing object identity through the current-response slot. That fixes a crash when a `'request'` handler throws behind a buffered raw socket write.

### Other misc changes
- Bun-compat buffer write methods now reject non-string inputs instead of coercing them.
- `Buffer`/`node:buffer` tests expanded for per-encoding write argument validation.
- `bun build` linker ordering and sourcemap error-path tests updated.
- `bun install` manifest waiter handling fixed for transitive update edge cases.
- `node:tls` and `node:http` regression tests expanded.
- WebKit dependency bumped.
- Several lifetime/refcount cleanups and internal comments/docs updates.
