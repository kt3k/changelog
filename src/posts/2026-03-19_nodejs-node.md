---
date: 2026-03-19
repo: nodejs/node
size: M
title: "Node tightens Web API, AIX support"
excerpt: "QuotaExceededError becomes a real DOMException subclass, AIX/IBM i targets Power 9, and docs/build tooling get small updates."
commits: 4
authors: [SuperMo0, richardlau, panva, aduh95]
commit_authors: {"0998c37": richardlau, "b328bf7": panva}
---

### **QuotaExceededError is now a proper Web API class** (b328bf7)
Node now exposes `QuotaExceededError` as a real `DOMException`-derived constructor, with WebIDL-mandated `quota` and `requested` fields and validation rules. This aligns Node’s behavior with the spec and changes related crypto/webstorage code to throw the new class directly.

### **Raise the minimum Power target on AIX and IBM i** (0998c37)
The build now targets Power 9 for AIX and IBM i, replacing older Power 5+ assumptions in the toolchain and GYP config. This reflects the new minimum supported architecture and should simplify platform support going forward.

### **Other misc changes**
- Clarified package docs around `
