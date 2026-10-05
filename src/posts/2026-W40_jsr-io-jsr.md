---
date: 2026-10-04
repo: jsr-io/jsr
period: weekly
slug: 2026-W40
period_label: "Sep 28 – Oct 4, 2026"
size: M
title: "Self-serve account deletion lands with scope handoff"
excerpt: "Adds a service account and user deletion flow that preserves scope ownership by handing off orphaned scopes automatically."
commits: 1
---

### **Self-serve deletion with scope handoff**
A new self-service and admin-driven account deletion flow now lets users delete their accounts while avoiding orphaned ownership. When the deleted user is the sole member of a scope, ownership is transferred to a dedicated service account so the scope stays accessible.

### **Service account groundwork**
The week also introduced a service account to support future admin automation and provide a stable recipient for ownership handoff during deletions.

### Other misc changes
- SQL updates for user deletion plus ticket/creator reassignment.
- API schema and query cache refreshes.
