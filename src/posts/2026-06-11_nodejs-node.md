---
date: 2026-06-11
repo: nodejs/node
size: L
title: "OpenSSL 3.5.7 lands; VM sandbox fix"
excerpt: "Node updates OpenSSL to 3.5.7 with security fixes and corrects vm proxy sandbox property queries; SEA Linux arm debug flakes are marked."
commits: 4
authors: [nodejs-github-bot, trivikr, brianathere]
commit_authors: {"141a504": trivikr, "0b07f2c": brianathere, "da00166": nodejs-github-bot, "0a58d44": nodejs-github-bot}
---

### **OpenSSL upgraded to 3.5.7 with security fixes** (0a58d44)
Node bumps vendored OpenSSL to 3.5.7, pulling in a broad set of upstream fixes including multiple security advisories. The release notes in-tree call out a high-severity PKCS7 use-after-free plus several moderate and low-severity issues, so this is a meaningful security maintenance update.

### **vm proxy sandboxes now query own properties correctly** (0b07f2c)
Property queries for Proxy-backed vm sandboxes now use own-property checks and fetch attributes through the corresponding property API, instead of treating inherited properties as a match. This aligns descriptor/membership behavior and fixes the inconsistency covered by the new regression test.

### Other misc changes
- Updated OpenSSL arch config files for 3.5.7 (da00166)
- Marked SEA build/application tests flaky on linux arm debug (141a504)
