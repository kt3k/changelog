---
date: 2026-03-30
repo: denoland/deno
size: L
title: "Deno tightens Node, npm, and runtime behavior"
excerpt: "Big day of compatibility fixes: Node crypto/fs/child_process, npm resolution, Windows permissions, LSP URIs, and WebTransport."
commits: 17
authors: [bartlomieju, crowlKats, kovan, lu-zero]
commit_authors: {"8252557": bartlomieju, "41fd4a1": bartlomieju, "4678f77": bartlomieju, "5ab1541": crowlKats, "4738ecd": bartlomieju, "ca989a0": bartlomieju, "2bb0666": bartlomieju, "7c57830": bartlomieju, "b365d54": bartlomieju, "fa18175": bartlomieju, "583bee8": bartlomieju, "bf3f85b": kovan, "8b9d1aa": bartlomieju, "6710d58": bartlomieju, "e15a439": bartlomieju, "6511a14": bartlomieju, "d6f8331": lu-zero}
---

### **Fix npm-linked package resolution when the package isn’t published** (fa18175)
Deno now falls back to synthetic package metadata for workspace-linked npm packages that don’t exist on the registry, instead of failing resolution. This unblocks linked local packages referenced from `deno.json` and makes npm graph/snapshot resolution handle those cases consistently.

### **Fix Windows path permission matching to ignore case** (2bb0666)
Path-scoped allow/deny rules now normalize comparison paths to lowercase on Windows, matching NTFS case-insensitivity. That prevents permissions from breaking just because a path is spelled with different casing.

### **Make npm packages shadow Node built-ins in BYONM mode** (7c57830)
When `--node-modules-dir=manual` is used, a package like `events` in `node_modules` now resolves before the Node built-in of the same name. This fixes a real compatibility gap with Node’s module precedence rules for projects that intentionally shadow built-ins.

### **Fix GCM cipher compatibility and state checks in Node crypto** (4678f77)
AES-GCM now rejects empty IVs, validates auth tag lengths even when not declared up front, and enforces one-time `setAuthTag`/post-final `setAAD` state rules. It also aligns the authentication failure error text with Node.js, reducing surprising runtime differences.

### **Fix `deno outdated` to use npm’s `latest` dist-tag** (b365d54)
The “Latest” column now reads `dist-tags.latest` directly instead of synthesizing a max version fallback. This avoids incorrect upgrades/downgrades around prerelease versions and brings Deno’s behavior in line with npm, pnpm, and bun.

### **Prevent WebTransport datagram overflow from hanging** (583bee8)
A loop that evicted excess queued datagrams could never terminate because its counter was immutable. The fix makes the counter decrement properly, eliminating an infinite-loop hang when incoming datagrams exceed the high-water mark.

### **Fix notebook-cell URI normalization in the LSP** (6710d58)
Query and fragment components are no longer double-encoded during URI normalization, which had been corrupting `vscode-notebook-cell` URIs. That should stop repeated “Could not find source file” errors in notebook workflows.

### **Fix `FileHandle.readLines()` lifecycle behavior** (ca989a0)
`readLines()` now uses the file handle’s existing stream creation path instead of forcing `autoClose: false`, which fixes a BadResource-style lifecycle bug. The updated tests confirm you can close the handle after calling `readLines()` and iterate lines normally.

### **Handle consumed external pointers gracefully in HTTP OTel ops** (6511a14)
HTTP telemetry ops now detect when an external pointer has already been consumed and return early instead of dereferencing stale memory. This avoids platform-specific crashes/panics when the same underlying object has already been taken elsewhere.

### Other misc changes
- `child_process.spawnSync()` now returns `pid` as Node.js expects (41fd4a1)
- `child_process` on Windows now escapes shell metacharacters more completely (8b9d1aa)
- `worker_threads` now drains pending messages before `exit` (4738ecd)
- `Deno.mkdir*` docs clarified for `recursive: true` (bf3f85b)
- `serde_v8` fixed an unsafe UTF-8 length calculation (8252557)
- Compile config gained `include`/`exclude` fields (5ab1541)
- Npm alias/install bookkeeping and other small internal fixes (e15a439, d6f8331)
