---
date: 2026-06-23
repo: nodejs/node
size: L
title: "Node 24.18.0 lands with crypto and perf fixes"
excerpt: "LTS releases plus security, performance, and bug-fix work in crypto, REPL, streams, perf_hooks, and test diagnostics."
commits: 15
authors: [nodejs-github-bot, trivikr, aduh95, watilde, sxa, Ijtihed, panva, araujogui, szegedi, Renegade334]
commit_authors: {"2989072": panva, "9f23e70": sxa, "266e165": trivikr, "ff58f43": Ijtihed, "68f14c2": aduh95, "152c492": nodejs-github-bot, "7e31299": araujogui, "1e7c852": trivikr, "07e27ad": watilde, "7a51702": aduh95, "5075bb4": szegedi, "ccc2d7c": Renegade334, "745a43e": watilde, "1434a07": nodejs-github-bot, "85b0db2": nodejs-github-bot}
---

### **Node.js 24.18.0 LTS release ships** (9f23e70)
Node 24.18.0 "Krypton" is out, bundling several user-facing changes: Buffer's default pool size is increased to 64 KiB, crypto docs and behavior are tightened, and root certificates are refreshed. The release also carries API/doc updates across core modules, so this is a meaningful maintenance drop for the LTS line.

### **Reject small-order EdDSA points during verification** (2989072)
Ed25519 and Ed448 one-shot verification now returns `false` when the public key or signature `R` component is a known low-order point. This closes a cryptographic correctness gap and aligns WebCrypto verification behavior with WPT expectations across OpenSSL variants.

### **Fix `Readable.wrap()` proxying for the first own method** (07e27ad)
`Readable.prototype.wrap()` now starts proxying own enumerable keys at index 0 instead of 1, so the first method on a wrapped legacy stream is no longer silently skipped. This fixes a subtle interop bug that could leave wrapped methods unavailable depending on property order.

### **Expose the GC minor mark-sweep perf_hooks constant** (5075bb4)
Node now exports `perf_hooks.constants.NODE_PERFORMANCE_GC_MINOR_MARK_SWEEP`, matching V8's `kGCTypeMinorMarkSweep` when `--minor-ms` is enabled. That gives consumers a stable constant for interpreting GC performance entries instead of seeing an unmapped numeric kind.

### **Improve REPL startup and completion performance** (745a43e)
The REPL now lazy-loads acorn, acorn-walk, and the global builtins set instead of paying those costs on builtin load. That trims startup overhead and defers the expensive work until parsing, completion, or recoverable-error checks actually need it.

### **Tighten test-runner and inspect diagnostics** (266e165, ff58f43)
Test-runner coverage failures now include the coverage filename and child-process output, making missing-report failures much easier to debug. Separately, `util.inspect()` no longer risks an out-of-memory loop when formatting stack traces that end at a `node_modules` path component.

### Other misc changes
- Node.js 22.23.1 LTS release (152c492)
- Revert manpage generation changes; restore `doc/node.1` flow (68f14c2)
- Lazy-initialize event target maps and add coverage for it (7e31299)
- Reset a flaky coverage threshold test's `exitCode` state (1e7c852)
- Update CI workflow exclusions and toolchain/dependency pins (7a51702, ccc2d7c, 1434a07, 85b0db2)
