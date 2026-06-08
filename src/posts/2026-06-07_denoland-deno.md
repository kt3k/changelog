---
date: 2026-06-07
repo: denoland/deno
size: L
title: "Deno hardens workspace, npm, and node internals"
excerpt: "Major workspace resolution fixes, npm prerelease handling, publish safety, and several Node/runtime bug fixes landed."
commits: 25
authors: [bartlomieju, divybot, scarf005, MaxwellCalkin, petamoriken, swandir, sijie-Z]
commit_authors: {"8ef94af": scarf005, "2fd8967": divybot, "b843ad7": MaxwellCalkin, "6a9963a": bartlomieju, "5ac9eab": divybot, "4b4e0d9": divybot, "0bc40e7": bartlomieju, "ecc3053": bartlomieju, "02e9dfa": divybot, "9c2d326": bartlomieju, "0975695": bartlomieju, "a3f46ce": bartlomieju, "45b1773": divybot, "d4666f8": divybot, "365e0de": bartlomieju, "acc328f": bartlomieju, "aa18dde": bartlomieju}
---

### **Auto-discover external import-map-linked workspaces** (a3f46ce)
Deno now discovers external `deno.json` configs referenced by path-style import map entries and links them automatically. This makes bare specifiers work correctly from external modules without requiring manual `links` entries, closing a long-standing workspace resolution gap.

### **Add prerelease-aware workspace package resolution** (0975695)
Workspace members with prerelease versions are now treated as local matches instead of being bypassed in favor of the registry. That fixes `deno run npm:<member>` and `workspace:` dependency resolution for prerelease packages, which previously could fetch the published version by mistake.

### **Instrument node:http2 with OpenTelemetry** (aa18dde)
HTTP/2 traffic now emits spans in the Node polyfill, including request metadata extraction, response status recording, and error tagging. This brings HTTP/2 tracing in line with existing `node:http` and fetch instrumentation, improving observability for h2-heavy apps.

### **Prevent serde_v8 stack overflows on deeply nested input** (6a9963a)
`serde_v8` now enforces a recursion depth limit while deserializing nested V8 values, turning a potential Rust stack overflow and process abort into a handled error. This closes a real crash vector at op boundaries where hostile or malformed input could previously take down the process.

### **Make `deno publish --dry-run` catch banned triple-slash directives anywhere** (5ac9eab)
Dry-run validation now scans beyond leading comments so forbidden triple-slash directives are detected even when they appear later in a file. That better matches registry behavior and prevents a false sense of safety before publish.

### **Preserve workspace member resolution during global installs** (0bc40e7)
Global installs now keep enough workspace context to resolve member packages correctly when a script is installed from a workspace with an explicit config. This fixes broken import-map resolution that could make installed binaries fail once relocated.

### **Clarify and enforce unscoped permissions for `Deno.symlink()`** (ecc3053)
The symlink permission model is now documented more clearly and the implementation reinforces that scoped grants are not accepted for this op. The change aligns the API with its semantics and removes confusion around why symlink targets require broader permissions.

### **Fix uncaught timer exceptions in the REPL prompt** (4b4e0d9)
Timer-thrown exceptions are now surfaced properly at the REPL prompt instead of getting swallowed. That makes debugging interactive code more predictable and matches user expectations for uncaught errors.

### **Fix `deno outdated`/`update` to include catalog deps** (365e0de)
Catalog-backed dependencies are now included in outdated/update checks, so Deno no longer skips packages just because they come from a catalog source. This makes dependency audits more complete and the output more trustworthy.

### **Warn when registry errors cause packages to be skipped in outdated** (acc328f)
`deno outdated` now reports packages it had to skip because fetching metadata failed, instead of silently omitting them. That improves diagnostics for private or unreachable registries and makes the command’s output easier to trust.

### **Catch SQLite iterator callbacks and authorizers after detach/replacement** (02e9dfa, 45b1773, d4666f8)
Several Node SQLite and V8 lifetime bugs were fixed: detached `next`/`return` callbacks now keep iterator state alive safely, authorizer replacement is guarded against reentrancy, and the V8 deserializer delegate is traced correctly across GC. These are crashy edge cases, so the fixes materially improve stability under GC and reentrant callback patterns.

### **Handle `deno add`/`npm:` workspace alias edge cases** (2fd8967, 9c2d326)
Deno’s npm/package.json handling now understands aliased `workspace:` dependencies and accepts `allow-import` for `deno add`. This improves compatibility with pnpm-style workspace layouts and reduces surprising parse/resolution failures.

### **Fix formatting/config regressions** (8ef94af, b843ad7)
Formatter configuration now supports JSON trailing commas and passes `newlineKind` through to JSON/Markdown formatters. These are small but user-visible formatting fixes that make `deno fmt` behave more consistently across file types.

### **Other misc changes**
- Added coverage for shebang doc extraction and TC39 decorator `context.access.has` behavior.
- `Deno.stdin.readable` now cancels pending reads correctly.
- `child_process.spawn` and shell-command transformation got EMFILE/compound-command handling fixes.
- Updated extension crate docs and a few small internal/CLI test tweaks.
