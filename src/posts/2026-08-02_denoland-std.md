---
date: 2026-08-02
repo: denoland/std
size: L
title: "Std stabilizes streams, zip, and async pool"
excerpt: "New async pooling and API stabilizations landed, plus a CBOR fix and doc/test updates across the repo."
commits: 9
authors: [tomas-zijdemans, bartlomieju]
commit_authors: {"2835848": tomas-zijdemans, "d0a53f0": tomas-zijdemans, "80a56c0": tomas-zijdemans, "87b64ab": tomas-zijdemans}
---

**Abort-aware pooled mapping lands in `@std/async/unstable-pool` (d0a53f0)**
Adds a new concurrent `pooledMap` API with support for `AbortSignal`, letting callers cancel queued work while allowing in-flight tasks to settle. The new unstable entrypoint and tests make this a substantial async utility addition.

**CBOR object encoding now skips inherited enumerable keys (80a56c0)**
Object encoding was tightened to use `Object.keys()` consistently in both size calculation and serialization, fixing a bug where inherited enumerable properties could leak into encoded output. This changes real encoded bytes and closes a correctness issue.

**`BatchStream` is stabilized and exported from `@std/streams` (2835848)**
`BatchStream` has been renamed to the stable `batch-stream` entrypoint and re-exported from the streams module, making it part of the public stable API. Consumers can now import it without the unstable prefix.

**`zip()` is stabilized for iterable inputs (87b64ab)**
The collections package promotes `zip` to a stable entrypoint and rewrites the implementation/tests around the stable API. This removes the unstable module and makes tuple zipping available as a supported public utility.

### Other misc changes
- CI: stop uploading coverage to Deno Deploy (1 commit)
- Docs and contributor-guide fixes across CONTRIBUTING.md and AGENTS.md (2 commits)
- Enable previously skipped doc examples in several modules so snippets run in doc tests (1 commit)
- Remove stale lint task / fix config path typo (1 commit)
