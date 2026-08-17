---
date: 2026-08-16
repo: pnpm/pnpm
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: L
title: "pnpm 12 centers on fast, deterministic installs"
excerpt: "Shared virtual store becomes default, with major fast-path install wins, deterministic peer resolution, and Corepack/package-manager support."
commits: 95
---

### **Shared virtual store becomes the new default**
pnpm 12 now enables the global virtual store by default, reusing materialized packages across projects to cut duplicate disk usage and install work. To keep scripts working under the new layout, pnpm now injects `NODE_PATH` plus an ESM loader hook for CommonJS and ESM execution paths.

### **Install and lockfile updates got much faster**
The week focused heavily on keeping more changes on the fast update path instead of falling back to full resolution. pnpm can now compose multiple compatible lockfile drifts in one rewrite, reuse already-locked versions for adds and widened ranges, absorb catalog/override changes alongside other edits, and avoid unnecessary resolution in common remove/update flows. Cold installs also gained concurrency so verification, fetching, linking, and materialization overlap more effectively.

### **Peer resolution is now deterministic and less memory-hungry**
Several fixes removed order-dependent behavior from the resolver: cycle breaking is now canonical, importer processing is ordered, and contested child ownership settles deterministically. Alongside that, peer-cycle caching and shared package-id storage reduce repeated work and peak memory on large or cyclic workspaces.

### **Global installs, Corepack, and package-manager pinning improved**
pnpm-g now switches atomically by moving a stable hash link, avoiding PATH gaps during activation. Corepack support for pnpm 12 was restored, and pnpm can now install other package managers too, enabling project-level pinning for npm, Yarn, and Bun.

### **Registry, git, and config handling were tightened up**
Git dependency resolution and fetch errors became more robust and actionable, including better URL parsing, credential redaction, and clearer failure messages. Registry handling was refined for pnpr and non-npm tarball URLs, while project manifests can no longer redirect machine-level pnpm directories or credentials.

### **Other misc changes**
- `pnpm update` now writes the resolved range back to `package.json`.
- `syncInjectedDepsAfterScripts` now resyncs injected copies correctly, including bin cleanup.
- `pnpm cache path` was added, and store pruning now preserves verification logs.
- SBOM/deploy behavior was tightened, deprecation metadata is preserved, and several config/catalog validation fixes landed.
- Various docs, CI, release, and dependency updates.
