---
date: 2026-06-19
repo: leanprover/lean4
size: L
title: "Lean gets a major VCGen overhaul"
excerpt: "New `WP` support for deep embeddings, a transparency split, a VCGen match fix, and a runtime/task race fix landed alongside perf and API work."
commits: 13
authors: [Kha, sgraf812, hargoniX, kim-em, Garmelon, datokrat, eric-wieser]
commit_authors: {"cb5e337": hargoniX, "0a0e533": Kha, "9dd9173": kim-em, "072fd7f": Kha, "1df6f69": sgraf812, "9c236a9": Kha, "d53f283": sgraf812}
---

### **Weakest-precondition logic now supports deep embeddings** (1df6f69)
Lean’s `do`-logic infrastructure was generalized so `WP` is no longer tied to `WPMonad`, letting weakest-precondition reasoning and `mvcgen'` work over arbitrary program types. This is a substantial capability expansion for verified embedded languages, and it also required widespread plumbing changes plus new regression/benchmark coverage.

### **Transparency levels split `implicit` vs `instances`** (9dd9173)
The compiler’s transparency hierarchy was refined to separate `instances` from `implicit`, so `@[implicit_reducible]` no longer has typeclass-search side effects like exposing marked declarations to instance search. This is a public semantic change that affects elaboration and reducibility behavior across core `Init` code.

### **`mvcgen` now handles dependent discriminant telescopes** (d53f283)
Match splitting now abstracts discriminants as a dependent telescope, so later discriminants may mention earlier ones without producing an ill-typed motive. That fixes a real `mvcgen`/`mvcgen'` failure mode for dependent matches such as `match n, h with`.

### **Derived computable `Inhabited` no longer panics in `noncomputable section`s** (0a0e533)
The deriving pipeline now always compiles the generated auxiliary default function, instead of leaving it uncompiled in a `noncomputable section` while still compiling the instance that depends on it. This removes a compiler panic and makes the derive behavior consistent in a common edge case.

### **`import all` docstring lookup works on the command line** (9c236a9)
Module data selection now honors `import all` when serving `.olean.server` information outside server mode, instead of always falling back to exported data. This fixes language-server-style APIs like `findDocString?` for cmdline users importing modules with `all`.

### **Lean task cancellation is now atomic** (cb5e337)
`lean_task_imp.m_canceled` was changed to an atomic field and all reads/writes were updated accordingly. That closes a theoretical race around task cancellation and makes task-manager synchronization safer.

### **Object compaction was rewritten around direct recursion** (072fd7f)
The runtime object compactor now compacts heap objects by recursive descent instead of a retry-based worklist, and the insert helpers return offsets directly. This should speed up `.olean` and snapshot serialization by avoiding duplicate child resolution and reducing compaction overhead.

### Other misc changes
- Release script updates and PR-release workflow tweaks.
- CI changes to reduce fsanitize OOMs and avoid fetching large blobs in tag-push jobs.
- Stage0 refreshes and minor bootstrap churn.
- `std::optional` refactor and a few small internal Lean/runtime cleanups.
