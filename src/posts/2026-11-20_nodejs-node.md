---
date: 2026-11-20
repo: nodejs/node
size: L
title: "Permissions, QUIC, and exit hangs fixed"
excerpt: "Node tightens permission-model behavior, fixes a process.exit worker hang, improves QUIC early-data handling, and more."
commits: 13
authors: [RafaelGSS, Ethan-Arrowood, manzoorwanijk, jasnell, christianaurichzm, npm-cli-bot, codebytere, avivkeller, fatihguzeldev, efekrskl, ShogunPanda, LiviaMedeiros]
commit_authors: {"77fdeb6": manzoorwanijk, "3fda34e": RafaelGSS, "a506755": RafaelGSS, "dcaf43a": codebytere, "5884b8e": efekrskl, "50ba1ec": ShogunPanda}
---

### **Process exit no longer hangs waiting on V8 worker threads** (77fdeb6)
Node now handles platform shutdown with awareness of the active isolate, which lets it break a deadlock where background V8 compilation jobs could park indefinitely during `process.exit()`. The fix adds a stall-aware shutdown path that can trigger GC-like cleanup before joining worker threads.

### **QUIC servers now honor `enableEarlyData`** (5884b8e)
Server-side QUIC TLS setup now passes the `enableEarlyData` option through instead of always enabling 0-RTT. This fixes cases where early data was unintentionally allowed on servers that were configured to disable it.

### **Compile cache is automatically disabled during V8 coverage** (dcaf43a)
Node now turns off the compile cache when coverage collection starts via `NODE_V8_COVERAGE` or `--experimental-test-coverage`, avoiding misleading coverage reports from deserialized functions. The docs and status messaging were updated accordingly, and tests now account for the new behavior.

### **Permission model no longer blocks fd-based fs APIs in audit mode** (3fda34e)
`fsync`, `fdatasync`, `fchmod`, `fchown`, and `futimes` now run normally under permission audit mode instead of being denied outright. This aligns the implementation with audit-mode expectations and keeps those operations observable without being blocked.

### **Dropping fs grants now works even if the path changed type** (a506755)
Revoking filesystem permissions now matches both the original path and its wildcard form, so a grant can still be removed even if the target was created or deleted after startup. That closes a silent no-op path in permission revocation.

### **Diagnostic channel added for worker_threads main registry** (50ba1ec)
A new `worker_threads.main.registry` diagnostics channel gives observability into the main worker registry lifecycle. This should help tooling and debugging around worker-thread coordination.

### Other misc changes
- Docs clarified HTTP/1 insecure validation behavior, with matching tests.
- `AbortController`/`AbortSignal` internal object shapes were tweaked for performance.
- Added two contributors to `.mailmap`.
- Upgraded bundled npm to 12.2.3.
- JUnit reporter fixes in the test runner.
- Permission-model and test hygiene updates, including stricter `os.tmpdir()` usage in tests.
