---
date: 2026-10-19
repo: nodejs/node
size: L
title: "Node adds worker conditions, mkstemp, and more"
excerpt: "Major API additions land for fs, modules, TLS, QUIC, and WASI, alongside a few targeted fixes and tooling updates."
commits: 16
authors: [efekrskl, guybedford, RafaelGSS, GroophyLifefor, rozzilla, marco-ippolito, pimterry, mcollina, aduh95, lazerg, marcopiraccini, harjothkhara, inoway46]
commit_authors: {"8ae0ad0": guybedford, "1a885ca": marcopiraccini}
---

### **fs gains mkstemp() APIs** (1a885ca)
Node now exposes `fs.mkstemp()`, `fs.mkstempSync()`, and `fsPromises.mkstemp()` to create and open a unique temporary file in one step. This closes a long-standing gap with `mkdtemp()` and matters for code that needs race-free temp-file creation with an already-open handle.

### **Web Workers now get a dedicated `worker` package condition** (8ae0ad0)
Package resolution inside Web Workers now applies the new `
