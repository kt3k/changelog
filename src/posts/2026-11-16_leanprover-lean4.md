---
date: 2026-11-16
repo: leanprover/lean4
size: L
title: "Lean4 lands EPR solver and HTTP fixes"
excerpt: "Major EPR tactic work, HTTP RFC compliance fixes, and a libuv-based process spawn rewrite with performance and correctness improvements."
commits: 25
authors: [TwoFX, hargoniX, tydeu, algebraic-dev, sgraf812, leodemoura, Vtec234, ejgallego]
commit_authors: {"6545434": sgraf812, "8713280": hargoniX, "13921a6": algebraic-dev, "25d5d83": TwoFX, "b3c0f27": TwoFX, "aacdcb0": TwoFX, "ee37987": hargoniX, "038a012": hargoniX, "480f845": TwoFX, "9fad714": hargoniX, "4046a54": TwoFX, "98caf15": TwoFX, "c69626e": tydeu}
---

### **New `epr` tactic for BitVec-backed EPR solving** (ee37987)
Lean now has an `epr` tactic that encodes EPR problems into bit-vectors and solves them with `bv_decide`-based machinery. This adds a new tactic surface plus the normalization, reification, and reflection support needed to make it usable in practice.

### **EPR support gains instantiation sets, subsort analysis, and symmetry breaking** (038a012, 8713280, 9fad714)
The EPR pipeline got several substantial upgrades: Z3-style instantiation sets for MBQI, a union-find based subsort analysis, and symmetry-breaking modes for the bit-vector encoding. Together these make the solver more expressive and more efficient on realistic problems.

### **Std.Http is brought closer to the RFCs** (13921a6)
The HTTP stack was fixed in a dozen compliance-sensitive spots across the client, server, URI parsing/rendering, and body streaming code. The change also adds a large set of regression tests, so the module should now behave more predictably against RFC 9110/9112/3986.

### **`IO.Process.spawn` is reimplemented on libuv** (98caf15)
Process spawning now goes through libuv everywhere, replacing the previous implementation. Besides fixing a number of cross-platform bugs, this should make spawning much faster for memory-heavy processes and makes startup failures surface as errors instead of failing silently.

### **Lake adds `downloadCacheService` for package builds** (c69626e)
Lake can now fetch package build artifacts from a configured download cache service, not just Reservoir or GitHub releases. That adds a new cache source and new configuration/CLI plumbing, with fallback logic that walks Git history when looking for cached builds.

### **`do` finally blocks now reject illegal `mut` reassignment** (6545434)
The `do` elaborator now reports an error if a `finally` block reassigns `mut` variables from the surrounding `try` scope. The diagnostics are more precise too: the error is raised at `finally` and names the offending variables.

### **More deprecation-linter exceptions for automation and simp lemmas** (480f845, 4046a54, b3c0f27, 25d5d83, aacdcb0)
A set of fixes reduces false positives from the deprecation linter, especially around `simp`/`grind` lemmas, deprecated instances, and local attributes on deprecated declarations. These changes mostly improve ergonomics for automation without changing runtime behavior.

### Other misc changes
- Performance: faster header validation without building char lists; faster `simp`/equation-theorem handling; and a small `vcgen +jp` optimization.
- Lake/build: canonicalize build-store jobs, clean up Windows `ltar` handling, and add a few cache/build plumbing tweaks.
- Misc cleanup: dead-code removal, bundled Beam update, stage0 refresh, and new test infrastructure for deprecated functionality.
