---
date: 2026-05-09
repo: biomejs/biome
size: M
title: "Release rolls up lint and organize-imports fixes"
excerpt: "A release commit drops multiple patch notes for new Vue/test lint rules plus several organizeImports and style fixes."
commits: 1
---

### **Release commit publishes multiple lint and assist improvements** (9dd3271)
This release bundles several new nursery/recommended rules, including Vue-specific checks, a test-hook ordering rule, and a `this`-usage rule in class methods. It also ships fixes to `organizeImports` diagnostics and a readonly-class-property false positive, making lint and assist output more accurate and actionable.

### Other misc changes
- Removed 20 released changeset files after publishing patch notes.
- Minor rule implementation tweaks across HTML/JS linters.
