---
date: 2026-05-12
repo: leanprover/lean4
size: M
title: "Time formatting and server test fixes land"
excerpt: "Locale-aware time formatting, a safer server wait helper, and a TZDB search-path fix headline the day."
commits: 6
authors: [nomeata, algebraic-dev, Kha, wkrozowski]
commit_authors: {"7a6c59a": nomeata, "8c82f9e": algebraic-dev, "c04a83a": wkrozowski, "ea73a5b": algebraic-dev}
---

### **Locale-aware week/date formatting added** (8c82f9e)
`Std.Time` now supports configurable locales and locale symbols for date/time formatting, including first-day-of-week-aware week calculations. This also adds week-based year support (`Y`) and threads the week-start parameter through `weekOfYear`/`alignedWeekOfMonth`, which matters for TR35-style formatting and non-Monday locales.

### **Server interactive waitFor now fails fast on worker death** (7a6c59a)
The test runner’s `waitForMessage` helper now aborts promptly if the language server reports a `fatalError`, instead of hanging until an outer timeout. That makes `waitFor`-based interactive tests more reliable and gives a direct error when a file worker crashes or header processing fails fatally.

### **TZDB lookup now prefers TZ/TZDIR over /etc/localtime** (ea73a5b)
Time zone resolution was reworked so missing `/etc/localtime` no longer breaks lookups when `TZ` or `TZDIR` are available. The search logic now re-reads `TZDIR` on each lookup and handles `TZ` parsing explicitly, fixing an environment-sensitive failure in zone rule discovery.

### **`dupNamespace` moved into the general linter framework** (c04a83a)
The duplicate-namespace check was upstreamed from the env-linter path into `Lean.Linter`, with new dedicated implementation code and updated test wiring. This is mostly a refactor, but it makes the linter available in the broader text-linter framework and aligns Lean’s built-in linting structure with `mathlib`.

### Other misc changes
- Removed the low-value `worker_crash` server-interactive test, then reintroduced it as part of the `waitForMessage` regression coverage.
- Test harness cleanup: full `.lake` directories are now wiped in pkg tests to avoid stale config reuse.
