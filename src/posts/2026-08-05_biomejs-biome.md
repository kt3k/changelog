---
date: 2026-08-05
repo: biomejs/biome
size: L
title: "React compiler rule lands; inference and fixes"
excerpt: "Adds a new React Compiler lint rule, improves promise type inference performance, and fixes a JSX fragment autofix panic."
commits: 6
authors: [dyc3, ematipico, saberoueslati]
commit_authors: {"bd0b68d": ematipico, "0a0fbc1": dyc3, "4a0bc5c": saberoueslati}
---

### **New nursery rule `useReactCompiler` for React Compiler lint mode** (0a0fbc1)
Biome now ships a nursery lint rule that reports diagnostics from React Compiler lint mode. The change also wires the rule into configuration, docs, generated rule metadata, and test coverage, making it available for users to opt into immediately.

### **Improve `noMisusedPromises` inference performance** (bd0b68d)
This optimizes type inference for async class methods that call other methods through `this`, reducing the work needed to analyze those promise flows. That matters for large TypeScript codebases where this rule can otherwise become expensive.

### **Fix `noUselessFragments` unsafe autofix panic on JSX attributes** (4a0bc5c)
Biome no longer panics when the unsafe fix removes a fragment used as a JSX attribute value. The fix preserves the shape of the attribute expression, preventing a crash during `check --write --unsafe`.

### Other misc changes
- CI updates for Windows long paths and build reliability (3 commits)
- Codspeed benchmark crate version bumps (1 commit)
