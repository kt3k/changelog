---
date: 2026-10-18
repo: nodejs/node
size: M
title: "Process finalization gets unregister callbacks"
excerpt: "A new unregister function lands for process finalization, alongside CI and tooling fixes for Windows, UTF-8 handling, and safer dependency updates."
commits: 5
authors: [inoway46, marco-ippolito, panva, mcollina, dsanders11]
commit_authors: {"4737802": dsanders11, "e463b48": inoway46, "947b9a3": marco-ippolito, "e2d5522": panva, "9a9f7e8": mcollina}
---

**`process.finalization.register()` now returns an unregister function** (9a9f7e8)
`process.finalization.register()` and `registerBeforeExit()` now return a function that removes just that registration without keeping the tracked object alive. The underlying registry also switches to using each registration as its unregister token, which fixes `process.finalization.unregister()` actually clearing FinalizationRegistry entries.

### Other misc changes
- Tools workflow now skips dependency update PRs if the existing branch has non-bot commits, avoiding accidental overwrites (947b9a3).
- Test runner now tolerates invalid UTF-8 in captured stdout/stderr by replacing malformed bytes instead of crashing (e2d5522).
- Windows coverage CI now fails on missing GYP sources instead of only warning, catching stale project references earlier (e463b48).
- OpenSSL unreadable-config test is skipped under BoringSSL, where the default config file behavior differs (4737802).
