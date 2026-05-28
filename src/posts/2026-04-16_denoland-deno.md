---
date: 2026-04-16
repo: denoland/deno
size: L
title: "Deno lands native Node HTTP rewrite"
excerpt: "Major Node HTTP rewrite, plus audit endpoint migration and Windows/playwright and console proxy fixes."
commits: 4
authors: [bartlomieju, nathanwhit]
commit_authors: {"8258225": bartlomieju, "271ae43": nathanwhit, "65a40d0": bartlomieju, "a2eb5ba": bartlomieju}
---

### **Node HTTP stack rewritten around llhttp and native TCPWrap** (a2eb5ba)
Deno replaced its hyper-based `node:http` implementation with a native TCP layer and llhttp-based parser, along with a large polyfill rewrite to match Node’s structure more closely. This is a major runtime change that should improve compatibility with Node HTTP behavior and make the internals less ad hoc.

### **`deno audit` now uses npm’s supported bulk advisories API** (8258225)
The audit command was migrated off npm’s retired security audits endpoint onto `/-/npm/v1/security/advisories/bulk`, which avoids the inconsistent responses that were crashing deserialization. The implementation was also simplified substantially, cutting out dependency-tree construction and response-merging logic.

### **`console.log`/`Deno.inspect` now honor custom inspect on proxies** (65a40d0)
Deno now reads `Symbol.for('nodejs.util.inspect.custom')` directly instead of checking it with `in`, so proxies that hide symbols via `has` but expose them via `get` still format correctly. This fixes broken inspection for proxy-backed objects such as nodejs-polars DataFrames.

### **Playwright compatibility fixed on Windows** (271ae43)
The Windows pipe handoff was corrected so handles are wrapped as CRT file descriptors before being passed into JS, and named pipes are now detected and opened through Tokio’s async named-pipe client when appropriate. That should unblock Playwright compatibility on Windows, which had been disabled previously.

### Other misc changes
- `node:http` internal refactors and module wiring changes from the HTTP rewrite.
- Audit test output updates and registry test adjustments.
- Console unit test additions for proxy/custom-inspect behavior.
