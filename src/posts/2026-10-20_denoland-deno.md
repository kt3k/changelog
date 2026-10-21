---
date: 2026-10-20
repo: denoland/deno
size: L
title: "TLS hardening and lint/runtime fixes"
excerpt: "Trust-store updates, npm link validation, and a core isolate-lifetime fix land alongside CI cleanup."
commits: 4
authors: [bartlomieju, nightness]
commit_authors: {"9766cc5": bartlomieju, "5f22416": bartlomieju, "cf09f6d": nightness}
---

**Deno now distrusts compromised eMudhra CAs** (9766cc5)
The trust store and crypto deps were updated to remove compromised eMudhra certificate authorities, tightening TLS verification for affected certificates. This is a security-sensitive change that directly affects connection trust decisions.

**Core now keeps op contexts alive until isolate teardown** (cf09f6d)
A lifetime bug in the runtime was fixed so op contexts stay valid until after the V8 isolate is fully disposed, including concurrent compilation work that may still read them. This addresses a shutdown bug that could otherwise lead to use-after-free style hazards during isolate disposal.

**npm installer validates package link names** (5f22416)
Package linking paths were refactored so the installer validates the link name separately instead of embedding it into prebuilt paths. That makes symlink creation safer and more robust across the hoisted/local install flows.

### Other misc changes
- Disabled recurring Slack reports for ecosystem/node compat workflows.
- Dependency bumps for TLS/crypto packages and related lockfile updates.
