---
date: 2026-08-05
repo: oven-sh/bun
size: L
title: "Security fixes, h2 stability, and install control"
excerpt: "A major day of crash fixes across HTTP/2, fetch, Bun.serve, and editor APIs, plus isolated install hardening and TLS session caching."
commits: 20
authors: [robobun]
commit_authors: {"3179434": robobun, "4fb02aa": robobun, "3f93daa": robobun, "abd7433": robobun, "4c26d64": robobun, "1f606e6": robobun, "402263e": robobun, "e752497": robobun, "f32cf86": robobun, "0f53bd0": robobun, "2ac192c": robobun, "dec3059": robobun, "1c4cfba": robobun, "d601782": robobun, "20f9397": robobun, "ef32923": robobun, "ce1d5b4": robobun, "9e36e9f": robobun, "6b6fb1a": robobun}
---

### **Enable `install.hoist` to disable isolated fallback hoisting** (3f93daa)
Bun’s isolated linker now has a `hoist = false` switch to skip `node_modules/.bun/node_modules`, making store packages fail on undeclared imports instead of silently resolving phantom deps. The change is documented in bunfig/.npmrc docs and wired through the parser and installer options.

### **Cache fetch TLS sessions for faster resumption** (6b6fb1a)
`fetch()` now keeps a client-side TLS session cache so repeat connections to the same origin can resume instead of paying a full handshake and cert verification again. This reduces latency for cold-to-warm origin reconnects and closes a long-standing gap where only socket-based APIs could reuse sessions.

### **Fix multiple HTTP/2 transport reentrancy and UAF crashes** (402263e, 2ac192c, 3179434, f32cf86)
Several high-severity HTTP/2 bugs were fixed around transports that run user JS during writes: payloads are now copied when a JS callback can mutate or detach the backing buffer mid-send, frame emission no longer splits across re-entrant write callbacks, and stream lifetime bookkeeping was tightened to avoid use-after-free conditions in h2/h3 fetch paths.

### **Bun.serve stop() now waits for real open connections** (abd7433)
Graceful server shutdown now tracks live HTTP connections so the drain promise stays pending while keep-alive sockets are still open. That fixes cases where `server.stop(false)` could resolve too early and improves correctness for connection accounting during upgrades and closes.

### **Prevent crashes in `Bun.openInEditor` and `bun test` formatting** (dec3059, 9e36e9f)
`Bun.openInEditor()` now reads option values before borrowing its editor context, avoiding re-entrant RefCell panics from getters that call back into the API. The test runner also stopped crashing when pretty-formatting a `FormData` whose `toJSON` is missing or non-callable.

### **Stabilize `node:http2` frame writes and metafile output** (4c26d64, 1c4cfba, ef32923, 20f9397, 1f606e6, 0f53bd0, e752497, d601782, ce1d5b4, 4fb02aa)
The rest of the day was mostly correctness and test-harness work: deterministic metafile import paths, Windows socket-inherit fixes, safer file watch cleanup, GC/listener lifetime fixes, a direct-stream chunked terminator fix, and broad install-test cleanup now using TOML serialization. Temporal was also enabled by default.
