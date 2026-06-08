---
date: 2026-06-07
repo: nodejs/node
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "Node tightens stream aborts, boosts perf, and hardens internals"
excerpt: "A week of stream/HTTP fixes, faster coverage and buffers, safer crypto/fs behavior, and build/ABI cleanup."
commits: 57
---

### **Streams and HTTP behavior get sharper abort/reset semantics**
Node fixed several edge cases in stream iteration and HTTP teardown: aborts now reject pending pulls promptly, falsy fail reasons no longer leave reads hanging, and synchronous `writev()` success is handled correctly. On the HTTP side, `Http2Stream` destruction semantics were clarified and `server.closeIdleConnections()` now catches sockets that connected but never sent a request.

### **Performance work landed in coverage and buffer/encoding hot paths**
Coverage reporting was sped up by caching glob compilation and per-URL skip decisions, cutting repeated work across workers. Buffer-related paths also got faster: UTF-8 encoding now has a Latin1 fast path, and `Buffer.byteLength(..., 'utf8')` uses simdutf for large UTF-16 inputs. Stream transform flushing also skips extra normalization work for common outputs.

### **Crypto, zlib, and fs/watch reliability improved**
WebCrypto now fails gracefully when cipher context allocation fails instead of hard-aborting, and zlib no longer risks a crash when `deflateInit2()` fails. File watching got a race fix for deleted directories during recursive scans, and watch mode now avoids restarting after shutdown has begun.

### **Build, ABI, and embedder support were cleaned up**
The build graph was refactored to support snapshot/codecache configurations with libnode, removing older incompatibilities. `CreateEnvironment()` overloads were consolidated into a single API-compatible but ABI-breaking signature, and `NODE_DEPRECATED` now uses standard `[[deprecated]]` annotations for broader compiler support. Legacy addon cleanup also got safer for Workers via new `ObjectWrap` environment teardown hooks.

### **Other misc changes**
- Inspector metadata for type-stripped CommonJS now preserves file URLs correctly.
- Navigator getter receiver checks were tightened for `language`.
- WebCrypto WPT fixtures and several docs/changelog entries were updated.
- Smaller maintenance work touched X509 matching, SQLite callbacks, CI/dependencies, FFI benchmarks, and zlib test reliability.
