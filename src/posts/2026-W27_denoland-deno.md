---
date: 2026-07-05
repo: denoland/deno
period: weekly
slug: 2026-W27
period_label: "Jun 29 – Jul 5, 2026"
size: L
title: "Desktop advances, npm hardening, and perf wins land"
excerpt: "A big week for Deno desktop, deeper Node/npm compatibility, faster core hot paths, and a few important runtime safety fixes."
commits: 78
---

### **Desktop becomes much more capable**
Deno desktop picked up a cluster of user-facing improvements: custom URL scheme/deep-link registration, a new `deno check --desktop` mode, opacity and transparent window support, better startup/packaging behavior, and fixes for launcher path resolution, project discovery, tray icons, and first-paint flashing. The desktop compile/bundle flow also now runs framework builds first, and runtime serving briefly moved away from the in-process memory channel back to TCP loopback.

### **Node and npm compatibility got a broad round of fixes**
Several long-standing compatibility gaps were closed across the Node and npm surfaces. Highlights include better `node:child_process` handling of Deno subcommands, named `report` export from `node:process`, more complete `node:test` context/hook behavior, richer `process.getActiveResourcesInfo()` reporting, safer `node:tls` shutdown behavior, and support for Node-API finalizers at test worker shutdown. On the npm side, Deno improved dist-tag resolution under min-age policies, fixed pre-release pinning, decoded percent-encoded subpaths, normalized bin names, tightened trust-policy matching, and hardened registry auth diagnostics.

### **Inspector, runtime, and module loading got stronger**
Chrome DevTools can now attach to workers through the inspector, and `SIGUSR1` can enable the inspector on demand for running Unix processes. Deno also fixed async module evaluation deadlocks under `require()`, made `URL`/`URLSearchParams` non-serializable like browsers and Node, improved `fetch()` errors for local files, and corrected a few shutdown and teardown edge cases in sockets and TLS.

### **Performance work targeted hot paths and copy-heavy operations**
This week brought a noticeable internal tuning pass: npm packument indexing was sped up, glob matching got cheaper, lazy source registration was deferred, and several copy-heavy paths were optimized, including stream piping, worker message passing, and wasm fetch delivery. Separately, the CLI parser migration continued with more command definition/help/completion logic moved into `deno_cli_parser`.

### **Other misc changes**
- `deno uninstall -g` now supports multiple packages.
- KV can now require an explicitly distributed database via env var.
- Deploy, lint, watch mode, and permission handling saw smaller correctness fixes.
- OpenTelemetry crates were bumped to 0.32 with API migration.
- Docs/tooling updates, release/version bumps, and minor test/fixture cleanup landed throughout the week.
