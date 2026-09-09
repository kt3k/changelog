---
date: 2026-09-08
repo: denoland/deno
size: L
title: "Deno tightens permissions, cache, and core perf"
excerpt: "Permission parsing, npm security checks, cache keying, and core runtime memory/perf work landed alongside several Node compatibility fixes."
commits: 15
authors: [bartlomieju, nathanwhit, r3wretrhy, pttydou, hugojosefson, cuishuang]
commit_authors: {"336da42": bartlomieju, "2b5912c": r3wretrhy, "a748c29": bartlomieju, "8cc5288": bartlomieju, "a9bb7c9": bartlomieju, "a1a3828": nathanwhit, "ba94f53": nathanwhit, "b8fef0d": pttydou, "4bfbfeb": hugojosefson, "4227a81": bartlomieju, "a660da1": nathanwhit, "11ded15": bartlomieju, "af3d9bc": cuishuang}
---

**Core op tables now live in static memory** (336da42)
The extension macro was reworked so op declaration tables can be borrowed from `const` static storage instead of being rebuilt and owned per runtime. This reduces binary/runtime memory pressure, especially for generic extensions, and the new tests lock in the static-table behavior.

**Module graph retention was trimmed for lower memory use** (4227a81)
The module map and source-map handling were refactored to stop eagerly retaining decoded inline source maps and to cache internal-module state up front instead of reparsing names on each instantiation. That cuts repeated work during module loading and should reduce retained memory in graph-heavy workloads.

**Op context setup was split into shared and borrowed storage** (a748c29)
`OpCtx` was refactored into shared context plus borrowed op declaration storage, changing how ops are collected and initialized across extensions. This is a structural performance/internal memory change that should reduce copying and simplify later runtime work.

**Unix `--allow-net` rules now parse POSIX paths correctly** (2b5912c)
`unix:<path>` permission rules were updated to treat absolute POSIX-style paths as valid on every host, including cross-target compilation scenarios, while still supporting Windows named pipes and rejecting ambiguous relative forms. This fixes a real permission parsing bug for socket-based workflows.

**HTTP cache authorities are now unambiguous** (a660da1)
Cache filenames now escape underscores in hostnames, use a clearer `_port_` separator, and hash authorities that would exceed filesystem component limits. This avoids collisions and makes cached URL-to-path mappings safer and more predictable.

**SQLite database paths now refuse symlink tricks** (a1a3828)
The SQLite-backed KV and Node SQLite paths now reject symlink/junction traversal and handle OS-specific path aliasing more carefully before opening databases. This closes an attack/footgun where a database path could be redirected through filesystem indirection.

**npm lockfile tarball origins are validated** (ba94f53)
The npm resolution snapshot logic now validates tarball URLs from lockfiles and errors if they are malformed or point at an unexpected registry origin. That hardens package resolution against origin confusion and lockfile tampering.

**Audit now honors configured CA stores** (b8fef0d)
The audit flow was updated so custom certificate authorities are respected during registry interactions. This matters for private registries and corporate TLS setups where the default CA bundle is not enough.

**CLI sys permission descriptors are parsed more broadly** (4bfbfeb)
The CLI parser now accepts the full set of valid system permission descriptors instead of rejecting some legitimate forms. This is a correctness fix for permission flag handling.

**Node crypto stops panicking on tiny DH primes** (11ded15)
Diffie-Hellman generation now returns a proper JS error when prime generation fails for undersized requests, matching Node’s surfaced OpenSSL behavior instead of panicking. The Node version emulation was also bumped to 26.5.1 as part of the compat update.

**Node `resourceUsage().maxRSS` is normalized on macOS** (af3d9bc)
The Node process binding now adjusts `maxRSS` reporting on macOS so the value matches Node’s expected units/shape. That should fix compatibility gaps in process metrics on Apple platforms.

**Node TCP bind permission checks now inspect resolved IPs** (a9bb7c9)
When `tcp_wrap` binds by hostname, Deno now checks the resolved IP against the net deny list instead of only the original name. This closes a permission bypass for Node-compat TCP binding.

**NPM compat `@types/node` materialization was made atomic** (8cc5288)
The npm compatibility installer was changed to materialize `@types/node` atomically, which is aimed at deflaking CI and avoiding partially-written state during install.

### Other misc changes
- Permission and net-path parser tests, including Unix socket and Windows named-pipe coverage
- SQLite, cache, npm, audit, and Node-compat regression test updates
- Dependency/lockfile updates and small test-data refreshes
