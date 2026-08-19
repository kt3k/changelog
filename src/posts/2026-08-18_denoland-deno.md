---
date: 2026-08-18
repo: denoland/deno
size: M
title: "Deno fixes npm resolution and CI stability"
excerpt: "Two npm resolver fixes plus CI/test hardening: better peer package IDs, bare npm prerelease fallback, and less flaky runners."
commits: 5
authors: [bartlomieju]
commit_authors: {"4de6697": bartlomieju, "6e0621c": bartlomieju, "72eb21f": bartlomieju, "d63aa22": bartlomieju, "f01fe6f": bartlomieju}
---

**Bare `npm:` specifiers now fall back when `latest` is too new** (4de6697)
The npm resolver now retries bare package requests against the newest version allowed by the dependency date when the `latest` dist-tag is too new, instead of failing outright. This restores resolution for packages that only publish prereleases and keeps explicit version/range requests unchanged.

**Peer package IDs are flattened when a resolution is unambiguous** (f01fe6f)
Package ID generation now avoids recursively expanding peers that only resolve one way in the graph, preventing peer trees from exploding into long, duplicated IDs. That makes npm package IDs more stable and much less likely to grow exponentially in deep peer graphs.

### Other misc changes
- CI: cap node_compat and sysroot setup steps with timeouts; disable fail-fast on node_compat shards; hash shard assignment to avoid runner starvation (6e0621c, d63aa22)
- Test expectation tweak for import redirect size output (72eb21f)
