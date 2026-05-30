---
date: 2026-03-10
repo: oven-sh/bun
size: M
title: "Signal handling fix and PR issue bot"
excerpt: "Bun fixed a signal-listener bug, reverted a Windows exit workaround, and added an automated GitHub Action to suggest related issues on PRs."
commits: 9
authors: [Jarred-Sumner, robobun, dylan-conway]
commit_authors: {"120f06e": robobun, "f1a040d": dylan-conway, "0502608": robobun}
---

### **Fix signal listener removal so remaining handlers keep working** (94292f2)
Removing one `process.on("SIG...")` listener no longer tears down the underlying OS signal handler if other listeners for that signal still exist. The new regression test covers both the broken case and the correct uninstall/reinstall behavior when the last listener is removed.

### **Add an automated GitHub Action to find issues a PR may fix** (120f06e)
Bun added a Claude-powered workflow that runs when PRs open and comments with likely related open issues. It uses a new `/find-issues` command to inspect the PR diff, run multiple GitHub searches, filter false positives, and post up to five matches back on the PR.

### **Revert the Windows exit-path workaround** (f1a040d)
This reverts the earlier `TerminateProcess`-based Windows shutdown path and goes back to `ExitProcess`. It changes process teardown behavior on Windows, so it's the kind of change that can affect native addon cleanup and exit-time stability.

### **Fix off-by-one stripping of `file://` paths in watcher code** (0502608)
Path handling for watcher inputs now strips the full `file://` prefix correctly instead of leaving an extra slash behind. That makes file URL inputs more reliable in both stat and FS watcher paths.

### Other misc changes
- Operator precedence / memory allocation fix in native-readable stream code
- Removed an unnecessary `getcwd()` call in watcher path resolution
- AST ban-words test-related fix
- HTTP test snapshot/update fix
- Docs punctuation tweak in README
- Dynamic import/require specifier error-handling refactor in parser/visitor code
