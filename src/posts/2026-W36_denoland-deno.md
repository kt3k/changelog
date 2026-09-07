---
date: 2026-09-06
repo: denoland/deno
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: L
title: "Deno hardens Node compat, caching, and tooling"
excerpt: "This week brought Node compatibility fixes, stronger cache validation, better compression behavior, and a pnpm lockfile importer overhaul."
commits: 18
---

### Node compatibility gets a steady round of fixes
**Child process behavior** now matches Node more closely, including repeated signal delivery, Windows signal tracking, and reliable IPC close events for forked children. **AsyncLocalStorage** was also fixed to distinguish explicit `undefined` stores from exited contexts, and `node:dns` now returns Node-like error codes for malformed names and resolver failures.

### Runtime correctness and security improvements
**Code cache validation** now hashes full source contents instead of relying on length-sensitive checks, closing a stale bytecode reuse hole. **Process spawning** was tightened on Unix by dropping supplementary groups before uid/gid changes, and multicast joins now enforce the right network permissions against both the group and bound port.

### Compression, buffers, and HTTP internals were tuned
**Compression streams** no longer flush on every write, improving output quality and fixing chunking-dependent behavior for brotli/deflate/gzip. **Buffer hex conversion** moved onto native `Uint8Array` hex methods for better performance, and Node header map handling was adjusted to better preserve prototype behavior for `IncomingMessage`.

### Tooling and ecosystem support improved
**pnpm lockfile import** was reworked to handle real-world v6 lockfiles, root dependency shapes, and snapshot key normalization more robustly while skipping unsupported specs more safely. **Schema IDs** for Deno’s JSON schemas were updated to point at the maintained GitHub raw endpoint, fixing editor validation and `$ref` resolution.

### Telemetry and CI cleanup
**Telemetry context handling** was fixed so top-level fetch and cron spans no longer leak or mis-handle exited async context. **CI workflows** dropped obsolete Google Cloud auth steps and simplified release upload paths after the `dl.deno.land` migration.

### Other misc changes
- Package selector validation was tightened for `--ignore-scripts`.
- zsh completion flag formatting was corrected.
- Lockfile tarball registry path validation and several compat tests were updated.
- Docs and workflow YAML were cleaned up/regenerated.
