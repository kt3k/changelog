---
date: 2026-11-22
repo: jsr-io/jsr
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "API swaps database layer to dodge Hyperdrive prep-stmt issues"
excerpt: "The API moved from sqlx to tokio-postgres/deadpool-postgres, with migration handling and tests updated to keep the change safe."
commits: 1
---

### **API database backend swapped to tokio-postgres**
The biggest change this week is a backend migration in the API from `sqlx` to `tokio-postgres` plus `deadpool-postgres`. The move is aimed at avoiding named prepared statement issues when running through Cloudflare Hyperdrive.

### **Migration and query behavior were adapted**
To make the swap land cleanly, the code now replicates migration handling, fixes query type mismatches, and adds tests around the affected queries so the change can be reverted or adjusted without schema churn.

### Other misc changes
- Removed `sqlx`-specific setup and checks from CI and contributor docs
- Updated workspace membership and README instructions for the new migration flow
- Regenerated and removed `.sqlx` query metadata files
