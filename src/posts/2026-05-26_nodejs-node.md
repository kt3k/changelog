---
date: 2026-05-26
repo: nodejs/node
size: L
title: "Permission drop lands; crypto and cert updates"
excerpt: "Node adds runtime permission revocation, refreshes root certs, and fixes a crypto -0 crash alongside several docs and tooling updates."
commits: 14
---

### **Add `process.permission.drop()` to revoke permissions at runtime** (956e2a2)
Node’s permission model now supports irreversible runtime revocation of granted scopes or specific resources. This is a meaningful API expansion: apps can reduce privileges after startup, while the docs clarify that already-open files, sockets, child processes, and workers remain unaffected.

### **Coerce `-0` key lengths to `+0` in pbkdf2 and scrypt** (3393399)
Passing `-0` as `keylen` could trip a native `IsInt32()` assertion and abort the process. The fix normalizes the value after validation, closing a crashable edge case and aligning `-0` with `+0` behavior in both sync and async APIs.

### **Refresh root certificates to NSS 3.123.1** (8bb63ed)
Node’s bundled trust store was updated to the latest NSS certificate set, removing a long list of deprecated roots and adding the newer bundle from Firefox 151. This can affect TLS trust decisions for clients relying on Node’s built-in CA set.

### **Other misc changes**
- Fixed the `worker_threads` docs to show that posting a `URL` now throws `DataCloneError` rather than cloning to `{}`.
- Clarified the JS security guidance to explicitly ask for reproducible examples.
- Added generated `llms.txt` docs output.
- Reduced flakiness in debugger, test runner, and webcrypto tests; added more probe debug logging.
- Enforced iterator result property order with a new ESLint rule and updated core iterators.
- Clarified `sqlite.database.applyChangeset()` filter docs.
- Fixed a VS2022 arm64 PGO build issue on Windows.
- Updated `nixpkgs-unstable` and a `brace-expansion` dependency in tooling.
