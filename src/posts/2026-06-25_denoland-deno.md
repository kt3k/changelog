---
date: 2026-06-25
repo: denoland/deno
size: L
title: "Security hardening and key bug fixes"
excerpt: "Deno shipped npm trust-policy hardening, a default dependency-age cooldown, and several fixes across deploy, desktop, node, LSP, HTTP, and crypto."
commits: 19
authors: [divybot, nathanwhitbot, bartlomieju, nathanwhit, crowlbot, denobot, avocet-bot, littledivy, sigmaSd]
commit_authors: {"2894458": avocet-bot, "8025886": crowlbot, "5a33eed": bartlomieju, "702cafb": bartlomieju, "90d901d": nathanwhitbot, "9eeca7b": divybot, "27a0882": divybot, "5317e3c": divybot, "4068b5b": divybot, "7ba7023": divybot, "2c7612d": divybot, "04ac9f1": nathanwhitbot, "16254ac": nathanwhitbot, "57f4d00": nathanwhit}
---

### **npm resolver now uses trust-policy metadata and can block downgrades** (702cafb)
Deno's npm resolver now understands publishing trust signals from the full packument and adds an opt-in `no-downgrade` trust policy. This is a substantial supply-chain hardening change that can affect dependency selection behavior.

### **Default minimum dependency age now skips fresh npm releases** (90d901d)
The resolver now applies a default 24-hour minimum age when no other setting is configured, reducing exposure to freshly published packages. The change also adjusts precedence and parsing so `0` disables the filter, matching the new fallback behavior.

### **`Deno.serve` compression defaults to off** (57f4d00)
Automatic response compression is now disabled by default, with explicit opt-in preserved. That changes runtime behavior for served responses and avoids surprising compressed output unless callers request it.

### **Vite projects are now detected for `deno desktop` / `deno compile`** (2c7612d)
Framework detection now recognizes plain Vite apps, not just Vite SSR setups, and generates a static-site serving entrypoint with SPA fallback when there is no server file. This broadens out-of-the-box support for common Vite projects.

### **`node:vm` no longer panics on `import.meta` in `SourceTextModule`** (9eeca7b)
The VM module path now wires V8's import-meta callback through to the user's `initializeImportMeta` handler instead of crashing on unknown modules. This fixes a real Node-compatibility panic for `vm.SourceTextModule`.

### **LSP now reports `TS2307` for missing imports in `.d.ts` entrypoints** (27a0882)
The language server now surfaces unresolved imports in declaration-file entrypoints the same way `deno check` does. That closes a diagnostics gap that could hide missing dependency errors from editor feedback.

### **`node:test` mock timers now support `AbortSignal.timeout`** (5317e3c)
`mock.timers.enable({ apis: ['AbortSignal.timeout'] })` now works, letting `AbortSignal.timeout()` follow the mocked clock instead of real time. This fills an important gap in the Node test polyfill.

### **WebCrypto now pads JWKs for AES-KW wrapping** (4068b5b)
`subtle.wrapKey("jwk", ..., "AES-KW")` now pads serialized JWK JSON to an 8-byte boundary before wrapping, matching browser and Node behavior. That fixes a TypeError that previously broke JWK wrapping.

### **`process.resourceUsage()` is now implemented** (7ba7023)
Deno's Node polyfill now exposes `process.resourceUsage()` with Node-compatible fields on both Unix and Windows. This unblocks code that relies on the API and previously saw it missing entirely.

### **`Headers` inspection preserves duplicate `Set-Cookie` values** (04ac9f1)
Custom inspection for `Headers` now folds duplicate iterable header names instead of overwriting them, which matters for multi-value headers like `Set-Cookie`. This is a correctness fix for both Deno and Node-compatible behavior.

### **Node console now exposes lazy stdio streams** (16254ac)
`console._stdout` and `console._stderr` are now present, matching Node's lazy stream properties. That helps compatibility with libraries like `consola` that probe those private fields.

### **Deploy config no longer strips explicit workspace-member includes** (8025886)
Workspace-root deploy configs now keep `deploy.include` globs that intentionally point at workspace members, instead of dropping them during normalization. This fixes a bug where `deno deploy` could end up with an empty file set from the workspace root.

### Other misc changes
- 2.9.0 release/version bump and generated workflow lockfile updates (1 commit)
- `cargo publish` fix for `LAUFEY_VERSION` resolution during tarball verification (5a33eed)
- `deno deploy` now prefers JSR `latest` for the bundled CLI (2894458)
- Desktop macOS plist metadata and Wayland launcher tweaks (2 commits)
- Small HTTP/Desktop config and test fixes, including zero-arg serve compression and a few compat regressions
