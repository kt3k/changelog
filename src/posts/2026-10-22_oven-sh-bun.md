---
date: 2026-10-22
repo: oven-sh/bun
size: L
title: "Bun ships parser, install, and runtime fixes"
excerpt: "HTTP compatibility, install correctness, bunx behavior, QUIC/http3, and several Bun regressions were fixed across the stack."
commits: 25
authors: [robobun, dylan-conway, Jarred-Sumner]
commit_authors: {"38afee6": Jarred-Sumner, "da9179d": robobun, "017316d": Jarred-Sumner, "9c2dd6b": robobun, "7a74841": Jarred-Sumner, "17ae534": dylan-conway, "d99c201": robobun, "c6dd13d": robobun, "b1d4686": Jarred-Sumner, "2a5cbbc": Jarred-Sumner, "9bd124c": robobun, "dac8cca": robobun, "4a9c341": dylan-conway, "0de6da2": dylan-conway, "54152a4": robobun}
---

**Bun now rejects malformed Node HTTP requests more like Node** (38afee6)
`node:http` and `node:http2` now refuse request targets and header bytes that Node rejects, returning the expected parser errors instead of running handlers with looser parsing. This tightens compatibility and closes a class of request-smuggling-style edge cases in Node-compat server paths.

**HTTP/3 gets larger header support and better GOAWAY handling** (7a74841)
Bun lifted lsquic-imposed limits so larger HTTP/3 header blocks can be sent and decoded, and it now honors GOAWAY stream IDs correctly. That matters for real-world HTTP/3 interoperability, especially with larger headers and connection shutdown behavior.

**`bunx` now runs the platform binary, not a native stub** (017316d)
For native dependencies, `bunx` now resolves and executes the platform-specific binary that install linked into `node_modules/.bin`, instead of falling back to an executable stub shipped in the package tarball. This fixes tools like esbuild behaving incorrectly under `bunx`.

**Install/update regressions were fixed around lockfiles, overrides, and package.json caching** (c6dd13d, dac8cca, da9179d, 2a5cbbc)
`bun add`/`bun update` now apply overrides consistently to rewritten ranges, `bun update --interactive` re-parses cached `package.json` after rewriting it, and isolated installs only fall back to copying when the hard link itself fails. The lockfile/frozen-install behavior for override mismatches was also corrected, reducing CI breakage on upgrade.

**`bun check` and the React compiler got correctness fixes** (b1d4686, 9c2dd6b)
Type checking now handles a few long-standing edge cases more accurately, including repeated TS2589 reporting and some property/index inference bugs. The React compiler fix addresses stale values and repeated throws for `let` bindings reassigned inside memo blocks.

**Runtime regressions in fetch, Redis, ws, streams, and http were fixed** (4a9c341, d99c201, 54152a4, 9bd124c, 0de6da2)
These changes restore lost behaviors around TLS reconnects, AsyncLocalStorage propagation in `ws`, direct-stream error handling, request-body draining after early HTTP responses, and isolated test macro evaluation. Together they chip away at several user-visible 1.4.3 regressions.

**`Bun.stringWidth` is linear again on certain multi-line non-ASCII text** (17ae534)
The width calculation no longer devolves into quadratic scans on text with many control characters, which is a major performance win for large CJK or multi-line inputs.

### Other misc changes
- Release CI and packaging fixes (Homebrew/Docker/Windows signing)
- `bun lint` gating for canary vs release builds
- `bun pack` negation parsing fix for `!(...)`
- `structuredClone` CryptoKey validation hardening
- `fetch`/`RedisClient` TLS session recovery tweak
- `bun test --isolate` macro regression fix
- `bun build --compile` startup-check rollback
- `ws` async context and syscall fault-test updates
- `bun install`/`bun pm` docs and minor internal refactors
