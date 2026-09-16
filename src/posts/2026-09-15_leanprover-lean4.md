---
date: 2026-09-15
repo: leanprover/lean4
size: L
title: "Lean adds modular pow, framing, and fixups"
excerpt: "Major Lean core work landed: exception-channel framing, lazy library suggestions, ChoiceResolutionInfo, new powMod/Fin exponentiation, plus several runtime and Lake fixes."
commits: 14
authors: [kim-em, algebraic-dev, Kha, sgraf812, mhuisi, Garmelon, hargoniX, TwoFX, dennj]
commit_authors: {"95f4f3c": sgraf812, "49cc3a6": algebraic-dev, "ceed043": mhuisi, "f6e80ec": algebraic-dev, "d1e94ac": Garmelon, "2c42947": hargoniX, "90dc0c5": Kha, "1d0e180": TwoFX, "be72ee5": kim-em, "368d116": Kha, "2e59fe3": dennj, "001828b": kim-em, "c90fd30": kim-em, "86704ee": kim-em}
---

### **Frame rules now cover exception postconditions** (95f4f3c)
Lean’s `Std.WP` framing machinery now threads a separate frame operator through exceptional exits too, so framed specs can preserve both normal and exceptional postconditions. The VC generator and frame proc were updated to build the right exception-aware obligations, which matters for program logics that carry state through failures.

### **Choice resolution is recorded in the InfoTree** (ceed043)
Elaboration now emits `ChoiceResolutionInfo` nodes for resolved `choice` syntax, letting downstream tooling see which alternative was actually picked. Ambiguous overload errors strip those nodes back out, so the new metadata reflects successful resolution without polluting failure paths.

### **Lake cancellation becomes a first-class job state** (2e59fe3)
Build jobs now track cancellation explicitly instead of inferring it from trace logs, and canceled results are reported distinctly from real failures. This tightens `--fail-fast` behavior and avoids misclassifying canceled dependencies as bad imports.

### **Library suggestions are computed lazily on demand** (001828b)
Premise-selection indexes are no longer prepared and serialized during builds; they’re built and cached the first time a process actually needs them. That cuts build overhead, though the first query can now be expensive and the change includes a breaking cleanup of the old exported index format.

### **Lean gets fast modular exponentiation for `Nat` and `Fin`** (86704ee)
A new kernel-visible `Nat.powMod` computes `b ^ e % m` by square-and-multiply, with an extern backed by GMP when available. `Fin` exponentiation now uses it too, which improves reduction speed for concrete modular powers and gives Lean a reusable modular-arithmetic primitive.

### **`con-ron` is bundled with release toolchains** (368d116)
The release build now fetches, builds, and installs the `con-ron` external checker alongside the existing paranoid tooling. Lake’s checker lists and help text were updated so `--paranoid` includes it out of the box.

### **Misc runtime and networking fixes** (49cc3a6, f6e80ec)
Libuv stop/accept paths were hardened to avoid double releases and racey shutdown behavior, and TCP/UDP receive handling was fixed for truncated datagrams and parallel accept/recv cases. These are correctness fixes that matter for async users even though they’re narrowly scoped.

### **Other misc changes**
- Performance tweak: share `grind` modifier parser construction to reduce import overhead (be72ee5)
- Stdlib build invalidation: recompile checked-in C files when `lean.h` changes (90dc0c5)
- CI/build housekeeping: next cycle prep, fsanitize denylist, Grove action update (d1e94ac, 2c42947, 1d0e180)
- Test additions for UV concurrency, `ChoiceResolutionInfo`, library suggestions, `@[extern]` integers, and modular pow (49cc3a6, ceed043, 001828b, c90fd30, 86704ee)
- Docs/comments and small internal cleanups across framing, UDP, and Lake tooling (95f4f3c, f6e80ec, 368d116, 90dc0c5)
