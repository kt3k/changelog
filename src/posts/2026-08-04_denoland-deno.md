---
date: 2026-08-04
repo: denoland/deno
size: L
title: "QuickJS, permissions, and inspector hardening"
excerpt: "Major runtime feature work plus fixes for publish, bundle permissions, DNS formatting, and inspector security."
commits: 11
authors: [nathanwhit, bartlomieju, crowlKats, rathodkunj2005]
commit_authors: {"85a2842": nathanwhit, "736b50a": nathanwhit, "b82aa41": nathanwhit, "3a10142": nathanwhit, "610bdd6": nathanwhit, "76d48f6": crowlKats, "fa9ba06": nathanwhit, "9cfa6b7": bartlomieju, "49377a4": bartlomieju, "ecaa260": bartlomieju, "c347f34": rathodkunj2005}
---

**Experimental QuickJS backend lands across compile and desktop** (fa9ba06)
Deno now ships an experimental `quickjs` backend alongside the default V8 path, with new Cargo features and an `--engine v8|quickjs` selector for `deno compile` and `deno desktop`. The change also extends release CI to build and package QuickJS artifacts, making the alternate runtime a first-class option.

**Bundle() now honors filesystem permissions** (3a10142)
`Deno.bundle()` previously bypassed the caller's file permissions in some HTML-loading and output-writing paths, making it inconsistent with other runtime file APIs. This fix threads the isolate's permissions through the bundling pipeline and checks reads/writes up front so permission failures happen correctly before filesystem access.

**Inspector requests now validate Host and WebSocket origin** (85a2842)
Inspector discovery and WebSocket routing now reject invalid `Host` headers and enforce that browser-origin WebSocket upgrades match the request authority. That closes off a class of host-header confusion issues while still allowing localhost, IP-literal, and forwarded-port inspector connections.

**`deno publish` now reports rejected provenance attestations** (76d48f6)
The publish flow now checks the registry response when submitting provenance, instead of assuming success. If a registry rejects the attestation, Deno warns clearly that the package published but won't get a provenance badge, instead of silently pretending the attestation was accepted.

**DNS record formatting handles malformed text safely** (b82aa41)
Malformed CAA and NAPTR wire data is now decoded lossily instead of assuming UTF-8 and risking a panic. The DNS op also factors record formatting into a helper and adds coverage for malformed inputs, which makes `ANY` and typed queries resilient to bad byte sequences.

**Named-group Diffie-Hellman exponents now use the right bit sizes** (610bdd6)
The Node crypto DH implementation switched from byte-sized exponent constants to explicit bit counts, matching Node/OpenSSL behavior for named MODP groups. This fixes the too-small private exponents produced before and adds regression tests for all supported groups.

**`task --members` is added for workspace-scoped runs** (49377a4)
Tasks can now be restricted to workspace members only via a new `--members` flag. That gives monorepos a cleaner way to run member tasks without accidentally traversing unrelated packages.

### Other misc changes
- `node:dns.getServers()` now requires `--allow-sys` to read host resolver config (ecaa260)
- Desktop docs now specify `showContextMenu(x, y, menu)` uses window-relative CSS pixels (736b50a)
- Fixed the desktop update signature-verification op staying exposed during bootstrap (c347f34)
- Upgraded `deno_task_shell` to 0.33.3 (9cfa6b7)
