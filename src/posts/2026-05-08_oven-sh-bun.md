---
date: 2026-05-08
repo: oven-sh/bun
size: L
title: "Windows CA parity, Android sigactions, and crash fixes"
excerpt: "Bun tightened argument validation, fixed Android signal handling, and expanded Windows system CA loading for more Node-compatible TLS behavior."
commits: 4
authors: [robobun, cirospaciari]
commit_authors: {"6d0d86b": robobun, "3457c1e": robobun, "1600acc": cirospaciari, "d5945cf": robobun}
---

**Windows system CA loading now includes intermediates and trusted people** (1600acc)
Bun’s `--use-system-ca` / `NODE_USE_SYSTEM_CA` path on Windows now mirrors Node.js more closely by enumerating more certificate stores and filtering certs by server-auth EKU. This should improve TLS trust behavior on Windows, especially for enterprise and machine-managed certificates.

**Android now uses a bionic-correct `sigaction` layout** (d5945cf)
Bun added its own `bun.sys.sigaction` and switched several signal handlers over to it so Android doesn’t misread handler/mask fields with glibc-style layouts. This prevents broken or crashing signal handling on Android, including core handlers like SIGINT and crash handling.

**Bun.mmap now rejects non-object options instead of asserting** (3457c1e)
`Bun.mmap(path, 256)` and other non-object second arguments now throw a proper `ERR_INVALID_ARG_TYPE`-style error instead of hitting a debug assertion. `undefined` and `null` still behave like omitting options, which makes the API safer and more consistent.

**WebSocket perMessageDeflate now validates primitive values** (6d0d86b)
`websocket.perMessageDeflate` now rejects non-boolean primitives before the server tries to read compression settings from them. That closes a crash path in `Bun.serve()` and makes the option contract explicit.

### Other misc changes
- Added/updated tests for mmap validation, websocket validation, Windows cert loading, and Android sigaction layout.
- Build tooling tweak for Android check steps.
- Internal signal-handler call sites updated to use the new `bun.sys` ABI wrapper.
- Minor refactors around signal handling and system-store certificate enumeration.
