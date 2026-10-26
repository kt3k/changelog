---
date: 2026-10-25
repo: jsr-io/jsr
period: weekly
slug: 2026-W43
period_label: "Oct 19–25, 2026"
size: M
title: "Publish queue reaper fix stops duplicate requeues"
excerpt: "A stale-task reaper bug was fixed so stalled publish jobs are no longer repeatedly re-enqueued, reducing duplicate work and queue congestion."
commits: 1
---

### **Stale publish reaper no longer floods the queue**
The main change this week fixes a bug in the publish-task reaper where stale jobs were being re-driven without updating their timestamps. That meant the same pending tasks could be re-enqueued over and over once the queue fell behind, creating duplicate work, retry churn, and unnecessary congestion. The reaper now advances task state correctly when it reprocesses stale jobs, which should make publish retries much more stable under load.

### Other misc changes
- Regenerated SQLx metadata for updated publishing-task queries
- Minor Cargo.toml and Cargo.lock updates
- Test and database helper adjustments to match the reaper logic changes
