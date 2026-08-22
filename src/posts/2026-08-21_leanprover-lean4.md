---
date: 2026-08-21
repo: leanprover/lean4
size: L
title: "VCGen gets a major cleanup"
excerpt: "Lean4 deprecates mvcgen, adds experimental vcgen controls, and lands notable correctness and build fixes across discrimination trees and Lake."
commits: 12
authors: [sgraf812, kim-em, Kha, robsimmons, eric-wieser, tydeu]
commit_authors: {"f6c7d68": sgraf812, "5adc41e": sgraf812, "5377fdd": kim-em, "5c0c599": robsimmons, "5600c6e": kim-em, "dd7716d": Kha, "03d7a4e": sgraf812, "11a83c9": sgraf812, "88b5922": tydeu}
---

### **Discrimination trees now prune empty nodes** (5c0c599)
`DiscrTree.mapArraysM` now collapses subtries that end up empty, and a new `Trie.isEmptyNode` check makes that behavior explicit. This fixes downstream filtering behavior and tightens the trie API with specialization hints for the recursive folds.

### **`mvcgen` is deprecated in favor of `vcgen`** (5adc41e)
The old `mvcgen`/`mvcgen?` tactics now emit deprecation warnings via `deprecated_syntax`, controlled by `linter.deprecated.syntax`. The tactic docs and test suite were updated accordingly, so users are pushed toward the new name without losing compatibility immediately.

### **`vcgen` gains an experimental opt-in and clearer invariant handling** (03d7a4e)
A new `experimental.vcgen` option now suppresses the tactic’s warning, and `vcgen invariants?` explicitly warns that invariant suggestions were not ported and are slated for removal. The frontend also stops delegating `invariants?` to the old upstream path, making the behavior more explicit and aligned with the new tactic’s direction.

### **`PredTrans` combinators move into their own namespace** (f6c7d68)
`PredTrans`’s core combinators and monad instances were reorganized under `Lean.Order.PredTrans`, with each monad class operation getting its own definition. This is a sizable namespace and API cleanup that makes the module structure clearer and the simp lemmas more uniform.

### **Lake now tracks overridden Lean headers correctly** (88b5922)
Object-file builds now record the actual Lean include headers in their traces, so bootstrap header changes correctly trigger rebuilds. The public `buildLeanO` API was also pared back, and the CMake build now updates stage headers as their sources change.

### **`vcgen` drops binder-style triple notation** (11a83c9)
The shorthand `⦃ P ⦄ c ⦃ v, Q ⦄` and its exception-postcondition variant were removed in favor of the explicit `fun v => Q` form. This simplifies the notation surface and makes the expansion more obvious.

### **Release tooling gets more robust for patch releases** (5600c6e)
The Zulip announcement generator now produces usable text for patch releases instead of failing when ProofWidgets tags are absent. Patch-release announcements are now tailored to the repos actually included in those releases.

### **Generated release notes now credit the runner** (5377fdd)
Release note authorship is now derived from `git config user.name` in the reference checkout rather than being hardcoded. That means the person actually running the generator gets credited, with validation to avoid unsafe or empty names.

### **LibUV version checks are enforced** (dd7716d)
`FindLibUV.cmake` now passes `LIBUV_VERSION` through `find_package_handle_standard_args`, so the requested minimum version is no longer silently ignored. Builds will now correctly reject an older libuv instead of accepting any installed version.

### Other misc changes
- Stage0 snapshot updated.
- `register_options` cleanup in a couple of Lean modules.
- Test renames and minor test expectation updates.
- Misc doc/comments and benchmark adjustments around `vcgen`/`mvcgen`.
