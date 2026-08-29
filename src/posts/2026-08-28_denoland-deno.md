---
date: 2026-08-28
repo: denoland/deno
size: M
title: "Release forward plus key fixes land"
excerpt: "Deno fixes CLI passthrough and bundle sourcemap parsing, patches declaration emit diagnostics, and updates desktop/release workflows."
commits: 6
authors: [bartlomieju, crowlKats, denobot]
commit_authors: {"f782223": bartlomieju, "8dbb56a": bartlomieju, "baca93a": bartlomieju, "06b939f": crowlKats, "6e56043": denobot, "122bd67": bartlomieju}
---

**Fix deploy/sandbox passthrough args duplication** (f782223)
`deno deploy` and `deno sandbox` now rely on the shared trailing-arg handling instead of copying `result.trailing` again, which was duplicating every forwarded argument. The added tests lock in verbatim passthrough behavior for flags like `--`, `--prod`, and sandbox mode.

**Ignore bundled asset diagnostics during declaration emit** (8dbb56a)
Declaration emit no longer surfaces type errors coming from Deno's internal `asset:///` bundled declaration files when a user supplies a custom `compilerOptions.lib`. That avoids false failures on errors users can't fix, while still reporting real diagnostics in user code.

**Restore optional `--sourcemap` semantics for `deno bundle`** (baca93a)
`--sourcemap` is now treated as an optional, `=`-required value: bare `--sourcemap` means linked sourcemaps and does not consume the next positional argument. The parser now rejects invalid values instead of silently coercing them, and tests cover linked/inline/external cases.

**Complete desktop window close and fix Linux NAPI symbol export** (06b939f)
The desktop runtime now calls `Window::close()` after receiving the close-requested event, matching laufey's deferred-close behavior so the native close button works again. On Unix, it also switches to libc's `RTLD_*` constants and warns more loudly when `dlopen(..., RTLD_NOLOAD|RTLD_GLOBAL)` fails, because that can break Node-API addon loading.

**Allow manual re-runs of post-publish with explicit version** (122bd67)
The release post-publish workflow can now be triggered manually with a required version input, which helps recover from partial release failures. It also reads `CLOUDFLARE_ZONE_ID` from secrets instead of vars, tightening how the CDN purge is configured.

### Other misc changes
- Forwarded v2.9.6 release commit to main, including version/workflow bumps and release notes (6e56043)
- CI cache key namespace bump in generated workflows (6e56043)
