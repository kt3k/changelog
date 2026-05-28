---
date: 2026-05-02
repo: nodejs/node
size: M
title: "llhttp upgraded, undici updater simplified"
excerpt: "llhttp jumps to 9.4.1 with packaging/API updates; the undici dependency updater switches to tarballs and a leaner temp-file flow."
commits: 2
authors: [nodejs-github-bot, aduh95]
commit_authors: {"13e90d0": nodejs-github-bot, "11112fc": aduh95}
---

### **llhttp updated to 9.4.1 with new parser options** (13e90d0)
The bundled llhttp dependency was bumped to 9.4.1, bringing a sizable upstream refresh plus packaging changes for CMake consumers. The update also adds `llhttp_set_lenient_header_value_relaxed()`, which allows relaxed control-character handling in header values, and updates the docs to reflect the new parser behavior.

### **Undici updater now fetches tarballs and cleans up more simply** (11112fc)
`tools/dep_updaters/update-undici.sh` was streamlined to use a tar.gz archive instead of a zip, with simpler temp-file cleanup and more verbose shell tracing. This reduces script complexity and makes the update flow easier to maintain.

### Other misc changes
- llhttp LICENSE and README wording updates
- llhttp CMake/package metadata adjustments
- Minor path/quoting cleanup in the undici updater
