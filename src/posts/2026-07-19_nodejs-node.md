---
date: 2026-07-19
repo: nodejs/node
size: M
title: "Node help gets styled; ALS leak fixed"
excerpt: "Help output is now colorized when appropriate, timers stop retaining async stores, and WebCrypto adds a KT customization limit."
commits: 4
authors: [bitpshr, edsadr, mcollina, panva]
commit_authors: {"c286592": bitpshr, "0bcc6ef": edsadr, "d25cde4": mcollina, "d90d9d5": panva}
---

### **Style `node --help` output with colors and emphasis** (0bcc6ef)
`node --help` now uses `util.styleText` to highlight headings, option names, environment variables, and the docs URL when the output stream supports color. This makes the built-in help easier to scan without changing plain-text output for redirected pipes or `NO_COLOR`.

### **Stop timers from retaining AsyncLocalStorage state** (d25cde4)
Timers are now cleaned up after firing so they no longer hold on to an async store reference. That fixes a memory-retention issue in AsyncLocalStorage and is backed by a regression test for store leakage.

### **Limit KangarooTwelve customization strings to 512 bytes** (d90d9d5)
WebCrypto now enforces a 512-byte maximum for `KangarooTwelveParams.customization`, matching the intended OpenSSL limit. Requests over the limit fail with a clear `OperationError`, and the docs and tests were updated accordingly.

### Other misc changes
- Docs: note that `--env-file` does not apply to commands run via `--run` (c286592)
