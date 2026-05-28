---
date: 2026-04-28
repo: denoland/deno
size: L
title: "Geometry, upgrades, and a big Node TLS push"
excerpt: "Added Geometry Interfaces, delta upgrade patches, and a raft of Node/http2, DNS, TLS, and deploy fixes."
commits: 32
authors: [divybot, nathanwhitbot, bartlomieju, fibibot, petamoriken, denobot, avocet-bot]
commit_authors: {"f092a50": petamoriken, "cf1883d": bartlomieju, "5dca210": bartlomieju, "304a644": avocet-bot}
---

**Unstable Geometry Interfaces Module Level 1 lands** (f092a50)
Deno now exposes the Geometry Interfaces Module API, including `DOMMatrix` and related init/types, plus the underlying web/IDL and runtime plumbing. This is a sizable new web platform surface area for matrix/geometry work in unstable mode.

**`deno upgrade` now supports delta patches** (cf1883d)
Upgrades can download and apply bsdiff-based incremental patches instead of full release archives, cutting typical download size dramatically. The release pipeline was also updated to build, checksum, upload, and publish the new `.bsdiff` artifacts.

**Node TLS client cert auth got stricter and more compatible** (5dca210)
TLS client certificate verification now normalizes additional PEM header variants, performs real chain checking for X.509v1 certificates, and wires server-side `verifyError()` to client-cert failures. This closes correctness gaps in `node:tls` authentication that could previously accept bad chains or hide verification errors.

**Deploy config no longer excludes workspace members** (304a644)
Workspace-root deploy configs stopped auto-excluding every workspace member directory, which had been producing empty manifests and failed deploys. The new tests lock in correct behavior for root-level and mixed root/member deploy setups.

### Other misc changes
- HTTP/2 compatibility fixes across ping ACK handling, SETTINGS forwarding, origin round-trips, frame-error reporting, stream shutdown ordering, sensitive header exposure, and file/FD cleanup.
- DNS Resolver `cancel()` and `timeout` support added for Node compat.
- `Deno.listenDatagram()` now defaults to `0.0.0.0` instead of `127.0.0.1`.
- `tls.createSecureContext()` now rejects invalid cipher strings.
- `require()` now returns the proper invalid-argument error codes.
- `fs.watch`/`fs.promises.watch` option validation and `ignore` support.
- `MessageEventInit.source` retention fix.
- Release/version bump to 2.7.14 and assorted CI/release workflow updates.
- Several Node compat tests were enabled or ignored.
