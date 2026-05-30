---
date: 2026-03-24
repo: denoland/deno
size: L
title: "Deno hardens NAPI, Node, and fmt"
excerpt: "Major fixes land for native addon crashes, HTTP/TLS leaks, formatter behavior, and OpenTelemetry console output."
commits: 16
authors: [bartlomieju, Copilot, Rohan5commit]
commit_authors: {"4739004": bartlomieju, "dd5c9cb": bartlomieju, "802a788": bartlomieju, "637b758": bartlomieju}
---

### **Add built-in OpenTelemetry console exporter** (4739004)
Deno now includes a console exporter that prints spans, logs, and metrics in a human-readable format to stderr, enabled with `OTEL_EXPORTER_OTLP_PROTOCOL=console`. This removes the need for a collector just to inspect instrumentation and also broadens metric exporter support.

### **Fix NAPI exception and escapable handle behavior** (dd5c9cb)
`napi_throw` no longer eagerly throws into V8, which restores the expected `napi_get_and_clear_last_exception` flow. The escapable handle scope implementation also now tracks whether escape has already been called, so double-escape correctly reports `napi_escape_called_twice` instead of silently succeeding.

### **Prevent TSFN teardown crash in native addons** (802a788)
Threadsafe-function callbacks now keep a valid `env` even after the TSFN object has been released, avoiding a SIGSEGV when pending calls race with teardown. This fixes a real crash pattern seen in addons like `node-pty`.

### **Fix `https.request()` upgrade leaks with prebuilt `TLSSocket`** (d736de8)
The Node HTTP polyfill now reuses the original encrypted socket during upgrade instead of replacing it, which avoids leaking native TCP wrappers when `createConnection` returns a `TLSSocket`. It also waits for `secureConnect` in that path so connection setup matches TLS semantics.

### **Make `fs.cp` work across allowed dirs with ignored permissions** (637b758)
`node:fs.cp` no longer fails with `ENOENT` when traversing parents outside allowed directories under `
