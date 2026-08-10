---
date: 2026-08-09
repo: pnpm/pnpm
period: weekly
slug: 2026-W32
period_label: "Aug 3–9, 2026"
size: L
title: "pnpm hardens release flow, installs, and global tooling"
excerpt: "This week brought security fixes, faster and safer install/update paths, and new project-aware global shims."
commits: 81
---

### Security and release integrity tightened
**Path traversal and archive path handling fixed** — `pnpm rebuild` now rejects lockfile package names with traversal segments, and tarball extraction normalizes backslashes so Windows-authored paths can’t bypass validation.

**Release tags are now verifiable** — the release pipeline now requires signed annotated tags, restoring `git verify-tag` compatibility for downstream builders.

### Install and resolver behavior got more correct and faster
**Install internals were split into smaller phases and crates** — the install pipeline was refactored across fresh/frozen paths into dedicated modules and a new deps-restorer crate, reducing coupling without changing behavior.

**Several install correctness bugs were fixed** — frozen installs now create the right hoisted bins, `file:` directory deps are recopied when sources change, `fetch`/`virtualStoreOnly` no longer emit stray `.pnp.cjs`, and headless installs handle removed packages more cleanly.

**Resolution now avoids unnecessary full re-runs** — patch-only updates, monotonic ignored-optional changes, and other inert setting edits can often update the lockfile directly, while git dependencies now resolve canonically via HTTPS to avoid machine-specific SSH lockfiles.

**Offline and platform edge cases improved** — lockfile verification respects offline mode, Windows symlink/removal handling is more robust, and sandboxed installs keep the store inside the project when needed.

### Global tooling and update flows became safer
**Sudo global mutations are now blocked** — `setup`, `self-update`, and other global writes now warn in v11 and fail in v12 when run via sudo, reflecting pnpm’s user-owned global state model.

**Self-update and dlx were hardened** — self-update now works with mirrored registries, while `dlx`/`create` no longer inherit the caller project’s patches.

**Global updates and paths improved** — interactive global updates can select whole package groups, and global path commands keep stdout clean for scripting.

### Project-aware global shims landed
**Global bins can now dispatch by project** — new context-aware shims let globally installed executables follow the current project’s runtime via `globalShims`, with a faster runtime detector and better signal propagation on POSIX.

### Other misc changes
- Rust CLI/API parity fixes, including scope handling, registry metadata, JSON output, and `allowUnusedPatches`
- Global virtual-store concurrency fixes and slot materialization deduping
- CI, workflow, and release-channel updates across pacquet rc prep
