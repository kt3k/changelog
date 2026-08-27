---
date: 2026-08-26
repo: vitejs/vite
size: M
title: "Vite trims docs, bots, and a URL bugfix"
excerpt: "Docs cleanup, bot workflow tweaks, and a timestamp-query fix land alongside small housekeeping changes."
commits: 6
authors: [bluwy, btea, koding88]
commit_authors: {"41f3c6f": koding88}
---

**Fix timestamp query stripping with proper delimiters** (41f3c6f)
`removeTimestampQuery()` now only removes `t=...` when it appears as a real query param, preserving similarly named params like `current-t` and hash fragments. This closes a subtle URL-parsing bug that could strip the wrong text from asset URLs.

### Other misc changes
- Removed obsolete docs banner files and component
- Pruned outdated locale links from docs config
- Updated development tools acknowledgement list
- Broadened semantic pull request workflow to handle `synchronize`
- Skip bot handling when a `bot: skip` label is present
