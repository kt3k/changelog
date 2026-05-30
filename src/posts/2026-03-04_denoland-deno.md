---
date: 2026-03-04
repo: denoland/deno
size: L
title: "Deno ships Node, npm, and core fixes"
excerpt: "Major core refactors landed alongside Windows named pipe HTTP support, npm resolver fixes, and a npm install startup perf win."
commits: 15
authors: [bartlomieju, dsherret, crowlKats, Tango992, nathanwhit, denobot, marvinhagemeister, Copilot]
commit_authors: {"8426078": bartlomieju, "d143d7c": Tango992, "be569cf": nathanwhit, "1e7a295": dsherret, "92ed54b": bartlomieju, "9f02e00": bartlomieju, "91e84ae": bartlomieju, "e78a7fa": denobot, "4b7bdcd": dsherret, "f85c0ca": crowlKats, "739f9ae": marvinhagemeister, "7a5efce": dsherret, "148e8a0": crowlKats, "a0133e2": Copilot}
---

### **Windows named-pipe HTTP support for Node compatibility** (fce52fa)
Deno’s Node HTTP layer now understands Windows named pipes end-to-end, so libraries that talk to Docker or other local Windows services via `socketPath` can work. The change threads a new `WindowsPipe` stream variant through net and HTTP request/property handling, plus adds connection retry behavior for busy pipes.

### **Core event-loop ordering and uv_compat refactor** (be569cf)
This is a substantial libuv-compat cleanup: the runtime event-loop phases were adjusted so idle/prepare run before I/O and check runs after it, matching libuv ordering more closely. The uv compatibility layer was also split into smaller modules, helper logic was extracted, aliasing hazards across callbacks were reduced, and new tests were added around shutdown and queue draining.

### **NextTick/immediate infrastructure was reworked, then reverted, then relanded** (91e84ae / 9f02e00 / 92ed54b)
A major core refactor moved nextTick/immediate queue handling into core with shared buffers, then was immediately reverted because it was failing on main, and then relanded with ordering fixes for `rejectionhandled` vs `unhandledrejection`. This touches core runtime internals and Node polyfills heavily, so it’s the kind of change that can affect process timing and event ordering in user code.

### **npm resolver dedup now preserves deep dependency re-resolution** (7a5efce / 739f9ae)
The npm resolver got a pair of fixes for graph consistency: one prevents a panic when a peer dependency target is missing from the snapshot, and another corrects a regression where dedup could leave dependencies unresolved. Together these improve reliability for complex dependency trees and snapshot-based installs.

### **`npm install -g deno` startup gets faster** (4b7bdcd)
The npm packaging flow now creates a symlink in `node_modules/.bin` pointing at the Deno binary, which should reduce startup overhead for global installs. The release pipeline and install/build scripts were updated to support and test the new packaging behavior.

### **Deploy config stops using the JSR API** (f85c0ca)
The deploy subcommand no longer relies on the JSR API path, which should make its behavior more self-contained and less coupled to registry internals. This is a user-visible fix for deploy flows.

### **Cargo cache version bumped in CI** (e78a7fa)
CI cache keys were invalidated by bumping the cache version, forcing fresh cache population. This is operational housekeeping rather than product behavior.

### **CI and workflow maintenance** (8426078 / a0133e2 / 148e8a0 / d143d7c / 1e7a295 / 4b7bdcd / e78a7fa)
- Fix deno_core change detection in shallow clones.
- Run node_compat_tests only on weekdays.
- Workspace/config and installer module refactors.
- Deep `assert` compatibility and other internal compatibility cleanups.
- Version/release workflow updates and dependency bumps.
