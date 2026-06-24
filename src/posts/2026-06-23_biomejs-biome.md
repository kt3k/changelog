---
date: 2026-06-23
repo: biomejs/biome
size: M
title: "CLI fixes land across migrate, rage, and JSON output"
excerpt: "Biome fixed config handling, plugin filtering, JSON escaping, and a migrate trivia bug; release prep churn was also reverted."
commits: 7
authors: [ematipico, JamBalaya56562, BangDori]
commit_authors: {"4396496": BangDori, "bd2364e": JamBalaya56562, "4ccb410": ematipico, "9fdc560": JamBalaya56562}
---

### **`rage` now honors custom config paths** (bd2364e)
The `rage` command now loads configuration using `--config-path` and `BIOME_CONFIG_PATH` instead of always falling back to default resolution. That makes the diagnostic dump reflect the same config Biome actually uses.

### **Analyzer plugins can be filtered with `--only`/`--skip`** (4ccb410)
Biome now treats analyzer plugins as a reserved `plugin` group, so `--only=plugin` can target them and `--skip=plugin` can exclude them. This fixes incorrect plugin execution when users combine plugin-related filters with normal rule selection.

### **JSON reporters now escape backslashes in paths** (9fdc560)
The `json` and `json-pretty` reporters now escape backslashes in `location.path`, which prevents invalid JSON on Windows-style or otherwise backslash-containing paths. That’s a correctness fix for downstream tooling that parses Biome’s machine output.

### **`biome migrate` preserves trivia when rewriting `recommended`** (4396496)
Migration from the deprecated `recommended` option to `preset` now keeps surrounding comments and spacing intact. This avoids unnecessarily rewriting config formatting while still applying the migration.

### Other misc changes
- Release/changelog churn from `ci: release` (1 commit)
- Reverted package version bumps (2 commits)
