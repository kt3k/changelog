---
date: 2026-06-30
repo: denoland/deno
size: L
title: "Desktop gets deep links and CI skips docs"
excerpt: "New desktop URL-scheme registration, a check flag for desktop libs, and CI/doc improvements; plus several important fixes to fetch, install, core, and HTTP."
commits: 8
authors: [bartlomieju, crowlKats, nathanwhit, sectore]
commit_authors: {"2f4bef6": bartlomieju, "c0a6876": nathanwhit, "6dc4f41": sectore, "cde65fe": crowlKats, "99a45db": crowlKats, "dfa8715": bartlomieju, "c3c632b": bartlomieju}
---

**Desktop apps can now register custom URL schemes at bundle time** (c3c632b)
Adds a `desktop.app.deepLinks` config option and wiring to emit OS-specific registration metadata for macOS, Linux, and Windows. This is the first half of deep-link support: apps can declare schemes like `acme://`, with validation to reject malformed or reserved schemes.

**`deno check` gains a `--desktop` type-checking mode** (cde65fe)
`deno check --desktop` now uses the `deno desktop` type libraries instead of `deno.window`, so desktop-targeted code can be type-checked without a full build. The new flag is covered by dedicated CLI and spec tests.

**Fetch now reports the real `file://` open error** (2f4bef6)
When a local file can’t be opened, `fetch()` no longer collapses everything into a generic network error. The error now includes the file URL and underlying filesystem failure, which makes missing embedded assets and broken desktop/compiled app paths much easier to diagnose.

**Fast-call upgrades now reach residual core clones** (c0a6876)
The deferred V8 fast-call upgrade path now mirrors upgraded op functions onto the captured bootstrap clone of `Deno.core.ops`, not just the main ops table. That fixes a subtle bootstrap/runtime split where residual extension modules could keep calling the slow versions.

**HTTP fixed responses no longer resend the head on flush** (6dc4f41)
A missing `write_flushed` update in `poll_start_fixed_response_with` is restored, preventing the response head from being emitted again as body data after a `Pending` flush. This fixes a bad response corruption case for fixed-length streamed responses.

**Desktop launchers now resolve symlinks before locating the backend** (99a45db)
Linux desktop launchers use `readlink -f` on `$0` before deriving their install directory, so `.deb`/`.rpm` symlinked launchers can find the bundled backend correctly. This addresses broken backend discovery for packaged desktop apps.

**npm dist-tag installs now pin pre-release versions correctly** (dfa8715)
Installing a dist-tag that resolves to a pre-release now records and installs that exact pre-release instead of silently drifting to an older matching build. This fixes mismatches between what `deno install` prints, what lands in `package.json`, and what gets written to `deno.lock`.

### Other misc changes
- Docs-only CI fast path and new `doc/` architecture/codebase docs (1 commit)
- Desktop config/bootstrap plumbing for deep links
- Additional tests and fixture updates across fetch, install, check, and desktop
