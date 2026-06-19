---
date: 2026-06-18
repo: denoland/deno
size: L
title: "Deno gets faster, safer tasks, better errors"
excerpt: "Major CLI parser split, startup perf gains, new task flags/env vars, and fixes for node:test, networking, Jupyter, and resolvers."
commits: 18
authors: [bartlomieju, divybot, littledivy, sanjibani, CAB233, mlyngvo, lunadogbot, nathanwhit]
commit_authors: {"85b4cb5": bartlomieju, "3568da2": bartlomieju, "7b54748": littledivy, "846bc88": bartlomieju, "b585efb": bartlomieju, "53caf04": bartlomieju, "05f553e": bartlomieju, "c72a8a9": mlyngvo, "52962aa": bartlomieju, "d5d3815": bartlomieju}
---

### **CLI flag types move into a new parser crate** (85b4cb5)
Deno starts the long-running clap replacement by extracting the canonical CLI flag types into a new `deno_cli_parser` crate. That cleanly separates pure flag data from CLI-specific behavior, making the parser replacement smaller, reviewable, and easier to land incrementally.

### **Startup time drops from 22ms to 15ms** (7b54748)
This refactor pushes more of the Node polyfill closure into lazy-loaded paths so common `deno run` / `deno eval` startup avoids deserializing node machinery it doesn't need. The measured result is a meaningful startup win on the hot path, with the tradeoff that some CommonJS-heavy cases are a bit slower.

### **`deno task` adds `--if-present`** (846bc88)
`deno task <name>` can now exit successfully without output when the task is missing, matching npm's optional-task behavior. This is especially useful in generated CI workflows where a task may not exist in every project.

### **`deno task` now sets npm process env vars** (b585efb)
Package.json scripts now receive `npm_execpath`, `npm_node_execpath`, and `npm_command` in addition to the existing package/lifecycle variables. That improves compatibility with packages that inspect npm-style environment metadata during script execution.

### **Bare import errors get better hints for linked workspace packages** (53caf04)
When a bare specifier fails to resolve, Deno now checks whether the project contains an importable workspace member or linked package and uses that to refine the error message. This avoids misleading npm-install hints when the real issue is simply importing a package by the wrong declared name.

### **node:test now fails on unhandled rejection and honors timeout** (05f553e)
The Node test polyfill now attributes unhandled rejections to the currently running test, and it enforces test timeouts instead of letting them slip by. That brings Deno's `node:test` behavior closer to Node's and closes a class of silent test failures.

### **TCP/Unix/Vsock closes now cancel in-flight reads** (c72a8a9)
Closing stream resources now properly cancels pending reads so sockets are dropped and peers observe EOF instead of hanging until process exit. This fixes a real shutdown/cleanup bug in network I/O.

### **Jupyter now reports cell errors instead of swallowing them** (3568da2)
The Jupyter kernel now surfaces cell execution errors instead of failing silently. That makes notebook failures visible to users and much easier to debug.

### **OffscreenCanvas can be disabled at runtime** (52962aa)
A new `DENO_DISABLE_OFFSCREEN_CANVAS` env var removes the `OffscreenCanvas` global during bootstrap for environments that would otherwise feature-detect it and crash on the unimplemented 2D context. This restores the pre-2.8 behavior for affected apps.

### **`verbatimModuleSyntax` can be disabled via env var** (d5d3815)
Deno adds a `DENO_DISABLE_VERBATIM_MODULE_SYNTAX` override for cases where untyped execution can't safely preserve verbatim module semantics. That gives users a runtime escape hatch for crashy `--no-check` scenarios involving type-only re-exports.

### Other misc changes
- Node compat test suite bumped to Node.js 26.3.0, with config cleanup and test fixture updates.
- `node:test` mock timers implemented.
- Core op binding snapshot/deserialization refactor.
- Docs and JSDoc clarifications across CLI, net, and runtime types.
- Minor fixes: Jupyter cell error reporting, MDN link cleanup, Windows dependency gating, and a TCP read-cancel regression test.
