---
date: 2026-03-17
repo: nodejs/node
size: M
title: "Node tightens docs, fixes coverage and CLI edge cases"
excerpt: "A mix of real bug fixes, a runtime deprecation, a util regression fix, and a SQLite upgrade landed today."
commits: 12
authors: [kovan, Renegade334, nodejs-github-bot, mertcanaltin, aduh95, sxa, marcopiraccini, Han5991]
commit_authors: {"f08e2e0": mertcanaltin, "6f7b948": marcopiraccini, "9e89867": kovan, "ac63754": Renegade334, "b4ea323": Renegade334, "a62f641": Han5991, "9580d58": nodejs-github-bot}
---

### **SQLite updated to 3.51.3** (9580d58)
Node vendors a newer SQLite release, replacing the embedded amalgamation and headers. This can bring upstream bug fixes and behavior changes in the database engine used by Node.

### **tracePromise now warns on non-thenables and preserves consistency** (b4ea323)
`diagnostics_channel`’s tracing API was tightened so `tracePromise()` no longer silently wraps non-Promise return values into native Promises. When the traced function returns a non-thenable, Node now warns and returns the value as-is; the docs and tests were updated to match.

### **util.styleText now accepts color aliases like `grey`** (a62f641)
`util.styleText()` was fixed to recognize color aliases that previously threw, including `grey`, `bgGrey`, and similar variants. This restores compatibility for valid style names and prevents a regression introduced in newer Node versions.

### **DEP0201 moved from docs-only to runtime deprecation** (ac63754)
Passing `options.type` to `Duplex.toWeb()` now emits a real deprecation warning at runtime, rather than only being documented. The implementation keeps the alias working for compatibility while steering users toward `options.readableType`.

### **Coverage for mocked CJS modules imported from ESM is fixed** (6f7b948)
Node now preserves the full module URL when compiling CJS loaders, so coverage reports keep search parameters used by test mocks. That fixes missing or incorrect coverage accounting for mocked CommonJS dependencies imported from ESM.

### **CLI `--eval` handling is clarified for leading hyphens** (9e89867)
The CLI docs now explain that `--eval=<script>` should be used when the script starts with `-`, and tests cover negative numbers and `-e` argument parsing edge cases. This makes a subtle parser behavior much less surprising for users.

### **Latin1 `Buffer.indexOf` path uses stack allocation** (f08e2e0)
The Latin1 string-search path in `Buffer.indexOf` was switched from heap allocation to stack allocation for the needle buffer. That should reduce allocation overhead in this hot path.

### Other misc changes
- Docs clarified that `make test` / `make test-only` do not run linters anymore.
- `lint-nix` timeout fix in CI.
- AIX-specific test skip for `test-cluster-dgram-reuse`.
- Minor docs clarification that `fs.ReadStream`/`fs.WriteStream` are not directly constructable.
- `--eval` docs/tests edge-case cleanup and related test updates.
- Nixpkgs and SQLite-related vendoring updates.
