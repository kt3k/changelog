---
date: 2026-05-15
repo: leanprover/lean4
size: M
title: "Shake explanations get precise dependency reasons"
excerpt: "Lean improves `lake shake --explain`, fixes `--plugin` parsing on Windows, and updates CI plus stage0 artifacts."
commits: 4
authors: [Kha, tydeu]
commit_authors: {"1708293": Kha, "2acdaaf": Kha, "f8b7f30": tydeu}
---

### **`lake shake --explain` now names why deps stick** (1708293)
`lake shake --explain` now reports precise preservation reasons beyond direct references, including `shake: keep`, `--keep-public`, `--add-only`/`--only`/`shake: keep-all`, `--keep-downstream`, `--add-public`, `--keep-prefix`, `import all`, and folder-nested imports. That makes shake output much more actionable when diagnosing why a module remains in the dependency graph.

### **`--plugin` switches to `file=fn` to avoid Windows path clashes** (f8b7f30)
Lean changes the plugin initialization syntax from `file:fn` to `file=fn`, which avoids ambiguity with Windows drive-letter colons. The help text, parser, and plugin test were updated together so the new form is the supported CLI contract.

### Other misc changes
- CI: fix jira-sync workflow (#13739) (2acdaaf)
- Update stage0 artifacts (6749463)
