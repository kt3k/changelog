---
date: 2026-06-02
repo: oven-sh/bun
size: L
title: "Crash fixes and Bun internals hardening"
excerpt: "Several crash fixes landed across sourcemaps, WebSocket close handling, NAPI finalizers, fetch proxy tunneling, and bundler memory safety."
commits: 20
authors: [robobun, alii, Jarred-Sumner, dylan-conway]
commit_authors: {"9333748": robobun, "3f153b9": robobun, "3edc7af": alii, "31cae2e": alii, "4b42439": robobun, "b7fa3cb": robobun, "8fe7a60": alii, "f7b9902": Jarred-Sumner, "1b7a407": dylan-conway, "684f2af": Jarred-Sumner, "9fd8850": alii, "f8f7490": robobun, "7ef293b": robobun, "17b4071": robobun, "8cf3737": robobun, "561eb8f": robobun, "fdf1246": robobun}
---

### **Sourcemap embedding now rejects overflow and oversized maps** (3f153b9)
Bun now validates VLQ accumulation and source-map size math instead of trusting decoded values, preventing integer overflow and capacity-overflow crashes during `bun build --compile` with sourcemaps. Oversized or malformed standalone maps now fail cleanly with build errors rather than panicking.

### **WebSocket close events now report the right JS code** (31cae2e)
The WebSocket client was conflating the wire echo code with the code exposed to JavaScript, which led to incorrect `CloseEvent.code` and `wasClean` values for several close scenarios. This fixes bodyless closes, `1001` handling, and server-initiated close state transitions.

### **NAPI references can be deleted from finalizers during GC** (17b4071)
`napi_delete_reference` was incorrectly guarded against GC-time calls, causing a panic in valid finalizer paths used by Node-API addons. The fix aligns Bun with Node’s behavior and covers the experimental GC finalizer path with regression tests.

### **Fetch proxy CONNECT tunneling no longer leaks stale envelope bytes** (8cf3737)
A split CONNECT response could leave proxy handshake bytes in the response buffer, causing proxy headers and even raw upstream HTTP bytes to leak into the user-facing response. Bun now clears ownership of that buffer before tunneling starts, fixing the bad response parsing and hang.

### **Repeated Worker create/terminate no longer leaks memory** (561eb8f)
A memory leak in worker lifecycle cleanup was fixed, reducing RSS growth when workers are repeatedly spawned and terminated. This matters for apps that churn workers over long runtimes.

### **Bundler stops re-interning module paths across repeated builds** (fdf1246)
The bundler was reusing the wrong arena for pretty-path allocation and repeatedly re-interning paths into the filename store, which could panic after many in-process `Bun.build()` calls. The change fixes the ownership bug and removes the path-store growth issue.

### **Install no longer panics when a removed patch is still referenced** (f8f7490)
`bun install` now tolerates stale patch metadata when a patch has been removed from `package.json`, downloading the package unpatched instead of unwrapping a missing entry. That turns a crash into a recoverable install path.

### **FilePoll unregister handles macOS kevent errors correctly** (b7fa3cb)
macOS `EV_ERROR` changelist results carry errno values in `data`, not -1-style syscall return codes, and Bun was decoding them incorrectly before unwrapping. This fixes the unregister panic seen when stale fds are torn down while polling.

### **Crash handler now trims its own stack frames correctly** (7ef293b)
The crash handler now evaluates stack-trim anchors in the capturing frame so the reported trace centers on the real crash site instead of the handler internals. That makes crash reports materially more useful.

### **Valkey RESP buffer adoption avoids extra copies** (9fd8850)
Owned RESP payloads are now adopted as Buffer backing stores instead of being memcpy’d into new `ArrayBuffer`s for every reply. That reduces per-response allocations and copying in buffer mode.

### **Package lockfile exact-pinned flags use a bitset** (f7b9902)
`Lockfile.exact_pinned` switched from `Vec<bool>` to a packed dynamic bitset, shrinking per-package flag storage and aligning it with Bun’s existing install-time data structures. The behavior stays the same while using less memory.

### **Standalone Docker test services now build their own images** (3edc7af)
The Docker-based test services no longer rely on bind-mounted config files, which makes them work better with remote/sidecar Docker daemons. This is infrastructure work for CI portability rather than product behavior.

### Other misc changes
- Hardening sweep across multiple subsystems, including Node compatibility and input validation (684f2af)
- WebKit dependency bump (1b7a407)
- `bun.lock` version re-save behavior fix (9333748)
- Docker test host override for remote Docker (`BUN_DOCKER_TEST_HOST`) (8fe7a60)
- JS highlighter out-of-bounds panic fix (4b42439)
- Fetch CONNECT tunnel buffer cleanup and tests (8cf3737)
- Misc ignore/file and other low-impact maintenance changes
- Package patch-download and related internal enqueue fixes (f8f7490)
- Sourcemap standalone zstd guard/support updates (3f153b9)
