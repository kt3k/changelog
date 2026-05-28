---
date: 2026-05-12
repo: denoland/deno
size: L
title: "Node compat gets faster and less flaky"
excerpt: "Windows named pipes retry correctly, lazy-loading trims startup cost, and several Node module resolution bugs are fixed."
commits: 10
authors: [bartlomieju, dsherret, divybot, nathanwhit]
commit_authors: {"fe040fc": bartlomieju, "271a8a7": dsherret, "a567a4e": bartlomieju, "0f47a9e": bartlomieju, "be35920": dsherret, "1298e48": divybot, "2c92763": divybot, "a38610c": bartlomieju, "a72f4c5": bartlomieju, "7a7b8d6": nathanwhit}
---

### **Windows named-pipe connects now retry when busy** (fe040fc)
Deno now mirrors libuv on Windows when a named pipe is temporarily unavailable, retrying `ERROR_PIPE_BUSY` via `WaitNamedPipeW` instead of surfacing `connect EINVAL`. This fixes intermittent Docker/testcontainers failures and makes pipe error translation more faithful to Node/libuv expectations.

### **Node hooks now resolve through Deno’s resolver** (0f47a9e)
When `module.register()` activates Node’s loader hooks, `defaultResolve()` now uses Deno’s own resolution result instead of a naive URL parse. That preserves import maps, JSR, and npm resolution for mapped specifiers and avoids `Loading unprepared module` failures in apps that rely on loader hooks.

### **`npmrc` gains `min-release-age` support** (271a8a7)
Deno now parses npm’s `min-release-age` setting and carries it through resolver/installer config paths. This lets installs honor release-age gating for package selection, matching npm’s behavior more closely.

### **Lazy-loading expands to more Node polyfills** (a38610c, a567a4e)
The Node compat layer moves the `_stream_*`, `net`, and TLS polyfills onto the lazy-loaded JS path, reducing eager startup work. This is a sizable performance/refactor change that should improve cold-start behavior for users who don’t touch these modules.

### **Lazy ESM modules now evaluate before namespace reuse** (a72f4c5)
A core lazy-load bug is fixed where a module already instantiated in V8’s module map could be returned before evaluation, leaving `export const` bindings in the TDZ. The fix forces evaluation first and prevents `Cannot access 'X' before initialization` errors in sibling lazy-module scenarios.

### **`deno install --global --force` now refreshes stale lockfiles** (7a7b8d6)
Global installs with `--force`/`--reload` now remove the auto-generated lockfile before resolving dependencies, so a fresh install really is fresh. This fixes cases where the old pinned version kept winning during reinstallation.

### **TLS secure-context errors now match OpenSSL shape** (1298e48)
`tls.createSecureContext()` now throws the expected OpenSSL-shaped error when `clientCertEngine` is used. That unblocks Node compatibility tests and improves parity for code that inspects TLS error details.

### **Process report omits glibc fields off glibc Linux** (2c92763)
`process.report()` now only includes `glibcVersionRuntime`/`glibcVersionCompiler` on Linux builds linked against glibc. This restores libc-flavor detection on musl and non-Linux platforms.

### Other misc changes
- CI workflow security tweak: switch PR workflow trigger from `pull_request_target` to `pull_request` (be35920).
