---
date: 2026-06-02
repo: denoland/deno
size: L
title: "Deno hardens Node, LSP, and compile flows"
excerpt: "A heavy day of fixes and feature work across Windows, LSP autocomplete, native addons, npm install behavior, and compile bundling."
commits: 47
authors: [divybot, bartlomieju, nathanwhitbot, Xavrir, magurotuna, crowlKats, crowlbot]
commit_authors: {"1425761": divybot, "5208330": magurotuna, "5604379": divybot, "7aceb22": bartlomieju, "840a734": bartlomieju, "d95ceb5": nathanwhitbot, "2f912cc": bartlomieju, "214f3d1": bartlomieju, "0bf0c7e": bartlomieju, "9deee55": bartlomieju, "3ac850f": divybot, "34ce847": divybot, "39893c2": divybot, "adba38f": divybot, "6a74fd2": bartlomieju, "cbb34eb": divybot, "5857f18": divybot, "ba7ed1a": divybot, "563aa7b": divybot, "b0cc911": divybot, "5f63bcb": divybot, "e7e1606": divybot, "ec2b4bf": bartlomieju, "9d13e9d": divybot, "ccfe78a": bartlomieju, "c9e800d": divybot, "619742f": bartlomieju, "e086b32": divybot, "20b2881": divybot, "5bb4051": divybot, "815bc76": divybot, "a7e40b0": divybot, "3b0cdf4": divybot, "ce605a1": divybot, "15a4c1a": crowlKats, "93d5bfa": divybot}
---

### **Node HTTP/S proxy support lands behind new flags** (ba7ed1a)
Deno now wires Node's `--use-env-proxy` / `--no-use-env-proxy` into the CLI and sets `NODE_USE_ENV_PROXY` so the Node polyfills can honor `HTTP_PROXY`, `HTTPS_PROXY`, and `NO_PROXY`. The `node:_http_proxy` plumbing adds proxy-aware connection behavior for `node:http` and `node:https`, including CONNECT tunneling and HTTPS proxy handling.

### **React Server Components CVEs get an opt-in patch layer** (9deee55)
This adds load-time source rewriting for affected React Server Components builds, gated by `DENO_PATCH_REACT_CVE`. It targets the reported RCE and DoS cases so users can protect apps that depend on vulnerable `react-server-dom-*` versions without waiting for upstream packages.

### **Compiled binaries now preserve CJS semantics for host files** (15a4c1a)
`deno compile` can now analyze CommonJS files loaded from the host filesystem at runtime instead of assuming they are ESM. That fixes named-import failures in standalone binaries for real-world npm packages whose CJS entrypoints are not embedded in the VFS.

### **LSP memory use drops when idle, and OOMs no longer kill the server** (3ac850f, 5bb4051)
The language server now releases idle TSC memory back to the OS and recovers more gracefully if the type-checker isolate runs out of memory. Together, these changes make long-lived editor sessions substantially more stable.

### **`deno compile --bundle` gets minification and better dependency closure** (6a74fd2, ccfe78a)
Compilation now supports `--minify` for bundled output, reducing embed size and runtime memory at the cost of less readable stack traces. The bundling path also learned to pull in deeper CJS dependencies so compiled bundles miss fewer npm graph edges.

### **N-API and legacy addon support gets a major cleanup** (b0cc911, a7e40b0, 9d13e9d, c9e800d, e7e1606)
Deno expands the exported libuv/N-API surface for addons like ZeroMQ, allows native constructors to call back into JavaScript during construction, and replaces cryptic crashes for legacy V8/nan addons with clear errors and suggestions. Windows addon loading also now surfaces the real failure when a prebuilt binary links against `node.exe`.

### **npm installer behavior is tightened for cache reuse and workspace scripts** (7aceb22, 5f63bcb, 563aa7b)
The installer now handles stale `node_modules` symlinks/junctions on Windows, runs lifecycle scripts with the correct workspace-member `INIT_CWD`, and deduplicates equivalent peer-dependency variants so class identity stays consistent across installs.

### **`deno add` now understands `@latest` JSR tags** (840a734)
Version-tagged JSR requests no longer panic during package selection. The command resolves tags like `@latest` by selecting the latest available version, matching the behavior used elsewhere in the codebase.

### **Web platform and Node runtime fixes round out the day** (0bf0c7e, 214f3d1, 39893c2, 5604379, 5208330, 619742f, e086b32, 2f912cc, 93d5bfa, 5857f18, 563aa7b, adba38f, 3b0cdf4, ce605a1, 1425761, 815bc76, 34ce847, 20b2881, cbb34eb, ec2b4bf, d95ceb5)
A broad set of bug fixes improved `copyFile` self-copy safety, Windows ANSI coloring, `__proto__` error reporting, `process.stdout/stderr` callback handling, fetch body length preservation, DNS error codes, and LSP auto-import/completion behavior. Several internal refactors and test refreshes also landed alongside these user-facing fixes.

### Other misc changes
- WPT submodule upgraded and expectations refreshed.
- Dependency and lockfile updates.
- Docs, test, and regression coverage additions.
- Internal refactors and cleanup across CLI, runtime, and ext crates.
