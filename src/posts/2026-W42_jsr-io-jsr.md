---
date: 2026-10-18
repo: jsr-io/jsr
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: M
title: "Publish reliability fixes unblock empty uploads and retries"
excerpt: "JSR fixed zero-byte S3/GCS upload failures and ensured failed publishes exit pending so retries can proceed."
commits: 2
---

### Publish pipeline reliability improvements
**Send Content-Length on empty S3 uploads** — Zero-byte uploads now explicitly send `Content-Length: 0`, fixing GCS rejections and unblocking publishes for packages with empty files.

**Failed publishes now transition out of pending** — Publish tasks that fail during tarball upload or enqueueing are now marked failed instead of staying pending forever, so retries for the same version can proceed and the CLI won’t wait on dead tasks.

### Other misc changes
- Added regression coverage for empty-upload handling against a server that requires `Content-Length`.
- Stale-task cleanup now includes pending publish tasks.
- Supporting refactors touched publish flow, DB/query logic, and related tests.
