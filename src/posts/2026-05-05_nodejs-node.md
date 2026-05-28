---
date: 2026-05-05
repo: nodejs/node
size: L
title: "Node 26 lands, Undici 8.2.0 bundled"
excerpt: "Node.js 26.0.0 is marked current, Undici is bumped to 8.2.0, and a few stream/test fixes land alongside versioning updates."
commits: 13
authors: [RafaelGSS, nodejs-github-bot, Renegade334, davidthornton, aduh95, MoLow]
commit_authors: {"18f938d": RafaelGSS, "9e633f9": RafaelGSS, "6df4f7b": Renegade334, "480ee08": MoLow, "ee37fce": nodejs-github-bot}
---

### **Node.js 26.0.0 is now the current line** (9e633f9)
The release metadata and changelogs were updated to add Node.js 26 as the current series, and the release notes were rolled up for 26.0.0. This is the main repo-level milestone of the day and sets the new major release track in place.

### **Undici 8.2.0 is bundled into Node.js** (ee37fce)
Node’s vendored Undici dependency was updated to 8.2.0, bringing a large set of internal HTTP client changes plus expanded security guidance in the vendored package. This matters because Undici underpins core fetch/HTTP behavior, so dependency bumps here can affect runtime networking semantics.

### **test runner no longer fails todo suites on hook errors** (480ee08)
A failing `before` hook inside a suite marked `todo` will now keep the overall test run green, matching the existing advisory semantics of todo tests. The commit includes a regression test showing the suite should exit 0 even when the hook throws.

### **Synchronous stream piping now always uses writeSync in the sync path** (6df4f7b)
`pipeToSync()` no longer checks for `writer.writeSync` before calling it in the batched write path; it now assumes the sync API and invokes `writeSync()` directly. This tightens the synchronous code path and removes a redundant branch in stream iteration internals.

### **Node’s major version was bumped to 27** (18f938d)
`NODE_MAJOR_VERSION` in `src/node_version.h` was incremented from 26 to 27, preparing the codebase for the next major development line. This is a versioning change with repo-wide signaling impact, though not a user-facing feature by itself.

### Other misc changes
- Changelog/docs cleanup and version markers updated across API docs.
- TypeScript docs link fix.
- Undici update script switched to `npm ci`.
- Nixpkgs pin updated.
- Amaro dependency bumped to 1.1.9.
- WPT URL fixture refresh.
- Minor changelog numbering/doc formatting fixes.
