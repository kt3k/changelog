---
date: 2026-03-10
repo: denoland/deno
size: L
title: "Deno lands major node/http2 and npm fixes"
excerpt: "Big day for Deno: new npm-aware docs, a rewritten Node http2 stack, async/N-API fixes, and several correctness/perf improvements."
commits: 17
authors: [bartlomieju, dsherret, seroperson, littledivy, Tango992]
commit_authors: {"b7cc30f": dsherret, "ed367f2": bartlomieju, "527c844": bartlomieju, "ed98585": seroperson, "9c73df3": littledivy, "88d6de0": bartlomieju, "4c548d4": bartlomieju, "f33915b": Tango992, "1036b2a": bartlomieju, "a33c974": bartlomieju, "0eddc94": bartlomieju, "913548b": bartlomieju, "c285733": bartlomieju}
---

### **Deno doc now understands npm packages** (b7cc30f)
`deno doc` can now follow and analyze npm dependencies, including managed, auto-node_modules, and BYONM setups. This makes the docs command much more useful for mixed Deno/npm codebases and required resolver/graph changes plus new coverage.

### **Node http2 gets a full rewrite** (20e1ef8)
The Node `http2` implementation was rewritten around nghttp2 and a libuv compatibility layer, with large changes across Rust ops and JS polyfills. This is a major compatibility milestone for apps and libraries that rely on Node's HTTP/2 APIs.

### **N-API async work now runs on a worker thread** (4c548d4)
`napi_queue_async_work` now executes its `execute` callback off the V8 main thread and dispatches `complete` back onto the main thread, matching the N-API contract. That fixes deadlocks around threadsafe functions and keeps the event loop alive correctly while work is pending.

### **Worker threads eval code now matches Node's sloppy mode** (88d6de0)
`node:worker_threads` `{ eval: true }` no longer forces eval code through an ESM data URL path; it now feeds source directly to V8 in sloppy mode like Node does. This unblocks code that relies on CommonJS-style semantics and bare assignments inside eval workers.

### **CPU profiling and coverage flush on `Deno.exit()`** (527c844)
Exit now runs registered callbacks before `std::process::exit()`, so profiling and coverage data is preserved instead of being dropped on direct exit. The cleanup path is shared with normal shutdown, reducing the chance of losing diagnostics in exit-heavy scripts.

### **AWS-style peer dep trees no longer explode in npm resolution** (ed367f2)
Peer cache-hit checks in npm graph resolution were memoized to avoid combinatorial recursion on large peer dependency trees. This addresses hangs like `deno add npm:@aws-cdk/aws-ecs` and should make complex installs dramatically faster and more reliable.

### **N-API gains more property/constructor helpers** (042a768, 9c73df3)
Deno added `node_api_create_property_key_latin1/utf8` and `node_api_create_object_with_properties`, filling in more of Node's native addon surface. These additions improve addon compatibility and can speed up property creation/lookup by using internalized V8 strings.

### **TTY streams can now be constructed without `new`** (1036b2a)
`ReadStream` and `WriteStream` were converted to function-style constructors so they can be invoked the way Node expects. This fixes another Node-compat edge case for code that calls the constructors directly.

### **NPM auth now supports email-based `.npmrc` credentials** (ed98585)
The npm cache/registry handling was updated to accept email authorization in `.npmrc` configs. That removes a real-world install failure mode for registries that use email-based auth metadata.

### **Node compat test harness is less noisy and more usable** (0eddc94, 913548b)
The Node compat harness now supports a single `ignore` flag, and the custom test runners correctly honor `--list`. This is mostly test infrastructure cleanup, but it makes skipping known-inapplicable Node tests much simpler.

### Other misc changes
- LSP tsgo scope attribution fix for asset files (f81e360)
- `napi_set_instance_data` now runs on exit (c285733)
- Added missing HTTP/2 header constants for grpc-js (c0de125)
- Minor `deno add`/npm resolver and filesystem refactors (a33c974, f33915b)
