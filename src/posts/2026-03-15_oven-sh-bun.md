---
date: 2026-03-15
repo: oven-sh/bun
size: M
title: "Bun adds path ignores and fixes scanner IPC"
excerpt: "Test discovery can now skip whole trees, and security scanning moves package data over IPC to avoid arg-length limits."
commits: 3
authors: [alii, robobun]
commit_authors: {"d50ab98": alii, "7e517b1": alii, "7a2ce3a": robobun}
---

### **Test discovery gets `--path-ignore-patterns`** (7a2ce3a)
Bun test can now exclude files and directories from discovery via CLI or `bunfig.toml`, with directory pruning during scanning so ignored trees are never traversed. That makes it practical to keep vendored code, submodules, and fixture directories out of `bun test` without paying the cost of scanning them.

### **Security scanner stops passing package JSON as an arg** (7e517b1)
The install security scanner now reads the package list over an IPC pipe instead of relying on a huge injected argument, avoiding max-arg failures on large inputs. The change also adds coverage for >=1 MB JSON payloads and updates the scanner process plumbing to support the new two-pipe exchange.

### **Path-ignore scanner buffer is trimmed** (d50ab98)
The test scanner shrinks a stack buffer from a worst-case path-sized allocation to 4 KB and builds `rel_path + '/'` once outside the pattern loop. This reduces stack usage in path matching and removes a bit of repeated work in a hot discovery path.

### Other misc changes
- Docs updated for `test.pathIgnorePatterns` and `--path-ignore-patterns`
- Bunfig parsing wired for array/string config values
- Type declarations and tests updated for the new security scanner IPC flow
