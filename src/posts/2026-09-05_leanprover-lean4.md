---
date: 2026-09-05
repo: leanprover/lean4
size: M
title: "Lake gets finer-grain precompile options"
excerpt: "New Lake flags split import precompilation from full library builds, and a bugfix now applies server options inside packages too."
commits: 2
authors: [tydeu]
commit_authors: {"5549307": tydeu, "c155094": tydeu}
---

### **Lake adds `precompileImports` and `precompileLibrary`** (c155094)
Lake now splits `precompileModules` into two finer-grain options: `precompileImports` for all Lean configs and `precompileLibrary` for `lean_lib` targets. This lets projects precompile just a module’s imports, or precompile a library for downstream importers without forcing the library’s own modules to compile their imports during elaboration.

### **`moreServerOptions` now applies to package modules** (5549307)
Fixes a Lake bug where `moreServerOptions` only reached scratch/external modules. Package modules now pick up the server options too, so editor and setup-file behavior is consistent inside a package.

### Other misc changes
- Added Lake schema/config updates and new tests for precompile-link behavior.
- Added regression tests for setup-file server options.
