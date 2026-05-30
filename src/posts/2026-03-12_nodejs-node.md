---
date: 2026-03-12
repo: nodejs/node
size: M
title: "REPL error handling grows customizable"
excerpt: "REPL gains a user-defined error handler; WebCrypto WPTs and typed-array typings were also refreshed, plus an IBMi build skip."
commits: 4
authors: [sravani1510, addaleax, nodejs-github-bot, Renegade334]
commit_authors: {"66a687f": sravani1510, "5e3951e": addaleax, "f33e715": nodejs-github-bot, "5e41755": Renegade334}
---

### **REPL gets customizable error handling** (5e3951e)
Node’s REPL now accepts a `handleError` option so embedders can decide whether thrown exceptions are printed, ignored, or treated as unhandled. That gives REPL creators control over edge cases like errors raised after the REPL has already closed, and the new tests cover the return-value contract.

### **WebCrypto WPT fixtures updated for upstream changes** (f33e715)
The bundled WebCryptoAPI Web Platform Tests were advanced to upstream revision `6a1c545d77`, with many digest, encrypt/decrypt, sign/verify, and wrap/unwrap cases adjusted. This helps keep Node’s WebCrypto behavior aligned with the current test suite and catches regressions in subtle buffer-handling scenarios.

### **TypedArray TypeScript typings were rationalized** (5e41755)
The primordials and globals typings were refactored to model typed-array constructors more directly and tighten helper return types. This improves type accuracy for internal consumers and reduces duplication in the typed-array declarations.

### Other misc changes
- Build: skip doc generation on IBMi to avoid the hanging minification step (66a687f)
