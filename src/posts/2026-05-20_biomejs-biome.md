---
date: 2026-05-20
repo: biomejs/biome
size: M
title: "Formatter upgrade and CI hardening"
excerpt: "Biome tightened GitHub Actions permissions, fixed a build/config bug for featureful checks, and improved SCSS map formatting."
commits: 4
authors: [ematipico, MatteoGabriele, denbezrukov]
commit_authors: {"4f1aaf2": ematipico, "b3840a2": denbezrukov}
---

### **Fix build and config handling for all-features checks** (4f1aaf2)
Biome updated its workspace and CI commands to include `--all-features` for `cargo check` and `udeps`, which should catch feature-gated issues that were previously missed. The workspace also now declares `default-members`, and the configuration schema/workspace JSON were expanded alongside CLI help/docgen updates to keep generated config docs in sync.

### **Align SCSS map pair formatting with Prettier-style wrapping** (b3840a2)
The CSS formatter now has dedicated layout logic for SCSS map pairs, improving how broken keys and scalar or self-breaking values are wrapped around `:`. This should produce more consistent output for maps with long keys or parenthesized values, reducing surprising diffs in SCSS formatting.

### Other misc changes
- Added a new GitHub Actions security scanning workflow with zizmor.
- Hardened several existing workflows by reducing permissions and removing unnecessary checkout steps.
- Disabled the compromised `close-issue` workflow by commenting it out.
- Dependency and snapshot updates across CLI/help and formatter tests.
