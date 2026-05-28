---
date: 2026-04-03
repo: nodejs/node
size: M
title: "Windows module import bug fixed"
excerpt: "Node fixes a Windows long-path subpath import regression and tightens commit-signoff guidance; the rest are workflow dependency bumps."
commits: 9
authors: [jasnell, StefanStojanovic]
commit_authors: {"c02bee3": jasnell, "e419afd": StefanStojanovic}
---

**Fix Windows long-path subpath imports** (e419afd)
Node now normalizes long Windows file paths before looking up package scope metadata, which fixes a regression where `createRequire(...).resolve()` could fail for long paths. A new regression test covers both package exports and `#imports` resolution on Windows.

**Require DCO sign-off in commit messages** (c02bee3)
The contributor guide now requires a `Signed-off-by` line for most commits, aligning Node’s commit workflow with the Developer Certificate of Origin. This makes authorship and compliance checks explicit, while carving out exceptions for bot commits, dependency updates, release commits, and backports.

### Other misc changes
- Updated GitHub Actions: `setup-node`, `codeql-action`, `download-artifact`, `harden-runner`, `cache`, `codecov`, and `cachix`.
- Workflow-only maintenance across CI, coverage, release, and security scans.
