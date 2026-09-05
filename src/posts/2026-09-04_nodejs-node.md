---
date: 2026-09-04
repo: nodejs/node
size: L
title: "Permission audit, VFS addons, and worker startup"
excerpt: "Node gets audit-mode permission fixes, VFS native addon loading, a worker snapshot startup path, and a stream/crypto performance pass."
commits: 21
authors: [aduh95, mcollina, deepak1556, panva, HoonDongKang, theSnackOverflow, o-, everett1992, pipobscure, codebytere, christianaurichzm, sjungwon03]
commit_authors: {"2384897": panva, "f85bb5e": theSnackOverflow, "68e0ce0": mcollina, "ccd648e": o-, "30f4990": deepak1556, "ee36353": pipobscure, "dd0f203": mcollina, "ddc0a0a": codebytere}
---

### **Permission audit stops denying fs/addon paths** (f85bb5e)
`--permission-audit` now reports violations without blocking `fs.lstat()`, `fs.symlink()`, or native addon loading. The env bootstrap no longer disables addons up front in audit mode, so the denial is surfaced through diagnostics channel instead of turning into an immediate access error.

### **Native addons can load from mounted VFS paths** (ee36353)
Node can now `require()` `.node` addons that live inside a mounted virtual file system. The implementation reads the addon bytes from the VFS and loads them from a private temporary image, which unblocks VFS-backed packages without changing behavior for addons on disk.

### **Workers start from the built-in snapshot** (ddc0a0a)
Worker threads now deserialize a bootstrapped context from the built-in snapshot instead of running the full internal bootstrap from scratch. This should shave a big chunk off cold start, and it adds a `--no-worker-snapshot` escape hatch for reverting to the old path.

### **Inspector avoids JS execution from V8 interrupts** (30f4990, ccd648e)
Node now defers inspector work that would otherwise run inside V8 interrupt callbacks, using microtasks or immediates where needed. The V8 backport also turns on a contract check that forbids JavaScript execution from API interrupt callbacks, tightening this class of re-entrancy bugs.

### **Streams skip wasted EOF readable ticks** (68e0ce0)
Readable streams no longer schedule a deferred `'readable'` emission at EOF when nobody is observing the stream. That removes a pointless tick on idle end-of-stream paths while preserving late listener behavior and `read()`/`resume()` semantics.

### **HTTP teardown fast-forwards unread responses** (dd0f203)
Unread incoming messages now bypass extra `resume()` machinery when a response finishes, reducing nextTicks on the hot path. The change trims per-request overhead in simple HTTP servers and is a small but real throughput win.

### **ECDH validation results are cached** (2384897)
`computeSecret()` avoids revalidating ECDH key pairs once they’ve already been established or checked, with cache invalidation when the public key can change. This reduces repeated crypto overhead in common reuse patterns.

### Other misc changes
- Build/config flags for shared Abseil and Highway, plus related tooling updates.
- Docs updates for `fs.mkdtemp*`, VFS permissions, and CLI flags.
- TypeScript typings for ffi and performance bindings.
- Minor fixes in errors, cleanup hooks, contributor workflow, and other internal tooling.
