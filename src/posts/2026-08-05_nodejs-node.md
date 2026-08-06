---
date: 2026-08-05
repo: nodejs/node
size: L
title: "FIPS fixes and API additions land"
excerpt: "Node.js adds non-throwing MIME parsing, broadens SQLite/Buffer inputs, and fixes FIPS startup and crypto behavior."
commits: 22
authors: [panva, aduh95, jasnell, Archkon, Renegade334, mike-git374, hyemimi, dario-piotrowicz, nodejs-github-bot, RafaelGSS, kyungrae2002, mcollina, umuoy1]
commit_authors: {"62acd48": mike-git374, "6b8a454": panva, "dc7838c": panva, "b79dcdf": panva, "9e59c1a": jasnell, "3e6cca0": RafaelGSS, "b33cc0e": mcollina, "6bab948": Archkon}
---

### **New non-throwing MIME parsing API** (9e59c1a)
`MIMEType.parse()` now returns `null` for invalid input instead of throwing, and internal callers in data URL handling and inspector network sniffing switch to the safer path. This makes MIME parsing easier to use in optional/heuristic flows and avoids exception-driven control flow.

### **Buffer validation now treats detached inputs as empty** (6bab948)
`buffer.isAscii()` and `buffer.isUtf8()` no longer throw on detached `ArrayBuffer`s or views backed by them; they now return `true` for zero-length-equivalent inputs. That aligns detached buffers with other empty inputs and removes a surprising runtime error from common validation helpers.

### **SQLite bindings accept ArrayBuffer and SharedArrayBuffer** (62acd48)
`node:sqlite` now binds raw `ArrayBuffer` and `SharedArrayBuffer` values, not just typed-array views, both for positional and named parameters. The new tests cover inserts and queries with those buffer types, expanding the public API surface in a useful way.

### **FIPS startup failures now explain what went wrong** (b79dcdf)
Node now reports a concrete reason when `--enable-fips` or `--force-fips` fails instead of falling back to a blank OpenSSL error dump. On OpenSSL 3, it explicitly detects the missing `fips` provider and returns a clearer startup error.

### **FIPS mode disablement stops being treated as a failure** (6b8a454)
Disabling FIPS via OpenSSL 3 is now handled correctly, fixing a regression where a successful disable could be misread as an error. The change also adds regression coverage for the enable/disable sequence.

### **DNS `resolveAny()` handles large TTL reply buffers** (3e6cca0)
The c-ares wrapper now sizes TTL storage dynamically instead of relying on a fixed 256-entry stack buffer, preventing overflow/under-allocation for large `ANY` responses. This closes a security issue, CVE-2026-58042, and comes with a focused regression test.

### **URL setters avoid crashing on unparsable serialized URLs** (b33cc0e)
Updating URL properties now fails gracefully when reparsing the serialized URL would be invalid, rather than asserting and crashing Node. This fixes a sharp edge in WHATWG URL setters when the current `href` cannot round-trip through the parser.

### **OpenSSL FIPS build and test infrastructure added** (dc7838c)
The build/test tooling gains a dedicated OpenSSL FIPS Nix package and matrix entry for CI coverage. This supports validating the new FIPS behavior end-to-end.

### Other misc changes
- OpenSSL/FIPS build and config fixes: `node.gyp`, `configure.py`
- Crypto internals cleanup and string reuse refactor
- Docs updates for FIPS, `node.1`, stream defaults, buffer behavior, and `pbkd2Sync`
- WPT/WebCrypto fixture refresh
- Root CA bundle and sccache version bumps
