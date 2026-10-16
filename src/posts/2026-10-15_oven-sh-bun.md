---
date: 2026-10-15
repo: oven-sh/bun
size: L
title: "Bun lint rules and runtime safety tightened"
excerpt: "Lint config got plugin wildcards and framework-aware categories, while runtime fixes closed several abort, leak, and strict-mode gaps."
commits: 15
authors: [dylan-conway, Jarred-Sumner]
commit_authors: {"1952168": dylan-conway, "3477947": dylan-conway, "116dd64": Jarred-Sumner, "a407eae": dylan-conway, "5f5799e": dylan-conway, "ff760ae": dylan-conway, "392cf21": dylan-conway, "1dc3415": dylan-conway, "d4be9e3": dylan-conway, "dbe1a63": dylan-conway, "219baa0": dylan-conway}
---

### **Lint config now supports plugin-wide off switches and framework-aware categories** (116dd64)
`bun lint` now only enables React, Next.js, Jest, and Vitest categories when those packages are actually declared in `package.json`, which avoids turning on irrelevant rules in unrelated projects. It also adds a `plugin/* = "off"` wildcard to disable an entire plugin at once, with docs and completions updated to explain the new behavior.

### **`--disallow-code-generation-from-strings=strict` now enforces a clear static-code boundary** (5f5799e)
Strict mode is now defined in one place in the engine and documented as applying only to static code, including compiled executables. The change tightens several escape hatches—covering plugins, macros, `Bun.serve({ app })`, and disk-loaded code—so the flag is harder to bypass accidentally.

### **`bun check` speeds up directory listing on Windows** (3477947)
The checker no longer pays for a system call on every link when a directory listing already reveals whether a symlink points to a directory. That cuts Windows load time for some projects, especially ones with isolated installs and lots of links.

### **`TextEncoder.encode` now handles substrings whose parent width changes** (219baa0)
Encoding a slice or substring now rounds through the correct string width even if the parent string has been interned into a different representation. This fixes incorrect output bytes for some substring cases and aligns Bun with expected JavaScript behavior.

### **Long radix literals now round like JavaScript expects** (d4be9e3)
Hex, octal, and binary integer literals are now accumulated with explicit rounding to the nearest double instead of compounding floating-point error digit by digit. That fixes misparsed huge literals in the transpiler and JSONC paths.

### **`util.inspect` no longer trusts mutable `node:util/types` guards** (1dc3415)
Bun now captures the iterator guards it needs from `node:util/types` instead of reading them from the public mutable object later. That closes a footgun where user code could replace those guards and affect inspection internals.

### **`diagnostics_channel` no longer aborts on poisoned subscriber arrays** (a407eae)
Subscriber management now copies the backing array before mutating it and avoids pushing into user-controlled objects directly. That prevents release-mode aborts when `_subscribers` is replaced with a non-array value and keeps behavior closer to Node.

### **`Bun.ModuleGraph.dispose()` now releases more graph-owned resources** (392cf21)
A graph disposal no longer leaks when a `node:http`/`node:https` server is still open or when a `Bun.serve().stop()` promise is still pending and can reach user callbacks. The fix removes a promise-handling race that kept graph-owned modules alive after disposal.

### **`Bun.ModuleGraph.dispose()` now closes graph-owned terminals** (1952168)
Terminals opened by code running inside a module graph are now tied to that graph’s lifetime and are closed during disposal. That fixes a file-descriptor leak that also prevented the graph’s JS state from being collected.

### **Windows worker env inheritance now matches array semantics** (dbe1a63)
Array methods like `join`, `slice`, and `concat` now see inherited indexed keys from a `SHARE_ENV` `process.env` prototype the same way direct indexing does. This brings Bun in line with Node for worker-thread environment inheritance.

### **CI image generation now pins downloads by checksum** (ff760ae)
The CI image spec now records SHA-256s for downloaded inputs and documents which dependencies are truly pinned versus intentionally floating. This makes machine-image changes more auditable and reduces surprise drift in the build environment.

### Other misc changes
- WebKit bumped and tied to new Linux prebuilts/coverage variants.
- `bun fmt`/`bun lint` comment-model follow-ups and docs updates.
- Windows debug panic fix for missing `package.json` in `check`/`lint`/`fmt`.
- cgroup v2 limit detection fixes in WebKit.
- Misc docs, completion, and test updates.
