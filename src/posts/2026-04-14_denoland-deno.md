---
date: 2026-04-14
repo: denoland/deno
size: M
title: "Canary upgrade note, lint false positives fixed"
excerpt: "Deno adds a retention warning for missing canary upgrades and tightens a lint plugin to avoid false positives in polyfills."
commits: 2
authors: [crowlKats, bartlomieju]
commit_authors: {"d98d2d8": crowlKats, "20a1a36": bartlomieju}
---

### **Warn when a canary upgrade is no longer available** (d98d2d8)
If `deno upgrade` can’t find the requested version and that version is on the canary channel, it now prints a note that canary releases are only retained for 30 days. This should make upgrade failures less confusing for users trying to install an expired build.

### **Fix false positives in the node polyfill API lint** (20a1a36)
The CI lint plugin was adjusted so it stops flagging a handful of legitimate polyfill files as violations, and the lint invocation now disables tag-based rules for that check. This reduces noisy failures and makes the polyfill API guard more reliable.

### Other misc changes
- None
