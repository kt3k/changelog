---
date: 2026-03-11
repo: oven-sh/bun
size: L
title: "Windows CRT fix, cache hashing, and baseline checks"
excerpt: "Bun tightened Windows linking, fixed spawnSync and fs flag handling, and added stronger baseline verification plus transpiler cache invalidation."
commits: 5
authors: [dylan-conway, robobun, Jarred-Sumner, Hona]
commit_authors: {"9d51af8": dylan-conway, "7a498af": robobun, "91c7927": Jarred-Sumner, "5296e99": Hona, "fbfd069": dylan-conway}
---

### **Fix Windows vendor sub-builds from leaking the dynamic CRT** (9d51af8)
Bun now explicitly sets `CMAKE_MSVC_RUNTIME_LIBRARY` to static CRT mode and forwards that setting into nested CMake builds, preventing `/MD` from sneaking into vendored sub-builds. A new Windows PE import allowlist test makes CI fail if `bun.exe` ever starts importing `VCRUNTIME140.dll` or other non-system DLLs.

### **Prevent `spawnSync` from draining microtasks** (7a498af)
The isolated event loop used by `Bun.spawnSync` now suppresses microtask drains so it can process subprocess I/O without accidentally running user JS from the shared JSC microtask queue. This closes a subtle cross-contamination bug that could have triggered callbacks at the wrong time.

### **Include `--feature` flags in transpiler cache hashing** (91c7927)
Runtime transpiler cache keys now incorporate bundled feature flags, and the flags are sorted first so CLI order does not affect the hash. That prevents stale cached output when `feature("...")`-guarded code is compiled under different `--feature` settings.

### **Fix Windows numeric `fs.open` flags translation** (5296e99)
Numeric open flags from `fs.constants` on Windows are now converted from MSVC/libuv values into Bun’s internal flag representation before reaching libuv. This fixes `fs.openSync` and `fs.promises.open` failures like `EINVAL`, and prevents flags such as `O_CREAT` from being silently dropped.

### **Add static baseline CPU instruction verifier** (fbfd069)
Bun’s baseline verification pipeline now includes a static scanner that disassembles `.text` and flags instructions above the target ISA before emulator-based tests run. This catches `-march` leaks and other baseline violations earlier, making regressions much harder to miss.

### Other misc changes
- Baseline WebKit artifact selection updated for baseline builds.
- CI baseline verification now uses the `bun-profile` artifact and builds the static scanner first.
- Minor internal refactors and test additions around the new baseline/static-check tooling.
