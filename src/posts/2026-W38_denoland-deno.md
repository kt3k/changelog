---
date: 2026-09-20
repo: denoland/deno
period: weekly
slug: 2026-W38
period_label: "Sep 14–20, 2026"
size: M
title: "Deno tightens CLI parsing, tracing, and release sync"
excerpt: "This week fixed bash completions, improved `--` handling and HTTP trace propagation, and synced main to v2.9.7."
commits: 6
---

### **CLI behavior gets a set of correctness fixes**
Deno tightened several user-facing edge cases in the command line: bash completions now emit real newlines instead of escaped ones, and `deno run -- -script.ts` correctly treats the first argument after `--` as a literal entrypoint rather than switching into trailing-args mode. The parser also preserves a second `--` in forwarded arguments, which helps avoid mangling across run/eval/serve/task/compile flows.

### **HTTP tracing now propagates more reliably**
`Deno.serve` now lowercases HTTP/1 request header names before passing them to OpenTelemetry propagators, so mixed-case headers like `Traceparent:` correctly attach to an incoming trace. This fixes parent/child span linkage on the HTTP/1 fast path; HTTP/2 already handled normalized headers.

### **Release and dependency maintenance landed midweek**
Main was forwarded to the v2.9.7 release state, updating version metadata, release notes, manifests, and generated CI config. The release sync also bumped CI cache key prefixes to avoid reusing stale artifacts across the boundary. Separately, Deno pinned `rolldown` to 1.2.7 to preserve stack traces and refreshed Node builtin test expectations to match newer `@types/node` diagnostics.

### Other misc changes
- Updated `libuv-sys-lite` to 1.48.4.
- Added regression coverage for bash completions, `--` parsing, and mixed-case OTEL headers.
- Minor lockfile, manifest, and generated output refreshes.
