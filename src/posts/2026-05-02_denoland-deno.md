---
date: 2026-05-02
repo: denoland/deno
size: L
title: "Deno speeds up core loaders and npm workflows"
excerpt: "Major performance work plus new catalog support and npm defaulting for add/install, alongside several Node parity fixes."
commits: 15
authors: [bartlomieju, divybot, nathanwhitbot, crowlbot, Hajime-san]
commit_authors: {"545e31e": bartlomieju, "50a1af4": nathanwhitbot, "37ebc9a": nathanwhitbot, "d6bcc79": crowlbot, "f96c625": crowlbot, "0689fbb": divybot, "96e539a": bartlomieju, "0a8ade2": bartlomieju, "7d75e0c": Hajime-san, "ec58158": bartlomieju, "950ca9b": bartlomieju, "3da98e6": divybot, "64ba898": divybot, "0049368": divybot}
---

**Core module loading gets async resolution support** (950ca9b)
Deno’s module loader API now returns a `ModuleResolveResponse` that can be either synchronous or asynchronous, unlocking loaders that need to consult registries or JS hooks during resolution. The runtime and core recursive loader were updated to handle both paths cleanly, which is a foundational change for more flexible loading.

**Workspace `catalog:` dependencies land for npm packages** (96e539a)
Workspaces can now centralize package versions with a `catalog:` protocol in member `package.json` files, with support for both default and named catalogs. This is a meaningful monorepo workflow improvement that also touches resolution, standalone binaries, the LSP, and config/schema handling.

**`deno add` / `deno install` now default unprefixed deps to npm** (0a8ade2)
Unprefixed package names like `express` are now treated as npm dependencies by default, removing the need for `npm:` or `--npm` in the common case. This is a user-facing behavior change that makes dependency installation materially smoother.

**Web and fetch hot paths get direct performance wins** (ec58158, d6bcc79, f96c625, 7d75e0c, 545e31e)
A broad loader conversion moved all `ext/web` JS sources, plus `ext/io`, `ext/os`, and `ext/net`, to lazy-loaded scripts to cut ESM resolution overhead. Separate fast paths also reduce overhead in `fetch` body conversion, `TextDecoder.decode`, and `DOMMatrix`/WebIDL sequence handling, improving common runtime and web API performance.

**Node compatibility improves across crypto, fs, and process behavior** (50a1af4, 37ebc9a, 0689fbb, 3da98e6, 64ba898, 0049368)
Several Node-facing fixes tighten parity: `process.chdir()` errors now include richer context, `fs.watch` accepts an `encoding` option, server close events are drained on the next tick, and crypto APIs now match Node’s scrypt, Diffie-Hellman, and hash-finalization behavior more closely. These changes unblock or enable multiple Node compatibility tests.

### Other misc changes
- Node compat tests enabled for several crypto/http cases.
- Bench and test harness updates to match the new lazy-loaded script model.
- Minor docs, schema, and internal resolver plumbing updates.
