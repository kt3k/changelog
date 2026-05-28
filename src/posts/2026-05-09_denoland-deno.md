---
date: 2026-05-09
repo: denoland/deno
size: L
title: "Deno lands major node-compat and perf work"
excerpt: "Big Node.js compatibility additions, a TLA deadlock fix, task output labeling, and several lazy-loading perf wins."
commits: 10
authors: [bartlomieju, divybot, nathanwhit]
commit_authors: {"8e4c3be": bartlomieju, "443a427": bartlomieju, "d7b5c73": divybot, "862042e": nathanwhit}
---

**Node’s `SourceMap` API lands in `node:module`** (8e4c3be)
Deno now implements `SourceMap` with VLQ decoding, `findEntry()`, `findOrigin()`, index source map support, payload cloning, and `findSourceMap(path)` for both external and inline maps. That fills a notable gap in `node:module` compatibility and should help tooling that inspects transpiled stack traces.

**Task runner now labels parallel output by task** (6aaaa90)
When `deno task` runs dependencies in parallel, each line of stdout/stderr is prefixed with the task name so interleaved logs are easier to follow. The change also adds a `--no-prefix` flag for users who want the old behavior.

**Fixes a top-level await deadlock in async module graphs** (443a427)
The module evaluator now keeps draining microtasks for async graphs even if `has_tick_scheduled` is set, preventing evaluation promises from getting stuck pending. This addresses a real hang where TLA could never resolve under certain event-loop ordering.

**Improves `node:repl` compatibility and internal REPL wiring** (862042e)
Deno adds an `internal/repl` polyfill and hooks it into the Node compat layer, while also expanding REPL behavior to pass 21 more `node:repl` tests. This narrows one of the rougher edges in the Node emulation story.

**Fixes `tls.createSecureContext()` validation for PEM, PFX, and CRLs** (d7b5c73)
The TLS path now validates PKCS#12/PFX and CRL inputs up front, and PEM parsing is normalized for 76-character base64 line widths. That should make `createSecureContext({ pfx, passphrase })` and `{ crl }` fail with the right errors instead of misbehaving later.

### Other misc changes
- Large Node internals moved to lazy-loaded ESM/JS for startup and memory improvements (3 commits)
- Added Claude Code skills for review, triage, linting, and formatting
- Ignored a set of `test-domain-no-error-handler-abort-on-uncaught` Node-compat tests that rely on unsupported `--abort-on-uncaught-exception` behavior
