---
date: 2026-09-11
repo: nodejs/node
size: L
title: "Native glob, TLS fix, and zlib hardening"
excerpt: "Major fs glob support lands alongside TLS re-entrancy fixes, snapshot safety work, and zstd reset/dictionary fixes."
commits: 12
authors: [codebytere, jasnell, trivikr, pimterry, avivkeller, inoway46]
commit_authors: {"c8b346e": trivikr, "46bbfc4": pimterry, "8dca4b7": codebytere, "524564e": codebytere, "a8f2bf0": avivkeller, "c143041": jasnell, "99d05fc": jasnell, "4051bae": jasnell, "9e7f67f": inoway46, "c909c63": codebytere}
---

### **fs: implement glob natively** (a8f2bf0)
Node now ships a native `fs.glob()` implementation instead of relying on `minimatch`, which should improve consistency and reduce dependency surface. The change also adds benchmarks and updates the surrounding tooling to drop the old updater path.

### **tls: defer re-entrant SSL state machine calls from JS** (46bbfc4)
TLS writes, reads, and shutdowns now detect when they are invoked from inside the OpenSSL/BoringSSL stack and defer the operation to a later tick. This fixes a class of re-entrancy bugs that could otherwise corrupt the TLS state machine or trigger hard-to-debug failures during callbacks.

### **src: fix snapshot and isolate startup races** (524564e, 8dca4b7)
Node now preserves the first snapshot blob/external-references pair used in a process so later isolates are always created from the same live data, avoiding use-after-free when embedder snapshots are torn down. A separate fix makes external-reference collection thread-safe across concurrent isolate startups.

### **src: detach cppgc wrappers before their Realm is freed** (c909c63)
Cppgc-managed wrappers are now finalized through tracked list nodes so they can clean themselves up while the Realm is still valid, instead of holding stale Realm pointers past teardown. This closes a lifecycle bug that could surface with lazy or concurrent sweeping.

### **zlib: fix Zstd reset and reject invalid dictionaries** (4051bae, c143041)
Zstd reset now properly preserves configured parameters and dictionaries across sessions, and invalid dictionary types now fail with a type error instead of being silently ignored. Together these changes make the Zstd APIs more predictable and safer to use.

### **vfs: support renaming implicit ZIP directories** (c8b346e)
ZIP-backed VFS renames now treat archive entry prefixes as directories and move all descendant entries under the new prefix. That makes renaming directory-like paths in archives behave as users would expect, both synchronously and asynchronously.

### **Other misc changes**
- Fill in missing zstd docs (99d05fc)
- Fix a flaky common WPT inspector test (9e7f67f)
- Update js-yaml in tools/eslint and tools/lint-md (7709fca, 9828330)
