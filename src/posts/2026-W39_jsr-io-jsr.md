---
date: 2026-09-27
repo: jsr-io/jsr
period: weekly
slug: 2026-W39
period_label: "Sep 21–27, 2026"
size: S
title: "CI workflows hardened with pinned GitHub Actions"
excerpt: "Repository-wide workflow hardening pinned actions by SHA and made default token permissions read-only, cutting supply-chain risk."
commits: 1
---

### **CI and workflow security hardening**
The main change this week was a security-focused cleanup of GitHub Actions usage across the repo. External actions were pinned to commit SHAs and repository-wide default token permissions were tightened to read-only, reducing supply-chain risk and addressing multiple scorecard alerts without changing runtime behavior.

### **Workflow and reference cleanup**
The hardening touched CI and Algolia reindex workflows, along with related Dockerfile action/reference pinning. These updates are operational only, with no product or API changes.

### Other misc changes
- No feature work, bug fixes, or runtime changes this week
- Changes were limited to security alert remediation and workflow hygiene
