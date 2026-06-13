---
date: 2026-06-12
repo: oven-sh/bun
size: M
title: "Bun fixes SQL, bundler, fetch, and HMR edge cases"
excerpt: "Notable bug fixes span SQL refactors, sourcemap output, fetch aborts, Windows lchown, and dev-server module flipping."
commits: 12
authors: [robobun, alii]
commit_authors: {"a0e221e": alii, "80d92d4": alii, "ac312f0": alii, "f2821a2": alii, "5d8b292": alii, "885c44f": robobun, "541ea3a": robobun, "fc79577": robobun, "6b001fe": robobun, "6128f8e": robobun, "bcad9b2": robobun, "fd99f8b": robobun}
---

### **SQL internals shed dead code and core plumbing is centralized** (a0e221e, 5d8b292)
Bun removed a chunk of unused `sql_jsc` helpers and refactored the JS SQL adapters around a shared `BasePooledConnection` hierarchy. This trims duplication across Postgres/MySQL/SQLite and changes the internal SQL implementation shape without altering the public surface.

### **Standalone browser builds now emit sourcemaps correctly** (6128f8e)
`bun build --compile --target=browser --sourcemap=linked` now writes sourcemaps for standalone HTML builds instead of silently dropping them. The fix also updates output-file handling so linked maps point at the right relative location for HTML entrypoints.

### **Fetch aborts now settle buffered body promises** (bcad9b2)
Aborting a request with an in-flight streaming request body could leave `arrayBuffer()`/`text()` hanging forever on the response side. The tasklet now ensures the buffered response settles before canceling the request-body sink, closing a deadlock-like promise leak.

### **Windows `fs.lchown` now works like Node** (541ea3a)
`fs.lchown`, `fs.lchownSync`, and the promise API now succeed on Windows instead of throwing a TODO error. This brings Bun in line with Node’s no-op success behavior for ownership changes on Windows.

### **Dev-server HMR keeps importer tracking when modules flip formats** (fc79577)
When a module hot-updated from ESM to CJS, its replacement `require` binding was attached with the wrong `this`, breaking importer bookkeeping. The fix preserves dependency edges so updates continue to propagate instead of falling back to full reloads.

### **macOS spawn file-action errors are surfaced instead of being ignored** (6b001fe)
`posix_spawn` on macOS now returns real errno values from file-action setup instead of collapsing them into generic failures. That fixes cases like too many open fds, where Bun could previously spawn a child with broken stdio and lose output.

### **Bun build no longer panics on lazy-export modules** (885c44f)
`internal_bake_dev` now handles lazy-export modules by forcing the CJS print path during bundling, avoiding printer crashes for JSON/TOML/CSS-style lazy exports. The printer and linker both now agree on the generated module shape.

### **SQL test fixtures no longer leave orphaned subprocesses** (80d92d4)
Tests that time out while using spawned SQL fixtures now clean up more reliably, preventing runaway orphan processes from sticking around after failures. This is a test-harness safety fix aimed at avoiding machine-wide load spikes during SQL regressions.

### **Bun.plugin target coercion now checks for exceptions** (fd99f8b)
A debug assertion could fire when `Bun.plugin` coerced a non-string `target` and user code threw during `Symbol.toPrimitive`. The fix restores proper exception handling so the API throws normally instead of aborting in debug builds.

### Other misc changes
- CI: bumped Darwin test timeout from 40 to 45 minutes (ac312f0)
- Test harness: added `BUN_TEST_SERVICE_<name>` service overrides and docker-start tracking (f2821a2)
- SQL tests updated for shared pool/connection refactor and fixture lifetime fixes (5d8b292, 80d92d4)
- Additional bundler/dev-server test coverage for sourcemaps and lazy exports (6128f8e, 885c44f)
- Added fetch abort regression tests and fs lchown coverage (bcad9b2, 541ea3a)
- Minor internal SQL dead-code cleanup across `sql_jsc` (a0e221e)
