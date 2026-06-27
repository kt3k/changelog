---
date: 2026-06-26
repo: nodejs/node
size: M
title: "Text modules land; thenable tracing fixed"
excerpt: "Node adds experimental text imports, fixes diagnostics_channel to preserve custom thenables, and patches a Windows c-ares bug."
commits: 6
authors: [joyeecheung, richardlau, efekrskl, Renegade334, aduh95, Qard]
commit_authors: {"54296cb": efekrskl, "b48e4cd": Renegade334, "5551dfc": Qard}
---

### **Experimental text modules are now supported** (54296cb)
Node.js adds `--experimental-import-text`, enabling `import ... with { type: 'text' }` for `.txt`-style modules. The implementation wires the new type through ESM format detection, import-attribute validation, CLI docs, and test coverage, but it remains early-stage and gated behind the flag.

### **diagnostics_channel now returns the original thenable** (5551dfc)
`tracingChannel.tracePromise()` now preserves custom thenable objects instead of replacing them with chained results, so user-defined methods stay intact. This is a meaningful behavior fix for promise-like types and also tightens the native-Promise path to avoid unsafe prototype assumptions.

### **Windows c-ares DNS config bug fixed** (b48e4cd)
A small but important upstream c-ares patch corrects how empty wide strings are detected on Windows. This prevents the DNS domain list from being accidentally replaced with nothing in the affected case.

### Other misc changes
- Pin `envinfo` in GitHub Actions workflows to reduce supply-chain risk (1 commit)
- Add the missing `--experimental-import-text` entry to the man page (1 commit)
- Update BUILDING.md for upcoming macOS x64 tier-2 support changes (1 commit)
