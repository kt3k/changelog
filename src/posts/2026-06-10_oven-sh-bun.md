---
date: 2026-06-10
repo: oven-sh/bun
size: L
title: "Bun decouples bake, hardens SQL and CI"
excerpt: "Bake inspector code is split out, SQL pools now retry startup races, and CI gains smarter Docker coordination plus auto-retries."
commits: 5
authors: [alii, robobun]
commit_authors: {"1c90e5a": alii, "8df5916": alii, "6ed88a5": alii, "2ad4199": robobun, "09703da": robobun}
---

### **Bake dev-server inspector agent is split out of JSC** (1c90e5a)
The bake-specific `BunFrontendDevServerAgent` was moved out of `jsc/Debugger.rs` into `src/runtime/bake/dev_server/inspector_agent.rs`, replacing the inline debugger-owned state with an erased per-debugger slot. This lowers the coupling between bake and the core runtime/JSC layers and makes the bake dev-server integration easier to rework without touching debugger internals.

### **SQL connections now retry startup failures while queries wait** (8df5916)
MySQL and PostgreSQL pool logic now distinguishes refused connections from “accepted then closed before handshake” failures, and retries the latter with backoff until `connectionTimeout` as long as queries are waiting. This fixes the common container-startup race where a database is up but not yet accepting handshakes, while still failing fast for true refusal cases.

### **CI now auto-retries infra deaths once** (6ed88a5)
Buildkite jobs that die from agent loss or timeout now get one automatic retry instead of failing until a human clicks retry. That should recover transient infra blips faster without masking deliberate cancellations.

### **Docker service startup is serialized per shard** (2ad4199)
The test runner now launches a shard-local Docker coordinator and routes `ensure()` calls through it, so only one process owns `docker compose` for a shard. This avoids container-name conflicts during concurrent service startup and makes Docker-backed tests much less flaky in CI.

### Other misc changes
- Skipped `test/cli/install/bunx.test.ts` in CI until Bun reports a newer Node version (09703da).
