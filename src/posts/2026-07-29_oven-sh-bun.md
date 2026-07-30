---
date: 2026-07-29
repo: oven-sh/bun
size: L
title: "Bun ships routing, FFI, and socket fixes"
excerpt: "A big day: directory routes and compile assets land, FFI switches to engine-native, and several network edge cases get hardened."
commits: 38
authors: [robobun, Jarred-Sumner]
commit_authors: {"4926963": robobun, "77ab49c": Jarred-Sumner, "fc724fd": robobun, "9987d42": robobun, "0c88489": robobun, "ad09191": robobun, "fec68b1": robobun, "9d547fd": robobun, "b89452a": robobun, "9258ee8": robobun, "23d1df7": robobun, "dc2b325": robobun, "d437834": robobun, "c19d8d5": robobun, "e1b8e61": robobun, "378576e": robobun, "effa1f9": robobun, "ccc6110": robobun, "a96934f": robobun, "960a91e": robobun, "01b81aa": Jarred-Sumner, "b4ee407": robobun, "6c7fba9": robobun, "6c04f4b": robobun, "564e723": robobun, "59242d6": robobun, "0316b6f": robobun, "e820221": Jarred-Sumner}
---

### **Bun.serve gets directory tree routes** (0c88489)
`Bun.serve()` can now mount a whole directory at a wildcard route via `{ dir: "..." }`, serving static files with path cleanup, cache headers, range support, and index/redirect handling. This turns Bun into a much more capable built-in static file server and adds a new public route type to the API.

### **`--compile` gains `--asset` for embedded directories** (fec68b1)
Standalone binaries can now embed files and directory trees under `import.meta.dir`, and the runtime exposes them through `node:fs` and `Bun.file()`. That removes a major limitation for apps that enumerate their own static assets at startup, including adapters that expect a real directory layout inside the compiled executable.

### **`bun:ffi` switches to engine-native FFI** (01b81aa)
Bun reimplements `dlopen`, `linkSymbols`, `CFunction`, and `JSCallback` on top of JavaScriptCore’s native FFI, with hot calls compiling down to direct native calls. That’s a major performance and compatibility shift for FFI-heavy apps, and it also trims Bun’s dependence on the older TinyCC-based path.

### **WebSocket client now fires `upgrade` and `unexpected-response`** (9d7f85e)
The bundled `ws` client finally implements the `'upgrade'` and `'unexpected-response'` events instead of warning and stubbing them out. This unblocks frameworks and tooling that rely on those hooks to complete fetch/dispatch flows and handle proxy or handshake outcomes correctly.

### **DNS connect-path interleaving fixes IPv6 blackhole stalls** (6c04f4b)
Bun’s resolver now interleaves address families per RFC 8305 instead of letting one family monopolize parallel connection attempts. That fixes a class of `bun install` hangs on dual-stack networks with broken IPv6 and directly addresses several long-standing DNS/connectivity bugs.

### **HTTP and fetch edge cases are tightened up**
Several commits harden request/response behavior around real-world aborts and connection teardown: macOS mid-upload aborts now send FIN instead of leaving peers stuck, non-2xx responses now honor `Connection: close`, and `fetch()` body errors now mark streams disturbed and surface network failures as `TypeError`.

### Other misc changes
- Rust visibility pruning and dead-code deletion across the workspace (77ab49c)
- Web Streams runtime/controller refactors and GC safety fixes (fc724fd, a96934f)
- `net.Socket` / `child_process` / DNS timeout correctness fixes (9258ee8, d437834, c19d8d5)
- SQL auth loop and timeout hardening for MySQL/Postgres (b4ee407)
- Compile/PE metadata fixes, including hidden-console GUI subsystem support (cb2fd4b, dc2b325)
- Test deflakes, concurrency speedups, and CI/batch runner tweaks (9d547fd, b89452a, e1b8e61, 960a91e, ccc6110, 6c7fba9, 378576e, effa1f9, 23d1df7, 9987d42, 4926963, 59242d6, 0316b6f, e820221, 564e723, ad09191, 79d547fd)
