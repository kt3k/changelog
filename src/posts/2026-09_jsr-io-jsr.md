---
date: 2026-09-30
repo: jsr-io/jsr
period: monthly
slug: 2026-09
period_label: "September 2026"
size: M
title: "Security hardening, safer deletes, and less wasted crawling"
excerpt: "September focused on tightening registry and CI security, adding limited version deletion and staff outreach, and cutting unnecessary docs/search work."
commits: 7
---

### **Registry and support workflow improvements**
The month added a narrowly scoped way for scope admins to delete very fresh, low-download versions when nothing depends on them, preserving immutability while giving maintainers a fast escape hatch for bad publishes. It also introduced a staff-only outreach flow that lets admins open a `staff_outreach` ticket and continue the conversation through normal ticket plumbing.

### **Performance and crawler efficiency**
JSR cut a couple of avoidable frontend and crawler costs: symbol search now loads only when a user actually focuses or types into the search box, and versioned docs pages no longer probe docs for non-latest versions that are guaranteed to fail. A new robots rule also discourages crawling those versioned doc paths.

### **Security and maintenance hardening**
The biggest backend maintenance item was a broad dependency refresh that cleared all Dependabot security alerts, including updates across HTTP, OAuth, OpenTelemetry, JWT, and parsing crates along with lockfile regeneration and follow-up code changes. CI was also hardened by pinning GitHub Actions to commit SHAs and setting default token permissions to read-only, reducing supply-chain risk without changing workflow behavior.

### **Other misc changes**
- SPDX license data refreshed from upstream
- Workflow and Docker reference cleanup
- Misc lockfile and manifest updates
