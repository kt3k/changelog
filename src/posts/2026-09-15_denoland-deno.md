---
date: 2026-09-15
repo: denoland/deno
size: M
title: "Pinning rolldown, refreshing Node builtin test output"
excerpt: "One runtime dependency pin to preserve stack traces, plus updated check test expectations for newer @types/node output."
commits: 2
authors: [bartlomieju]
commit_authors: {"800a5e9": bartlomieju, "7a83c98": bartlomieju}
---

### **Pin rolldown to preserve stack traces** (7a83c98)
Deno now imports `rolldown` at an exact `1.2.7` version for source minification, with a code comment explaining why: `1.2.8` mangles private class members and breaks spec tests that assert on release stack frames. This is a targeted compatibility pin that avoids test regressions from changing minifier output.

### **Update Node builtin module check expectations** (800a5e9)
The `check_node_builtin_modules` golden outputs were refreshed to match newer `@types/node` error text for `fs.readFileSync` overload resolution. This keeps the typecheck tests aligned with the current diagnostics.

### Other misc changes
- Bump `libuv-sys-lite` to `1.48.4`.
- Lockfile updates and small dependency metadata churn.
