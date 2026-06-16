---
date: 2026-06-15
repo: denoland/deno
size: L
title: "WebCrypto lands, npm fixes, and safer internals"
excerpt: "Deno adds major crypto support and task env parity, while fixing npm, Node, FS, and __proto__ edge cases."
commits: 18
authors: [bartlomieju, nathanwhit, nathanwhitbot, whyang9701, divybot]
commit_authors: {"2420701": bartlomieju, "1340dc5": nathanwhitbot, "e602dfe": bartlomieju, "1e5125b": bartlomieju, "cffc8d7": bartlomieju, "2fd0493": whyang9701, "9fb684d": divybot, "98351ae": bartlomieju}
---

### **WebCrypto adds modern algorithms** (9fb684d)
Deno now supports a broad set of modern WebCrypto algorithms, including KMAC128/KMAC256, Argon2 deriveBits/import, KangarooTwelve digests, and all SLH-DSA parameter sets. This is a substantial standards bump that widens compatibility with newer crypto-heavy applications and test suites.

### **package.json scripts now get npm lifecycle env vars** (1340dc5)
Running `deno task` or `deno run <script>` from `package.json` now sets the npm lifecycle variables npm users expect, including `npm_package_*`, `npm_package_json`, `npm_lifecycle_event`, and `npm_lifecycle_script`. That closes a compatibility gap for scripts and tooling that depend on npm’s environment contract.

### **Linked packages resolve by bare specifier again** (98351ae)
Packages declared via `links` in `deno.json` are resolvable by bare specifier again, restoring the private-package workflow that broke after the earlier resolver change. This removes a major ergonomics regression for local and private package development.

### **Peer dependency warnings now name importers** (2420701)
Deno’s npm peer dependency warning is now much more actionable: it identifies which of your imports pulled in the offending package and points toward the fix. The diagnostics are gathered during resolution and rendered after the graph is built, improving both clarity and troubleshooting.

### **AsyncLocalStorage context is preserved in node:net callbacks** (e602dfe)
Node’s `AsyncLocalStorage` context now survives `node:net` callbacks correctly. This fixes a compatibility bug that could break async context propagation in Node-ecosystem code.

### **Deno.watchFs gains an `ignore` option** (2fd0493)
`Deno.watchFs` now supports an `ignore` option, giving callers a built-in way to suppress unwanted file events. That makes filesystem watching more practical for real projects without extra filtering logic.

### **Prototype-access escape hatch gets a stable flag and better guidance** (1e5125b, cffc8d7)
Deno adds a stable `--unsafe-proto` flag and improves the runtime suggestion when code touches `Object.prototype.__proto__`. Together, these changes make the prototype-pollution escape hatch easier to discover while preserving the default hardening.

### **Misc fixes for Node, fs, fetch, NPM, and snapshotting**
A wide set of smaller fixes landed too: safer `truncate` symlink handling, correct Node binding signatures for zlib, preserved `isInternalThread`, better `registerHooks` behavior, Unix proxy permission checks, npm re-resolution avoidance under `--cached-only`, a microtask-policy fix in N-API, a DNS permission-token leak fix, and snapshot-source minification support. These improve compatibility, security, and build/runtime behavior across the stack.

### Other misc changes
- CI/build updates for snapshot minification and Deno setup in workflows (2 commits)
- Dependency bumps and build metadata for new crypto support
- Test-only/spec updates across npm, Node, fs, permissions, and crypto coverage
