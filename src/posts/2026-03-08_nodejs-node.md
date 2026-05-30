---
date: 2026-03-08
repo: nodejs/node
size: M
title: "URL deprecations and docs get cleaned up"
excerpt: "Node silences URL warnings inside node_modules, clarifies a util API doc, and updates CI/Nix pins."
commits: 5
authors: [Renegade334, nodejs-github-bot]
commit_authors: {"724ef8e": Renegade334, "84ae06e": Renegade334}
---

### **Suppress `url.parse()` warnings inside `node_modules`** (724ef8e)
Node now checks a deeper stack frame before emitting the deprecation warning, so application code still gets warned while code running from dependencies is spared. The new test coverage locks in both behaviors and removes the old expectation from the invalid-input test.

### **Clarify `util.convertProcessSignalToExitCode()` docs** (84ae06e)
The util docs now describe the argument as `signal`, state that invalid signal names throw, and remove the old `null` return examples. This aligns the documentation with the actual validation behavior and makes the API contract clearer.

### Other misc changes
- Bumped the Nixpkgs pin and adjusted the Nix shell/shared OpenSSL setup.
- Updated GitHub Actions artifact actions to newer major versions in several workflows.
