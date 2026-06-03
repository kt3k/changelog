---
date: 2026-06-02
repo: vitejs/vite
size: L
title: "Vite adds task caching and ws config migration"
excerpt: "Zero-config build caching lands alongside a server.ws rename, env/cache fixes, and HTML/CSS asset handling improvements."
commits: 9
authors: [sapphi-red, wan9chi, Xavrir, ctate, monam2, TheAlexLichter]
commit_authors: {"f8d75f7": wan9chi, "9ce3036": sapphi-red, "0b7aaed": sapphi-red, "a41404b": monam2}
---

**Vite Task integration adds zero-config build caching** (f8d75f7)
Vite now hooks into `@voidzero-dev/vite-task-client` to read `NODE_ENV`, track env globs, and mark transient cache/build paths as ignored inputs/outputs. That should let the task runner cache builds more accurately without treating Vite’s internal scratch files as meaningful artifacts.

**`server.hmr` is being renamed to `server.ws`** (9ce3036)
The WebSocket-related HMR options are now exposed under `server.ws`, with `server.hmr` reduced to overlay control and the old fields marked deprecated but still synced. This is an important config migration that clarifies intent and preserves compatibility while steering users to the new API.

**CSS lightningcss dependency tracking now includes file and glob deps** (0b7aaed)
Lightning CSS dependencies now register both direct file references and globbed matches, including absolute glob results outside `node_modules`. This improves rebuild invalidation for CSS features that pull in files via Lightning CSS plugins.

**HTML asset discovery can be extended with custom sources** (a41404b)
Vite adds `html.additionalAssetSources`, letting users declare custom elements and attributes that should be treated like asset references. This matters for web components and non-standard `data-*` asset attributes, which can now participate in HTML asset rewriting and bundling.

### Other misc changes
- Cache dir now prefers `node_modules/.vite` when `node_modules` exists, even without a local `package.json`.
- Multiple allowed hosts are now supported via `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`.
- Added a warning discouraging Vite usage with Yarn PnP.
- Internal build/legacy refactor from `rollupOptions` to `rolldownOptions`.
- CI issue-helper workflow rewritten as a composite JS action.
- Docs and tests updated for the above changes.
