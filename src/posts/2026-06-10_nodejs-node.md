---
date: 2026-06-10
repo: nodejs/node
size: M
title: "QUIC gets app-settings callback"
excerpt: "Node adds a QUIC hook for delayed HTTP/3 app settings, tightens snapshot argv behavior, and hardens internal default objects."
commits: 4
authors: [sxa, martenrichter, aduh95, watilde]
commit_authors: {"4241d0d": sxa, "e6a8d06": martenrichter, "1778eeb": aduh95, "19c46ab": watilde}
---

### **QUIC: add callback for HTTP/3 application settings** (e6a8d06)
Node now exposes `session.onapplication`, letting apps react when HTTP/3/application options arrive after connection setup. This is important for protocols like WebTransport where settings can arrive later than the transport handshake, and the change is wired through docs, diagnostics, native QUIC session code, and tests.

### **Startup snapshots now insert `argv[0]` for deserialize main** (19c46ab)
`setDeserializeMainFunction()` now splices `process.argv[0]` into `process.argv[1]`, so user arguments start at `argv[2]` just like normal `run_main_module` behavior. That fixes embedding/snapshot entrypoints and aligns the docs and snapshot tests with the new argument layout.

### **Prototype-pollution lint rule expanded across core** (1778eeb)
A new lint rule enforces use of `kEmptyObject` in many public/internal entry points that accept options, reducing accidental prototype-pollution risk from default option objects. The commit also updates the rule implementation and adds coverage for the new lint check.

### Other misc changes
- libffi semi-colon cleanup for riscv64 and other arches (4241d0d)
