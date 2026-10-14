---
date: 2026-10-13
repo: nodejs/node
size: M
title: "WebStreams got leaner; permissions tightened"
excerpt: "Node fixes a querystring decoding bug, improves permission model behavior, and trims WebStreams pipeTo/tee overhead."
commits: 14
authors: [RafaelGSS, aduh95, nodejs-github-bot, delucis, LiviaMedeiros, panva, mcollina, pipobscure, vedchaudhari]
commit_authors: {"04fb145": delucis, "ea6ec93": aduh95, "3f0c2e4": aduh95, "02bae37": RafaelGSS, "886c7b4": RafaelGSS, "a61da69": panva, "a67d2a8": RafaelGSS, "280ea27": RafaelGSS, "3cd33c4": nodejs-github-bot, "29bd740": mcollina, "ac9d85c": pipobscure, "8cf60c5": vedchaudhari, "c883ccf": nodejs-github-bot}
---

**WebStreams pipeTo/tee avoids extra promise churn** (29bd740)
The stream plumbing now uses shared pending promises and lightweight hooks instead of materializing observable `[[closedPromise]]` records when only internal watchers need them. That cuts allocations and keeps push-style ReadableStreams from being retained until the next microtask checkpoint, while preserving the same error/close behavior.

**Permissioned fs grants now survive dropping a covering directory** (02bae37)
Explicit file grants are now tracked separately from directory grants, so removing a broad path no longer accidentally erases a narrower grant that was added later. This fixes a correctness hole in the permission model and is backed by a new regression test.

**querystring.parse no longer corrupts values after encoded keys** (8cf60c5)
A bug in the non-default parser path could let percent-encoded key bytes interfere with value decoding, mangling non-ASCII characters. The fix keeps key characters out of the value encoding check and adds coverage for encoded-key/unencoded-value cases.

**SEA VFS mounting was reworked for workers and main-script loading** (ac9d85c)
Single-executable apps with `vfsArchive` now mount their archive at the `--vfs-load` mount point in every thread, so worker threads can load the same main script path and the archive no longer depends on a special one-off mount. The change also tightens the docs and startup validation around `--vfs-load` interactions.

**Maglev now retains embedded heap objects more safely** (c883ccf)
V8’s Maglev codegen learned to explicitly retain certain embedded heap objects, including typed array buffers used by constant-folded loads. That helps ensure code depending on those objects is deoptimized if the backing buffer dies, reducing the risk of stale embedded references.

### Other misc changes
- Temporal support enabled for no-ICU and system-ICU builds; related test adjusted (ea6ec93)
- Reverted the SEA VFS worker/archive mounting change after regressions (3f0c2e4)
- Permission fs cleanup fix for Windows path buffers (a67d2a8)
- Docs clarifications for `styleText`, permissions, and VFS examples (04fb145, 886c7b4, 280ea27)
- Daily WPT workflow tweak for Python 3.14 (a61da69)
- GoogleTest and V8 dependency bumps/patches (3cd33c4)
