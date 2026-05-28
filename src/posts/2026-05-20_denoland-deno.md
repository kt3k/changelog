---
date: 2026-05-20
repo: denoland/deno
size: L
title: "Deno grows CI, inspector, and Node compat"
excerpt: "Major additions: `deno ci`, broader inspector/CDP coverage, and several Node compatibility fixes across test, WASI, workers, and more."
commits: 19
---

### **`deno ci` lands for reproducible installs** (661e3db)
Adds a dedicated `deno ci` subcommand that mirrors `npm ci`: it requires a lockfile, wipes `node_modules`, and installs with frozen resolution. This gives CI and Docker users a clearer, safer path to reproducible installs.

### **Inspector networking now works for plain `--inspect`** (280a349)
Moves the Network CDP bridge out of `node:inspector` so fetch and WebSocket traffic can show up in DevTools even when user code never imports the module. It also wires in the missing WebSocket frame events, fixing a visibility gap for debugging network activity.

### **`node:test` watch mode now emits real watch events** (42f609c)
Replaces the stubbed `test.run` path with a stream-compatible implementation that supports `watch`, `cwd`, and `signal`. Consumers can now observe `test:watch:drained` and `test:watch:restarted`, bringing Deno closer to Node’s watch-mode behavior.

### **`node:test` gets a Node-compatible TAP reporter** (0f79e1d)
Adds a full TAP reporter path for `node:test`, including support for reporter selection via Node-style flags passed through the environment. This improves compatibility with Node test snapshots and tools that expect TAP output semantics.

### **`node:wasi` preview1 compatibility is implemented** (ed12991)
Adds substantial WASI preview1 support, including the syscall/rights plumbing needed for the Node compat suite’s previously missing WASI tests. The change turns 20 Linux compat tests green and tightens permission handling around file and directory operations.

### **`deno test` defaults sanitizers off** (8443ee0)
Changes `Deno.test()` so ops/resource sanitizers are disabled by default, matching the expectation that tests should not fail on incidental async activity unless explicitly requested. The reland also adds config-file support and CLI flags for opting the sanitizers back in.

### **`v8` upgraded to 14.9** (3970a84)
Bumps the embedded V8 dependency and adjusts runtime internals and async op tests to match the new engine behavior. This is a core runtime upgrade with broad knock-on effects, not just a version pin change.

### **`node:trace_events` is fleshed out** (483096d)
Implements real tracing-channel behavior instead of a stub, including enabled categories and tracing lifecycle methods. That unlocks additional Node compat coverage and makes trace-related tooling more functional.

### **HTTP inspector events now cover `node:http`** (51f639e)
Adds CDP Network event instrumentation for outgoing `http`/`https` client requests, including request, response, data, and completion events. This is important for debugging and aligns Node HTTP behavior with the fetch inspector work already in place.

### **Worker threads message handling is made more Node-like** (d7ba490)
Improves `worker_threads` port/error behavior and fixes ordering around closing stdio versus draining pending messages. The change addresses compatibility bugs that could otherwise surface as dropped messages or stream errors.

### **Additional Node compatibility fixes** (99c6f7a, 0213399, 6ae67f7, c39514d)
A set of targeted fixes landed for `node:https`, `node:events`, large-file `readFile`, and `diagnostics_channel`/`tracingChannel` coverage. These are mostly compatibility and correctness improvements that unblock real-world packages and tests.

### **Other misc changes**
- Dependency bumps: `deno_task_shell` upgraded twice, plus a locked-tripwire refresh.
- `deno fmt` panic fix for tagged HTML templates with multi-level indentation.
- Misc Node polyfill/internal refactors and test fixture updates.
