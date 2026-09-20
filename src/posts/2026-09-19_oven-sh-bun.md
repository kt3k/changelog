---
date: 2026-09-19
repo: oven-sh/bun
size: L
title: "Bun fixes Node error semantics and stack traces"
excerpt: "Node-compatible error messages and stack formatting were tightened, with a major JSC refactor to make stack traces deterministic."
commits: 2
authors: [robobun, dylan-conway]
commit_authors: {"9b7c982": robobun, "26e7a4b": dylan-conway}
---

### **Fix Node error codes to use the right message text** (9b7c982)
Bun now supplies proper message text for several Node `ERR_*` codes instead of leaking raw argument values or `undefined`. This fixes a set of compatibility issues around HTTP trailers, URL/file-path conversion, stream errors, and similar cases, and updates the relevant type declarations and tests.

### **Make `error.stack` format consistently no matter when it's read** (26e7a4b)
This refactors Bun's JSC stack-trace machinery so a stack string is produced the same way whether it is materialized on first access or preserved through GC. That removes a subtle nondeterminism in `error.stack`, bringing it in line with Node/V8 expectations and making stack output stable across timing differences.

### Other misc changes
- Updated WebKit/JSC dependency version
- Small internal error-message tweaks in fs/http/fs.promises/repl paths
- Test updates and coverage expansions for stack traces and module graph behavior
