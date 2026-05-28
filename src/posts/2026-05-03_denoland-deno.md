---
date: 2026-05-03
repo: denoland/deno
size: L
title: "Deno leans harder into lazy-loaded scripts"
excerpt: "Big Node-compat and telemetry/perf work landed, plus a publish provenance crash fix and several TLS/HTTP2 correctness improvements."
commits: 28
authors: [divybot, bartlomieju, dsherret, fibibot]
commit_authors: {"8617871": divybot, "9499507": bartlomieju, "5a970fa": bartlomieju, "e5faf73": bartlomieju, "1a6a656": divybot, "fbfa985": divybot, "496e918": bartlomieju, "f5918a7": bartlomieju, "913f97b": divybot, "c532c63": bartlomieju, "3ee4720": divybot, "81a7724": fibibot, "e277e4d": bartlomieju, "bc1f7ff": bartlomieju, "f14cb96": divybot, "349f015": divybot, "09c6782": divybot, "3c155b1": divybot, "50920d3": divybot, "d12ea83": divybot, "2b39f9c": divybot, "a0876df": divybot, "3cb894c": divybot, "60b234f": divybot}
---

### **WebSocket upgrades now work from `node:http`** (496e918)
`Deno.upgradeWebSocket()` can now reuse the `node:http` upgrade socket and `head` buffer, writing the 101 response over the existing TCP connection. This unlocks WebSocket upgrade flows in Node-based frameworks that sit on top of `node:http`.

### **`deno publish` no longer panics in non-GitHub CI** (e5faf73)
Provenance generation now avoids the empty-token false positive and replaces a series of `unwrap()`s with proper errors when GitHub-specific CI env vars are missing. That means Forgejo/Gitea-style CI can run `deno publish` without crashing.

### **Node TLS certificate handling got much closer to Node.js** (e277e4d)
TLS server config now includes provided CA certs in the handshake chain, and peer-certificate handling was updated for self-signed roots. Certificate fields also now preserve Node’s single-value-vs-array behavior, alongside fixes for EC curve naming.

### **Lazy-loaded script conversion expanded across core extensions** (5a970fa, c532c63, f5918a7, 9499507, bc1f7ff)
Several hot-path JS extensions were converted from ESM to `lazy_loaded_js`, including `fetch`, `cache`, `canvas`, `crypto`, `fs`, `ffi`, and `cron`. The goal is to cut module resolution overhead at startup and on first use, while preserving behavior via `core.loadExtScript()` and shared internals where needed.

### **HTTP/2 and Node-compat correctness improved across the board** (1a6a656, 8617871, 3ee4720, 349f015, d12ea83, 3c155b1, 60b234f, 50920d3, 3cb894c, 2b39f9c, 913f97b, 81a7724, fbfa985, 09c6782, a0876df, f14cb96)
A long run of Node compatibility fixes landed for HTTP/2, TLS, crypto, and undici integration, enabling more failing tests in the compat suite. Highlights include protocol errors for HTTP/2-to-HTTP/1 mismatches, better flow control and ping handling, support for `allowHTTP1` websocket upgrades, CA certificate introspection, PEM/private-key handling, and typed TLS errors.

### **Other misc changes**
- npm overrides now understand the `catalog:` protocol.
- A small `monch` dependency/perf bump landed.
- Several node_compat tests were enabled or updated.
- Minor internal wiring and snapshot-build fixes across extensions.
