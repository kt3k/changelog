---
date: 2026-11-12
repo: oven-sh/bun
size: L
title: "Bun AOT gets broader reach and cleaner embeds"
excerpt: "AOT compiler work lands major reach-analysis updates, with install/script hardening and a WebKit engine pin to the merged release commit."
commits: 5
authors: [Jarred-Sumner, dylan-conway]
commit_authors: {"8aa496e": dylan-conway, "741769c": Jarred-Sumner, "ccb3611": Jarred-Sumner, "7f964e6": dylan-conway}
---

### **AOT compiler expands what it can see and embed** (741769c)
The ahead-of-time compiler now tracks additional “ruled out” reads and patterns, which tightens when files are considered reachable, embedded, or excluded. That fixes several miscompilations around parameter defaults, file writes, and `eval`, and it updates the compiler docs to reflect the new behavior.

### **AOT compile gains another major round of reach-analysis changes** (ccb3611)
This adds support for more package/file/module cases in `bun build --compile --aot` and `bun test --aot`, including strings evaluated by packages, module instances in test runs, and files/packages that are only discovered indirectly. It’s a broad compiler refactor with new documentation and test coverage, aimed at making AOT output more correct and predictable.

### **Lifecycle scripts, tar extraction, and native bin links get stricter** (7f964e6)
Install-time logic now shares path resolution helpers, reads `package.json` for both lockfile formats, resolves dependency bins more accurately in hoisted installs, and parses tar headers more strictly. The change also hardens lifecycle-script handling and macro/path checks, which matters for correctness and supply-chain safety during installs.

### **WebKit pinned to the merged JavaScriptCore release** (8aa496e)
Bun’s WebKit dependency is pinned to `b553971ea817212ee787c005f8a1003c68307963`, replacing the preview build used previously. That pulls in the merged upstream engine state and stabilizes the JS runtime Bun builds against.

### Other misc changes
- AOT docs and compatibility notes updated further in follow-up work.
- Build metadata and allowlists adjusted for the new engine/compiler state.
- Minor internal cleanup across AOT and install codepaths.
