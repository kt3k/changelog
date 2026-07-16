---
date: 2026-07-15
repo: nodejs/node
size: M
title: "HTTP revert, stream cleanup, docs updates"
excerpt: "A revert restores client socket error behavior, while streams and crypto docs get refinements and tests/docs are cleaned up."
commits: 5
authors: [aduh95, mcollina, manNomi, harjothkhara]
commit_authors: {"34c28d5": mcollina, "b4dfc78": manNomi, "824bc66": aduh95, "bf5c221": aduh95, "5d68eb4": harjothkhara}
---

### **Revert late socket-error suppression in HTTP client** (34c28d5)
This reverts the change that stopped emitting socket errors after a complete response. The rollback restores the previous behavior for `ClientRequest` error handling and removes the now-obsolete regression test, which matters for compatibility around late socket teardown.

### **Simplify webstreams promise chaining** (bf5c221)
`lib/internal/webstreams/adapters.js` is refactored to flatten nested `PromisePrototypeThen` calls in the writable and duplex adapters. The change is internal, but it makes the async flow easier to follow and reduces nesting in code paths that bridge Node streams and Web Streams.

### **Clarify PEM requirements in crypto API docs** (5d68eb4)
The crypto documentation now explicitly says that string and buffer-like key inputs must contain PEM-encoded key material when passed to signing and verification APIs. That removes ambiguity for users calling `createPrivateKey()`/`createPublicKey()`-style paths.

### Other misc changes
- Devcontainer guide typo fix (b4dfc78)
- Test copyedits and assertion cleanups for TLS PSK/ALPN coverage (824bc66)
