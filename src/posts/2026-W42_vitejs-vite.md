---
date: 2026-10-18
repo: vitejs/vite
period: weekly
slug: 2026-W42
period_label: "Oct 12–18, 2026"
size: L
title: "Vite tightens bundled dev, HMR, and build edge cases"
excerpt: "Bundled dev parity improved, HMR got safer and clearer, and build/resolver bugs plus the CLI creator were polished."
commits: 25
---

### Bundled dev parity and debugging improved
**User env defines now work in bundled dev** — `import.meta.env.*` user defines are now exposed in bundled builds too, closing a parity gap with standard build mode.

**Better error stacks in bundled dev** — forwarded browser errors now resolve through the in-memory bundle source maps, making runtime stack traces much easier to follow.

**Bundled-dev limitations made explicit in tests** — multiple SSR/HMR playground tests were updated to use bundled-dev-specific skip/todo helpers and adjusted assertions so the suite matches real bundled-dev behavior.

### HMR and server robustness
**Socket reset upgrades no longer crash the process** — Vite now adds a no-op error handler for upgrade requests the HMR server doesn’t own, preventing crashes when clients reset sockets mid-handshake.

### Build, resolver, and CSS fixes
**Chunk import map generation is more resilient** — build output no longer emits a broken `importmap.json` when filenames are unhashed, fixing cases like pure-CSS builds.

**Dependency scanning now catches `oxc.jsxInject` imports** — pre-bundling now looks at `oxc.jsxInject`, so injected JSX imports are discovered correctly during optimization.

**Resolver edge case with `$$` filenames fixed** — `resolve.exports` was bumped and Vite now handles import paths containing `$$` in filenames correctly.

**CSS `url()` now tolerates literal percent signs** — valid URLs like `url(./100%.png)` are preserved instead of failing decode.

### Tooling and CLI updates
**TypeScript 7 adopted with compatibility guardrails** — the repo moved to TS 7 while pinning affected workspace packages to TS 6 where needed.

**create-vite now prints its version** — the scaffolder announces its version before interactive setup, making project provenance easier to confirm.

### Other misc changes
- Docs cleanup across env, plugin, migration, deployment, and troubleshooting examples.
- Linting migrated from ESLint flat config to Oxlint, with docs and acknowledgements updated accordingly.
- Dependency and workflow maintenance, including Rolldown-related bumps, package updates, and CI action refreshes.
- Additional test fixture cleanup and bundled-dev skip/todo labeling across playground coverage.
