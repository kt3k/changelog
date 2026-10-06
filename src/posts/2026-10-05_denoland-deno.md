---
date: 2026-10-05
repo: denoland/deno
size: M
title: "npm installs get faster; Node/N-API fixes"
excerpt: "Deno speeds up npm metadata fetches under minimumDependencyAge and fixes Node assert and N-API exception behavior."
commits: 3
authors: [dsherret, Medo-ID, hexbinoct]
commit_authors: {"3d44d1d": dsherret, "7a96f1b": Medo-ID, "17410fd": hexbinoct}
---

### **Fetch abbreviated npm packuments when safe** (3d44d1d)
Deno now chooses abbreviated npm metadata responses more intelligently during install and related resolution flows, even when minimumDependencyAge is enabled. This trims registry payloads and should reduce install-time network overhead without sacrificing the age-gating behavior.

### **Fix Node assert message functions and formatting** (7a96f1b)
The Node assert polyfill was updated to support message functions and variadic format arguments more faithfully. That brings compatibility closer to Node for `assert.*` calls that rely on lazy message generation or structured formatting.

### **Ignore N-API callback return values after exceptions** (17410fd)
N-API function calls now match Node’s behavior by ignoring addon return values once an exception is pending, avoiding invalid result propagation after a throw. The fix also tightens `napi_create_dataview` so out-of-range arguments return `napi_pending_exception` and leave the result unset.

### Other misc changes
- npm metadata/cache plumbing refactor to support packument format selection
- Test coverage added for abbreviated packuments, assert compatibility, and N-API exception edge cases
- Minor registry/LSP installer wiring updates
