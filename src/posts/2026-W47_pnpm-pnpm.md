---
date: 2026-11-22
repo: pnpm/pnpm
period: weekly
slug: 2026-W47
period_label: "Nov 16–22, 2026"
size: L
title: "pnpm tightens installs, publish flow, and pnpr hardening"
excerpt: "A week of major pnpr overhauls, install/hoist correctness fixes, new publish/update commands, and a security patch."
commits: 270
---

### Major CLI and workflow additions
**Publish and update get new power tools** — `pnpm publish --new-version` can bump the manifest inline before packing, recursive publish applies it across workspaces, and `pnpm update --tag` can now target dist-tags beyond `latest`. `pnpm audit --fix` also gained a switch to skip auto-adding release-age exclusions.

**New workspace and dependency management commands** — `pnpm catalog migrate` landed to normalize shared specs into `catalog:` entries, `pnpm remove` now accepts glob selectors, and `pnpm why --ranges` shows declared dependency ranges for better attribution.

### Install, hoist, and lockfile correctness
**Hoisted installs and PnP resolution were fixed in multiple edge cases** — stale hoist links, nested-project resolution, peer-heavy hoisted layouts, and PnP loader discovery all got correctness fixes. These changes reduce wrong-version resolution, install hangs, and broken `.pnp.cjs` behavior after install.

**Lockfile handling is more consistent across install and fetch** — warm installs now respect lockfile format and catalog-backed peers, recursive fetch handles per-project lockfiles, frozen-lockfile checks cover more workspace child cases, and lockfile-only resolution reuses Git snapshots more aggressively.

**Patch, config, and package metadata handling were hardened** — patch application now preserves final lines and handles more diff shapes, JSON5 manifest edits preserve formatting in place, `engines.pnpm` stays in sync with package manager updates, and global/package-scoped config behavior was tightened around secrets, approvals, and trust policy.

### pnpr overhaul and registry hardening
**pnpr saw the biggest architectural shift this week** — grants/teams moved to instance-wide tables, schema handling was frozen at 1.0, and alpha databases now require recreation. Security and cache behavior also improved, including stricter private-route caching, safer local specifier handling on the server, better tarball routing for split-domain registries, and more faithful audit/OSV processing.

**Server-side publishing and auth became stricter** — OCI upload continuations now require the initiating user, staged publication keeps its metadata more reliably, and package mutation/owner/team/star flows were tightened to match expected registry semantics.

### Security, packaging, and platform support
**A security fix landed for bundled picomatch** — repeated-wildcard glob inputs are now patched against a ReDoS issue.

**Standalone distribution got broader Linux packaging** — pnpm now publishes an RPM and dnf repo for RHEL 8+ users, making installation easier on enterprise Linux systems.

**Platform-specific install behavior improved** — Windows network-share installs now choose an openable link type, Ctrl+C is honored before native launch, and memory use in pnpr was reduced with allocator changes and purge-on-start behavior.

### Other misc changes
- Audit now handles string advisory IDs, `time.unpublished: null`, and more dependency source types
- `pnpm view` prints the source registry; install summaries restore available-version hints
- `pnpm list`, `why`, `outdated`, `dedupe`, and `ci` received smaller correctness/UX fixes
- Cargo, Python, and workspace importer support got several targeted fixes
- Docs, CI, release workflow, and dependency bumps throughout
