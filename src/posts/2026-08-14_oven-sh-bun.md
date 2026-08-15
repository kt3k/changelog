---
date: 2026-08-14
repo: oven-sh/bun
size: L
title: "Bun lands SQL LISTEN/NOTIFY and TOML Temporal"
excerpt: "Major new SQL and TOML APIs shipped, alongside worker teardown, HTTP, and runtime bug fixes plus a few docs/CI updates."
commits: 51
authors: [robobun, dylan-conway, alii, Jarred-Sumner]
commit_authors: {"3261773": dylan-conway, "7be23fd": dylan-conway, "056491f": robobun, "43afad2": dylan-conway, "008d700": robobun, "ada2a67": dylan-conway, "97a4363": dylan-conway, "2f5c180": robobun, "eabb96d": robobun, "7cf6296": dylan-conway, "032b8db": robobun, "baf62f9": Jarred-Sumner, "7ba276f": dylan-conway, "60f6e18": robobun, "3753c8b": dylan-conway, "54f0271": robobun}
---

### **SQL adds PostgreSQL LISTEN/NOTIFY** (2f5c180)
Bun's SQL client now supports `sql.listen()` and `sql.notify()` for PostgreSQL, with shared dedicated listen connections, reconnect/resubscribe behavior, async-disposable subscriptions, and transaction-aware notifications. That opens up a lightweight pub/sub path for cache invalidation and event fan-out.

### **TOML now round-trips date/time values through Temporal** (056491f)
`Bun.TOML.parse()` now maps TOML date/time forms onto `Temporal.Instant`, `Temporal.PlainDateTime`, `Temporal.PlainDate`, and `Temporal.PlainTime`, and `stringify()` emits the matching TOML literals back. This is a public API change that makes TOML parsing lossless for date/time values and aligns Bun with Temporal-enabled JavaScript.

### **Worker teardown and termination handling were hardened** (7be23fd)
This refactor changes how Bun tracks cross-thread work during VM shutdown, replacing a weaker parent-pointer/ticket path with explicit teardown-aware gating. It matters because it fixes subtle lifetime and release-mode unsoundness around worker shutdown and concurrent completions.

### **node:http keeps server wrappers alive while connections outlive close()** (43afad2)
Fixes a GC lifetime bug where a connection could still finish or error after `server.close()` but its JS wrapper might already be collected, dropping `clientError`/request events or invoking dead callbacks. That restores reliable late-dispatch behavior during shutdown.

### **HTMLRewriter no longer over-reads streamed inputs** (ada2a67)
`HTMLRewriter.transform()` now paces file, fetch, and readable-stream inputs by downstream demand instead of reading ahead. This fixes correctness/perf behavior for streamed bodies and prevents eager full-file consumption.

### **ThreadPool waits for the scheduled batch, not the whole pool** (3261773)
Batch waits in the thread pool and bundler linker now track only the work that was actually scheduled. That removes accidental coupling to unrelated pool activity and can materially reduce `Bun.build` latency under contention.

### **bun test stops firing process exit listeners globally** (baf62f9)
`bun test` now only runs `process.on('exit')` listeners when Node test APIs were involved, undoing the broader user-visible behavior change. This brings Bun's test runner back in line with expected test-file semantics.

### **Worker termination and immediate-exit paths were fixed** (eabb96d, 7ba276f, 97a4363)
Multiple fixes landed for workers that stop themselves via `process.exit()` or `terminate()` while native work is still in flight, including prompt loop wakeups and correct teardown ordering. These changes close timing windows that previously caused delayed exits, dropped events, or UAF-style lifetime bugs.

### **N-API ungated calls now handle termination correctly** (54f0271)
Addons calling ungated N-API functions no longer lose termination requests or spin forever when `timeout`/`worker.terminate()` arrives mid-call. The change also tightens the preamble around external string creation to avoid running finalizers under the wrong scope.

### **FreeBSD and Android runtime/build fixes** (3753c8b, 7cf6296)
The FreeBSD lane gets several runtime fixes plus harness updates so the suite can actually run there, and Android `--compile` executables now avoid the PIE load-bias crash while keeping Intl's locale behavior correct. These are platform-specific bug fixes that unblock real test and release paths.

### **SQL/MySQL and node:vm behavior now better matches Node** (032b8db, 60f6e18, 008d700)
MySQL auth failures now explain the public-key-retrieval remedy instead of reporting a misleading generic close, `node:vm` now rejects array/function options like Node does, and SQL callbacks now run in the async context where the instance was created. These are smaller but user-visible correctness fixes.

### Other misc changes
- Docs/editorial updates for voice rules, TOML, SQL, Vercel, Remix, and PM docs.
- CI/build tweaks, including docs deploy triggering, cache changes, and lane adjustments.
- Dependency bumps and lint-baseline updates.
- Dead-code cleanup and minor internal refactors.
