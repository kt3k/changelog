---
date: 2026-07-20
repo: nodejs/node
size: M
title: "FFI wrapper fix, docs cleanup, stale policy shortened"
excerpt: "Node.js tightens FFI signature handling, refreshes key crypto/net docs, and reduces the stale issue window from 7 months to 3."
commits: 4
authors: [samuel871211, panva, avivkeller, trivikr]
commit_authors: {"5b27fb9": panva, "00917ba": trivikr}
---

### **FFI wrappers now read signatures only once** (00917ba)
`DynamicLibrary.getFunction()` and `getFunctions()` now build wrappers from metadata captured by native code instead of re-reading signature objects in JavaScript. That fixes cases where getters, proxies, or mutated signature objects could make the native and JS views disagree, and it adds coverage for the single-read behavior.

### **Crypto/WebCrypto docs switched from dense tables to grouped lists** (5b27fb9)
The crypto and WebCrypto API docs were reorganized to make algorithm support easier to scan, replacing large capability tables with grouped lists by supported formats/APIs. This is mostly documentation churn, but it materially improves readability for a complex part of the API surface.

### Other misc changes
- Clarified `socket.readyState` descriptions in `net.md` and added the `closed` state.
- Lowered the stale workflow thresholds from 210/240 days to 90/120 days.
