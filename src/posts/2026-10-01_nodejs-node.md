---
date: 2026-10-01
repo: nodejs/node
size: L
title: "OpenSSL 3.5.9 lands, plus crash fixes"
excerpt: "OpenSSL is bumped to 3.5.9, and Node patches several crash/termination bugs in test runner, FFI, and SQLite."
commits: 8
authors: [nodejs-github-bot, Renegade334, faizanu94, trivikr, araujogui]
commit_authors: {"5bfa451": nodejs-github-bot, "21090da": faizanu94, "cede7e6": trivikr, "5ebe0eb": araujogui}
---

**OpenSSL updated to 3.5.9** (5bfa451)
Node vendored OpenSSL source and arch metadata were refreshed to 3.5.9. This pulls in the upstream release’s security and bug fixes, including a DTLS retransmission memory disclosure/DoS fix and several QUIC and timing-side-channel fixes.

**Test runner no longer crashes on stdout that looks like a V8 frame** (21090da)
The test runner now resynchronizes its mixed stdout/report stream more defensively and catches deserialize failures instead of letting them abort the whole run. That closes a parser edge case where ordinary output could be mistaken for framed protocol data.

**FFI callbacks now survive Worker termination** (cede7e6)
Stopping a Worker while it is inside an FFI callback no longer aborts the process. The native callback path now treats termination as a normal unwind and returns zeroed values, which prevents "Callbacks cannot throw an exception" crashes in worker shutdown paths.

**SQLite reopens now restore connection state** (5ebe0eb)
Reopening a `DatabaseSync` now reapplies saved limits, reinstalls the authorizer callback, and preserves the current extension-loading setting. This fixes silent policy loss after `close()`/`open()` and keeps reopened connections consistent with prior configuration.

### Other misc changes
- Removed the orphaned `js_udp_wrap` test binding.
- Tweaked the OpenSSL update workflow to keep update PRs draft until arch files are committed.
- Bumped bundled `gyp-next` to 0.22.3 and picked up its generator/CI updates.
