---
date: 2026-08-31
repo: nodejs/node
size: L
title: "TLS, FS, and permissions get real fixes"
excerpt: "Major bug fixes across TLS certificate handling, recursive fs.watch, SQLite changesets, permissions, and snapshot/isolate settings."
commits: 22
authors: [panva, mcollina, codebytere, christianaurichzm, tgies, nhjbest22, PickBas, RafaelGSS, pimterry, abhi128nandan, hyemimi, standard-Chan, themuuln, soulee-dev, agape1225]
commit_authors: {"705646f": tgies, "5954e52": mcollina, "d9538a9": codebytere, "c4336d9": nhjbest22, "2ec0f9a": codebytere, "4d9cb71": mcollina, "971cc1c": panva, "460b202": themuuln, "5947a91": mcollina}
---

### **TLS peer certificate reads no longer consume the chain** (705646f)
`getPeerCertificate()` and `getPeerX509Certificate()` now leave the session-owned peer chain intact by duplicating issuers instead of deleting them. This fixes truncated or empty results on repeated reads and adds a direct `hasPeerCertificate()` check for authorization logic.

### **Recursive fs.watch is now faster and more correct on Linux** (2ec0f9a, 971cc1c)
The recursive watcher was reworked to watch directories instead of every file on platforms without native recursive support, cutting setup cost and avoiding missed rename-based edits. A follow-up fix corrected error handling so only `ENOENT` can be suppressed when requested; all other setup failures now propagate and clean up partial watchers.

### **SQLite changesets are copied before JS callbacks can mutate them** (5954e52)
Applying a changeset now copies the input up front so JavaScript conflict/filter callbacks cannot corrupt the active buffer by detaching or modifying it mid-operation. This closes a subtle correctness hole when user code runs during apply.

### **Snapshot-based isolates now keep embedder error settings** (d9538a9)
Node now applies isolate settings consistently even when snapshots are used, instead of dropping embedder callbacks after deserialization. The change preserves fatal/OOM/stack-trace handling for embedders and adds coverage to prove those settings survive snapshot startup.

### **Permissions API accepts URLs and raw byte references** (c4336d9)
`permission.has()` and `permission.drop()` now accept WHATWG `URL` and `Uint8Array` references, with fs scopes converting file URLs to paths and native code preserving raw bytes. That makes permission checks more flexible and avoids lossy UTF-8 conversion for non-string path data.

### **Stream reopen no longer emits a premature drain** (5947a91)
`Utf8Stream` avoids signaling `'drain'` during reopen if a write has already started, so consumers no longer observe the stream as drained before the reopened write finishes. This fixes a race that could make readers see empty output.

### **Uncaught exception handling now breaks re-entrant fatal loops** (460b202)
Node adds a thread-local guard to detect when `process._fatalException` re-enters the uncaught-exception path through the inspector and would otherwise recurse forever. On detection it prints a diagnostic and aborts instead of spinning in an infinite loop.

### **VFS now plugs into both CommonJS and ESM loaders** (4d9cb71)
The virtual filesystem work lands integration across the module loaders, resolver, and documentation, making it usable for module loading rather than only basic fs calls. This is a broad feature expansion with substantial internal plumbing.

### Other misc changes
- First-time contributor workflow retry/backoff tweak
- Watch-mode test deflake
- fs.watch abort test cleanup on Windows
- Recursive fs.watch Linux fixture fix
- GN build arch detection fix for cross builds
- TLS docs cleanup
- `fs.cp` timestamp preservation on directories
- zlib binding typings update
- WPT streams fixture refresh
- Broken `using` link fix in ffi docs
- `CompileSerializeMain` string cache reuse
- Inspect async-hook test deflake
- `fs.glob` symlink globstar behavior fix
- Minor watch-mode ESM loading-error test adjustment
