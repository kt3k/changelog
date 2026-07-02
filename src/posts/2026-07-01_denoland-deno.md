---
date: 2026-07-01
repo: denoland/deno
size: L
title: "Deno desktop, inspector, and npm fixes"
excerpt: "A busy day with desktop/runtime behavior changes, inspector improvements, npm leak fixes, and several Node compat additions."
commits: 21
authors: [bartlomieju, crowlKats, minato32, edilson258, denobot, littledivy, yyq1025, nathanwhit]
commit_authors: {"7073436": minato32, "c08eb33": bartlomieju, "a06305e": bartlomieju, "028da28": edilson258, "29496d5": bartlomieju, "abc920a": bartlomieju, "b5bd65d": bartlomieju, "f4d7aef": bartlomieju, "dddb255": bartlomieju, "b3b34cf": bartlomieju, "550bcc7": bartlomieju, "7afe265": denobot, "25289de": littledivy, "541c51b": bartlomieju, "037e930": yyq1025, "e2fedd4": crowlKats, "01d7da6": crowlKats, "43f09cf": crowlKats, "796a222": crowlKats, "1afa1a9": nathanwhit}
---

### **Chrome worker debugging lands in the inspector** (1afa1a9)
Deno’s inspector now exposes worker targets and supports `Target.attachToTarget` / `detachFromTarget`, which lets Chrome DevTools discover and attach to Deno workers. It also preserves flattened session routing and worker pause-on-start behavior, making worker debugging much closer to Node/Chrome expectations.

### **Node test context APIs and hook semantics are implemented** (dddb255)
`node:test` now exposes `getTestContext()`, and hook execution was updated so `beforeEach`/`afterEach` run in the owning test’s async context. That means helpers can reliably read the current test context, and nested hook behavior now matches Node more closely.

### **`process.getActiveResourcesInfo()` now reports all live resources** (7073436)
The Node polyfill now tracks more resource names and includes immediates, so `process.getActiveResourcesInfo()` reflects active timers, handles, requests, and libuv-style wrap names more accurately. This fixes observability gaps that could hide live resources during debugging or test cleanup.

### **Desktop compile/bundle flow now runs framework builds first** (a06305e)
`deno compile` and `deno desktop` now invoke the detected framework’s build command before bundling its output. This prevents compile-time failures when the expected build directories don’t exist yet and makes desktop behavior match the regular compile path.

### **SvelteKit detection and adapter handling got stricter** (43f09cf)
Framework detection now requires `@sveltejs/kit` before claiming SvelteKit, avoiding false positives that would mis-handle plain Svelte/Vite apps. The detector also gives clearer support for known SvelteKit output shapes and errors on unsupported adapters instead of producing a broken bundle.

### **The desktop runtime switched back to TCP loopback serving** (25289de)
The previous in-process memory-channel desktop server was reverted in favor of a local TCP port again. This is a notable behavior rollback for the desktop runtime, affecting how bundled apps are served and how the webview reaches the app server.

### **npm exports retention and watch-mode leaking were fixed** (29496d5)
The npm resolver no longer retains full `exports` values unnecessarily, and the module loader now uses a weak reference in its resolve hook to break a watch-mode reference cycle. Together these changes reduce memory growth in long-running or repeatedly reloaded workflows.

### **OpenTelemetry crates were bumped to 0.32 with API migration** (b5bd65d)
The telemetry stack was upgraded across the board, including `opentelemetry*` and `tracing-opentelemetry`, with code updated for the breaking 0.32 APIs. This is a large dependency/runtime migration that affects tracing, metrics, and exporter behavior throughout the repo.

### **KV now requires an explicitly distributed database in some environments** (f4d7aef)
A new `DENO_KV_REQUIRES_DISTRIBUTED_DATABASE` env var changes what happens when `Deno.openKv()` is used without a real attached database. That makes missing KV attachment fail more obviously instead of silently falling back to ephemeral in-memory behavior.

### **Global package uninstall now supports multiple packages** (028da28)
`deno uninstall -g` can now remove multiple global packages in one go. This fixes a long-standing CLI limitation and aligns uninstall behavior with how users actually manage globally installed tools.

### **Node-API finalizers now run at test worker shutdown** (c08eb33)
The test runner now ensures Node-API finalizers execute when a worker shuts down. That closes a leak/cleanup gap for native modules and makes test teardown more faithful to real process shutdown behavior.

### **Workspace check output no longer interleaves errors and status lines** (abc920a)
Check-mode output was adjusted so errors don’t get mixed into the running “Check” progress lines in workspace runs. It’s a UX fix, but an important one for readable diagnostics in larger projects.

### **Desktop tray and project discovery fixes shipped** (037e930, e2fedd4, 01d7da6, 43f09cf, b3b34cf)
Several desktop/runtime polish fixes landed together, including better tray icon display on macOS, discovering `deno.json` from the project directory, avoiding the initial black flash on first paint, and reporting server kind in control-sock events. These improve startup behavior, framework detection, and desktop integration without changing core APIs.

### Other misc changes
- Release/version bump to 2.9.1 and generated workflow/Cargo updates (7afe265)
- `rusqlite` workspace feature tweak for `fallible_uint` (550bcc7)
- `PerformanceObserver` type declarations added to the default lib (541c51b)
- `DENO_SERVE_ADDRESS` env-var docs updated after desktop serving changes (25289de)
- `laufey` bumped to 0.5.0 and related lockfile updates (796a222)
- Node resource-reporting and test/device compatibility updates beyond the headline fixes (7073436, c08eb33)
