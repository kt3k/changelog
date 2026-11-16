---
date: 2026-11-15
repo: pnpm/pnpm
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "pnpm adds v13 lockfiles and hardens pnpr core flows"
excerpt: "New lockfile format work landed alongside major pnpr auth, storage, and resolver hardening, plus safer core CLI behavior."
commits: 208
---

### **Lockfile v13 becomes the new format push**
pnpm spent the week maturing its experimental v13 lockfile format: it gained support for writing and reading the new flatter layout, preserved peer/provider data through round-trips, handled long implicit keys, and fixed formatting/diff stability. Related resolver work also improved peer reuse across cycles, dedupe, and locked fallback cases, making installs and deploys less likely to churn or mis-resolve.

### **pnpr gets a major storage, auth, and registry overhaul**
pnpr saw the largest architectural changes. Registries moved into the database with revisioned admin APIs, hosted metadata was tied to explicit store IDs and namespaces, and auth/storage models were normalized ahead of 1.0. The server also tightened owner-based publish rules, token lifetimes, login/session handling, and transaction-bound authorization to close race conditions and privilege gaps.

### **Reliability and safety improvements across installs, deploys, and cleanup**
Core flows picked up several high-impact fixes: `pnpm deploy` now rebuilds peer contexts correctly, `git` dependencies reuse locked commits, `pnpm ci` validates earlier before deleting `node_modules`, and `pnpm clean`/`purge` stay within the project root. `pnpm doctor` now detects fresh-environment and filesystem link-capability issues, while `dlx` and `fetch` were hardened to respect policy and defer hoisted work until install time.

### **Config, publishing, and output handling were tightened**
Configuration writes got stricter and more predictable, including better `lockfileDir` normalization, safer global config routing, and clearer validation. Package-manifest editing, archive/publish path handling, SBOM/licenses output, JSON/parseable stdout, and CLI arg parsing all received correctness fixes that reduce surprising edits and machine-readable output breakage.

### Other misc changes
- `pnpr` improved GC, startup diagnostics, replica fallback, metadata storage, and cache limits
- Store prune/clone-cache handling, Windows shims, and setup shell support were refined
- Python/Cargo/GitHub Actions/workflow handling got assorted ecosystem-specific fixes
- Docs, tests, CI, dependency bumps, and release-automation updates
