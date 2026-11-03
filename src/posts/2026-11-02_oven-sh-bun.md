---
date: 2026-11-02
repo: oven-sh/bun
size: L
title: "Prisma guides, crash fix, and Azure OIDC CI"
excerpt: "Prisma docs were rewritten for ORM 8, arm64 crash traces now preserve signed return addresses, and Windows image CI switched to federated Azure auth."
commits: 6
authors: [robobun, dylan-conway, ankur-arch]
commit_authors: {"a4c3a5e": dylan-conway, "129f3c7": dylan-conway, "271b65e": ankur-arch}
---

### **Prisma guides updated for Prisma ORM 8** (271b65e)
The Prisma Postgres and Prisma guides were rewritten around Prisma ORM 8’s newer workflow, replacing the old `prisma init --db` flow with `create-prisma`, `create-db`, and contract emission. This fixes broken setup steps and aligns the docs with current CLI behavior and Bun’s environment-file handling.

### **Crash handler now strips signed arm64 return addresses** (129f3c7)
On Linux arm64 with pointer authentication enabled, Bun now removes PAC signatures from saved return addresses before reporting stacks. That means crash traces can show real frames instead of “unknown” entries when Bun or an addon is built with `-mbranch-protection=pac-ret`.

### **Windows image CI moved to Azure federated identities** (a4c3a5e)
The CI image scripts now authenticate to Azure with Buildkite OIDC tokens instead of long-lived client secrets. This changes both image lookup and bake paths, and updates the Packer template to accept a JWT assertion for more secure, secretless Windows image builds.

### Other misc changes
- Bundler prelinked graph refactor to store request indices as `u16` and remove a redundant count guard.
- Mordant baseline cleanup commits removed obsolete findings and lowered several remaining counts.
