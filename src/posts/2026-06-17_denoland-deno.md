---
date: 2026-06-17
repo: denoland/deno
size: L
title: "Node compat, coverage thresholds, install fixes"
excerpt: "Big Node.js compatibility and CLI coverage/install changes, plus several important bug fixes across HTTP, fetch, and core error formatting."
commits: 20
authors: [bartlomieju, divybot, lowlighter, KnorpelSenf, Reububble, fibibot, sanjibani]
commit_authors: {"6516647": bartlomieju, "7479822": bartlomieju, "576c38f": bartlomieju, "ab81178": bartlomieju, "bf4017d": bartlomieju, "e4444d5": bartlomieju, "a249752": divybot, "55f2eee": lowlighter, "bfc32bd": KnorpelSenf, "b40113d": bartlomieju, "f8be21c": bartlomieju, "e19228d": bartlomieju, "cc733e3": Reububble, "82e8ca0": bartlomieju, "792bea4": fibibot, "d32108f": sanjibani, "f2f8666": bartlomieju, "2d710e6": bartlomieju, "adb7a2b": bartlomieju}
---

### **Node HTTP server now respects active streaming timeouts** (576c38f)
Deno's `node:http` layer no longer applies `requestTimeout` to the entire request/response lifetime. That fixes long-lived streaming responses like SSE and proxies getting reset around the default 300s timeout.

### **HTTP/2 works on DENO_SERVE_ADDRESS override listeners** (ab81178)
Node servers behind the address override now accept both HTTP/1.1 and HTTP/2, matching `Deno.serve()`. This fixes a compatibility break where HTTP/2 clients were being answered with HTTP/1.1 errors.

### **`deno serve` now exits cleanly on SIGTERM/SIGINT** (bf4017d)
The serve process now shuts down gracefully instead of leaving termination behavior inconsistent. This matters for containerized and orchestrated deployments that rely on signal handling.

### **Net-deny checks now run against the actual connected peer** (e4444d5)
The fetch connector no longer relies on the earlier task-local port hack to enforce network permissions after DNS resolution. This makes denied IP-literal and resolved-address cases line up more cleanly with the real peer being contacted.

### **npm bin entrypoints no longer inherit the root import map** (a249752)
`npm run` bin main modules are now isolated from the project import map, avoiding accidental resolution changes. This fixes a long-standing bug where package bin execution could pick up unrelated import-map aliases.

### **Doc tests now use `#` as their virtual file sigil** (55f2eee)
The doc-test extraction path switched from `$` to `#` for virtual filenames. That aligns the tooling with the intended marker and fixes a broad set of doc-test/check/coverage edge cases.

### **`util.styleText` stops coloring non-TTY streams** (bfc32bd)
Node-compat `util.styleText` now avoids emitting ANSI color codes when the output stream is not a TTY. This fixes incorrect colored output in logs and other redirected streams.

### **`deno install` warns on `package.json` engine mismatches** (b40113d)
Install now checks `engines.node` and `engines.deno` and emits warnings when the current runtime doesn't satisfy them. It also rejects invalid engine ranges with a warning, giving users earlier feedback instead of silent mismatch.

### **Coverage can now fail CI below a threshold** (f8be21c)
`deno coverage` and `deno test --coverage` now support minimum coverage thresholds, with config-file support as well. This lets teams enforce coverage gates instead of only reporting numbers.

### **Global installs now resolve package.json dependencies** (7479822)
`deno install --global` now flattens the entrypoint's nearest `package.json` dependencies into the copied config's import map. That fixes bare-specifier failures for globally installed commands that depend on local package.json entries.

### **Error/test formatting preserves custom `.stack` getters** (932bd1d)
Top-level error rendering and test failures now keep custom stack strings instead of collapsing them into a single internal frame. That improves output for libraries and runtimes that define their own stack formatting.

### **`deno upgrade` streams zstd delta patches to reduce OOM risk** (e19228d)
The upgrade path no longer needs to materialize the full decompressed delta patch in memory up front. This is a practical fix for low-memory machines where the old path could hit a 2GiB allocation failure.

### **`TlsListener` now reports the correct transport address** (cc733e3)
TLS listener address metadata is now set correctly, fixing mismatches in server/serve behavior. This is a small but important compatibility fix for code that inspects listener transport details.

### **Node version reporting is now single-sourced** (82e8ca0)
Deno's emulated Node version is now defined once and reused across `process.version`, `process.versions.node`, and the N-API version report. That prevents version drift between Rust and JS shims when the emulated Node release changes.

### **`node:http(s)` proxy requests now enforce target permissions** (2d710e6)
Proxied Node HTTP(S) requests now permission-check the real target host, not just the proxy socket. That closes a security/parity gap where `--allow-net=<proxy>` could otherwise reach disallowed destinations.

### **`npm` cache now trims oversized full packuments** (adb7a2b)
When `minimumDependencyAge` forces a full packument fetch, the cached registry metadata is now slimmed down to avoid ballooning `registry.json`. This reduces cache size and avoids unnecessary disk and memory pressure.

### Other misc changes
- Node compat shim for `node` on PATH when no real Node.js is installed (f2f8666)
- Deprecate no-op `--unstable-node-globals` flag (6516647)
- Fix npm bin import map handling for global installs (a249752)
- LSP tsconfig root/script-name fixes (792bea4)
- Chocolatey install link update (d32108f)
- Misc test updates and dependency bumps
