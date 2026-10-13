---
date: 2026-10-12
repo: oven-sh/bun
size: L
title: "Bun lands lint/format and major check fixes"
excerpt: "Native lint/format arrive, Bun learns Yarn Berry migrations, and bun check gets a big round of tsc parity fixes."
commits: 6
authors: [Jarred-Sumner, alii, MarshallOfSound, robobun]
commit_authors: {"772f87f": Jarred-Sumner, "b92e2f4": Jarred-Sumner, "d1cb7db": MarshallOfSound, "c39c718": Jarred-Sumner, "39bbb71": robobun}
---

**`bun lint` and `bun format` go native** (c39c718)
Bun adds first-class linting and formatting commands with config support for ESLint/oxlint and Prettier/oxfmt-style workflows. This is a major expansion of the CLI, bringing a large built-in toolchain and new docs/tests to support it.

**Yarn Berry lockfiles now migrate to `bun.lock`** (d1cb7db)
`bun install` can now convert Yarn 2+ lockfiles instead of rejecting them, preserving pinned versions when Bun can faithfully represent the graph. The migration handles workspaces, patches, aliases, git/tarball/file deps, catalogs, and more; when it can't preserve semantics exactly, it explains why and falls back to resolving from `package.json`.

**`bun check` closes more gaps with `tsc`** (b92e2f4)
This fixes several correctness issues around unions/intersections, readonly/private/protected property behavior, and large `paths` configs that previously caused quadratic work. It also tightens a few remaining parity differences with TypeScript in loop/destructuring cases.

**`bun check` improves circular/looped type resolution** (772f87f)
A broad refactor adjusts how `bun check` tracks in-progress resolutions, cached signatures, and loop visibility so it matches `tsc` on many more programs. The changes target subtle cases around recursive inference and Promise-like `then` resolution, reducing false errors and disagreement with TypeScript.

**DOM constructors now validate subclassing before side effects** (39bbb71)
Web-facing constructors like `WebSocket`, `Worker`, and `BroadcastChannel` now read `new.target.prototype` before creating underlying resources. That prevents cases where a thrown subclassing check would otherwise leave a socket, subscription, or thread already started.

### Other misc changes
- Shared percent-encoding helpers reused in Yarn Berry migration (1 commit)
- Docs and metadata updates for new install/lint/format behavior
- Small internal refactors and test fixture updates
