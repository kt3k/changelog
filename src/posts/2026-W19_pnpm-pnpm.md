---
date: 2026-05-10
repo: pnpm/pnpm
period: weekly
slug: 2026-W19
period_label: "May 4–10, 2026"
size: L
title: "pnpm hardens config, publishing, and install metadata"
excerpt: "A week of config correctness, publish fixes, safer tarballs, and key install-state work, including .modules.yaml support."
commits: 113
---

### Publishing and supply-chain correctness
**Publish behavior is brought back in line with npm expectations** — `pnpm publish --json` again emits structured package output, `publishConfig.registry` takes precedence where it should, scoped registry lookup is consistent across config and publish, and trusted publishing now prefers OIDC tokens over static auth when both are present.

**Release artifacts and tarball integrity get stronger guarantees** — GitHub release artifacts now carry Sigstore-backed provenance, Git-hosted tarballs are pinned with SHA-512 integrity in lockfiles, and tarball fetching was hardened to avoid false size mismatches from compressed or misreported responses.

**Packing and provenance edge cases are fixed** — `pnpm pack` preserves bundled dependencies again, and `pnpm publish --provenance` strips semver build metadata before packing so the tarball, manifest, and provenance subject stay aligned.

### Config, workspace, and CLI behavior
**Config handling is stricter and more predictable** — invalid `overrides` values now error clearly, environment-variable loading for user config was fixed across case variants and `NPM_CONFIG_USERCONFIG` fallbacks, and global/user config now accepts more expected preferences while warning on ignored local-only settings.

**Workspace resolution and manifest writes are less noisy** — `--prefix` is now respected when locating the workspace root, recursive negative filters no longer pull in the root unexpectedly, `pnpm-workspace.yaml` updates preserve key order, and malformed/unreadable workspace files now surface as real errors.

**Several user-facing command regressions were repaired** — `pnpm dlx`/`pnpx`/`pnx`/`pnpm create` now participate in build approval prompts, `pnpm bugs` was added for opening package issue trackers, `pnpm -g ls` works again with JSON/parseable output, and no-color reporter output keeps WARN/error labels readable.

### Install-state and platform fixes
**Install metadata work lands a major milestone** — `.modules.yaml` support is now implemented and written after install, giving pnpm-compatible tooling durable layout/state metadata for future installs and pruning decisions.

**Fetch/install flows are more robust across registries and platforms** — `pnpm install` no longer recreates `node_modules` after `pnpm fetch`, GitLab-hosted tarballs use a safe archive URL, and Windows exe aliases and `node-gyp` shims were fixed for standalone installs and shells like Git Bash/MSYS2.

**CLI bootstrap and runtime behavior are tightened** — pnpm now reports unsupported Node versions before bundle loading, `--pm-on-fail` survives help/version short-circuits, and Pacquet gained `--no-runtime` for skipping runtime installs without touching the lockfile.

### Other misc changes
- Reporter/rendering pipeline expanded with more log channels and a new `pnpm-render` stdin bin
- Release workflow, changelog, and dependency/CI updates across the week
- Misc docs, test, and packaging cleanup
- Stage 1 scope guidance added to Pacquet contribution docs
