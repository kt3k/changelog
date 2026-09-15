---
date: 2026-09-14
repo: leanprover/lean4
size: L
title: "Lean adds float FMA and Lake checker flags"
excerpt: "New Lake options for export loading and sandboxing, plus Float/Float32 fused multiply-add support and a parser whitespace fix."
commits: 11
authors: [mhuisi, hargoniX, Garmelon, gaetanserre, Kha]
commit_authors: {"dc34e5f": hargoniX, "a2233a3": hargoniX, "e20f627": Garmelon, "d3a0781": gaetanserre, "9632ea4": mhuisi, "088be5f": mhuisi, "669e6b4": Kha, "5e7db96": mhuisi, "db1b21a": mhuisi}
---

### **Lake check/comparator can reuse export files and tune sandboxing** (dc34e5f, a2233a3, 669e6b4)
`lake check` and `lake comparator` gained new modes to load prebuilt export NDJSON directly, avoiding an on-the-fly rebuild/export step. Comparator also now has an expert-only `--inadvisably-no-sandbox` escape hatch, and `--paranoid` runs additional bundled checkers alongside Lean's kernel for stronger verification.

### **Float and Float32 now expose fused multiply-add** (d3a0781)
`Float.fma` and `Float32.fma` were added with logical models in the corresponding float model modules, backed by the native `fma`/`fmaf` C functions. This gives Lean code access to a more accurate single-rounding `x * y + z` operation and expands the standard float API.

### **Parser preserves whitespace for `hygieneInfo` antiquotations** (9632ea4)
The parser/pretty-printer path was adjusted so `hygieneInfo` antiquotations no longer drop the trailing space from the preceding token. That fixes reprinting and source reconstruction for syntax that depends on that whitespace.

### **InfoTree utilities moved into elaboration internals** (5e7db96)
`InfoTree`/`SnapshotTree` helpers were relocated out of the server namespace into `Lean.Elab`, with the old server module deprecated. This is a broad internal refactor that cleans up ownership of elaboration-time tree traversal and related LSP helpers.

### Other misc changes
- Removed lossy `SepArray` coercions in favor of a `TSepArray`-to-`SepArray` conversion that preserves separator source info (088be5f).
- Stage0 updates (2 commits).
- Removed a redundant `sepBy1` in the `subst` parser (db1b21a).
- Added downstream PR-labeling via comment workflow automation (e20f627).
