---
date: 2026-05-19
repo: denoland/deno
size: L
title: "Deno tightens Node compat and inspector support"
excerpt: "Big Node-compat work lands for fetch/WebSocket inspector events, module hooks, DNS lookup behavior, and KeyObject cloning."
commits: 11
authors: [bartlomieju, nathanwhit, divybot, dsherret, crowlKats, lunadogbot]
commit_authors: {"3444038": bartlomieju, "da1d096": nathanwhit, "2a8484a": divybot, "c990d56": divybot, "290c79c": dsherret, "13138f6": bartlomieju, "1ddf381": nathanwhit, "aefd24f": crowlKats, "8aec4d5": bartlomieju, "f818294": lunadogbot, "99be4f5": bartlomieju}
---

### **Fetch now reports Network inspector events** (8aec4d5)
Deno wires global `fetch()` into the CDP Network domain, so attached DevTools and `node:inspector` clients can observe request/response lifecycle events and retrieve response bodies. This closes a major observability gap for debugging network traffic.

### **WebSocket traffic is visible in the inspector** (13138f6)
WebSocket creation, handshake, and close paths now emit the corresponding `Network.*` events when the inspector is attached. That brings WebSocket debugging in line with fetch, making DevTools network panels show real WebSocket activity.

### **KeyObject structured cloning now works over MessagePort** (2a8484a)
Node crypto KeyObjects can now be cloned across worker/message-port boundaries instead of failing serialization. This is an important Node-compat fix for worker-based code that passes crypto keys between contexts.

### **`deno why` now understands JSR dependencies** (1ddf381)
The package manager’s `deno why` command now traces dependency chains that flow through JSR, fixing misleading or broken output for modern package graphs. This directly improves dependency investigation workflows.

### **Node module hooks get several compatibility fixes** (99be4f5, 3444038)
The `node:module` hook implementation was updated to better match Node’s behavior for `nextLoad()`, `createRequire(url)`, builtin redirects, and repeated builtin `require()` calls with registered hooks. These changes fix edge cases that were breaking the bundled module-hooks test suite and hook-based loader tooling.

### **Falsy DNS hostnames now throw like Node 25+** (c990d56)
`dns.lookup()` and `dnsPromises.lookup()` now reject invalid falsy hostnames with `ERR_INVALID_ARG_VALUE` instead of falling back to the old deprecated behavior. That removes a Node divergence and makes bad inputs fail fast.

### **`cargo shear` removed unused Rust deps** (da1d096)
A repo-wide dependency cleanup trimmed a large set of unused Cargo entries, reducing build overhead a bit. The change is mostly maintenance and doesn’t affect the binary.

### Other misc changes
- `sys_traits` updated and unpinned (290c79c)
- LSP hover no longer panics on unresolved `.d.ts` imports (f818294)
- Enum serialization refactor to use `ToV8` instead of serde (aefd24f)
