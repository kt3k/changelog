---
date: 2026-04-11
repo: denoland/deno
size: L
title: "Deno lands a real Node REPL"
excerpt: "A major Node compatibility addition ships alongside a rusty_v8 upgrade to keep Temporal crates working."
commits: 2
authors: [bartlomieju]
commit_authors: {"e99152e": bartlomieju, "1cffda5": bartlomieju}
---

### **Node REPL polyfill implemented** (1cffda5)
Deno replaces the stub `node:repl` module with a working `REPLServer`, bringing TTY REPL support, eval via `vm.Script`/`vm.createContext`, built-in dot commands, multiline input, editor mode, and proper context/error tracking. This is a substantial Node compatibility win for interactive workflows and closes a long-standing gap in the `node:` layer.

### **rusty_v8 upgraded to 147.1.0** (e99152e)
The V8 binding was bumped to 147.1.0, with the commit message noting fixes for Temporal crate incompatibilities. This is primarily a maintenance/dependency update, but it matters because it unblocks compatibility issues in the runtime’s date/time stack.

### Other misc changes
- Dependency bump in Cargo manifests (rusty_v8 / v8).
- Node compat test config updated for the new REPL module.
