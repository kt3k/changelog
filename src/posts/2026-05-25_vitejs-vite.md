---
date: 2026-05-25
repo: vitejs/vite
size: M
title: "Request timeouts and resolver fixes"
excerpt: "Vite adds 408 timeout responses, fixes HTML proxy caching for /@fs/ pages, and tightens glob/resolve edge cases."
commits: 5
authors: [shulaoda, JarekToro, thatguystone]
commit_authors: {"47c4213": JarekToro, "5c8e98f": shulaoda, "cff41d5": shulaoda, "c85c9ee": thatguystone, "40985f1": shulaoda}
---

### **Fix html-proxy cache keying for /@fs/ HTML files** (47c4213)
Vite now correctly rewrites and loads inline module scripts from HTML served via `/@fs/`, avoiding a cache-key mismatch that could break proxy module resolution. The new middleware tests cover both filesystem and root-served HTML paths to ensure the `html-proxy` module loads reliably.

### **Send 408 Request Timeout on request timeout** (c85c9ee)
The dev server now maps Node's request-timeout error to an HTTP 408 response instead of falling back to a generic 400. This brings Vite's client-error handling in line with Node's server behavior and also adds the `Connection: close` header for these error responses.

### **Fix relative glob errors in virtual modules** (5c8e98f)
`import.meta.glob()` now throws the expected error earlier for relative globs inside virtual modules, even when they match no files. That prevents a silent `{}` result and preserves the existing rule that virtual-module globs must start with `/`.

### **Fix warnings from JS plugin-container resolve lookups** (40985f1)
`viteResolvePlugin` now gets an `onWarn` handler in JS plugin containers, so resolver warnings are logged correctly there too. The fix also switches to the partial environment logger because `buildStart` isn't run for the `createIdResolver` plugin container.

### Other misc changes
- Added a Sass resolve regression test for `@use` with a Node builtin name (cff41d5)
