---
date: 2026-05-27
repo: oven-sh/bun
size: L
title: "Bun hardens SQL decoding and TextDecoder"
excerpt: "Fixes Postgres NUMERIC and MySQL YEAR binary decoding, preserves streaming legacy TextDecoder state, and trims fs.watch startup cost."
commits: 6
---

**Postgres NUMERIC binary decoding now preserves leading zero groups** (4ee835b)
Fixes a bug where sub-1e-8 NUMERIC values lost leading `0000` groups and decoded with digits shifted left. The decoder now mirrors Postgres’ separate counters for base-10000 digits and decimal position, which keeps small values like `1e-9` accurate.

**MySQL binary YEAR is decoded as a 2-byte field** (c89f30d)
Adds explicit `MYSQL_TYPE_YEAR` handling in both binary and text result-set paths so YEAR columns return numbers instead of a raw buffer. This also prevents cursor desynchronization that could corrupt every following column in the row.

**Streaming TextDecoder now preserves legacy codec state** (bb14c4e)
Keeps the WebKit codec alive across `{stream: true}` chunks for legacy multi-byte encodings like Shift_JIS, EUC-JP, GBK, Big5, and ISO-2022-JP. Without this, split characters and escape sequences could decode incorrectly at chunk boundaries.

**fs.watch and watchFile are now lazily loaded** (b668561, db928c2)
Moves watcher machinery out of `node:fs` into internal modules that load on first use, reducing startup work and aligning with Bun’s other lazy fs internals. It also centralizes the native fs binding shared by `node:fs`, `node:fs/promises`, and watcher modules.

### Other misc changes
- Hardening pass across many subsystems: input validation, bounds checks, and safer state handling (13bbb38)
- VS Code diagnostics socket cleanup/refactor
- OpenSSL socket handshake loop-data tweak
- Codegen/internal module registry updates for resolved-source-tag handling
- SQL test coverage added for the new Postgres/MySQL fixes
