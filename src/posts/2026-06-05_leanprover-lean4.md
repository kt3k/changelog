---
date: 2026-06-05
repo: leanprover/lean4
size: L
title: "Lean4 adds OpenSSL, do←, and WP overhaul"
excerpt: "Major runtime, control-flow, and proof infrastructure updates landed, plus dependency/versioning cleanup in Lake."
commits: 4
authors: [sgraf812, algebraic-dev, tydeu]
commit_authors: {"9c38aee": algebraic-dev, "d5039a7": sgraf812, "b064eec": sgraf812, "9e0092d": tydeu}
---

### **Link OpenSSL into the runtime and build tooling** (9c38aee)
Lean now builds and ships with OpenSSL support, adding the runtime bindings and wiring the dependency into CI, Nix, and platform setup docs. This enables code and tests that rely on TLS/crypto facilities, and the Nix changes even pin a static OpenSSL build for Linux distribution artifacts.

### **Add `do←` for effect forwarding inside `do` blocks** (b064eec)
A new `do←` / `do<-` syntax lets ordinary wrapper functions like `withReader` participate in the surrounding `do` control flow, forwarding `return`, `break`, `continue`, and mutable variable updates through the wrapper. This is a substantial ergonomics and expressiveness upgrade for monadic code, with new elaborator infrastructure and tests to support it.

### **Rework WP soundness into `WPSound`** (d5039a7)
The weak precondition proof layer was renamed from `WPAdequate` to `WPSound`, clarifying that it provides a one-way soundness bridge rather than a bidirectional adequacy notion. The commit also generalizes the framework from `Id`-specific lemmas to per-monad soundness lemmas, which broadens reuse across transformers and simplifies future proof developments.

### **Lake dependency versions now use `InputVer`** (9e0092d)
Lake’s dependency model now tracks version constraints with the new public `InputVer` type, unifying parsed Git revisions and semantic version ranges. This improves translation to/from TOML and Lean config, and makes Git dependency revisions behave as the default version constraint when nothing else is specified.

### Other misc changes
- Build/install docs updated for OpenSSL on macOS, Ubuntu, and MSYS2.
- CI and Nix package lists updated to include OpenSSL.
- Minor internal Lean/Lake refactors and test adjustments around the new version handling.
