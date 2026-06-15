---
date: 2026-06-14
repo: oven-sh/bun
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Bun hardens SQL pools, builds, and test infra"
excerpt: "This week focused on SQL connection lifecycle fixes, bundler/dev-server edge cases, and more reliable CI/test infrastructure."
commits: 34
---

### **SQL connection handling got much more robust**
Bun spent most of the week tightening SQL pool and startup behavior across MySQL and Postgres. Startup failures are now classified more precisely, refused connections are distinguished from accepted-but-not-ready sockets, and pools will retry handshake races until `connectionTimeout` when queries are waiting. Shutdown is also safer: forced closes now resolve cleanly even mid-handshake, callback throws no longer corrupt pool state, and reentrant or partially filled pools no longer blow up on holes. The `sql()` helpers also now reject degenerate inputs with clearer `SyntaxError`s and better TypeScript checks.

### **Bundler, dev-server, and inspector paths were cleaned up**
Build and HMR got several targeted fixes. Browser compile builds now emit linked sourcemaps correctly for standalone HTML entrypoints, lazy-export modules no longer panic during bake bundling, and HMR preserves importer tracking when module formats flip between ESM and CJS. Inspector navigation events were also deduplicated so successful client navigations only fire once. Under the hood, bake-specific dev-server and sourcemap plumbing were further decoupled from JSC/generic layers to reduce coupling and make the runtime easier to evolve.

### **Fetch, fs, and plugin edge cases were tightened**
Aborting a request with an in-flight streaming body now settles buffered response promises instead of hanging, Windows `fs.lchown*` now behaves like Node by succeeding, and `Bun.plugin` target coercion now handles thrown `Symbol.toPrimitive` errors without tripping debug assertions. macOS spawn file-action failures also now surface real errno values instead of getting masked.

### **CI and test reliability improved**
The test and CI harness got noticeably sturdier: Docker-backed service startup is now serialized per shard, infra deaths in Buildkite get one automatic retry, SQL fixture subprocesses are cleaned up more reliably on timeout, and several test timeouts were increased to accommodate slower Darwin/container startup.

### **Other misc changes**
- ArrayBuffer no-copy constructors were marked unsafe at the JSC binding layer
- SQL protocol internals were deduplicated and dead code was removed
- The Discord.js guide was rewritten around a working slash-command bot with deployment notes
- Various guide links, wording, and test coverage updates
