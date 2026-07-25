---
date: 2026-07-24
repo: vitejs/vite
size: M
title: "Bundled dev gets safer, clearer, and more test coverage"
excerpt: "Vite adds bundled-dev test mode, fixes HMR restart staleness, and improves server URL resolution plus docs and debug guidance."
commits: 7
authors: [btea, h-a-n-a, franckchen, sapphi-red, shulaoda, dogledogle]
commit_authors: {"3ac77d9": btea, "2ad9ec2": h-a-n-a, "23daf0a": btea, "b1186c3": franckchen, "95a3cda": sapphi-red, "41c4658": shulaoda}
---

### **Resolve interface names for explicit host URLs** (3ac77d9)
When Vite prints network URLs for an explicit host IP, it now tries to match that IP against the machine’s network interfaces and include the interface name. This makes the dev server output more informative, especially when sharing or diagnosing which adapter is being used.

### **Preserve HMR correctness across server restarts** (b1186c3)
`handleHMRUpdate` now snapshots the server environments and aborts the transaction if the server restarts mid-update, preventing stale hot-update work from being applied after a restart. This closes a subtle race in HMR, including custom environment handlers, where updates could continue against invalidated state.

### **Allow config inputs under the dev server filesystem guard** (95a3cda)
Vite now adds configured entry inputs — including the default `index.html` — to `server.fs.allow` during config resolution. That removes an easy-to-hit dev-server access issue when the app entry lives outside the previously allowed paths.

### **Add bundled-dev test mode and wire it into CI** (2ad9ec2)
A new `test-serve-bundled` mode runs the e2e suite with `experimental.bundledDev` force-enabled, and CI now exercises it directly. Several playground tests were updated to skip unsupported bundled-dev cases, which tightens coverage for the new server mode while keeping the suite green.

### **Report bundled-dev HMR build failures to the terminal** (41c4658)
When an HMR update fails in bundled dev, Vite now logs the build error to the server terminal instead of only surfacing it in the browser overlay. That should make debugging failed hot updates much faster.

### **Refresh config debugging docs for VS Code** (23daf0a)
The config debugging guide was rewritten to recommend `--configLoader native` for the best breakpoint and source-map experience, and it now explains how to configure the bundled loader in VS Code when needed. The update clarifies the tradeoffs between loaders and how to make debugging work in both the debug terminal and launch configs.

### Other misc changes
- Docs typo/punctuation cleanup (1 commit)
- Minor test adjustments across playgrounds for bundled-dev mode
