---
date: 2026-05-10
repo: leanprover/lean4
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "Lean gets safer runtime, better diagnostics, and new verification tools"
excerpt: "This week brought loop verification APIs, a faster experimental VC generator, improved diagnostics, and several safety and tooling fixes."
commits: 54
---

### **Verification tooling takes a big step forward**
Lean added verifiable `repeat`/`while` loop support via a new `whileM` API with unfolding/spec theorems, making control-flow reasoning much more practical. Alongside that, the experimental `mvcgen'` tactic moved into the main tree as a faster SymM-based VC generator, and `cbv`/`SymM` were tuned in related paths.

### **Runtime and memory safety were tightened**
Two separate OOM paths were hardened: `mpz_alloc` now fails safely when GMP is unavailable, and the runtime allocator now panics before leaving allocator state inconsistent. This week also improved module loading robustness by handling interrupted reads, clearer EOF/I/O errors, and empty-file edge cases.

### **Diagnostics, linting, and editor feedback got sharper**
Lean renamed `lake lint --clippy` to `lake lint --extra` and broadened it to run default plus extra linters. It also upstreamed `unreachableTactic`, fixed termination errors to point at the correct recursive call site, suppressed redundant deprecation warnings inside deprecated definitions, and improved `grind`/`fun_induction` hover and theorem reporting.

### **Docs, attributes, and plugin loading were refined**
Docstrings now handle blockquotes more reliably in Verso, and attribute elaboration now rejects IR-only modules to avoid server/CLI inconsistencies. Plugin loading gained explicit init-function support through `Lean.loadPlugin` and setup descriptors, making nonstandard plugins easier to integrate.

### **Build, CI, and Lake saw notable infrastructure changes**
Lake now hoists compiled configs into the workspace to reduce cache collisions, and CI was stabilized with self-hosted runner fallback handling and a pinned `test-summary` SHA. Lean also upgraded LLVM to 22, renamed `UInt8.ofNatTruncate` to `UInt8.ofNatClamp`, and generalized scoped export handling for the new `OLeanEntries` format.

### Other misc changes
- Publicized `Glob.ofString?` for downstream TOML parsing reuse.
- Added a browser-serving flow for `trace.profiler` output.
- General string-handling cleanup, including several UTF-8-correct length/emptiness checks.
- Misc benchmark/test/tooling updates, stage0 refreshes, and small API tweaks.
