---
date: 2026-06-11
repo: denoland/deno
size: L
title: "Deno publish gets faster, safer, and smoother"
excerpt: "Notable publish, runtime, and web-platform fixes land alongside fs streaming and several developer-facing bug fixes."
commits: 17
authors: [divybot, bartlomieju, fibibot, denobot, nathanwhit]
commit_authors: {"043a4d3": fibibot, "38710d5": bartlomieju, "9aff2d5": divybot, "d9703a4": divybot, "ecf9dc6": divybot, "1eebdde": nathanwhit, "e62a217": divybot, "a0493e9": divybot, "4386bf7": divybot, "05a686c": divybot, "e588f24": divybot, "8f4dbff": divybot, "6948eed": divybot, "5b71a56": bartlomieju, "ff7a18e": divybot, "34f8f94": bartlomieju}
---

### **`deno publish` now skips already-published versions up front** (9aff2d5)
`deno publish` now checks the registry for each package version before doing expensive type-checking and tarball preparation, so already-published releases are skipped early instead of wasting work. This makes publish reruns more idempotent and can significantly cut time for packages that are already on the registry.

### **`Deno.readDir()` is now streamed asynchronously** (ecf9dc6)
Async directory reads no longer materialize the whole listing up front; they open a directory resource and yield entries one at a time as the iterator is consumed. That reduces memory/latency for large directories and aligns Node `fs.readdir` / `fs.Dir` async iteration with the new streaming behavior.

### **Native op snapshots avoid unnecessary callback overhead** (1eebdde)
Core op binding generation now distinguishes constructable functions from plain functions and uses lighter-weight function shapes during snapshot creation when possible. This trims startup snapshot deserialization overhead and adds an explicit opt-in for ops that must preserve a constructor-like JS shape.

### **`Deno.serve` now surfaces streaming body errors** (e62a217)
Errors thrown while draining a streaming response body are now reported through the server’s error path instead of being swallowed after the headers are already sent. This fixes a long-standing debugging blind spot where a bad `TransformStream` callback could truncate the response without any useful stack trace.

### **URLPattern parse failures now explain the bad input** (4386bf7)
`URLPattern` construction errors are now rewritten into messages that name the offending pattern, point at the failing character when possible, and add a hint for the common `:`-vs-named-group mistake. That should make router-style mistakes much easier to diagnose.

### **`deno test` waits for worker shutdown before reporting pending-promise failures** (05a686c)
The test runner now keeps worker termination alive until both channels close, preventing premature "idle" completion while the worker is still tearing down. It also reports the actual pending-promise deadlock as the test failure instead of ending with a process-level error after an apparently successful run.

### **Markdown doctest extraction handles escaped fences correctly** (e588f24)
Doc test parsing now respects the opening fence length when matching fenced code blocks, so literal triple-backtick snippets embedded inside longer escaped fences aren’t mis-extracted as tests. This fixes a real markdown extraction bug that could corrupt `deno test --doc` behavior on certain docs.

### **Worker `Deno.exit()` behavior is clarified in docs and tests** (043a4d3)
The runtime docs and targeted worker tests were updated to make worker exit semantics explicit, especially around setting exit codes from within workers. This tightens the contract for code that depends on worker termination behavior.

### **Node V8 serializer fixes memory retention** (d9703a4)
A leaking `node:v8` `Serializer` path is fixed by tracing the JS-side serializer object correctly, breaking a GC cycle that could keep serialized object graphs alive forever. This is a notable memory-leak fix for Node compatibility code that repeatedly creates serializers.

### **Node-compatible `v8.serialize` output is restored** (34f8f94)
Deno’s V8 wire format bump had made `v8.serialize()` output unreadable by released Node.js/Electron versions; this patch restores interoperability for data crossing the Deno → Node boundary. That matters for tools like the Vitest VS Code extension that exchange serialized messages between runtimes.

### **`Deno.compile` now uses the forked child’s module in Node IPC flows** (5b71a56)
Compiled binaries now correctly run the forked child’s module instead of the parent entrypoint when launched via `node:child_process.fork()`. This fixes a real compatibility break for Node-style child process IPC in compiled output.

### **Prompt `Esc` now cancels instead of sending SIGINT** (6948eed)
The REPL/TTY prompt distinguishes an `Esc`-initiated cancel from a real interrupt, returning `null` cleanly instead of always raising `SIGINT`. That makes interactive prompts behave more like users expect in both `run` and `eval` flows.

### **`Deno.readDir()` and other runtime behaviors get assorted fixes** (a0493e9, 8f4dbff, ff7a18e, 38710d5, 5a686c)
- REPL multiline input now treats a trailing `.` as incomplete input.
- Jupyter completion now interprets cursor positions as Unicode codepoints.
- Handled stream-writer rejections no longer trip the debugger.
- The npm publish workflow now tolerates extra `pnpm exec` stdout noise.
- Test/worker shutdown and other runtime edge cases got regression coverage.
