---
date: 2026-05-08
repo: denoland/deno
size: L
title: "Node compat gets faster and module hooks mature"
excerpt: "Lazy-loaded polyfills cut startup overhead, while module.register() and require() gain key Node.js compat fixes and loader support."
commits: 9
authors: [bartlomieju, nathanwhit]
commit_authors: {"4be99ff": nathanwhit, "e69a05d": bartlomieju, "ffbc071": bartlomieju, "e68f30d": bartlomieju, "0f19a26": bartlomieju, "8660edf": bartlomieju, "5aaeb48": bartlomieju, "d9f981f": bartlomieju, "aefa735": bartlomieju}
---

**Module loader hooks now run in a worker, with `--experimental-loader` support** (5aaeb48)
Deno reworks `module.register()` to use a dedicated worker thread, matching Node’s hooks-thread model and avoiding deadlocks from hook-module self-imports. It also adds hidden `--experimental-loader`/`--loader` flag plumbing so custom loaders can be passed through in Node-compat mode.

**`require()` now throws the right Node.js errors for async ESM and CJS/ESM cycles** (ffbc071)
This adds `ERR_REQUIRE_ASYNC_MODULE` when `require()` hits top-level `await`, and `ERR_REQUIRE_CYCLE_MODULE` when it encounters an ESM module in a CommonJS cycle. That makes failure modes clearer and much closer to Node’s actual behavior instead of returning partial exports or the wrong generic error.

**Node’s testing polyfill gets broader `node:test` compatibility** (4be99ff)
The test runner now fills in missing default-export functions, fixes `globalThis` leaking into mock functions, and adds support for module-level hooks. The change unlocks several additional Node compat tests and closes a known `node:test` gap.

**`node:tls` certificate validation is fixed by upgrading rustls** (aefa735)
A rustls bump resolves a regression where `fetch()` could fail against servers using certain certificate/signature combinations. This restores TLS handshake compatibility for affected servers rather than breaking on a newer `rustls-webpki` error path.

**Major Node polyfills are being moved to lazy-loaded JS** (e69a05d, 8660edf, d9f981f, e68f30d)
Several high-traffic internals, including `child_process`, `cluster`, `console`, `path`, `crypto`, and more fs helpers, were converted from eagerly loaded ESM into lazy-loaded scripts. The main payoff is lower startup overhead and better dependency ordering, which also unblocks further polyfill conversion work.

**`import`ing Node builtins after `register()` no longer panics** (0f19a26)
Internal `ext:` specifiers are now treated as already resolved, so built-in modules don’t get routed through user hooks during synchronous instantiation. That fixes a crash when importing `node:` builtins after module hooks are active.

### Other misc changes
- Dependency bumps / lockfile updates (1 commit)
- Minor module registration test updates (1 commit)
