---
date: 2026-10-27
repo: leanprover/lean4
size: L
title: "Lean4 adds VCGen simplification, JSON CLI, and perf"
excerpt: "A feature-heavy day: new `vcgen` simplification defaults, JSON output for Lake checks, and several major theorem-proving performance wins."
commits: 29
authors: [leodemoura, Timeroot, hargoniX, sgraf812, paulbutcher, matthiasgoergens, mhuisi, ejgallego]
commit_authors: {"1684651": paulbutcher, "4785835": hargoniX, "9332397": leodemoura, "98f7251": leodemoura, "05634c9": leodemoura, "af99cae": leodemoura, "954fb5a": sgraf812, "7af5fc0": Timeroot, "aba06ea": Timeroot, "3312b3a": hargoniX, "0808e43": mhuisi, "b237bd1": leodemoura, "835830d": leodemoura, "fad29eb": leodemoura, "b08a40e": leodemoura, "f66c093": ejgallego, "43c077e": leodemoura, "24a851d": leodemoura, "33c050d": leodemoura, "f85d7b3": leodemoura, "b9d9923": leodemoura, "986d9e5": leodemoura, "3f0c225": leodemoura}
---

### **`vcgen` now simplifies VCs by default** (954fb5a)
`vcgen` now rewrites generated verification conditions using the `@[vcgen_simp]` set, evaluating ground terms and simplifying hypotheses/program states as it goes. This should produce cleaner obligations and close trivial branches earlier; users can also opt in per-call with `vcgen simp [...]` or disable it with `vcgen -simp`.

### **Lake check/comparator can emit machine-readable JSON** (3312b3a)
`lake check` and `lake comparator` gained a `--json` mode that prints a final structured report instead of streaming progress output. The new report types are versioned and intended for tooling integration, making these commands much easier to consume from scripts and editors.

### **Lean’s ring/grind/sym infrastructure got a large performance overhaul** (b237bd1, 835830d, fad29eb, 43c077e, 24a851d, f85d7b3, 986d9e5, 33c050d, b08a40e, b9d9923, 3f0c225, 9332397)
A broad set of kernel-checking optimizations landed for `Sym.simp`, `grind`, and `linarith`, including packed/Kronecker-style certificates, balanced normalization for long sums, direct definitional-equality checks for some proof steps, and cheaper arithmetic classification lookups. Together these changes aim to substantially reduce proof-term size and kernel time on algebra-heavy workloads.

### **`grind?` suggestions and instantiation fixes** (98f7251, 05634c9, af99cae)
`grind?` now preserves used injectivity theorems in its generated `grind only` suggestions, parses anchor forms like `#c0c6` before term syntax, and correctly fires guarded instances during `instantiate only [...]`. These fixes address cases where suggestions or delayed instances previously produced scripts that failed when replayed.

### **Lake `--keep-toolchain` now respects root requirements first** (1684651)
`lake update --keep-toolchain` now keeps the root package’s own pinned requirement ahead of inherited dependency revisions, matching the behavior users already get without the flag. This avoids silently substituting an older dependency-pinned toolchain revision into the root package.

### **Safer UTF-8/runtime C API cleanup** (7af5fc0, aba06ea)
The runtime removed the unsafe `lean_utf8_strlen`, which could read past a NUL-terminated buffer on truncated UTF-8 input, and deleted obsolete `lean_string_data` declarations that outlived their implementations. These are API cleanup/security-hardening changes rather than feature work.

### Other misc changes
- Stage0 regeneration / toolchain refreshes (4 commits)
- `return` parser now allows the term to start on a later line (0808e43)
- `isExclusiveUnsafe`/`ptrAddrUnsafe` refactor and `never_extract` marking (4785835)
- Lean Beam bundled into Linux/macOS toolchains (f66c093)
