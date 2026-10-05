---
date: 2026-10-04
repo: denoland/deno
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: M
title: "Deno tightens permissions and expands deploy controls"
excerpt: "Compile now enforces read access for dynamic local imports, while deploy config gains build timeouts and runtime memory limits."
commits: 4
---

### Permission checks get stricter in compile
**Compile now checks read permission for local dynamic imports** — The compile path now rejects dynamically imported local files unless the process has read access, matching `deno run` more closely. The same gate now applies to web worker entry modules, closing a permission gap that could otherwise expose host files.

### Deploy config gains runtime and build guardrails
**Build timeout and memory limit options added** — Deploy schema now supports `deploy.buildTimeout` and `deploy.runtime.memoryLimit`, with a deprecated `memory_limit` alias kept for compatibility. This gives deployments explicit control over long builds and runtime memory usage.

### Platform and TLS compatibility fixes
**Android errno lookup fixed in core TTY compat** — Core TTY compatibility now calls `__errno()` on Android instead of falling through to the non-Linux fallback, reducing platform-specific breakage on bionic builds.

**Node TLS/X.509 behavior aligned with OpenSSL** — TLS and certificate handling was updated for Node compatibility, including X.509v1 handling and broader certificate test coverage alongside a TLS wrapper refactor.

### Other misc changes
- No additional changes this week.
