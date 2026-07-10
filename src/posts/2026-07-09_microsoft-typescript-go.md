---
date: 2026-07-09
repo: microsoft/typescript-go
size: M
title: "Project reference validation and race fix"
excerpt: "TypeScript-Go now rejects invalid project reference fields and fixes a concurrent auto-import cache access race."
commits: 2
authors: [TorinAsakura, johnfav03]
commit_authors: {"168e701": TorinAsakura, "487baf0": johnfav03}
---

### **Validate invalid project reference fields (168e701)**
Adds parsing and config-file validation for malformed project reference entries, covering bad or missing `path` and `circular` fields. This tightens tsconfig handling so invalid references are reported instead of being silently accepted.

### **Fix concurrent extraction cache access (487baf0)**
Protects a shared auto-import extraction cache read with a lock to avoid a concurrent map access race during fallback package indexing. The new regression test exercises the race-prone path across many packages to confirm the cache stays safe.

### Other misc changes
- Added/updated tsconfig and build error regression tests for invalid project reference fields.
- Expanded auto-import registry test coverage for concurrent fallback handling.
