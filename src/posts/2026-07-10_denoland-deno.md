---
date: 2026-07-10
repo: denoland/deno
size: L
title: "Deno gains sync-types and a desktop security fix"
excerpt: "Added a new sync-types workflow for stock TS tooling, fixed a desktop error-reporting sandbox escape, and tightened LSP/CLI parser behavior."
commits: 8
authors: [bartlomieju, crowlbot, crowlKats]
commit_authors: {"c537e01": crowlKats, "3af8b3f": bartlomieju, "ddebb90": crowlbot, "708abac": bartlomieju, "1c87314": bartlomieju, "1a39480": bartlomieju}
---

**New `deno sync-types` subcommand for stock TypeScript tooling** (1a39480)
`deno sync-types` now generates a root `tsconfig.json` plus `.deno/tsconfig.json`, materializes remote dependency types, and writes Deno types as private `@types/deno` so plain `tsc`, tsgo, and editor TS servers can type-check Deno projects without a plugin. It also plugs into the CLI/subcommand plumbing as an unstable command.

**Desktop error reporting can no longer be retargeted by JS** (c537e01)
`op_desktop_send_error_report` stopped trusting a caller-supplied URL and now reads the operator-configured destination from native state instead. That closes a sandbox escape where untrusted code could use the op to append to `file://` paths or POST to arbitrary `https://` endpoints, bypassing normal net/write permissions.

**Clap-parity parser refactor lands more of the new CLI surface** (3af8b3f)
The deno_cli_parser work expanded substantially to keep parser output identical to clap before cutover, including validation and coverage for more subcommands and flags. It also added explicit handling for things like CRLF-shebang cleanup and stricter URL/permission parsing, reducing behavioral drift across the CLI.

**`sync-types` now accepts `--allow-import` for remote type materialization** (708abac)
The new subcommand was wired to import allow/deny parsing so users can explicitly fetch remote types from non-default hosts. This matters for projects whose type-only dependencies live outside Deno’s built-in trusted list, such as `html.spec.whatwg.org`.

**Duplicate parse diagnostics are deduped** (ddebb90)
SWC parse/transpile errors that were being emitted twice are now collapsed to a single diagnostic. This makes CLI and REPL syntax errors cleaner and fixes a long-standing duplicate-error bug.

**LSP respects `no-slow-types` lint exclusions** (1c87314)
The language server now checks the resolved lint rules before emitting `no-slow-types` diagnostics, so exclusions in `deno.json` actually suppress editor warnings. This aligns LSP behavior with `deno lint` and avoids noisy false positives in editors.

### Other misc changes
- Removed the dead forked TypeScript-Go integration and its unstable flag plumbing.
- Fixed a flaky HMR server test by polling for readiness instead of firing an unawaited fetch.
- Added a regression test for the desktop error-reporting no-escape case.
- Ported clap parity tests to `deno_cli_parser`.
- CI workflow and small parser/test plumbing updates.
