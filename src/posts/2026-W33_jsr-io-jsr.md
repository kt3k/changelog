---
date: 2026-08-16
repo: jsr-io/jsr
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: S
title: "SPDX metadata refreshed, WAF rollout reverted"
excerpt: "JSR updated bundled SPDX license data and backed out an attempted WAF-based scraping protection change after Cloudflare access issues."
commits: 2
---

### **License data stays current**
JSR refreshed its bundled SPDX license-list snapshot, updating many license detail JSON files with the latest upstream metadata. This keeps license normalization, lookup, live links, and cross-reference data aligned with SPDX.

### **Scraping protection change rolled back**
An attempted move of scraping protection from the load balancer to the WAF was reverted after the team hit missing Cloudflare resource access on the JSR account. The rollback removes the new edge rate-limiting path along with the related CI/terraform changes, restoring the previous setup.

### Other misc changes
- No other notable changes this week.
