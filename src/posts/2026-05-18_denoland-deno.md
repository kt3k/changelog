---
date: 2026-05-18
repo: denoland/deno
size: L
title: "Node compat wins, snapshot shrinks"
excerpt: "Deno tightened Node compatibility around inspector, TLS, and crypto while cutting ~3 MB from the startup snapshot."
commits: 9
authors: [bartlomieju, divybot, nathanwhit]
commit_authors: {"9847847": bartlomieju, "eb4061f": nathanwhit, "ced67b1": bartlomieju, "9b9fde0": bartlomieju, "bf72384": bartlomieju, "794fb11": bartlomieju, "f68849e": divybot}
---

**Node module hooks are back for sync `registerHooks()` flows** (ced67b1)
Restores `module.registerHooks()` support after the broader `module.register()` revert, including sync `resolve`/`load` chaining for CommonJS `require()` and ESM `import()` interception. This matters for Node-compat tooling that depends on hook-based loaders, and the implementation now wires shared hook state through workers and the main runtime.

**Inspector network bodies can now be fetched** (bf72384)
Adds bounded buffering for Network events so CDP consumers can call `Network.getResponseBody`, `Network.streamResourceContent`, and `Network.getRequestPostData` instead of hitting method-not-found errors. That closes a major gap for debugger/profiler integrations that inspect request and response payloads.

**`process.binding('inspector').isEnabled()` now works** (9847847)
Implements the internal inspector binding and exposes `isEnabled()` so Node code can check whether the debugger is attached. This unblocks compat tests and fixes code paths that previously failed with `inspector.isEnabled is not a function`.

**Inspector disconnect notifications now match Node** (794fb11)
Implements `NodeRuntime.notifyWhenWaitingForDisconnect`, sending `NodeRuntime.waitingForDisconnect` to opted-in sessions instead of the generic context-destroyed event. That gives debugger clients the right shutdown signal and preserves Node’s per-session notification behavior.

**DSA key generation now accepts arbitrary modulus sizes** (f68849e)
Lifts `crypto.generateKeyPair('dsa', { modulusLength, divisorLength })` beyond the small set of fixed sizes supported by the underlying Rust crate, including edge cases like 2049/256. This improves Node crypto compatibility for callers and tests that expect OpenSSL-style flexibility.

**TLS resume compatibility is improved for client session tests** (9b9fde0)
Separates strict and insecure client session caches and tightens certificate-error mapping so resumed TLS handshakes behave more like Node’s. This fixes client-resume compat cases where mutable TLS defaults or session reuse previously produced the wrong behavior.

**Startup snapshot is cut by about 27%** (eb4061f)
Lazifies a large chunk of JS that had been baked into the CLI snapshot, reducing the blob from about 11.4 MB to 7.33 MB. That should improve startup memory footprint and keeps more extension code out of cold-path initialization.

### Other misc changes
- Enabled `parallel/test-https-connecting-to-http.js` in node compat (1 commit).
- Enabled `parallel/test-crypto-keygen-async-rsa.js` in node compat (1 commit).
