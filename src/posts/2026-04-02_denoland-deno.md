---
date: 2026-04-02
repo: denoland/deno
size: L
title: "Deno drops tsgo and fixes npm link caching"
excerpt: "A major refactor removes the old TypeScript-go path, while smaller fixes tighten fd handling and npm lockfile link resolution."
commits: 3
authors: [bartlomieju]
commit_authors: {"6383876": bartlomieju, "d198cda": bartlomieju, "dba9373": bartlomieju}
---

**Remove the forked TypeScript-go infrastructure** (dba9373)
Deno has deleted the old `denoland/typescript-go` integration across the CLI and LSP, making `--unstable-tsgo` / `DENO_UNSTABLE_TSGO_LSP` effectively no-ops on the LSP path. This simplifies the type-checking stack and stops Deno from downloading, caching, or invoking the fork binary.

**Fix linked npm packages with peer deps in lockfile caching** (6383876)
Linked npm packages were being compared using their raw serialized lockfile keys, which broke when peer dependency suffixes were present and caused cache failures. The fix switches matching to `PackageNv` identity, so linked packages like `@scope/pkg@1.0.0_peer@x` are recognized correctly.

**Rewrite `Pipe.open(fd)` to use raw fd ops** (d198cda)
`Pipe.open(fd)` now plugs into the `NodeFsState` fd-based I/O path instead of creating Deno resources, which makes wrapped pipes, PTYs, and FIFOs behave more consistently with Node-style fd operations. The change adds raw-fd registration and platform-specific support for Unix and Windows, with new tests for duplicate and invalid fds.

### Other misc changes
- Removed obsolete Unix socket-from-fd net op
- Minor net/node wiring cleanup
- Added/updated tests and spec fixtures
