---
date: 2026-09-01
repo: nodejs/node
size: M
title: "Docs and deps refresh, plus perfetto fix"
excerpt: "Collaborator workflow docs were expanded, core deps were updated, and perfetto gained an x64 CPU guard to avoid crashes on unsupported machines."
commits: 8
authors: [nodejs-github-bot, panva, aduh95]
commit_authors: {"5c447f6": panva, "f9ab994": aduh95, "242909f": nodejs-github-bot, "46c8af4": nodejs-github-bot, "50bdfd6": nodejs-github-bot, "6c7e226": nodejs-github-bot, "3475dac": nodejs-github-bot, "f80223c": nodejs-github-bot}
---

### **Document collaborator automation and triage flow** (5c447f6)
Expanded the collaborator guide with clearer guidance on stale automation, fast-track approvals, commit queue usage, needs-ci semantics, and the repo’s pinned triage views. This should make day-to-day PR handling more consistent and reduce label/queue confusion.

### **Update perfetto to 58.2 with x64 CPU checks** (3475dac)
Perfetto was bumped to 58.2, and the embedded SDK now includes a startup guard that checks for required x86_64 CPU features before running optimized code. That prevents hard-to-diagnose crashes or illegal-instruction failures on machines lacking SSE4.2, AVX2, BMI2, POPCNT, or LZCNT.

### **Refresh Corepack to 0.36.0** (46c8af4)
Corepack picked up a new release with support for unverified-download policy controls and improved handling of `devEngines.packageManager` ranges. The bundled docs and generated runtime were updated accordingly, so Node’s packaged package-manager shim reflects the latest behavior.

### **Update GoogleTest and Simdjson vendored deps** (50bdfd6, 6c7e226)
Vendored testing and JSON parsing libraries were synced to upstream revisions. The simdjson update also includes a depth check and a safer string comparison path in generated code, which helps avoid out-of-bounds behavior in edge cases.

### **Other misc changes**
- WPT URL fixtures updated to a newer upstream commit (242909f)
- Skip `fs-watch-recursive-delete-race` on AIX (f9ab994)
- Nixpkgs pins refreshed for macOS/build tooling (f80223c)
