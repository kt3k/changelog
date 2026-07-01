---
date: 2026-06-30
repo: vitejs/vite
period: monthly
slug: 2026-06
period_label: "June 2026"
size: L
title: "Vite 8.1 brings bundled dev, CSS, and FS hardening"
excerpt: "A month of security fixes, bundled-dev resilience, import-map and glob improvements, plus Vite 8.1 and create-vite refreshes."
commits: 131
---

### Security and server hardening
**FS serving got stricter across Windows and sensitive files** — Vite tightened `fs.strict` with Windows short-name/ADS path rejection, expanded `server.fs.deny` to cover more secret files like `.npmrc` and `.yarnrc.yml`, and hardened malformed-URI handling in memory and HTML middleware.
**pnpm and workspace path handling was fixed** — Vite now detects pnpm virtual store paths from `.modules.yaml`, resolves workspace metadata from the repo root, and allows global store paths when needed so monorepos and pnpm setups don’t break under fs restrictions.
**Dependency and security bumps** — The toolchain picked up security-related updates such as esbuild 0.28.1, plus broader dependency hardening and Node 26 CI coverage.

### Bundled dev and Rolldown became much more robust
**Bundled dev recovered better from failures and invalidations** — Failed optimizer writes now clean up bundles safely, bundled-dev preserves and replays build errors to new clients, and HMR invalidation was fixed to avoid recursive crashes.
**Rolldown integration kept maturing** — Vite aligned build options around `rolldownOptions`, kept rollup/rolldown config views live, updated rolldown through 1.1.2, and fixed lazy stub modules so plugin transforms don’t interfere with generated stubs.
**Asset emission and sourcemaps improved** — Bundled dev now serves newly emitted assets, optimizer output preserves sourcemaps for follow-up transforms, and CSS/HTML plugin outputs consistently provide empty sourcemaps when needed.

### Config, templates, and ecosystem APIs evolved
**`server.hmr` is transitioning to `server.ws`** — WebSocket-related HMR options were moved under `server.ws` with `server.hmr` reduced to overlay control, giving users a clearer and backward-compatible migration path.
**`create-vite` defaults were modernized** — Templates shifted toward `moduleResolution: nodenext`, React starters gained Oxlint by default with an ESLint opt-in, and prompts/docs were updated to match the new scaffolding flow.
**Docs for env, SSR, and plugin APIs were expanded** — Vite clarified SSR external conditions, the environment framework runtime guides, and native config-loading behavior, making the newer app-build and runner APIs easier to adopt.

### CSS, HTML, and glob/import ergonomics improved
**CSS import resolution got more capable** — Vite now preserves external `@import` URLs with Lightning CSS, tracks Lightning CSS file/glob dependencies better, and expands CSS tsconfig-path alias resolution while documenting Less limitations.
**HTML and import maps became more flexible** — Import maps are inserted correctly around `modulepreload`, `html.additionalAssetSources` lets apps teach Vite about custom asset-bearing elements, and import-map nonce handling was cleaned up.
**Glob and WASM support got stronger** — `import.meta.glob` added `caseSensitive`, type inference for `importGlob` became more precise, common-base detection was fixed, and direct `.wasm` imports now work as first-class ESM.

### Other misc changes
**Release and maintenance churn** — Vite 8.1.0 landed with create-vite 9.1.0 and plugin-legacy 8.1.0, followed by 8.1.2 / 9.1.1 patches, plus assorted changelog, metadata, CI, and docs updates.
**Small fixes and cleanup** — This month also included lint config simplification, code of conduct/docs polish, issue-template updates, Renovate tweaks, minor test/fixture changes, and several small internal refactors.
