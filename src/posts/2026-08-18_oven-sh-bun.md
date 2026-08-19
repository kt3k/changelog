---
date: 2026-08-18
repo: oven-sh/bun
size: L
title: "Major Bun fixes across runtime and tooling"
excerpt: "Memory, Valkey, WebView, SQL, bundler, and shell fixes landed alongside dead-code and build cleanup."
commits: 67
authors: [robobun, alii, Jarred-Sumner, dylan-conway, sosukesuzuki, bpasero-ant]
commit_authors: {"4855666": robobun, "8000230": robobun, "91cdf15": robobun, "254b065": robobun, "4673c48": sosukesuzuki, "13845e1": alii, "85c8983": alii, "87ac50c": robobun, "b938280": robobun}
---

**process.memoryUsage().heapUsed now reflects the latest full GC** (91cdf15)
Bun now reports `heapUsed` from the most recent collection instead of sticking to the last eden GC value. This fixes incorrect memory stats in full-GC and no-JIT modes, where `heapUsed` could be stale, zero, or even larger than `heapTotal`.

**Shell `rm -rf` no longer aborts on deep paths** (8000230)
`Bun.$` `rm` now handles entries deeper than `PATH_MAX` as an error instead of panicking the process. That turns an uncatchable crash into a normal failure for recursive deletes on very deep trees.

**SQL pool accounting stays balanced when a connection dies** (254b065)
When a reserved SQL connection closes unexpectedly, Bun now keeps the pool’s query counters and reservation state in sync. This fixes cases where a dropped connection could leave the pool thinking a slot was still occupied or miscounted, breaking later scheduling and cleanup.

**Bundler stops emitting dead `import()` chunks** (4673c48)
With `--splitting`, chunks referenced only from code eliminated by tree shaking are no longer emitted. That reduces unnecessary output and fixes a correctness issue where dead dynamic imports could still force real chunks into the build.

**Valkey retry/close handling was tightened up** (13845e1)
The reconnect path now explicitly cancels stale timers, distinguishes terminal disconnects from retrying states, and avoids double-closing sockets during retry windows. This makes connection failure, close, and reconnect behavior much more reliable under racey shutdown and retry scenarios.

**Valkey socket lifetime handling was reworked** (85c8983)
Bun moved the keep-alive ref release to the close-event entry so the ref is dropped at the right moment, before user-level close handling runs. This fixes lifecycle bugs where Valkey sockets could outlive their intended close path or settle incorrectly during reconnects.

**WebView now cleans up views after browser death** (4855666)
If the browser process disappears, orphaned `Bun.WebView` instances are now rejected/closed instead of hanging forever. That prevents stuck promises and leaked view slots after crashes, EOF, or explicit shutdown.

**`node:crypto` shake digests no longer SIGABRT on huge output lengths** (87ac50c)
SHAKE digests with output lengths above 2^31 now fail safely instead of aborting the process. That aligns Bun with Node for large-but-valid digest sizes and removes a hard crash from the crypto API.

**`Buffer#copy` now handles oversized offsets correctly** (b938280)
Offsets at or above `Number.MAX_SAFE_INTEGER` no longer silently turn into zero. This fixes incorrect copies and brings Bun’s behavior in line with Node’s range checking and return values.

### Other misc changes
- Dead-code removal across runtime, bindings, crates, and headers; including a large WebKit text-encoding cleanup and bundled binary size reductions.
- Worker startup no longer eagerly builds and discards fd-backed stdio streams.
- `Bun.file().arrayBuffer()` and child-process output now throw cleanly instead of panicking on >4 GiB / overflow-sized payloads.
- Several path-length crash fixes in CLI, `bun test`, `fs.watch`, and shell builtins (`mkdir`, `touch`, `rm`).
- NAPI / vm / receiver-conversion fixes for Node compatibility, including `ShadowRealm`, `util.isError`, `StringDecoder`, `fs.Stats`, and callbacks.
- WebView Windows spawn-path support, stream/direct response abort handling, `bun pm diff`, `bun install`/build dependency cleanup, and assorted test/build updates.
