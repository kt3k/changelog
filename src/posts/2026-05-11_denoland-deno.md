---
date: 2026-05-11
repo: denoland/deno
size: L
title: "Deno speeds up Node/Web polyfills and fixes installs"
excerpt: "Major lazy-loading and performance work lands for polyfills, plus fixes for global installs, workspace scanning, and npm resolution."
commits: 9
authors: [bartlomieju, lunadogbot, nathanwhit]
commit_authors: {"4107599": nathanwhit, "05e01ff": bartlomieju, "86a5745": bartlomieju, "a479327": bartlomieju, "ab074be": lunadogbot, "2588e14": bartlomieju, "f1ed5ad": bartlomieju, "94d1cac": bartlomieju, "d40a2d5": bartlomieju}
---

**Node polyfills keep moving off the eager path** (05e01ff, 94d1cac, d40a2d5)
Deno continued splitting `node:*` polyfills into lazy-loaded JS/ESM wrappers, now covering `cluster`, `console`, `constants`, `crypto`, `dgram`, `dns`, `timers`, `tls`, `tty`, `url`, `v8`, `worker_threads`, `zlib`, and more. This reduces startup work for apps that don’t import those built-ins, while keeping the public `node:` specifiers intact.

**Web collections get linear-time mutation paths** (2588e14)
`FormData`, `URLSearchParams`, and `Headers` now use a single-pass compaction approach for `set`/`delete` instead of splicing repeatedly while iterating. That removes the quadratic behavior for duplicate-heavy inputs and should noticeably improve worst-case performance.

**Global npm installs now handle native bin entries correctly** (f1ed5ad, a479327)
`deno install -g npm:<pkg>` can now detect when a package’s `bin` points at a real native executable and generate a shim that `exec`s it directly. A follow-up tightened detection so JS scripts with non-Node shebangs, like `#!/usr/bin/env deno`, still get wrapped with `deno run` instead of being misclassified as binaries.

**Workspace CLI include paths are clamped per member** (ab074be)
Running `deno fmt .` or `deno lint .` from a workspace root no longer causes every member to traverse the entire workspace tree. The new scoping logic avoids duplicate scans and stack overflows on large repos.

**byonm resolver now handles tag specifiers** (4107599)
The npm byonm resolver gained missing tag-version handling, fixing tagged package requests that previously failed to resolve.

**Cron and KV extension generics were removed** (86a5745)
`deno_cron` and `deno_kv` dropped their generic backend parameters and were simplified around trait objects. This trims monomorphization and makes the extension definitions easier to maintain.

### Other misc changes
- Dependency/builder refactors in Node polyfills and extension registration.
- Minor test updates and internal file moves tied to the lazy-loading/perf work.
