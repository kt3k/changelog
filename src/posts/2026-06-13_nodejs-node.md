---
date: 2026-06-13
repo: nodejs/node
size: L
title: "Node adds fs buffer reads, keepalive tuning"
excerpt: "New fs readFile buffer support lands alongside TCP keepalive controls, debugger probe limits, and native API deprecations."
commits: 12
authors: [addaleax, Renegade334, guybedford, clavin, joyeecheung, npm-cli-bot, ShenHongFei, mcollina, watilde]
commit_authors: {"2fb168f": addaleax, "1efdce3": guybedford, "fc28d94": addaleax, "8c4ec8a": joyeecheung, "de67c5c": mcollina}
---

### **fs: support caller-supplied readFile() buffers** (de67c5c)
`fs.readFile()` and `fsPromises.readFile()` can now read directly into a caller-provided buffer or a buffer factory, returning a view over the bytes read. This enables fewer allocations and more control over memory use when reading files.

### **net: expose TCP_KEEPINTVL and TCP_KEEPCNT in setKeepAlive** (1efdce3)
`socket.setKeepAlive()` now accepts `interval` and `count` in addition to the existing keepalive delay, letting users tune probe cadence and drop thresholds from Node. That makes the API much more useful for long-lived connections and maps cleanly to `TCP_KEEPINTVL` and `TCP_KEEPCNT`.

### **debugger: add --max-hit option to probe mode** (8c4ec8a)
Probe sessions can now stop as soon as a per-probe hit limit is reached, rather than waiting for timeout or process exit. This is a meaningful ergonomics upgrade for inspector-driven tooling and future attach-to-running-process workflows.

### **src: officially deprecate `node::ObjectWrap`** (fc28d94)
Node now formally deprecates the long-unmaintained `node::ObjectWrap` interface and steers addon authors toward public interfaces and newer alternatives. This is an API-shaping change for native addon guidance, with docs updated to reflect the preferred patterns.

### **src: do not track weak `BaseObject`s as children of `Realm`s** (2fb168f)
Heap tracking was adjusted so weak `BaseObject` instances no longer show up as if they were strongly retained by `Realm`/`Environment` nodes. That fixes misleading heap dumps and makes memory-retainer analysis more accurate for leak hunting.

### Other misc changes
- Primordials/frozen-intrinsics coverage tweaks, including adding `Iterator` to primordials.
- Official ABI registry update for Electron 44.
- Dependency bumps and build metadata updates, including npm 11.17.0 and ngtcp2 configuration.
- Test runner cleanup removing an unused shuffle helper and adding deterministic generator coverage.
