---
date: 2026-08-24
repo: vitejs/vite
size: M
title: "create-vite 9.2.0 lands nub support"
excerpt: "create-vite 9.2.0 ships with nub package manager support, plus dependency and workflow updates across the repo."
commits: 10
authors: [bluwy, btea, sapphi-red, colinhacks]
commit_authors: {"2e8355d": bluwy, "21a3ee9": btea, "8d1c9c7": sapphi-red, "c31c499": colinhacks, "8b3b489": sapphi-red, "5fdfd26": btea, "3e34883": bluwy}
---

**create-vite 9.2.0 released with nub package manager support** (c32e784)
create-vite was bumped to 9.2.0, and the changelog shows the headline feature for this release: support for the nub package manager. That makes the starter scaffolding aware of a new package-manager flow instead of treating it as an unsupported edge case.

**create-vite now resolves nub commands correctly** (c31c499)
The generator adds explicit handling for `nub` in custom command resolution, using `nubx create-` for create-style invocations and `nubx` for plain package-manager commands. This matters because it lets `create-vite` generate commands that work with nub’s CLI conventions out of the box.

**Rolldown and related dependency updates** (76e8082)
Rolldown was updated across the repo, alongside matching parser/tooling bumps in the playground and docs. Since `vite` itself and several playgrounds depend on Rolldown, this is the kind of upgrade that can affect build and transform behavior.

### Other misc changes
- Removed `markdown-it-image-size` from docs; corresponding docs config cleanup and lockfile shrinkage (2e8355d, 8d1c9c7)
- Non-major dependency bumps across create-vite templates, Vite, docs, and playgrounds (d550815)
- Dropped outdated `minimumReleaseAgeExclude` workspace config (21a3ee9)
- CSS async-order test adjustment (8b3b489)
- CONTRIBUTING guidance tweaks for binary/type-bearing deps (5fdfd26)
- Narrowed semantic PR workflow triggers (3e34883)
