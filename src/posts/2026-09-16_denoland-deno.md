---
date: 2026-09-16
repo: denoland/deno
size: M
title: "Deno fixes CLI `--` parsing and HTTP trace context"
excerpt: "Entry-point args after `--` are now preserved correctly, and Deno.serve now keeps traceparent propagation working for mixed-case HTTP/1 headers."
commits: 2
authors: [bartlomieju, lucacasonato]
commit_authors: {"685eb3b": bartlomieju, "057a3da": lucacasonato}
---

### **Preserve `--` before entrypoint scripts** (685eb3b)
`deno run -- -script.ts` now treats the first post-`--` value as a literal positional instead of flipping into trailing-args mode, matching entrypoint-style CLI behavior. The parser also keeps a second `--` in the forwarded tail, fixing a class of argument-mangling bugs for run/eval/serve/task/compile flows.

### **Normalize HTTP/1 header names for trace propagation** (057a3da)
`Deno.serve` now lowercases HTTP/1 request header names before handing them to OpenTelemetry propagators, so `Traceparent:` and other non-lowercase spellings correctly join an incoming trace. This fixes broken parent/child span linkage on the fast path; HTTP/2 was already safe because headers were normalized there.

### Other misc changes
- Added parser coverage for `run`/`eval` double-dash edge cases.
- Added an OTEL spec test for mixed-case `Traceparent` on raw HTTP/1.1.
- Test/output and fixture updates for the above behavior.
