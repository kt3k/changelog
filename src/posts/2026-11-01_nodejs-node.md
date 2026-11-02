---
date: 2026-11-01
repo: nodejs/node
size: M
title: "Buffer UTF-8 fast path and OpenSSL workflow fix"
excerpt: "A new safe fast path for Buffer.byteLength UTF-8 lands, alongside benchmark consolidation and an OpenSSL update workflow improvement."
commits: 6
authors: [inoway46, trivikr, abmusse, panva, ronag]
commit_authors: {"95f3cf0": panva, "bf246cf": ronag}
---

### **Buffer UTF-8 byteLength gets a safer fast path** (bf246cf)
Node now routes UTF-8 byte-length calculations through a new fast binding for safe one-byte strings, with a fallback path that avoids unsafe string flattening. This should improve hot-path performance while preserving correctness for rejected or lazily deoptimized strings; the change also adds GC and string-representation regression coverage.

### **OpenSSL updater now preserves existing PRs** (95f3cf0)
The scheduled OpenSSL update workflow now replays the current branch’s existing update commits before rerunning the updater, so same-version refreshes don’t churn the PR and lose approvals. It also learns how to carry forward contributor commits when the update branch advances.

### Other misc changes
- Consolidated the zlib CRC32/CRC32C benchmarks into one parameterized benchmark and removed the duplicate file.
- Updated FFI docs to rename OS/400 to IBM i.
- Added CVE-2026-106072 to v24 and v22 changelogs.
