---
date: 2026-06-08
repo: denoland/deno
size: L
title: "Deno tightened watchers, HTTP, telemetry"
excerpt: "Major fixes landed across watch mode, HTTP serving, telemetry sampling, node compat, and LSP perf."
commits: 43
authors: [crowlbot, bartlomieju, divybot, fibibot, nathanwhit, crowlKats, lunadogbot, likea-boss, LeSingh1, msnandhis, jayvdb, CertainLach, ntninja, haltandcatchwater]
commit_authors: {"b212315": nathanwhit, "fc7bcc2": bartlomieju, "55a8b88": bartlomieju, "0be857f": bartlomieju, "c6b5d08": divybot, "0ad6c51": crowlbot, "c2ad0d4": lunadogbot, "a2d8596": divybot, "0ce171f": fibibot, "58cb798": bartlomieju, "0e27f2d": crowlbot, "4c91e7e": crowlbot, "42f1771": CertainLach, "1121ddf": crowlbot, "0593056": haltandcatchwater, "a16910e": crowlbot, "d5a81a5": crowlbot, "d1c044c": crowlbot, "74caf3c": divybot, "82350c8": divybot}
---

### **Watch mode no longer dies on Deno.exit()** (0be857f)
`deno run --watch` now keeps the watcher process alive when the script calls `Deno.exit()`, instead of terminating the whole watcher. The change routes exit handling through isolate termination under watch mode, which also fixes `deno serve --watch` behavior.

### **HTTP/1.1 serve path fixed for proxy headers and streaming responses** (b212315)
The raw HTTP serve path now correctly strips `x-deno-client-address` when trusted proxy headers are enabled, keeps `Request.signal` alive until streaming response bodies finish, and normalizes absolute-form URLs for the node:http override path. These regressions affected proxy-aware serving, stream lifetimes, and Node compatibility.

### **OpenTelemetry now honors trace sampler settings** (d1c044c)
Deno now respects `OTEL_TRACES_SAMPLER` and `OTEL_TRACES_SAMPLER_ARG`, including parent-based and ratio samplers. That makes span recording/export behavior configurable instead of always-on, matching the SDK spec.

### **OpenTelemetry span attribute/event limits are enforced** (1121ddf, 0e27f2d)
The telemetry runtime now applies the SDK’s span attribute-count limit and span event-count limit, dropping overflow data and tracking it in the corresponding `dropped*Count` fields. This prevents unbounded span growth and brings Deno in line with OpenTelemetry configuration semantics.

### **Node child_process.spawnSync now enforces maxBuffer** (c2ad0d4)
`spawnSync()` now kills children when stdout/stderr exceed `maxBuffer`, mirroring Node’s timeout semantics by surfacing the configured kill signal and nulling status on overflow. This closes a compatibility gap that previously let oversized outputs slip through or fail inconsistently.

### **LSP workspace refreshes got faster and more correct** (42f1771, 0593056)
Workspace configuration data is now cached across members instead of being rebuilt repeatedly, cutting unnecessary file reads and resolver construction in large monorepos. Separately, workspace-folder changes now refresh the cache before resolver rebuilds, fixing stale vendor/resolver state after folder updates.

### **Glob matching was optimized for hot-path file walking** (fc7bcc2)
Config glob patterns now precompute their literal base path and a relative glob, avoiding repeated prefix parsing and absolute-pattern re-matching during fmt/lint/test discovery. This is a direct performance win on the file-walking hot path.

### **Web streams and decoding picked up compatibility/perf fixes** (82350c8, 0ad6c51, 55a8b88, d5a81a5)
Resource-backed writable streams now accept any `ArrayBufferView`/`ArrayBuffer`, and streaming `TextDecoder` got an ASCII fast path for better throughput. A benchmark compile break after the blob store refactor was also fixed, and FileReader progress events now fire as tasks per spec.

### **Node, REPL, and source-map behavior became more robust** (a16910e, c6b5d08, 74caf3c, a2d8596, 0ce171f, 58cb798, 4c91e7e)
This batch tightened several user-facing edges: unknown `node:` builtins now throw the right Node error, REPL completions include `navigator.gpu`, malformed syntax reports are less misleading, maybe-CJS source maps resolve correctly, type-only doc-test imports handle `verbatimModuleSyntax`, and `Deno.lint.runPlugin` now fails with a helpful availability message. LSP and conversion refactors also advanced the internal `ToV8`/`FromV8` work.

### Other misc changes
- WebGPU crate/runtime update and related sync changes (2 commits)
- Deno graph and V8 dependency bumps (2 commits)
- Docs/comment/test-only updates, schema/env var docs, and minor cleanup (multiple commits)
- Reverted a flaky node_compat test enablement
- Various small resolver/core/runtime refactors and regression-test additions
