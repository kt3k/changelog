---
date: 2026-09-27
repo: nodejs/node
size: L
title: "Worker reports hardened; perf delay API fixed"
excerpt: "Node.js now avoids invalid timeout reports from stuck Workers and fixes event loop delay histogram options and truncation bugs."
commits: 12
authors: [panva, trivikr, bmuenzenmeyer, HoonDongKang, marcopiraccini, jasnell, mcollina, inoway46, thisalihassan, agape1225]
commit_authors: {"5137638": panva, "75e4bbe": trivikr, "37d5c80": bmuenzenmeyer, "a2a064c": panva, "c97bbfb": HoonDongKang, "3641c36": marcopiraccini, "2ce7a73": jasnell, "0519f50": mcollina, "55e966f": inoway46, "7d79ed3": thisalihassan, "cf0434f": agape1225}
---

### **Harden process-timeout reports when Workers hang** (75e4bbe)
`--report-on-process-timeout` now waits up to two seconds for Worker subreports and then omits any Worker that is still blocked, instead of forcing out a truncated JSON report. The docs were updated to explain the new behavior, and the watchdog/report code now uses timed condition-variable waits to keep the report valid.

### **Fix `monitorEventLoopDelay()` option truncation and docs** (2ce7a73)
`monitorEventLoopDelay()` now correctly handles large `resolution` values instead of wrapping at 32-bit limits. The change also adds support and documentation for the `lowest`, `highest`, and `figures` histogram options, and redefines `histogram.exceeds` to mean values above the histogram’s recordable maximum.

### **Cache HTTP parser callbacks without retaining parsers** (0519f50)
The HTTP parser now caches its per-message JS callbacks on the parser object instead of holding them in strong V8 globals. That reduces the risk of callbacks keeping parsers alive, while still clearing cached entries when a parser is initialized or freed.

### **Support SEA dynamic import code cache tests** (7d79ed3)
Single-executable application docs and tests were updated for `import()` with code cache. This tightens coverage around SEA behavior for dynamic imports.

### Other misc changes
- FFI test split and abort coverage cleanup (a2a064c)
- CI start workflow now checks Jenkins availability/workload (5137638)
- Watch mode detects files replaced via unlink/create (3641c36)
- Support LIEF 0.17.x and 1.x in SEA tooling (55e966f)
- Doc/tooling dependency update in `tools/doc` (df775ec)
- Build verbosity toggle for doc-kit (37d5c80)
- Duplicate benchmark cleanup (c97bbfb)
- Type definitions wired up for `spawn_sync` (cf0434f)
