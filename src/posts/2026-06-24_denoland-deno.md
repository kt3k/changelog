---
date: 2026-06-24
repo: denoland/deno
size: L
title: "Deno gets watch, locks, and big fixes"
excerpt: "New watch/LSP/task features landed alongside runtime, publish, WebSocket, and desktop fixes."
commits: 17
authors: [divybot, bartlomieju, littledivy, Paul-Browne, nikicat, devsnek]
commit_authors: {"552fd06": bartlomieju, "741f4df": devsnek, "8509ae7": bartlomieju, "133cef3": divybot, "103ad49": divybot, "72497f3": bartlomieju, "9bb79b1": divybot, "9a7b580": divybot, "28a535f": divybot, "118b787": divybot, "cfddb71": bartlomieju}
---

### **Add a dedicated `deno watch` subcommand** (cfddb71)
`deno watch <file>` now aliases the existing `deno run --watch-hmr <file>` flow, making hot-reload development easier to discover and type. It reuses the `run` parser and flags, so the new entry point slots into existing behavior with minimal surface-area change.

### **Add Web Locks API support** (741f4df)
Deno now exposes the browser Web Locks API, including request/await/steal/cancel/release/query plumbing and a new `locks.js` extension module. That unlocks code relying on cooperative cross-tab/process locking semantics and closes a long-standing web compatibility gap.

### **Teach `deno task` input-based caching** (72497f3)
Tasks can now declare `files`, `output`, and `env` to opt into cacheable runs keyed by inputs, selected environment variables, dependencies, and the command itself. This is a major workflow improvement for repeat builds and generators, since unchanged tasks can now be skipped and outputs restored.

### **Install JSR deps through `node_modules`** (552fd06)
When `node_modules` is in use, `jsr:` dependencies are rewritten to JSR’s npm compatibility form so they install and resolve through npm-compatible machinery. This makes JSR packages much easier to consume with Node-style tooling and external editors, and adds config support for enabling the behavior.

### **Add an LSP “inferred type” request and code action** (28a535f)
The language server now serves a custom `deno/inferredType` request and a matching “Copy inferred type” refactor action. It returns full QuickInfo text and range data, which should make type inspection in editors more accurate and less truncated.

### **Fix `deno publish` so one failed package doesn’t stop the rest** (103ad49)
Workspace publishing no longer aborts on the first package failure; it records errors, keeps independent packages moving, and reports everything at the end. That matters for multi-package releases because one broken package won’t block all the others anymore.

### **Close active WebSockets when `Deno.serve` shuts down** (133cef3)
Server shutdown now tears down upgraded WebSocket resources instead of leaving them alive after the listener stops. This fixes leaked sockets and shutdown hangs in real servers that upgrade connections before terminating.

### **Fix `Deno.openKv()` to validate remote URLs up front** (9bb79b1)
Opening a remote KV store now fails immediately on invalid or unreachable URLs instead of succeeding and failing later, or hanging indefinitely on first use. That turns a confusing runtime failure into an early, actionable error.

### **Make sanitized test leak tracking ignore unsanitized tests** (9a7b580)
Leak sanitizer bookkeeping now avoids attributing leaked ops/resources/timers from tests that explicitly opt out of sanitizers to later sanitized tests. This removes a class of false positives that made test failures misleading and hard to debug.

### **Fix blob-worker revocation races** (118b787)
Worker startup now captures blob/object URL roots before `URL.revokeObjectURL()` can race with module graph setup. That prevents intermittent failures when immediately revoking the blob URL after constructing a worker.

### **Stop caching WebIDL sequence keys across isolates** (8509ae7)
The `
