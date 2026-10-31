---
date: 2026-10-30
repo: oven-sh/bun
size: L
title: "WebKit bump fixes JS engine bugs"
excerpt: "Bun upgrades JavaScriptCore/WebKit to pull in engine fixes for a crash, a bad math result, and a stack trace issue."
commits: 1
authors: [robobun]
commit_authors: {"8971677": robobun}
---

### **Upgrade WebKit to e8f704815e94** (8971677)
Bun bumps its embedded WebKit/JavaScriptCore snapshot, moving `WEBKIT_VERSION` forward to a newer upstream revision. The update is specifically called out as fixing a `RegExp.lastMatch`-related crash, correcting `Math.sumPrecise([-1])`, and fixing an async stack trace duplication bug.

### Other misc changes
- Updated the WebKit version constant in the build script.
- Refreshed numerous AOT engine test IR snapshots to match the new engine output.
