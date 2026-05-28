---
date: 2026-04-15
repo: nodejs/node
size: L
title: "Node 24.15.0 lands with new flags"
excerpt: "Node.js 24.15.0 ships, adding CLI, crypto, and fs features, plus a permission-model clarification and a libffi build fix."
commits: 3
authors: [nodejs-github-bot, cybe4sent1nel, ShogunPanda]
commit_authors: {"0dceddd": nodejs-github-bot, "95dee4f": cybe4sent1nel, "3f52482": ShogunPanda}
---

### **Node.js 24.15.0 LTS release** (0dceddd)
This release cut 24.15.0 "Krypton" and pulls in several semver-minor additions: new CLI flags like `--max-heap-size` and `--require-module`/`--no-require-module`, raw key format support in `KeyObject`, and `throwIfNoEntry` for `fs.stat`/`fs.promises.stat`. It also updates the release documentation across the tree, so this is a meaningful feature drop for the LTS line.

### **Permission model docs now spell out `process._debugProcess()` behavior** (95dee4f)
The permission docs now explicitly note that `process._debugProcess(pid)` is not blocked by the `kInspector` scope and can be used to trigger Inspector activation in another Node.js process on the same host. That clarification matters for anyone using `--permission` as a sandboxing boundary.

### **Fix libffi dependency compilation** (3f52482)
The build for bundled libffi was adjusted to use shared intermediate output paths and proper dependency ordering. This should unblock or stabilize native builds on affected platforms without changing runtime behavior.

### Other misc changes
- Release documentation and changelog updates for v24.15.0
- Misc API docs version bumps and deprecation note updates
