---
date: 2026-05-15
repo: microsoft/typescript-go
size: L
title: "Bugfix sweep: crashes, hangs, and editor polish"
excerpt: "Multiple fixes for compiler/runtime panics and deadlocks, plus signature help and workspace symbol improvements."
commits: 16
authors: [navya9singh, jakebailey, joj]
commit_authors: {"1170944": joj, "f4a1d2a": navya9singh, "dd3d9c7": jakebailey}
---

**Signature help now supports VS tooltip coloring** (f4a1d2a)
A large test-focused change adds coverage for colored signature help and JSDoc formatting in Visual Studio. This looks like editor UI groundwork for richer tooltip rendering across many signature-help and quick-info scenarios.

**Fix CommonJS collisions with top-level `Object`** (7ce364c)
The checker now reports a reserved-name collision when `Object` is declared in the top level of a CommonJS module. This closes a correctness gap that previously let generated CommonJS output shadow a global identifier without diagnostics.

**Prevent JSX type instantiation crashes on non-interface types** (ed52070)
A guard was added so JSX default type-argument filling only runs for class/interface-like managed types. That avoids a SIGSEGV when JSX config points at unexpected type forms.

**Fix `--typeRoots` relative-path panic on the CLI** (4d18200)
Relative entries in array-valued path options are now normalized to absolute paths during command-line parsing. This prevents a parser crash and makes `--typeRoots` behave correctly when invoked from a project directory.

**Break tsconfig `extends` cycles without deadlocking** (16eae3f)
Extended config resolution now uses canonical path tracking and has explicit regression tests for self-references, mutual cycles, and case-insensitive filesystem collisions. The fix turns a hang into a normal circularity diagnostic.

**Refresh project snapshots when files close** (a7acc87)
The project/session layer now updates snapshots and project state on file close. That should keep language-service state in sync after edits, reducing stale results in multi-file workflows.

**Fix overlayfs save panics when no overlay exists** (54617df)
Saving through overlayfs no longer assumes an overlay layer is already present. This prevents a crash in a file-save path that should be routine.

**Correct signature-help applicable spans for nested calls** (e06d14e)
Signature help now computes better applicable ranges for nested call expressions, with new fourslash coverage. That improves parameter highlighting and what the editor considers the active call site.

**Stop regex parsing from hanging on invalid UTF-8** (9522325)
The regexp scanner now consumes invalid UTF-8 bytes even under the Unicode flag, avoiding an infinite loop. This is a parser robustness fix for malformed source text.

**Fix auto-import panics for relative CSS augmentations** (6f58807)
Auto-import completion now handles `.css` module augmentations from ESM files without crashing, and the path helper was adjusted to stop stripping arbitrary file extensions. This should make CSS augmentation imports work reliably.

**Improve workspace symbol name-span handling** (1170944)
Workspace symbol lookup now uses the declaration name span, with updated fourslash coverage and baselines across navigation/symbol tests. This improves symbol precision in the language service.

**Accept CommonJS `module.exports = {}` baseline updates** (401d27a)
Several declaration-emit baselines were moved from triaged to accepted for CommonJS-related output. This is mostly test maintenance around existing JS declaration behavior.

**Fix `using` newline grammar handling** (e5a356e)
The parser now respects the no-line-terminator restriction after `using`, with a regression test added. This closes a small grammar bug that could misparse invalid declarations.

**Prevent tuple slicing from going out of bounds** (2a876a5)
Tuple type slicing now returns an empty tuple when the slice start is past the end. That avoids an out-of-range panic in conditional/infer tuple patterns.

**Port the implement-interface quick fix** (3d2b680)
A substantial refactor ports the implement-interface code fix and updates the fourslash harness and many generated tests. This expands code-fix support, but most of the day’s volume here is test and infrastructure churn.

### Other misc changes
- Fix global diagnostic test flake (dd3d9c7)
- Accept/move CommonJS declaration-emit baselines (401d27a)
- Test and harness updates for signature-help coloring, navigation, and code-fix coverage (f4a1d2a, 1170944, 3d2b680)
- Minor internal refactors and test adjustments across checker, project, and parsing code
