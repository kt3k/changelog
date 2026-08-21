---
date: 2026-08-20
repo: oven-sh/bun
size: L
title: "Bun patches NAPI, JSX, Intl, and watch crashes"
excerpt: "Four crash fixes, a JSX tsconfig/pragma edge case, ICU locale hardening, and a V8 profiler overlap fix landed alongside docs updates."
commits: 9
authors: [robobun, alii, Jarred-Sumner]
commit_authors: {"f8d486a": robobun, "c9585f7": robobun, "9393da4": robobun, "99c9afe": robobun, "6e906e4": robobun, "a443fa9": robobun, "34cbb9a": Jarred-Sumner}
---

**Fix `napi_create_reference` for Node-API 10 addons** (f8d486a)
Bun now allows `napi_create_reference` on non-object values when the addon targets Node-API 10, which fixes `better-sqlite3@13` aborting on load. The change also adds regression coverage for primitive references and version-specific behavior.

**Stop AggregateError printing from segfaulting on missing `errors`** (c9585f7)
Printing an `AggregateError` without an own `errors` property no longer walks a null/empty value into the iterator path and crash the process. Bun now fetches `errors` more defensively and falls back to printing the AggregateError itself when the property is missing or unusable.

**Keep invalid JSX factories/fragments from crashing the parser** (9393da4)
Malformed `jsxFactory`/`jsxFragmentFactory` values like `""`, `"."`, or other unparseable strings no longer trigger an index-out-of-bounds panic. Instead, Bun preserves the default JSX factory/fragment and emits a warning, which makes tsconfig and pragma edge cases fail gracefully.

**Prevent `bun --watch` reloads from segfaulting on the grace thread** (99c9afe)
The reload grace thread now initializes its output state before it can clear the terminal, avoiding a zeroed-writer crash during forced restarts. This also restores the colorized terminal-clear behavior under watch mode and adds coverage for the restart path.

**Harden ICU default-locale setup against bad environment values** (a443fa9, 6e906e4)
Bun now proactively seeds ICU’s default locale so parse failures in `LANG`, `LC_ALL`, or `LC_MESSAGES` can’t leave ICU in a null-default state that crashes the first `Date`, `Intl`, or `localeCompare` call. A follow-up simplifies the initialization path to let ICU derive its own locale after Bun pins `en_US`, keeping valid locales unchanged while making invalid ones safe.

**Allow overlapping V8 CPU profiling sessions** (34cbb9a)
Bun’s V8 CPU profiler no longer rejects a second `Start()` while another session is active, which fixes restart-style callers that ignore `kAlreadyStarted` and then dereference a null profile. The sampling logic also drops pre-session traces so each profile only includes samples from its own window.

### Other misc changes
- Vercel deployment guide updates for Bun 1.4.x and removal of the “beta” label (2 docs commits)
- ICU/Intl test updates for locale edge cases and Windows-specific behavior
- NAPI test scaffolding for primitive reference coverage
- Small internal refactors and comments around reference handling and locale setup
