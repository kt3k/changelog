---
date: 2026-04-04
repo: nodejs/node
size: M
title: "HTTP request aborts and pipelined cleanup land"
excerpt: "Node adds req.signal, fixes leaked pipelined responses, updates streams docs, and raises the GCC floor to 13.2."
commits: 6
authors: [TomStrepsil, ronag, akshatsrivastava11, targos]
commit_authors: {"a3108ff": TomStrepsil, "4b3d82c": ronag, "bf1aebc": akshatsrivastava11, "6d954e7": targos}
---

### **Add AbortSignal support to IncomingMessage requests** (bf1aebc)
`req.signal` now exposes an `AbortSignal` that fires when the socket closes or the request is destroyed. That makes it easier to cancel downstream async work like `fetch` calls or database queries when a client disconnects.

### **Fix leaked pipelined HTTP responses on socket close** (4b3d82c)
When a socket with queued pipelined requests is destroyed, Node now destroys the pending outgoing responses too instead of leaving them alive indefinitely. The related `OutgoingMessage.destroy()` path also now emits `close` even when there is no socket, tightening lifecycle behavior.

### **Document `TransformStream` transformer.cancel** (a3108ff)
The Web Streams docs now describe the `cancel` callback for `TransformStream` transformers, including when it runs and what arguments it receives. This matches the spec and closes the gap for users implementing cancellation-aware transforms.

### **Raise the minimum GCC requirement to 13.2** (6d954e7)
Node's build docs and compiler checks now require GCC 13.2 or newer. This reflects V8's newer compiler baseline and prevents unsupported Linux builds from proceeding.

### Other misc changes
- Updated ESLint tooling dependencies in `/tools/eslint` (2 updates).
- Bumped `cachix/install-nix-action` in three GitHub Actions workflows.
