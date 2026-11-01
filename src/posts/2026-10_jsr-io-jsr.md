---
date: 2026-10-31
repo: jsr-io/jsr
period: monthly
slug: 2026-10
period_label: "October 2026"
size: L
title: "Server stack overhaul and publish reliability fixes"
excerpt: "Migrated the API to axum/hyper 1, refreshed key dependencies, and fixed publish flow bugs that blocked retries or caused duplicate requeues."
commits: 6
---

### **Modernized API and infrastructure stack**
The biggest change this month was a router overhaul: the API moved from routerify to axum 0.8 on hyper 1, with route patterns and request helpers updated accordingly. Alongside that came a broad dependency refresh across docs, syntax highlighting, storage, and HTTP clients, establishing a newer baseline for the service.

### **Publishing became more reliable**
Several fixes tightened the publish pipeline. Failed publish attempts now transition out of `pending` so retries can proceed instead of stalling forever, and the stale-task reaper now updates timestamps when it re-drives work to prevent the same jobs from being requeued repeatedly. Together, these changes reduce stuck tasks, duplicate processing, and queue congestion.

### **Storage and upload edge cases fixed**
Zero-byte S3/GCS uploads now explicitly send `Content-Length: 0`, resolving `411 Length Required` failures for packages that include empty files. A regression test was added to cover the empty-upload path.

### **User/account lifecycle improvements**
The month also introduced a service account for future admin automation and added self-serve account deletion. When a deleted user was the sole owner of scopes, ownership is now transferred to the service account to avoid orphaned scopes and keep access intact.

### Other misc changes
- SQL/query cache updates supporting deletion, reassignment, and publishing changes
- Error conversion and small API/internal refactors to support the new stack
- Lockfile, Cargo, and SQLx metadata refreshes
- Test updates around upload, publish, and task-reaper behavior
