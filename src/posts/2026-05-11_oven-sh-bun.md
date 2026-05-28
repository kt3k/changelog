---
date: 2026-05-11
repo: oven-sh/bun
size: L
title: "YAML, HTTP, and fetch safety fixes land"
excerpt: "Bun fixes YAML round-tripping, Node HTTP duplex response handling, and unsafe fetch retries on keep-alive resets."
commits: 4
authors: [robobun]
commit_authors: {"37bfbed": robobun, "4c0a5a7": robobun, "ca1788c": robobun, "450072b": robobun}
---

### **YAML.stringify now quotes number-like strings** (37bfbed)
`YAML.stringify` was emitting some strings unquoted even though `YAML.parse` would read them back as numbers, silently changing values on round-trip. The fix broadens the number-detection logic to match Bun's YAML parser, covering cases like `+1`, `0e6836`, and similar numeric-looking strings.

### **Node HTTP client now behaves correctly in duplex request flows** (4c0a5a7)
`http.request()` now dispatches on the first `write()` and emits `'response'` as soon as headers arrive, even if the request body stays open. This aligns Bun with Node for streaming/duplex consumers and fixes real-world integrations that depend on seeing the response before `end()` is called.

### **Fetch no longer retries non-idempotent methods after keep-alive disconnects** (ca1788c)
Bun now only retries keep-alive resets for idempotent methods, preventing silent duplicate POST/PATCH side effects and mixed response streams. This is a correctness and safety fix for flaky connections that previously could corrupt application-level request handling.

### Other misc changes
- Disabled the isolated linker’s global virtual store by default; enable it explicitly via bunfig or `BUN_INSTALL_GLOBAL_STORE=1` (450072b)
- Updated install/global-store docs and added/adjusted regression coverage (450072b)
- Added regression tests for the YAML, HTTP, and fetch fixes (37bfbed, 4c0a5a7, ca1788c)
