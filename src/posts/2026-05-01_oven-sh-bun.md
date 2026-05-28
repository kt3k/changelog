---
date: 2026-05-01
repo: oven-sh/bun
size: L
title: "Security fixes and runtime lifetimes"
excerpt: "Major fixes across shell, timers, SQL, worker cleanup, and TLS, plus a WebKit upgrade and a new no-orphans runtime flag."
commits: 25
authors: [robobun, Jarred-Sumner]
commit_authors: {"4e34db2": Jarred-Sumner, "85060a9": robobun, "9ae0f3d": robobun, "812ad3b": robobun, "0b33032": robobun, "df946dc": robobun, "1a5f7d9": robobun, "a03f69a": Jarred-Sumner}
---

### **Security fix: shell cd paths now reject overflow-sized inputs** (85060a9)
Bun Shell now checks oversized paths before copying them into its fixed path buffer, returning `ENAMETOOLONG` instead of risking memory corruption. The fix covers both absolute and relative `cd`/`.cwd()` paths.

### **Runtime-wide worker teardown now waits before VM shutdown** (df946dc)
Main-thread shutdown now terminates live workers and waits for them to finish before freeing process-global resolver state. This closes a race where detached workers could still touch shared resolver singletons during VM teardown.

### **TLS-over-duplex UAFs are plugged** (1a5f7d9)
`tls.connect({ socket: Duplex })` now nulls the TLS handle earlier in error and close paths so queued `.StartTLS` work can't reach freed `Handlers`. This fixes a use-after-free that could surface when duplex/TLS lifecycle events race.

### **Worker-owned MessagePorts now release self-refs on teardown** (9ae0f3d)
`MessagePort` now drops its internal `jsRef()` self-reference when the owning context is destroyed, not just on explicit JS-side `close()`/`unref()`. That prevents ports from staying alive indefinitely after workers shut down.

### **Timers stop leaking native refs in self-callback edge cases** (0b33032)
`setTimeout` now correctly releases heap refs when a timer is cleared, refreshed, or made repeating from inside its own callback. It also fixes a separate case where `ref()` on an already-fired timer could keep the event loop alive forever.

### **`bun:test.each()` tables are now rooted safely across GC** (812ad3b)
The JS wrapper now keeps `.each()` table arrays alive until the trailing callback is invoked. That prevents GC from reclaiming the table between the chained call and the eventual test definition.

### **WebKit upgrade brings engine fixes and JSType shifts** (4e34db2)
Bun updates its embedded WebKit snapshot, pulling in a large upstream engine refresh. The upgrade includes a `JSPromiseReaction` split into slim/full variants, which shifts `JSType` enum values and requires Bun-side binding updates.

### **`bun run` gains a clearer no-orphans mode** (a03f69a)
The old `dieWithParent` naming was replaced with `noOrphans`, along with a new `--no-orphans` CLI flag and matching config/env wiring. This also broadens process-tree cleanup behavior across macOS and Linux.

### **Other misc changes**
- Resolver and router safety fixes: interned auto-install paths, larger browser-map buffers, and full u8 route-table coverage.
- SQL fixes: MySQL queue cleanup, Postgres GC/finalization, TLS context dedup/cache work, and DNS pending-slot release.
- Shell correctness fixes: `[[ -f ]]` now checks for regular files, and tilde-prefixed command substitution keeps following path atoms.
- Misc runtime fixes: `TextDecoder.decode` option ordering, stdin stale-HUP handling, timer `.ref()` semantics, loader UTF-16 crash fix, and refcount leak test plumbing.
- Dependency/runtime maintenance: BunString leak fix, internal testing helpers, and assorted WebKit/bindings adjustments.
