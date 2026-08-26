---
date: 2026-08-25
repo: oven-sh/bun
size: L
title: "Bun fixes install, TLS, SQL and WebSocket edge cases"
excerpt: "Several user-facing bug fixes landed across installs, networking, SQL, and compiled executables, plus a few internal cleanups and test work."
commits: 24
authors: [robobun, Jarred-Sumner, dylan-conway, sosukesuzuki]
commit_authors: {"4763307": Jarred-Sumner, "7852665": Jarred-Sumner, "93eecdc": robobun, "82123d3": dylan-conway, "e2204e3": robobun, "225e617": Jarred-Sumner, "4c815c1": robobun, "a858129": robobun, "dc890eb": robobun, "5e77f99": robobun, "15c936c": Jarred-Sumner, "adc354d": sosukesuzuki, "11fb730": robobun, "2c10950": dylan-conway, "023e84a": robobun, "2f1dd37": robobun, "d8477b1": dylan-conway, "e3bd3e4": robobun, "0823e50": robobun, "bdf4738": robobun, "4d62789": Jarred-Sumner}
---

### **Install fixes GitHub dependency loss after lockfile migration** (93eecdc)
A migrated GitHub dependency could be downloaded and extracted but never written into `node_modules`, causing installs to undercount packages and still exit 0. The fix keeps the GitHub bun-tag aligned with the cache/extraction path so the package is actually materialized.

### **MySQL TIMESTAMPs now store the correct instant in UTC** (dc890eb)
Bun now sets `time_zone = '+00:00'` on every MySQL connection, so bound `Date` values round-trip through `TIMESTAMP` columns without shifting when the session timezone is non-UTC. This also makes server-side time functions like `NOW()` and `CURRENT_TIMESTAMP` consistently behave in UTC.

### **Fetch keep-alive pooling works again with `checkServerIdentity`** (4d62789)
Requests that use a custom TLS hostname-check callback can once again reuse pooled connections instead of paying a full handshake every time. Bun keeps sockets from native-verification and callback-verification paths in separate pools so security semantics stay intact.

### **WebSocket upgrades no longer die after async fetch handlers** (0823e50)
`server.upgrade()` now finishes the HTTP 101 handshake without triggering the HTTP connection-close gate, which was killing sockets upgraded after an `await`. That prevents dead-socket upgrades and leaked `ServerWebSocket` objects on close-when-idle or HTTP/1.0 flows.

### **Compiled executables keep `chunk-<hash>.js` names** (225e617)
Bun reverted the temporary numbered chunk naming inside compiled executables and restored hash-based chunk filenames. That makes executable output match normal bundle naming again and avoids surprising name changes in splitting builds.

### **`truncate(undefined)` now truncates to zero like Node** (4c815c1)
`fs.truncateSync`, `fs.promises.truncate`, and `fs.ftruncateSync` now treat an omitted `len` as `0` instead of throwing a type error. This closes a Node compatibility gap in a widely used filesystem API.

### **Startup bytecode is prefetched for compiled binaries** (adc354d)
Cold-started `bun build --compile --bytecode` executables now precompute and load the bytecode needed for the entry point’s static import closure up front. The goal is fewer page faults and faster startup for large compiled binaries.

### Other misc changes
- RefPtr / intrusive refcounting cleanup and simplification (82123d3)
- `bun install` peer-dependency wait-loop fix (e2204e3)
- Bytecode depth option and smaller cache records (7852665)
- Chunk loading / standalone graph refactor to support startup metadata (adc354d)
- Chunked `Transfer-Encoding` body parsing fix for empty header values (a858129)
- REPL test parallelization and stricter output assertions (5e77f99)
- Renewed expired localhost cert fixture (15c936c)
- WebKit upgrade and related compatibility updates (11fb730)
- Test shard flakiness allowlist updates (2c10950)
- Dead-code removal across WebSocket, JSC bindings, ncrypto, and related glue (023e84a)
- Fake timers reject non-finite `now` values (2f1dd37)
- Semver small-string / tag-offset correctness fix (d8477b1)
- JSC exception-check lint plus fixes it uncovered (e3bd3e4)
- Mimalloc startup crash fix via dependency bump (4763307)
- TLS half-close behavior fix for pending writes (bdf4738)
- Test-only updates for WebSocket/TLS/socket edge cases and install migration regressions (93eecdc, bdf4738, 0823e50, 4d62789, etc.)
