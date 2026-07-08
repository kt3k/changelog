---
date: 2026-07-07
repo: microsoft/typescript-go
size: M
title: "VS Code settings, API speed, and JSX fixes"
excerpt: "Adds a notification toggle, speeds remote node iteration, and fixes namespaced JSX completions/hover while prepping nightly extension output."
commits: 6
authors: [jakebailey, andrewbranch, gabritto]
commit_authors: {"04548ec": andrewbranch, "d41dffe": gabritto}
---

### **Add a setting to suppress failed request notifications** (d41dffe)
The extension now exposes `js/ts.server.showFailedResponses` with `always`, `never`, and `auto` modes. It routes failed language-server requests through a custom `LanguageClient` wrapper so notifications can be disabled, or shown only on VS Code Insiders.

### **Speed up `RemoteNodeList` traversal** (04548ec)
`RemoteNodeList.at()` now memoizes its last resolved position and walks the underlying buffer directly via `next` pointers instead of re-materializing each intermediate node. That turns sequential list passes from quadratic behavior into linear time, which should matter for larger AST-like lists and editor features that iterate them heavily.

### **Fix namespaced JSX intrinsic completions and hover** (9977d6d)
Namespaced intrinsic JSX tags like `<foo:bar>` now get the right completions and quick info for both the tag and its attributes. The change is backed by new fourslash coverage, so this should prevent regressions in JSX IntelliSense for namespace-like intrinsic elements.

### **Other misc changes**
- Prepared stable/nightly extension split and nightly VSIX packaging scaffolding.
- Moved dprint plugins to npm and bumped dprint.
- Updated CodeQL GitHub Action versions.
- Misc test, baseline, and build-script updates.
