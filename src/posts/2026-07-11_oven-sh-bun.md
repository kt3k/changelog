---
date: 2026-07-11
repo: oven-sh/bun
size: L
title: "Bun hardens fetch, clone, CSS, and IO bugs"
excerpt: "Pre-aborted fetch now rejects synchronously, clone deserializers block malformed payloads, CSS rejects invalid mixes, and Windows IO gets safer."
commits: 18
authors: [robobun, Jarred-Sumner, cirospaciari]
commit_authors: {"6753022": robobun, "9657f37": robobun, "bad2927": robobun, "7f06b1f": robobun, "18cfc1a": robobun, "aaaa53f": robobun}
---

**fetch returns an already-rejected promise for pre-aborted signals** (9657f37)
Bun now follows the Fetch spec more closely when `AbortSignal` is already aborted: `fetch()` rejects synchronously with the original abort reason instead of briefly staying pending. The fix also preserves request-constructor precedence, so invalid requests still fail before the abort is observed.

**structured clone now rejects malformed RegExp payloads** (aaaa53f)
Deserializing a `RegExp` record with an unparseable pattern now fails instead of producing a broken object that throws on every use. This closes a bad input path in both Bun's serializer and `node:v8`-compatible deserialization.

**structured clone no longer hangs on truncated Set/Map payloads** (6753022)
Bun's deserializer now restores the read pointer safely when collection termination tags are missing, preventing an infinite loop on truncated `Set`/`Map` data. That matters for any code consuming untrusted or partially written serialized blobs.

**CSS `color-mix()` now rejects percentages outside 0–100%** (bad2927)
`parse_color_mix` now treats out-of-range mix percentages as invalid input instead of letting them flow into color math and produce crashes or garbage colors. This fixes a fuzzed parser bug and aligns Bun with the CSS Color 5 grammar.

**Windows file-response IO no longer double-closes borrowed handles** (18cfc1a)
The Windows buffered reader/writer close paths now distinguish between owned and parent-owned file descriptors, avoiding duplicate `close` operations on the same CRT fd. That closes a flaky Windows-only bug where a recycled fd slot could get shut underneath unrelated file activity.

**`bun-types` now resolves lib.d.ts from TypeScript's own install** (7f06b1f)
The bun-types integration test was updated to cope with TypeScript 7's new optional-package layout for `lib/*.d.ts`. This keeps the test aligned with newer TypeScript releases and avoids false failures when the default libs move.

### Other misc changes
- SQL test flake fixes and quarantine cleanup across several postgres tests and `sql-prepare-false`.
- Bunx install test unskipped and Angular CLI pinned for CI stability.
- Bundler test deflake.
- Proxy-stress macOS memory-probe cap.
- Clippy/workspace cleanup and Rust error-code/codegen refactors.
- CSS `@supports` printer newline handling fix.
