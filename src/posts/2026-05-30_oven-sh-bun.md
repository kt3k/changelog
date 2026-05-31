---
date: 2026-05-30
repo: oven-sh/bun
size: M
title: "MySQL datetime round-trips go UTC"
excerpt: "Bun now decodes MySQL DATETIME/TIMESTAMP as UTC to match how values are written, with matching Postgres timestamp docs and tests."
commits: 1
authors: [alii]
commit_authors: {"61bd997": alii}
---

### **MySQL DATETIME/TIMESTAMP now round-trip as UTC** (61bd997)
Bun changed its MySQL datetime decoding so `DATETIME` and `TIMESTAMP` come back as UTC-based `Date`s, matching the UTC components used when values are written. This fixes timezone-dependent round-trips and also treats zero-date/invalid inputs as `Invalid Date` instead of silently shifting them.

The update also tightens the text and binary decode paths, adds explicit parsing for MySQL date/time strings, and extends the same UTC interpretation to PostgreSQL `timestamp` without time zone for consistency.

### Other misc changes
- Docs updated to describe UTC decoding for MySQL datetimes and the Postgres timestamp note
- Added MySQL/Postgres round-trip and timezone fixture tests
- Internal SQL decode/refactor cleanup across MySQL and Postgres code paths
