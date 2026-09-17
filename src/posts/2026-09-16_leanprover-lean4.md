---
date: 2026-09-16
repo: leanprover/lean4
size: M
title: "Lean4 unifies grind arithmetic and fixes Rust checkers"
excerpt: "Grind arithmetic got a shared instance path and faster ring classification; release tooling also now ships Rust checkers that run outside CI."
commits: 4
authors: [Garmelon, leodemoura, Kha]
commit_authors: {"566b215": leodemoura, "41aa79c": Garmelon, "0c4050a": Garmelon, "eea2a2d": Kha}
---

### **Grind arithmetic now shares `Sym.Arith` instance plumbing** (566b215)
`grind`'s arithmetic instance helpers were moved into `Lean.Meta.Sym.Arith` so classification and solving reuse the same implementation. The classifier also now records `PowIdentity` and has a fast path for `Ring.OfSemiring.Q`, avoiding expensive instance synthesis for that envelope type.

### **Release toolchain Rust checkers are now self-contained** (eea2a2d)
Linux standalone builds now link the bundled `nanoda_bin` and `con-ron` checkers against Lean's own sysroot instead of the Nix shell's glibc/loader, which makes them runnable outside CI. The release packaging scripts also copy the right runtime libraries for Rust's default link line, including `libutil` and a real `libgcc_s.so` symlink.

### Other misc changes
- Adjusted the downstream-label workflow to use the app token correctly and include `lean4` in the allowed repositories (41aa79c).
- Updated CI to follow mathlib's renamed nightly workflow file (0c4050a).
