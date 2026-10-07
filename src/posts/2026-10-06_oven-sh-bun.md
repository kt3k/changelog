---
date: 2026-10-06
repo: oven-sh/bun
size: L
title: "Bun adds built-in TypeScript checking"
excerpt: "Bun gains a new `check` command for TypeScript type checking, alongside a WebKit engine upgrade and compatibility fixes."
commits: 2
authors: [Jarred-Sumner, sosukesuzuki]
commit_authors: {"bbdc5a5": Jarred-Sumner, "3f1765a": sosukesuzuki}
---

### **Bun ships `bun check` as a built-in TypeScript type checker** (bbdc5a5)
Bun now includes a first-class `check` command for TypeScript projects, with CLI flags, shell completions, and docs wired in. The implementation ports TypeScript Go’s checker behavior, aiming for `tsc`-compatible diagnostics and making type checking part of the same workflow as `run`, `build`, and `test`.

### **Upgrade WebKit to a newer upstream snapshot** (3f1765a)
Bun’s embedded WebKit/JavaScriptCore fork was bumped to upstream `dbdca7545d`, pulling in a large batch of engine changes. The update also includes internal C++ compatibility adjustments for the new `WTF::CString`/UTF-8 APIs and refreshed WebKit-specific tests, which helps keep Bun aligned with the latest engine behavior.

### Other misc changes
- Added `bun check` docs, completion support, and licensing notes.
- Updated WebKit build pinning and related test fixtures.
- Small internal binding adjustments to match upstream WebKit API changes.
