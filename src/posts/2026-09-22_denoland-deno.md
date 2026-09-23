---
date: 2026-09-22
repo: denoland/deno
size: M
title: "Pinned Node types and respect npm registry"
excerpt: "Deno check now fetches @types/node through the configured registry and pins the version, making type-checking reproducible."
commits: 1
authors: [nathanwhit]
commit_authors: {"461f32e": nathanwhit}
---

### **Pin @types/node and honor the configured registry** (461f32e)
`deno check` no longer pulls `@types/node` from hardcoded npmjs.org or floats to whatever `latest` points at. It now downloads a pinned version through the project's resolved npm registry, which makes diagnostics reproducible and respects `.npmrc` / `NPM_CONFIG_REGISTRY` settings.

### Other misc changes
- Updated the built-in Node typings generation flow to keep the generated version aligned with the pinned download.
- Adjusted node test coverage to reflect the new behavior.
