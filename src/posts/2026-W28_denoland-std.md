---
date: 2026-07-12
repo: denoland/std
period: weekly
slug: 2026-W28
period_label: "Jul 6–12, 2026"
size: M
title: "std trims import maps and tightens CI workflows"
excerpt: "Workspace import specifiers moved into deno.json, redundant self-maps were removed, and nightly CI was restricted to upstream runs."
commits: 6
---

### Import maps were consolidated into workspace config
The repo moved shared import specifiers into `deno.json`, replacing the standalone `import_map.json`. With workspace resolution handling `@std/*` self-references, the root import map was trimmed down and the separate import-map validator plus `lint:import-map` task were removed.

### CI and scheduled workflows were hardened
The nightly workflow is now gated to run only in the upstream `denoland/std` repo, which avoids fork failures and wasted Actions minutes. The notify job inherits that behavior through its dependency on the test job.

### Tooling and matrix updates
The main CI matrix dropped canary Deno in favor of v2.x targets, and `no-import-prefix` linting was enabled alongside a few inline specifier cleanup fixes. `fast-check` was added as a bare specifier in `deno.json`.

### Other misc changes
- The crypto benchmark dropped an old FNV comparison against `std/crypto` v0.220.1.
