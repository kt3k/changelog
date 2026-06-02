---
date: 2026-06-01
repo: denoland/deno
size: L
title: "Deno hardens LSP, compile, and Node compat"
excerpt: "Big day for Deno: LSP crash fixes, compile bundling improvements, Node compat upgrades, plus a pure-JS Jupyter kernel rewrite."
commits: 45
authors: [divybot, bartlomieju, nathanwhitbot, crowlbot, fibibot, lunadogbot, CertainLach, goingforstudying-ctrl]
commit_authors: {"2329258": bartlomieju, "4218623": divybot, "f9d0128": divybot, "351d8fb": nathanwhitbot, "61f96bf": bartlomieju, "be62645": divybot, "453eaf6": divybot, "5185f18": divybot, "708106f": divybot, "19da4cb": divybot, "19e4288": divybot, "0525668": divybot, "472d006": divybot, "d98660c": divybot, "c193664": divybot, "81cdb68": fibibot, "b46f9dd": lunadogbot, "7ab8ca9": bartlomieju, "3b2cbfe": crowlbot, "152d722": bartlomieju, "04dc1ec": bartlomieju, "cd67180": nathanwhitbot, "9c1a256": nathanwhitbot, "81b0b58": divybot, "a65194c": divybot, "7b230ea": divybot, "95209b3": divybot, "49a1c40": divybot, "697bdb1": divybot}
---

### **Rewrite Jupyter kernel in JS and drop ZMQ deps** (b46f9dd)
Deno replaces the Rust-based Jupyter kernel stack with a pure-JS implementation on top of `Deno.listen()`, removing `zeromq`, `runtimelib`, and `jupyter-protocol` from the production dependency graph. That’s a major architecture shift that simplifies maintenance and trims native dependency surface while preserving kernel functionality.

### **`deno compile --bundle` now handles workers and npm reachability correctly** (2329258, 61f96bf, 152d722, 61f96bf)
`deno compile --bundle` now bundles worker entrypoints separately, rewrites the generated bundle’s absolute CJS paths to runtime-relative ones, and only embeds the npm packages actually reached instead of shipping the entire tree. This also keeps native addons working in bundled binaries and avoids the previous “bundle works on disk but fails in the compiled VFS” class of bugs.

### **LSP becomes more resilient and completion quality improves** (f9d0128, 5185f18, 708106f, 19e4288, 4218623, c193664, 7b230ea, 0525668, be62645)
The language server now survives parser panics in malformed files, surfaces uncaught test-module errors, and fixes several completion/import cases: empty import clauses, duplicate completion imports, dotted string-union literals, bundler-mode npm directory imports, duplicate test names, and same-directory import-map aliases. These are the kinds of fixes that directly improve editor stability and correctness for real projects.

### **Node compatibility gets a cluster of important fixes** (453eaf6, 7ab8ca9, 472d006, 95209b3, 49a1c40, 697bdb1, a65194c, cd67180, 351d8fb, 9c1a256, 81b0b58, 19da4cb)
Node-facing behavior tightened up across `require()` classification, `node:http` server binding overrides, child-process IPC, Buffer decoding, non-UTF-8 directory entries, BroadcastChannel delivery ordering, `node:v8` flag handling, empty HTTP response framing, JSON import diagnostics, and native-addon error hints. Several of these are compatibility fixes for ecosystem edge cases that would otherwise break real packages.

### **Fetch `Request` now implements missing standard properties** (d98660c)
`Request` gained the missing Fetch-standard fields like `cache`, `credentials`, `integrity`, `keepalive`, `mode`, `referrer`, and `referrerPolicy`, plus the corresponding init handling and validation. This closes a spec gap that previously made these properties read as `undefined` and diverge from browser behavior.

### **`deno remove` cleans up `node_modules` properly** (81cdb68)
The npm installer cleanup path now reconciles managed `node_modules` directories even when the resulting resolution is empty, including scoped packages and hoisted layouts. That fixes leftover dependency junk after removing the last npm package.

### **`deno task` gains `--env-file`** (04dc1ec)
Task execution now accepts `--env-file` directly, so dotenv-driven task workflows no longer need to thread the flag through each nested command. It’s a small but useful ergonomics win for task authors.

### **ImageData is ported to Rust with CPPGC/objectwrap** (3b2cbfe)
`ImageData` moved from a JS IIFE into a Rust-backed object implementation. That’s a significant internal refactor that aligns it with other Web platform objects and should improve consistency going forward.

### Other misc changes
- Dependency bumps: `deno_task_shell` to 0.33.0, `tar` to 0.4.46, `notify` refresh, assorted lockfile updates.
- Small refactors and cleanup in LSP, CLI, and runtime internals.
- Test and CI-only adjustments, plus deflake work for watcher tests and minor regression coverage additions.
