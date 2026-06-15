---
date: 2026-06-14
repo: nodejs/node
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Node hardens core APIs while adding package maps and fs buffers"
excerpt: "This week brought package maps, caller-supplied fs.readFile buffers, OpenSSL 3.5.7, plus crypto, QUIC, HTTP/2, and watcher fixes."
commits: 53
---

### Major features and platform changes
**Experimental package maps for module resolution** — Node added `--experimental-package-map`, enabling JSON-driven control over which packages may import which dependencies, with resolver logic, errors, docs, and tests.

**fs.readFile() can read into caller-provided buffers** — `fs.readFile()` and `fsPromises.readFile()` now support a supplied buffer or buffer factory, reducing allocations and giving callers tighter memory control.

**socket.setKeepAlive() exposes more TCP tuning** — `interval` and `count` options were added so long-lived connections can configure probe cadence and drop thresholds directly.

**Debugger probe mode gains max-hit stopping** — `--max-hit` lets probe sessions terminate after a per-probe hit limit instead of waiting for timeout or exit.

### Security, crypto, and networking updates
**OpenSSL upgraded to 3.5.7** — Node pulled in upstream security fixes, including a high-severity PKCS7 use-after-free and other moderate/low advisories.

**Crypto import paths and hash failure handling tightened** — KeyObject/WebCrypto conversion and native key handling were refactored for better validation and lower overhead, and Hash streams now correctly surface native update failures.

**QUIC and HTTP/3 callbacks expanded** — `session.onapplication` now reports late-arriving application settings, and `listEndpoints` was restored on the public QUIC API surface.

### Core correctness, performance, and diagnostics
**Buffer.copy uses V8 byte-copy APIs** — Buffer copies now route through V8’s new byte-copy helpers, improving partial-copy performance and handling detached or immutable backing stores correctly.

**HTTP/2 and stream accounting fixes** — HTTP/2 now keeps header blocks charged while streams are alive, and `pipeToSync()` no longer counts rejected writes as accepted bytes.

**Watcher, VM, and URL fixes** — Recursive `fs.watch()` no longer drops sibling paths by prefix, Proxy-backed vm sandboxes now resolve own properties correctly, and `URLSearchParams(null)` now serializes to `null=` per spec.

**Memory and embedders** — Weak `BaseObject`s are no longer tracked as Realm children, startup snapshots now align `argv` layout with normal module startup, and `node::ObjectWrap` is now officially deprecated.

### Other misc changes
- Prototype-pollution linting was expanded to cover more option-taking APIs.
- `styleText()` was simplified by removing slow-path style cache usage.
- `test_runner` watch mode, immediate draining, and assorted tests/docs/build dependencies were cleaned up.
- Misc dependency bumps and tooling updates landed across undici, ngtcp2/nghttp3, OpenSSL configs, and docs.
