---
date: 2026-06-16
repo: microsoft/typescript-go
size: L
title: "API expansion and declaration emit fix"
excerpt: "Adds signature support and client-side caching, fixes declaration emit undefined wrapping, and closes an auto-import crash."
commits: 4
authors: [RyanCavanaugh, piotrtomiak, jakebailey]
commit_authors: {"6894935": piotrtomiak, "462a1a4": jakebailey}
---

### **API: add Signature support and smarter client caching** (6894935)
The native-preview API now exposes Signature objects end-to-end and adds a snapshot-aware object registry to cache symbols, types, signatures, and type lists on the client side. This reduces redundant round trips and makes async/sync API behavior more consistent.

### **Fix redundant `undefined` wrapping in declaration emit** (462a1a4)
Declaration emit no longer adds duplicate `| undefined` wrappers in optional-parameter cases. The fix tightens the node builder and pseudo-type conversion logic so emitted `.d.ts` output matches the underlying type more accurately.

### **Fix auto-import crash in alias resolver** (dd6bceb)
Auto-import now avoids panicking when `IsSourceFileDefaultLibrary` is queried on the alias resolver. A regression test was added to ensure diagnostic collection during export extraction can tolerate a file with type errors.

### Other misc changes
- Documentation update: note `tsc` for TypeScript 7.0 RC and later (1 commit)
