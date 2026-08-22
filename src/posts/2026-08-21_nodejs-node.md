---
date: 2026-08-21
repo: nodejs/node
size: M
title: "SQLite hardens reentry, compile cache goes portable"
excerpt: "SQLite reentry and finalization guards were tightened, while portable compile cache reuse now works across users; several docs and test-runner fixes landed too."
commits: 24
authors: [aduh95, trivikr, TrevorBurnham, codebytere, maruthang, bitpshr, jkleinsc, joyeecheung, mertcanaltin, orgads, targos, soreavis, ganjanggejang, dayun6530, o-, HoonDongKang, guhyunwoo, anonrig, PickBas, lazerg]
commit_authors: {"9677349": PickBas, "5fc9f1f": TrevorBurnham, "adad4d6": codebytere, "838a3e9": bitpshr, "15940ef": joyeecheung, "a0c366c": orgads, "3618c95": soreavis, "c2543d9": trivikr}
---

### **SQLite now blocks parameter-binding reentry** (5fc9f1f)
Node's SQLite binding now marks statements as “stepping” before parameter objects are read, so a getter cannot reenter the same statement in the binding window. That closes a race where `all()`, `get()`, `run()`, or `iterate()` could be reset twice and hand out overlapping iterators.

### **Portable compile cache is no longer split by uid** (adad4d6)
The module compile cache now keeps the same cache subdirectory in portable mode even on uid-capable platforms, so a cache generated once can be reused by any user. This makes read-only, build-time-shipped caches actually portable instead of being silently user-scoped.

### **`node --test` restores directory-as-test-search behavior** (838a3e9)
Directory arguments to `node --test` are expanded back into searches for the default test files inside them, including paths with a trailing separator. This fixes a regression where a directory pattern was treated as a file and failed with `MODULE_NOT_FOUND`.

### **SQLite finalization is blocked for busy statements in authorizers** (c2543d9)
Finalizing a statement from inside an authorizer callback is now rejected if that statement is still busy, not just if it is the one currently stepping. That prevents a paused iterator from releasing locks or otherwise changing the outcome of the outer authorization flow.

### **Windows `SIGWINCH` handling in child processes is fixed** (9677349)
`child_process.kill('SIGWINCH')` is no longer coerced into `SIGKILL` on Windows; it now surfaces `ENOSYS` and leaves the process running. The docs and tests were updated to reflect the platform-specific signal behavior.

### **OpenSSL config docs now cover empty `OPENSSL_CONF`** (a0c366c)
Node now documents that setting `OPENSSL_CONF` to an empty value skips OpenSSL config loading entirely, which is a workaround for unreadable default configs. The new test covers the Linux container case where `/etc/ssl` is inaccessible.

### **`--use-largepages` is effectively retired** (15940ef)
The large-pages build/runtime path has been removed in favor of a no-op flag that warns when enabled. This eliminates a feature that no longer works reliably and caused compatibility issues with newer V8 and WSL1.

### **TLS security-level example is repaired** (3618c95)
The TLS docs now show a runnable example with proper server certificates, matching client trust setup, and a certificate-generation command. That makes the security-level section usable instead of failing at handshake time.

### Other misc changes
- DNS `lookupService` input validation
- `sqlite` cleanup and authz docs/test adjustments
- `test_runner` mock support for dual-package conditional exports
- `--harmony-import-attributes` flag removal
- `simdutf` UTF-8 conversion optimization
- Workflow and tooling tweaks; dependency bump; doc/link updates; ABI registry entry
