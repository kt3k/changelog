---
date: 2026-03-15
repo: denoland/deno
size: L
title: "Deno tightens telemetry, profiling, and coverage"
excerpt: "Fixes OTEL console/HTTP span semantics, applies source maps to CPU profiles, and corrects coverage and Node UDP behavior."
commits: 7
authors: [bartlomieju]
commit_authors: {"895fa89": bartlomieju, "24bc84e": bartlomieju, "62a57bc": bartlomieju, "ad32e93": bartlomieju, "2989e30": bartlomieju, "622a15e": bartlomieju}
---

### **Telemetry now tags console logs with stdout/stderr** (2989e30)
OpenTelemetry log records emitted from console methods now include `log.iostream`, distinguishing stderr-producing calls like `console.warn`/`console.error` from stdout methods. This improves semantic correctness and makes backend filtering and analysis more accurate.

### **HTTP server spans stop treating 4xx as errors** (622a15e)
Server-side request tracing now follows OTel HTTP conventions: only 5xx responses set error status, while 4xx responses are treated as client errors. The change prevents healthy server requests like 404s from showing up as faults in tracing backends.

### **CPU profiler output now uses original TypeScript locations** (24bc84e)
`--cpu-prof` profiles are now post-processed through source maps before being written, so call frames point at original TS lines and columns instead of transpiled JS. That makes profiling output much more actionable when debugging Deno apps.

### **Console timers and counters are isolated per Console instance** (895fa89)
`console.time`/`count` state is no longer shared across all `Console` objects, which fixes spurious warnings and double-accounting when OTEL wraps the console. This is a targeted correctness fix for `OTEL_DENO=true` environments.

### **UDP multicast now accepts IPv6 memberships** (408ddbe)
Node’s UDP polyfill now validates multicast addresses against the socket family, allowing the previously unreachable IPv6 join/drop path to work. This unblocks IPv6 multicast usage that was incorrectly rejected as invalid.

### **Coverage no longer marks lines uncovered for tiny interior gaps** (ad32e93)
The coverage calculator now only zeroes a line when a zero-count V8 range overlaps an edge of that line, rather than any partial overlap. This fixes misreported uncovered lines in `finally` blocks and similar control-flow patterns.

### Other misc changes
- Node test submodule updated to Node.js 25.8.1 (62a57bc)
- Node child_process validation refactors and compatibility test config tweaks (62a57bc)
- OTEL test expectations updated for new log.iostream and server-status behavior (2989e30, 622a15e, 895fa89)
- Coverage fixture/output updates (ad32e93)
