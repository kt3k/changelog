---
date: 2026-08-26
repo: oven-sh/bun
size: L
title: "Big bundler, fetch, and runtime fixes"
excerpt: "Major splitting and backpressure work landed alongside a TLS hostname fix, install dedupe improvement, and several runtime stability fixes."
commits: 20
authors: [Jarred-Sumner, robobun, dylan-conway, sosukesuzuki]
commit_authors: {"1921166": robobun, "82b2309": robobun, "d4ae7c4": Jarred-Sumner, "f4d864b": robobun, "5c0f449": robobun, "63afd77": Jarred-Sumner, "34396b6": Jarred-Sumner, "ca214f2": Jarred-Sumner, "1a50bfa": sosukesuzuki, "52baef6": Jarred-Sumner, "731aa92": Jarred-Sumner, "06820dc": robobun, "6d13a3a": robobun, "84923b4": dylan-conway, "7ae3425": robobun, "a3745c2": Jarred-Sumner, "97420a7": dylan-conway, "ca521aa": Jarred-Sumner}
---

### **Code splitting gets smarter and more deterministic** (ca521aa, 731aa92, 1921166, 82b2309, d4ae7c4, ca214f2, 1a50bfa)
Bun's bundler picked up a cluster of code-splitting fixes and feature work: chunks that always load together can now be folded automatically, cross-chunk bindings use one stable bundle-wide name, cross-chunk import order follows evaluation order, and the splitter avoids emitting broken or duplicate chunks when tree shaking removes everything. It also now treats entry points as non-barrels, fixes quadratic naming behavior, and adds `require()` chunk boundaries for `--target bun`.

### **Fetch no longer derives TLS identity from Host** (f4d864b)
Requests to HTTPS URLs now use the URL hostname or an explicit TLS servername for SNI and certificate checks instead of the HTTP `Host` header. That closes a correctness bug where a mismatched `Host:` could misdirect TLS validation and break or weaken fetch/proxy behavior.

### **WebSocket client gains pause/resume and real backpressure** (52baef6)
Client `WebSocket` now supports `pause()`, `resume()`, and `isPaused`, and `bufferedAmount` is wired up so receive-side backpressure can actually be managed. The same change also fixes a server drain stall, which matters for proxies and relays that need to slow or resume consumption safely.

### **`bun build --compile` ignores `NODE_COMPILE_CACHE`** (34396b6)
Standalone executables now ignore the outer `NODE_COMPILE_CACHE` environment variable, since embedded modules already ship with their own bytecode. This keeps compiled apps from paying runtime cost for a cache they cannot use.

### **`spawnSync` keeps the event loop balanced across GC** (84923b4)
A GC during `Bun.spawnSync` could skew the keep-alive count by refing the private loop through the wrong handle. The fix keeps the isolated loop bookkeeping separate so synchronous spawns don't unbalance or leak the main event loop state.

### **Windows process exit no longer hangs in a thread-suspend lock** (6d13a3a)
Bun now holds WTF's thread-suspend lock across `ExitProcess` on Windows, fixing a hard-to-reproduce shutdown hang seen on arm64 CI and in `solc.test.ts`. This is a reliability fix for process termination on Windows.

### **WebSocket and install/dedupe backpressure-adjacent runtime fixes** (06820dc, 7ae3425, 97420a7, 5c0f449, 63afd77, a3745c2, 82b2309)
Install's isolated linker now dedupes packages even when unresolved peers are involved, reducing redundant store expansion in cyclic/workspace cases. The runner's JUnit parsing now reads per-file results correctly, and fake timers, bytecode encoding, and WebKit were updated or fixed in smaller but still user-visible ways.

### Other misc changes
- WebKit bumped to 2da33d53e33e (1 commit)
- Test cleanup and maintenance
- Minor internal refactors and docs updates
- Compile-cache test updates
