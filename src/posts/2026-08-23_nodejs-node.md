---
date: 2026-08-23
repo: nodejs/node
size: L
title: "URL, streams, compile cache get upgrades"
excerpt: "Node.js added URL parsing and histogram performance work, compile cache read-only mode, QUIC and stream fixes, plus several API tweaks."
commits: 30
authors: [jasnell, trivikr, aduh95, mcollina, HoonDongKang, anonrig, efekrskl, IlyasShabi, mertcanaltin, hanityx, mhayk, samuel-williams-shopify, semimikoh, GetThatCookie, nachiketap11, ganjanggejang, inoway46, codebytere, martenrichter, webdevelopersrinu, kimtaejin3, armanmikoyan, trivenay]
commit_authors: {"f96dccc": trivikr, "057e591": aduh95, "857e438": IlyasShabi, "00c80a8": mertcanaltin, "524dee4": jasnell, "c28857e": trivikr, "fbea5c3": hanityx, "453f47a": mhayk, "0b89f8f": samuel-williams-shopify, "0449521": mcollina, "22e99dc": semimikoh, "65f518c": codebytere, "0ea2c86": webdevelopersrinu, "130fe36": anonrig, "97c7e32": armanmikoyan, "da7b94e": trivenay, "82babee": mcollina}
---

**WHATWG URL parsing gets a faster fast path** (130fe36)
Node.js now parses one-byte ASCII inputs in place, reuses the original V8 string when the href is unchanged, and delays URLContext allocation until parsing succeeds. This trims allocations and copies on common URL workloads, with new coverage for the fast path.

**perf_hooks histograms gain statistical comparison APIs** (524dee4)
Recordable histograms now support EWMA-based tracking plus effect-size and hypothesis-testing helpers such as Cohen's d, Cliff's delta, Welch's t-test, and Mann-Whitney U. That makes in-process benchmark analysis and regression detection possible without external tools.

**Compile cache can now be mounted read-only** (65f518c)
`module.enableCompileCache()` and `NODE_COMPILE_CACHE_READONLY=1` add a mode that only reads preexisting cache entries and never writes or creates the directory. This is aimed at packaged or integrity-checked apps that want the startup win without mutating the cache.

**fs stat-style operations can be aborted cleanly** (00c80a8)
`stat`, `lstat`, and `fstat`-style promise/callback paths now accept `signal` so in-flight filesystem stats can be canceled. The change propagates through `lib/fs.js`, `lib/internal/fs/promises.js`, docs, and targeted tests.

**HTTP/3 now rejects unconsumed streams with a protocol code** (da7b94e)
When a QUIC session receives a request stream but no consumer is registered, Node now resets it with `H3_REQUEST_REJECTED` for HTTP/3 sessions instead of always tearing it down generically. That gives peers a standards-compliant signal that the request was not processed.

**Stream iteration broadcast/end handling is now more robust** (c28857e)
The broadcast writer now waits for buffered data to drain before completing `end()`, and the API docs clarify that `endSync()` may return `-1` when asynchronous draining is required. This fixes backpressured writes getting stuck pending and aligns the semantics with the actual behavior.

**Broadcasted stream sharing no longer drains the source too early** (f96dccc)
`stream.iter.share()` now waits for buffer space after dropping a newest item instead of immediately pulling again. That avoids one consumer starving the source or looping forever when a slower consumer keeps the buffer full.

**QUIC rejects unread request streams with the right reset code** (da7b94e)
The QUIC stack now exposes a per-application "request rejected" code and uses it when an incoming request stream is dropped before application processing. HTTP/3 maps this to `H3_REQUEST_REJECTED`, while other applications keep the previous no-error behavior.

### Other misc changes
- Removed the `--no-experimental-websocket` CLI flag (057e591)
- HTTP connection list refactor to intrusive lists for performance (0449521)
- Heap embedder graph deduplication fix (857e438)
- `os.networkInterfaces()` docs typo/property name fix (fbea5c3)
- REPL history merge fix for entries added during async load (453f47a)
- TTY raw-vt/io raw mode support (0b89f8f)
- Default coverage exclusion now matches dotfiles (22e99dc)
- Glob traversal sibling-skipping bug fix (0ea2c86)
- Duplicate `endReadableNT` scheduling fix in readable streams (82babee)
- Dgram bind error callback behavior fix (97c7e32)
- Readability/test maintenance and minor doc/CI updates across remaining commits
