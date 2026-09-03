---
date: 2026-09-02
repo: denoland/deno
size: M
title: "Deno fixes schema IDs for VS Code validation"
excerpt: "JSON schemas now point to maintained raw GitHub URLs, preventing stale $ref resolution and validation failures in editor tooling."
commits: 1
authors: [crowlKats]
commit_authors: {"c8af01d": crowlKats}
---

### **Schema IDs now use the maintained GitHub raw endpoint** (c8af01d)
The JSON schemas under `cli/schemas/` were still advertising stale `deno.land/x/deno` `$id` URLs even though they’re maintained and consumed from `raw.githubusercontent.com`. This update rewires those IDs so cross-file `$ref` resolution works against the trusted source, avoiding editor validation failures for config, lint, registry, permission, and module graph schemas.

### Other misc changes
- None.
