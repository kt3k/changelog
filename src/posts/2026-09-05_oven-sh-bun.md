---
date: 2026-09-05
repo: oven-sh/bun
size: L
title: "Bun fixes compressed fetch and worker delivery"
excerpt: "Brotli/zstd streaming now drains fully, worker message delivery is documented and aligned with browser semantics, and bundler hashes avoid collisions."
commits: 8
authors: [robobun, Jarred-Sumner, dylan-conway]
commit_authors: {"f42e980": robobun, "bdbe669": robobun, "c01965f": Jarred-Sumner, "76e9dcc": robobun, "7b0b70e": robobun}
---

**Bundler output names now widen colliding hashes** (c01965f)
`[hash]` is still 8 chars by default, but if two different outputs would print the same name Bun now extends them just enough to distinguish them, and adds `[hash9]` through `[hash13]` for wider minimums. This closes a real collision bug in split bundles and updates the API/docs/types accordingly.

**Fetch now drains flushed brotli bodies fully** (bdbe669)
Brotli decoding no longer stops after the first output window when the decoder still has buffered bytes from a flush. That fixes streaming responses where a flushed chunk could be truncated until more compressed input arrived.

**Fetch now drains flushed zstd bodies fully** (f42e980)
Zstd streaming decode now keeps calling the decoder with empty input when it has more output buffered, instead of waiting for the next compressed chunk. This fixes flushed responses so a large decoded chunk is delivered in one read instead of being split or delayed.

**Worker message delivery now matches browser semantics** (76e9dcc)
Messages sent to a `Worker` before its script installs a `message` handler are now treated like browsers: they can be dropped once the worker has started running, rather than being implicitly queued forever. The docs and tests now spell out the distinction from `node:worker_threads`, which keeps queuing on `parentPort` until a listener exists.

**Bun.Image gains CMYK/YCCK JPEG decoding** (7b0b70e)
`Bun.Image` can now decode 4-component JPEGs instead of failing after metadata extraction, covering CMYK and YCCK inputs. That removes a hard decode failure for a whole class of images and expands compatibility with common image pipelines.

### Other misc changes
- Version bumps/releases: 3 commits
- WebKit dependency update: 1 commit
