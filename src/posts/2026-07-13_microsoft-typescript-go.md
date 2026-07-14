---
date: 2026-07-13
repo: microsoft/typescript-go
size: M
title: "Import adder now exposed over IPC"
excerpt: "New IPC and API plumbing lets clients request import edits for symbols, with async/sync surfaces and tests updated."
commits: 1
authors: [andrewbranch]
commit_authors: {"8a74937": andrewbranch}
---

### **ImportAdder reaches the public IPC API** (8a74937)
The native-preview API now exposes `getImportEditsForSymbols` / `getImportAdderEdits`, wiring import-adder requests through both async and sync clients. This makes symbol-to-import insertion available to IPC consumers instead of staying internal.

The change adds the needed request/response types, session/proto plumbing, and tests, so callers can ask the server for import edits directly and receive `TextEdit` results.

### Other misc changes
- IPC proto/session wiring and project snapshot bookkeeping
- New/updated native-preview AST helpers and tests
