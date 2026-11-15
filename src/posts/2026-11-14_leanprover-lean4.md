---
date: 2026-11-14
repo: leanprover/lean4
size: M
title: "Lean speeds up match proofs and CI"
excerpt: "A performance win for match equation generation lands alongside CI changes to overlap Lake cache uploads and tighten rebootstrap checks."
commits: 3
authors: [Kha, leodemoura]
commit_authors: {"a8f7ac9": Kha, "55a18a0": Kha, "f3f9132": leodemoura}
---

### **Faster equation generation for `match` value patterns** (f3f9132)
Lean now proves equations for `match` expressions with value patterns much faster, especially when there are many alternatives. The new `DiteTree` machinery avoids repeatedly applying general-purpose tactics across all hypotheses, cutting a representative case from 1.16s to 0.38s.

### **CI now uploads Lake cache in the background** (a8f7ac9)
The CI workflow no longer blocks on Lake cache upload before continuing with tests; the upload runs in the background and is only round-tripped for `merge-ci` and higher check levels. This reduces idle time in CI while keeping cache verification where it matters.

### **`con-leche` is checked against the rebootstrapped toolchain** (55a18a0)
The rebootstrap CI step now builds `con-leche`, so its package tests verify the rebootstrapped toolchain’s exports with the pinned checker instead of skipping. The workflow also consolidates elan installation into a shared step for jobs that use it.
