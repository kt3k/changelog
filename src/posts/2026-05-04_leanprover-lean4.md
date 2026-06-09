---
date: 2026-05-04
repo: leanprover/lean4
size: M
title: "Lean4 renames clamped ints and reshapes exports"
excerpt: "UInt8 gets a clearer clamp API, scoped env exports are overhauled, and release tooling/CI are updated alongside benchmark script moves."
commits: 5
authors: [Garmelon, Kha, TwoFX]
commit_authors: {"c8191c5": Kha, "ba502f7": TwoFX}
---

### **Clamp-style integer constructors renamed** (ba502f7)
`UInt8.ofNatTruncate` is renamed to `UInt8.ofNatClamp`, matching the newer naming used elsewhere in the library. The old name remains as a deprecated wrapper, so existing code keeps working while users get a clearer API and a consistent migration path.

### **Scoped environment export handling was generalized** (c8191c5)
`ScopedEnvExtension.exportEntry?` now works with the new `OLeanEntries` export format, and the built-in simp/cbv/grind/instance extensions were updated to use it. This is an internal refactor, but it unblocks more precise export behavior for private vs. public declarations and keeps these extensions aligned with the new persistence API.

### Other misc changes
- Release tooling and documentation overhaul, including a large rewrite of the release scripts
- CI workflow updated to use a self-hosted runner when available, with fallback handling
- Radar benchmark helper scripts moved into this repo for more control over benchmark execution
