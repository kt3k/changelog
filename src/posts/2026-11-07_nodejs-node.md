---
date: 2026-11-07
repo: nodejs/node
size: M
title: "Undici retry defaults and sqlite helpers"
excerpt: "Undici gets a cache-policy/security bump and retry-doc updates, while sqlite and http behavior are tightened."
commits: 7
authors: [inoway46, araujogui, manjitks, nodejs-github-bot, junyup0503, aduh95, npm-cli-bot]
commit_authors: {"5f602d5": araujogui, "cab9182": manjitks, "d1a1621": nodejs-github-bot, "66c5a02": junyup0503}
---

### **Undici cache version bumped to block unsafe reuse** (d1a1621)
Undici’s SQLite cache store version was raised to invalidate entries written under an older cache policy, specifically to avoid reusing entries that may have been poisoned through redirects. The cache store also gained lock-aware handling for concurrent SQLite access, reducing spurious failures under contention.

### **HTTP drain now fires correctly for coalesced multibyte writes** (66c5a02)
`OutgoingMessage#uncork()` now re-checks backpressure after flushing buffered chunks and emits `drain` when the socket is actually writable again. This fixes a case where multi-byte string writes could wedge waiting for a drain event that never came.

### **SQLite optional string reads were consolidated** (5f602d5)
A new `ReadOptionalString` helper now handles string-valued sqlite options consistently, treating missing or `undefined` values as defaults for `dbName`, `table`, `db`, `source`, and `target`. The change also marks optional-read helpers `[[nodiscard]]` and updates tests to cover the new behavior.

### **Undici docs and retry defaults now include QUERY** (d1a1621)
Undici’s public docs were updated to clarify dispatcher `origin` requirements and to note that `QUERY` is now one of the default retryable methods. This aligns the docs with the current retry behavior and makes the API contract clearer for users.

### **process.loadEnvFile precedence clarified** (cab9182)
The `process.loadEnvFile` docs now state explicitly that existing `process.env` variables win over values from the `.env` file. This removes ambiguity around configuration precedence.

### Other misc changes
- Public lint-js-and-md jobs now use `ubuntu-latest` for public repos only.
- npm dependency/docs refresh to 12.2.2.
- `test-config-json-schema` adjusted for `--openssl-use-def-ca-store`.
- Minor undici/npm documentation edits and typo fixes.
