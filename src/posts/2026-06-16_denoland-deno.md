---
date: 2026-06-16
repo: denoland/deno
size: L
title: "Deno gets desktop, tests, and network upgrades"
excerpt: "Major new `deno desktop`, test runner sharding/retries, Happy Eyeballs networking, and several runtime/Node compatibility fixes."
commits: 12
authors: [bartlomieju, crowlKats, magurotuna, littledivy]
commit_authors: {"8398162": crowlKats, "039bcdc": bartlomieju, "9794b4e": bartlomieju, "7b5aa7c": bartlomieju, "99a06b5": magurotuna, "b21d5e2": bartlomieju, "32a1447": crowlKats, "df9398d": bartlomieju, "ef99209": littledivy, "d39e189": bartlomieju, "3afd027": bartlomieju}
---

### **`deno desktop` lands as a new app-builder command** (8398162)
Adds a full desktop-app workflow for Deno projects, built on WEF backends and shipped with new packaging, runtime, and CI support. The command can now build self-contained desktop apps with multiple backends and verified cached downloads, which is a major expansion of the CLI.

### **`deno test` gains retries, repeats, and sharding** (df9398d / 3afd027)
The test runner now supports flaky-test tolerance via `--retry` / per-test `retry`, plus repeated execution via `--repeats` / per-test `repeats`. It also adds `--shard=<index>/<count>` so large suites can be split deterministically across machines, which is a meaningful CI and workflow improvement.

### **Happy Eyeballs now speeds up `Deno.connect` and `Deno.connectTls`** (99a06b5)
TCP and TLS connection setup now uses RFC 8305 address racing, with new `autoSelectFamily` and delay knobs exposed in the public API. This should reduce connection latency on dual-stack networks and makes the behavior configurable instead of all-or-nothing.

### **Node-API compatibility moves up to version 10** (7b5aa7c / b21d5e2)
Deno now reports Node.js v26.3.0 and Node-API v10, bringing its compatibility surface closer to current Node expectations for npm packages. The new Node-API 10 function `node_api_create_buffer_from_arraybuffer` is implemented, which unblocks packages relying on that API.

### **`deno link` and `deno unlink` add first-class local package workflow** (d39e189)
The CLI now has dedicated commands to add or remove local JSR packages from a project's `links` array instead of editing `deno.json` by hand. That makes local package development much more discoverable and consistent with link-style workflows from other runtimes.

### **Startup profiling and a fast path trim bare `deno run` overhead** (ef99209)
This adds opt-in startup phase instrumentation plus a benchmark example, and also short-circuits the common `deno run <file>` path before building the full clap tree. The fast path is aimed at reducing cold-start latency in the most common CLI invocation.

### **Self-signaling no longer needs `--allow-run`** (039bcdc)
`process.kill(process.pid, signal)` now skips the run-permission check, matching the fact that a process can always terminate itself. This fixes a practical pain point for tools like `signal-exit`, which previously forced users to grant blanket `--allow-run` just to preserve correct Ctrl-C behavior.

### **`DENO_UNSTABLE_CONTROL_SOCK` is limited to local transports** (9794b4e)
The unstable control socket no longer accepts `tcp:` addresses, leaving only local transports such as Unix sockets and vsock. That tightens the feature back to its intended single-host orchestration use and avoids exposing a network listener.

### **`deno desktop` unpacking bug is fixed for non-executable library names** (32a1447)
The runtime/archive unpack logic now preserves `libdenort.dylib` correctly instead of stripping the extension and looking for the wrong file. This removes the panic that could break desktop runtime startup during unpacking.

### Other misc changes
- Runtime fetch requests now inject deployment headers from env (`request_builder_hook`) and scrub spoofed `x-deno-fetch-token` headers.
- CI/build updates for desktop artifacts and new release packages.
- Minor test/documentation/spec updates around the new CLI and networking features.
