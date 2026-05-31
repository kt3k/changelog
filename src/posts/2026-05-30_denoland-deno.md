---
date: 2026-05-30
repo: denoland/deno
size: L
title: "Deno sharpens tasks, bundling, and runtime fixes"
excerpt: "Parallel task execution, vm dynamic imports, and several correctness/perf fixes landed across node, install, compile, cache, and Jupyter."
commits: 38
authors: [divybot, bartlomieju, nathanwhitbot, llimllib, nathanwhit]
commit_authors: {"13a1c9d": nathanwhitbot, "17f952a": divybot, "919027e": divybot, "65a18ea": bartlomieju, "de5c878": divybot, "f455715": divybot, "e840a92": divybot, "e9014b9": divybot, "c979345": bartlomieju, "3c12aa9": bartlomieju, "8fd78d5": bartlomieju, "e362099": bartlomieju, "77a1e24": bartlomieju, "5ff8b7e": bartlomieju, "e07f52b": bartlomieju, "d84bfe5": bartlomieju, "bafbe72": bartlomieju, "862d283": bartlomieju, "26b6458": divybot, "5c9fb8e": divybot, "e0bb51f": divybot, "f85f23c": divybot, "1250f76": divybot, "14deb46": divybot, "da3c9ec": divybot, "b23fb13": divybot, "b25d053": llimllib, "d00ecdc": divybot, "fcbe725": divybot, "a474bd0": divybot, "09680d4": divybot, "883d494": divybot, "b2d8713": divybot, "ecc4b42": divybot, "161b09e": divybot}
---

### **Parallel recursive workspace tasks now run concurrently** (77a1e24)
`deno task -r` and filtered recursive task runs no longer serialize workspace members one by one. The runner now flattens matched packages into a single dependency graph and executes siblings in parallel, which should noticeably improve multi-app workspace workflows.

### **node:vm dynamic import callbacks are now supported** (17f952a)
Deno’s Node compat layer now wires `importModuleDynamically` through to a registered JS callback instead of only supporting the default-loader and missing-callback cases. This unlocks dynamic imports for `vm.Script`, `compileFunction`, `createContext`-inherited callbacks, and `SourceTextModule`.

### **Web Streams hot paths get O(1) queues** (c979345)
Several internal stream queues were switched from array-shift behavior to the existing `Queue` implementation, removing O(n) dequeues in writable streams and BYOB-related readable stream paths. That reduces allocation churn and should improve stream-heavy workloads.

### **Jupyter kernels survive transient disconnects and shutdown cleanly** (b23fb13, 919027e)
The Jupyter server now treats temporary send/read failures as recoverable, keeps heartbeat/control loops alive across brief peer drops, and exits the kernel process after sending shutdown replies. This makes notebook and console sessions much less fragile during front-end disconnects and shutdowns.

### **Compile, install, cache, and npm resolution bugs fixed** (5ff8b7e, e840a92, e9014b9, f455715, b2d8713)
Several user-facing resolution bugs were corrected: compiled workspace apps now embed package.json exports metadata, `deno install -g -c` rewrites relative import-map paths to the original config location, cached redirects are preserved on warm fetches, `deno check` can resolve npm packages without types in byonm setups, and `require()` is more resilient when the CWD is unreadable or the referrer sits outside DENODIR.

### **Better interop, error messages, and platform compatibility** (bafbe72, 883d494, 26b6458, e0bb51f, 5c9fb8e, 13a1c9d, 3c12aa9, 8fd78d5, de5c878, fcbe725, e362099, 65a18ea, e07f52b, d84bfe5, 1250f76, da3c9ec, b25d053, f85f23c, 14deb46, a474bd0, 09680d4, ecc4b42, d00ecdc, 862d283, 161b09e, 919027e)

### Other misc changes
- Dependency bumps and release-doc maintenance.
- Added and updated regression tests across Jupyter, LSP, compile, task, install, cache, coverage, and npm compat paths.
- Small internal refactors and platform-specific fixes in FFI, config discovery, NAPI/libuv polyfills, and task argument handling.
