---
date: 2026-04-16
repo: nodejs/node
size: M
title: "Node tightens web APIs and AIX builds"
excerpt: "SharedArrayBuffer is now rejected in Web APIs, Undici bumps to 8.1.0, and several AIX build fixes land."
commits: 10
authors: [abmusse, aduh95, thisalihassan, nodejs-github-bot, marco-ippolito]
commit_authors: {"bee1087": thisalihassan, "6909ea6": aduh95, "db9da5d": abmusse, "263ebf0": abmusse, "142b593": abmusse, "aba7a48": abmusse, "48a442b": abmusse, "730fa6a": aduh95, "d7ab027": nodejs-github-bot, "2071c44": marco-ippolito}
---

### **Web APIs now reject SharedArrayBuffer inputs** (bee1087)
Node’s WebIDL converters were updated to follow spec by disallowing SharedArrayBuffer-backed inputs in Web APIs. The change adds dedicated rejection coverage across crypto and web streams, preventing unsupported buffer sources from slipping through.

### **Undici updated to 8.1.0 with WebSocket and handler changes** (d7ab027)
Node vendors Undici 8.1.0, bringing new WebSocket client configuration, updated dispatcher/interceptor behavior, and a migration guide for v7-to-v8 upgrades. This is a meaningful dependency bump because it includes API and default-behavior changes that application authors may need to account for.

### **Empty `--experimental-config-file` is now supported** (2071c44)
The config-file flag now accepts either an explicit path or no argument, defaulting to `node.config.json` in the working directory. Related CLI docs, option parsing, watch mode, and tests were updated to reflect the new invocation forms and alias behavior.

### **AIX toolchain and export handling improved** (db9da5d, 263ebf0, 48a442b, 142b593, aba7a48)
Several coordinated AIX fixes landed across Node and bundled V8/OpenSSL: export-file generation now detects weak symbols and filters hidden ones, compiler flags are made clang-aware, and V8 gets AIX-specific build/runtime adjustments. OpenSSL also drops `sendmmsg`/`recvmmsg` on AIX to force a safer fallback path.

### Other misc changes
- Temporal disable flag passed through `shell.nix` (6909ea6)
- Fix cargo check when Temporal is disabled (730fa6a)
