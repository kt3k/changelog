---
date: 2026-07-05
repo: denoland/deno
size: S
title: "Dprint stops touching lzld submodule"
excerpt: "A formatting config tweak excludes tools/lzld so `./x fmt` won’t dirty that submodule anymore."
commits: 1
authors: [sectore]
commit_authors: {"4a2a688": sectore}
---

### Other misc changes
- Excluded `tools/lzld` from dprint formatting to prevent `./x fmt` from modifying submodule files (4a2a688).
