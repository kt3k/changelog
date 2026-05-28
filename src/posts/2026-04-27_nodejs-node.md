---
date: 2026-04-27
repo: nodejs/node
size: M
title: "Node process.execve gets real errors"
excerpt: "execve now throws on failure, crypto fixes an RSA parsing bug, and startup snapshots avoid quadratic callback handling."
commits: 10
authors: [legendecas, Trott, deepview-autofix, aduh95, watilde, npm-cli-bot, bengl, MikeMcC399]
commit_authors: {"e6ca1fa": Trott, "27c7f4d": deepview-autofix, "48dce8b": aduh95, "b6b6e96": watilde, "19f9098": npm-cli-bot, "0a9b67e": bengl, "bb85d23": MikeMcC399, "f67cf47": legendecas, "85ae4cd": legendecas}
---

**process.execve now throws instead of aborting on failure** (0a9b67e)
`process.execve()` no longer kills the process when `execve(2)` fails; it now throws an `ErrnoException` with standard error details so JS can catch and recover. The change also stops running native `AtExit` callbacks before the call, since their effects would be discarded on success anyway.

**Crypto fixes 4-byte RSA publicExponent parsing** (27c7f4d)
`bigIntArrayToUnsignedInt()` now forces an unsigned 32-bit result, fixing cases where a 4-byte RSA public exponent with the top bit set was previously interpreted as negative. A regression test covers the bad input shape and confirms normal inputs still parse correctly.

**Startup snapshot callback handling drops quadratic shift()** (b6b6e96)
Deserialize/serialize callback queues now iterate by index and clear the arrays afterward instead of repeatedly calling `shift()`, removing an O(n²) pattern during startup snapshot processing. The commit also adds a benchmark to measure the impact of many registered callbacks.

### Other misc changes
- npm upgraded to 11.13.0 (19f9098)
- Added automation policy to CONTRIBUTING.md (f67cf47)
- Commit-lint workflow adjusted for semver-major proposals (48dce8b)
- GitHub Actions artifact upload dependency bumped to v7.0.1 (27abe9c)
- Removed outdated contextify comments (85ae4cd)
- Fixed documentation typos in test and PR contribution docs (e6ca1fa, bb85d23)
