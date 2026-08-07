---
date: 2026-08-06
repo: oven-sh/bun
size: L
title: "XML lands, with several crash fixes"
excerpt: "Bun adds native XML parsing/loading and ships a batch of security, correctness, and runtime stability fixes."
commits: 34
authors: [robobun, dylan-conway]
commit_authors: {"3171136": dylan-conway, "b4d632a": robobun, "aa1e446": robobun, "6e6aedb": robobun, "45be4ac": robobun, "f503e16": dylan-conway, "cf5ddf7": robobun, "d18ddfc": robobun, "0ffabf6": robobun, "2d1de1e": robobun, "3ee86ad": robobun, "4273dd9": robobun, "9a5e331": robobun, "7d9f21b": robobun, "a4ad4e0": robobun, "15d6710": robobun, "a32adeb": robobun, "80e6dba": robobun, "7f4acb2": robobun}
---

### **Bun.XML and native .xml loading arrive** (3171136)
Bun now has `Bun.XML.parse` / `Bun.XML.stringify`, plus first-class `.xml` imports for `import`, `require`, `bun build`, and import attributes. The new parser/loader follows the existing `Bun.TOML`/`Bun.YAML`/`Bun.JSON5` pattern and adds docs, types, benchmarks, and bundler wiring.

### **YAML parse now supports cyclic aliases** (f503e16)
`Bun.YAML.parse` can now build cyclic object graphs when an alias points back into the collection that contains it, instead of rejecting them as unresolved aliases. The bundler and pnpm lockfile parser still reject cyclic aliases so module/import use stays acyclic.

### **Bundler now fails hard on print errors instead of emitting corrupt output** (4273dd9)
When the printer cannot finish a module, `bun build` now returns a failure instead of silently writing a truncated bundle with exit code 0. That closes a correctness hole where builds could look successful but produce broken artifacts that fail only at runtime.

### **Resolver fixes `.` and `..` specifiers to prefer directories** (2d1de1e)
Imports like `.` and `..` now resolve as directory specifiers instead of accidentally picking sibling files such as `lib.ts`. This fixes a real module-resolution bug that could silently load the wrong file when both a sibling and an `index` module exist.

### **Socket connect/TLS dispatch no longer leaves pending exceptions behind** (b4d632a)
Socket error paths were tightened so failed connect promises and TLS session/keylog dispatches no longer leave the VM in a bad exception state. The patch also adds fault-injection coverage for the new TLS session-buffer failure mode.

### **Terminal raw-mode and drain handling are made deadlock-safe** (aa1e446, 7f4acb2)
PTY raw mode now uses `TCSANOW` instead of `TCSADRAIN`, avoiding a runtime-wide deadlock when the child is blocked on a full PTY buffer. Separately, terminal drain callbacks keep the wrapper alive through PTY EOF so GC can’t drop or misfire a pending dispatch.

### **High-risk runtime crashes and type confusions fixed across core APIs** (6e6aedb, 45be4ac, cf5ddf7, 9a5e331, 7d9f21b, d18ddfc, 3ee86ad, a4ad4e0, 0ffabf6, 80e6dba, 15d6710, a32adeb)
Multiple user-facing crashes and assertion failures were fixed: SQLite FTS5 close no longer hits a UAF, `onmessage`/`onerror` through proxies no longer segfault, `ReadableStream` private setters are properly guarded, `spyOn(..., "prototype")` stops aborting, and mock matchers no longer crash when `mock.results` is tampered with. Crypto, fetch preconnect, `net` happy-eyeballs, TOML deep imports, `X509Certificate` descriptors, boxed primitive unwrapping, and Temporal deep-equality/`toEqual` all got correctness fixes that remove panics or wrong results in edge cases.

### Other misc changes
- Dependency/benchmark/docs/test updates around XML and YAML support.
- String-search refactor to route byte/substring searches through Highway SIMD.
- Removed dead legacy scaffolding (`bun-wasm`, peechy schema, write-only option plumbing).
- Install/watcher/crypto/terminal test flake fixes and small runtime cleanups.
- Zlib test harness fix and conservative-GC NAPI test stabilization.
- Install alias resolution, isolated-store path sanitization, and numeric range-check hardening for UDP/password APIs.
- Lint/allowlist and harness tweaks, plus small internal refactors.
