---
date: 2026-06-07
repo: vitejs/vite
period: weekly
slug: 2026-W23
period_label: "Jun 1–7, 2026"
size: L
title: "Vite sharpens file access, config migration, and caching"
excerpt: "This week Vite tightened fs security, moved HMR config toward `server.ws`, and improved task caching, CSS invalidation, and glob typing."
commits: 35
---

### Security and filesystem handling hardening
**Stronger fs serving restrictions** — Vite closed Windows-specific bypass tricks in local file serving by rejecting short-name `~` paths and `:`-based NTFS alternate data streams, tightening `fs.strict` enforcement.

**pnpm global store support in fs allowlists** — Vite now detects pnpm's virtual store from `.modules.yaml` and adds it to the file allowlist when needed, fixing serve access for packages stored outside the workspace root.

### Config and ecosystem migrations
**`server.hmr` is moving to `server.ws`** — WebSocket/HMR configuration is being renamed for clarity: `server.ws` now carries the socket options, while `server.hmr` is narrowed to overlay control with deprecated compatibility syncing.

**Starter templates update TypeScript resolution** — `create-vite` TypeScript app templates switched `tsconfig.node.json` from `bundler` to `nodenext` for better alignment with Node-style tooling and config resolution.

**ESLint config simplified** — The repo's ESLint setup was cleaned up by removing special-case allowlists and redundant overrides, making the lint rules easier to reason about and maintain.

### Build, caching, and invalidation improvements
**Task runner cache integration** — Vite integrated with `@voidzero-dev/vite-task-client` to track env inputs and ignore transient cache/build paths, enabling more accurate zero-config build caching.

**CSS invalidation now tracks more dependencies** — Lightning CSS dependency tracking now includes direct file references and glob matches, improving rebuild behavior when CSS plugins pull in external files.

**HTML asset discovery is more extensible** — `html.additionalAssetSources` lets users define custom elements and attributes that should be treated as asset references during rewriting and bundling.

**Optimized dependency sourcemaps are preserved** — Vite now writes hidden sourcemaps for optimized deps and reads them back when serving, improving stack traces after follow-up transforms.

### Other misc changes
**Type and glob correctness fixes** — `importGlob` gained more precise typing for known queries, and `import.meta.glob` now computes common bases by path segment instead of string prefix.

**Dependency and release updates** — Vite bumped `es-module-lexer`, updated `@vitejs/devtools` peer requirements, refreshed several internal dependencies, and shipped release/version/package metadata updates.

**Docs and site updates** — The docs site added a Cloudflare announcement banner and blog post, plus a handful of link and metadata fixes.
