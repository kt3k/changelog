---
date: 2026-03-09
repo: denoland/deno
size: L
title: "Node compat gets big crypto and fs upgrades"
excerpt: "Major Node compatibility work lands across crypto, DNS, readline, and CPU profiling, plus a few stability fixes."
commits: 20
authors: [bartlomieju, dsherret, littledivy]
commit_authors: {"8a3ed27": bartlomieju, "ddbdb6d": bartlomieju, "d77f623": bartlomieju, "d7e449d": bartlomieju, "e76e5fa": bartlomieju, "881f8c0": bartlomieju, "d0c9173": bartlomieju, "0ee7539": bartlomieju, "d3e9c91": bartlomieju, "6048a0d": bartlomieju, "c123358": bartlomieju, "98ca450": bartlomieju, "e0b1933": bartlomieju, "0596405": bartlomieju, "7cf4753": bartlomieju, "f123d84": bartlomieju, "0d1c07e": dsherret, "22258fb": littledivy, "25f1c99": bartlomieju}
---

### **Node crypto support expands in several directions** (d3e9c91, 7cf4753, 0596405, e0b1933, 881f8c0, ddbdb6d, 98ca450)
Deno’s Node crypto polyfill got a substantial compatibility boost: Diffie-Hellman and ECDH gained missing behaviors like key conversion, hybrid/compressed formats, proper key parsing/export, and bug fixes for public key derivation; HMAC now matches Node by allowing repeated `digest()` calls; RSA-PSS defaults to max salt length when signing; and SHAKE digests now emit the expected deprecation warning when `outputLength` is omitted. KeyObject/CryptoKey interop was also added, along with improved error codes for unsupported PQC key types.

### **`node:dns` compatibility is now much closer to Node** (8a3ed27)
`dns.lookup()` and its promise variant now accept the `order` option and `setDefaultResultOrder()` supports `ipv6first`, matching newer Node behavior. Resolver server reporting also now falls back to system DNS servers instead of returning an empty list when no custom servers are configured.

### **Readline and console behavior are tightened up** (e76e5fa, d77f623)
The readline polyfill gained several user-facing fixes, including proper tab-completion column formatting, more accurate `historySize` validation, and kill-ring/yank support. `console.table()` now keeps object values on one line, preventing wrapped cells from breaking table layout.

### **CPU profiling flags arrive on the CLI** (22258fb)
New `--cpu-prof` options were added for generating CPU profiles, including directory, name, interval, and Markdown output controls. This is a notable runtime feature for performance analysis and debugging.

### **Other misc changes**
- Removed special handling for the deprecated `multipleResolves` process event (d7e449d)
- Improved debuglog bootstrap defaults to avoid an early startup crash (d0c9173)
- WebSocket response header parsing now skips non-ASCII protocol/extension values instead of panicking (0ee7539)
- Telemetry code no longer panics on missing globals/isolates during teardown (f123d84)
- N-API bindings were refactored in-tree and unimplemented symbols were removed from `napi_sys` (c123358, 6048a0d)
- Binaries in `@deno/...` npm packages are now installed as executable (0d1c07e)
- `node:fs` polyfills were further consolidated internally (25f1c99)
