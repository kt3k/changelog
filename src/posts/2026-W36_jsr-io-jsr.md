---
date: 2026-09-06
repo: jsr-io/jsr
period: weekly
slug: 2026-W36
period_label: "Aug 31 – Sep 6, 2026"
size: M
title: "JSR trims docs traffic and expands admin controls"
excerpt: "Admins can now delete bad fresh releases and start user outreach tickets, while docs/search work was tuned to avoid wasted loading and crawling."
commits: 5
---

### Admin controls expand, with safety rails
**Fresh low-use versions can be deleted by scope admins** — A previously staff-only path was opened for scope admins to remove bad releases within 24 hours of publish, but only if download counts stay under 10 and no dependents would break.
**Staff can open tickets directly to users** — Support outreach now creates a normal `staff_outreach` ticket thread with audit logging, giving admins a structured way to message users from the ticket system.

### Docs and search got more selective
**Versioned docs no longer trigger pointless backend probes** — The frontend now checks the latest unyanked version before fetching docs, avoiding guaranteed-failing requests for pinned version URLs and reducing crawler waste.
**Symbol search is loaded only when used** — Package docs no longer build the full symbol search index on page load; it now initializes on focus or input, cutting unnecessary work for readers who never search.

### Other misc changes
**Robots and metadata cleanup** — Added a `robots.txt` rule to block crawling versioned doc paths, and refreshed SPDX license data from upstream.
