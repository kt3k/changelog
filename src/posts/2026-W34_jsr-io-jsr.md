---
date: 2026-08-23
repo: jsr-io/jsr
period: weekly
slug: 2026-W34
period_label: "Aug 17–23, 2026"
size: L
title: "JSR adds fallback registries, search filters, and security fixes"
excerpt: "Search got filter UI, self-hosted registries can fall back upstream, and docs publishing received a CSP hardening fix."
commits: 19
---

### **Search becomes more usable and more precise**
The package search page now has a filter panel for runtime compatibility and minimum score, with backend support for `score:` range filters. Yanked-only packages are also hidden from results, and scoring now better reflects real documentation coverage.

### **Self-hosted deployments get fallback registry support**
JSR can now resolve packages from a configured fallback registry when they aren’t hosted locally, including artifact URLs and dependency-graph awareness. This makes self-hosted instances much more practical for partial mirrors or federated setups.

### **Publishing and docs rendering get important hardening**
Trusted publishing was fixed for GitHub Enterprise Cloud setups that use unique OIDC issuer URLs, and stalled publish tasks now fail fast instead of waiting for the reaper. On the frontend, the docs page CSP was tightened to block a `javascript:` iframe XSS path.

### **Metadata and ecosystem visibility improve**
Package metadata now surfaces linked GitHub repositories in both npm compatibility manifests and native `meta.json`, and dependent counts now include npm-compat packages. User timestamps were also corrected so update times report accurately.

### **Other misc changes**
UI polish landed across the navbar, package pages, downloads, and theme switching; telemetry and search-tracking were trimmed for privacy; recently published packages were added to user pages; and the repo gained contributor guidance.
