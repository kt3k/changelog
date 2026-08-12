---
date: 2026-08-11
repo: microsoft/typescript-go
size: L
title: "Transpile APIs land; macOS signing gets hardened"
excerpt: "New transpile/declaration APIs, a heritage-clause AST split, and macOS signing/realpath fixes headline a busy day."
commits: 6
authors: [jakebailey, andrewbranch]
commit_authors: {"ffdcc67": jakebailey, "2fdc423": andrewbranch, "e67d5e9": jakebailey, "6426ce8": andrewbranch, "71f04bb": jakebailey}
---

**Port `transpileModule` and `transpileDeclaration` to native preview** (6426ce8)
The native preview now exposes async/sync transpile and declaration-transpile APIs, plus file-based variants and updated tests/baselines. This brings a major compiler utility into the new surface area and makes the preview more useful for tooling that needs one-off emit/declaration generation.

**Split heritage clause expression and type nodes** (e67d5e9)
Heritage clauses now distinguish between expression-based extends/implements entries and type references, with new AST types, factory/is helpers, parser/checker/printer updates, and baseline coverage. This is a notable correctness/refactor change that better models class vs. interface heritage and should reduce downstream confusion in AST consumers.

**Add macOS entitlements before signing** (ffdcc67)
The signing pipeline now writes a macOS entitlements plist, ad-hoc signs artifacts with those entitlements, and verifies they survive the final signed output. This matters for keeping the macOS binaries usable under Apple’s signing/notarization rules.

**Preserve local auto-imports in circular workspace symlink topologies** (29c7adc)
Auto-import indexing now avoids dropping project-local files just because they’re reachable through a symlink into `node_modules`, which fixes a class of monorepo/circular workspace cases. The new test covers a workspace where packages symlink to each other and ensures local symbols still show up.

### Other misc changes
- macOS realpath fast-path removal and associated test cleanup/fixups (71f04bb, 2fdc423)
- Dependency updates and signing toolchain additions in `go.mod`/`go.sum` (ffdcc67)
- Minor native-preview test/lint adjustments and generator metadata updates (2fdc423, e67d5e9, 6426ce8)
