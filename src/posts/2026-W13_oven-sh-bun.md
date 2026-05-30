---
date: 2026-03-29
repo: oven-sh/bun
period: weekly
slug: 2026-W13
period_label: "Mar 23–29, 2026"
size: L
title: "Bun boosts HTTP latency and hardens core runtime edges"
excerpt: "This week brought listener/kernel fast paths, corking and URLPattern wins, plus a broad round of crash, leak, and GC fixes."
commits: 27
---

### **HTTP serving gets lower-latency kernel and corking fast paths**
Bun’s server path saw two performance-oriented upgrades. On Linux and FreeBSD, `Bun.serve()` listeners now opt into deferred accept so sockets arrive readable right away, cutting an extra poll/accept turn for short-lived HTTP connections. Separately, batch corking was improved to handle nested async handlers with two per-loop cork slots, reducing slow-path writes and syscall churn in interleaved request workloads.

### **Core runtime stability improved across streams, promises, and errors**
A set of fixes closed several crash and leak paths in the runtime. `Readable.pipe()` now safely catches `dest.write()` failures and destroys the destination instead of crashing the process, while `ReadableStream.pipeTo()` no longer leaks `AbortSignal` when a pipe never settles. Bun also fixed leaked `RequestContext` state when an aborted `Promise<Response>` never resolves, cleared stale pending exceptions when error formatting fails, and avoided a stack-overflow crash when termination is already pending.

### **Web APIs and Node compatibility got a broad correctness pass**
This week also tightened several APIs that previously crashed or misbehaved on edge inputs. `Bun.WebView` now inherits from `EventTarget`, gains richer screenshot encoding options, and exposes a raw `cdp()` escape hatch for Chrome backend control. On the compatibility side, Bun fixed `Bun.dns.lookup()` option handling, `mock.module()` validation, `assert.partialDeepStrictEqual()` for arrays, `expect.extend()` with numeric matcher keys, `Bun.$.braces("")`, and empty hostname/unix path coercions in `Bun.listen()` and `Bun.connect()`.

### **Performance work hit URLPattern, globbing, and WebCore bookkeeping**
`URLPattern.test()` and `exec()` were sped up by removing intermediate RegExp object/array allocations. Glob traversal was also optimized to avoid double-visiting directories, which should help deep trees and Windows-heavy scans. Under the hood, Bun adopted weaker callback references and cherry-picked WebCore memory-safety fixes to reduce GC cycles and close leak/use-after-free style risks in core web APIs.

### **Other misc changes**
- Support for TypeScript 6 was added across toolchain, templates, docs, and configs.
- `vm.Script`, `vm.SourceTextModule`, and `vm.compileFunction` leak via fetcher owner cycle was fixed.
- `TOML.parse` now cleans up its logger on errors.
- Linux/FreeBSD listener plumbing gained a new public deferred-accept option and related bindings updates.
