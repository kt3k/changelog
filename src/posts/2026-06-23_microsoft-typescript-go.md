---
date: 2026-06-23
repo: microsoft/typescript-go
size: L
title: "API surface expands and diagnostics deepen"
excerpt: "Project/file lifecycle handling was overhauled, new program diagnostics were exposed, and the native preview got a performance cache."
commits: 7
authors: [andrewbranch, piotrtomiak, weswigham, oMatheusmol]
commit_authors: {"d3860da": andrewbranch, "6ad6100": andrewbranch, "c623b07": piotrtomiak, "815e9a4": weswigham, "0392487": piotrtomiak}
---

### **Project and file open state is now tracked explicitly** (6ad6100)
The API now supports opening and closing projects/files across snapshots, with ref-counted state that persists until explicitly released. This makes snapshot behavior much closer to LSP semantics and fixes state management edge cases for multi-snapshot clients.

### **Program diagnostics API now exposes bind, global, and program-wide checks** (d3860da)
New getters were added for binder diagnostics, global diagnostics, and full program diagnostics, alongside tests covering the new endpoints. This broadens what consumers can query from a program without having to synthesize those views themselves.

### **Parameter type reuse works even when return types are inferred** (815e9a4)
The declaration/type-building pipeline was adjusted so parameter type reuse still happens when a function’s return type is inferred, instead of falling back and losing reuse opportunities. That improves declaration emit fidelity for certain inferred-return cases and fixes related triage failures.

### **Object registries are now project-scoped** (0392487)
Object identity for symbols/types/signatures was moved to be project-specific rather than shared broadly, preventing id collisions across projects. This is an important correctness fix for API consumers working with multiple projects in one session.

### **Remote SourceFile text is cached to reduce repeated decoding** (c623b07)
The native preview now memoizes `SourceFile.text` after the first read instead of re-decoding every access. That should noticeably improve performance for text-heavy API usage.

### Other misc changes
- Fixed extra spacing in `--listEmittedFiles` TSFILE output.
- Added missing Node position/text getters to the native preview API.
- General API/test/support updates and baseline churn.
