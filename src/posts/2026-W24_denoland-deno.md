---
date: 2026-06-14
repo: denoland/deno
period: weekly
slug: 2026-W24
period_label: "Jun 8–14, 2026"
size: L
title: "Deno lands major compat, security, and runtime upgrades"
excerpt: "A big week for Node compatibility, safer permissions/networking, faster runtime internals, and new bundling/workspace features."
commits: 134
---

### **Major Node compatibility and runtime safety improvements**
Deno shipped a wide set of Node-compat fixes and memory-safety hardening: `module.registerHooks()` redirects now resolve correctly, `node:test` gained `runOnly(true)`, `node:vm` wrappers and V8 serializer paths were fixed, fast-call errors stay native, and several child-process/TCP/HTTP/2 ownership bugs were closed to prevent double-frees and fd misuse.

### **Permissions and network behavior got stricter and more correct**
Permission checks were tightened for Unix sockets, verbatim Windows paths now share grants, and non-recursive path ops no longer trip on denied descendants. HTTP behavior also got a cleanup pass with better proxy-header handling, corrected cookie/header joining, Brotli tie-breaking, preserved compressed headers after decompression, and more reliable streaming/keep-alive behavior.

### **Publishing, workspaces, and bundling gained new capabilities**
`deno publish` now skips already-published versions early, `deno install` lays out workspace-local `node_modules`, and `deno bundle` can emit rolled-up declaration files. Deno also added `catalog:` support in `deno.json` imports/scopes and improved global install and import-map resolution.

### **Performance and runtime internals were substantially refactored**
A major internal move brought WebCrypto and console/inspect logic from JS into Rust, while op snapshot generation shed callback overhead. On the hot path, glob matching, buffer decoding, async directory reads, and several stream/text code paths were optimized, with `Deno.readDir()` now streaming entries lazily.

### **Developer workflow and tooling improved**
The test runner added `Deno.test.each`, doc tests inherited shebang permissions, watch mode and `serve --watch` got more reliable exit/restart behavior, and LSP workspace refreshes and `node_modules` editing support were fixed. Formatting also shifted toward new lax-formatters for markup and CSS.

### **Other misc changes**
- OpenTelemetry now respects sampler settings and span limits, and ignores zero metric intervals.
- Crypto fixes landed for X448 clamping, PKCS#12/PFX loading, and non-canonical RSA keys.
- `Deno.watchFs` overflow now triggers rescan instead of silent event loss.
- Improved `URLPattern`, REPL, Jupyter, source-map, and doc-test edge cases.
- New support for `navigator.userAgentData` and CSS module imports behind an unstable flag.
- Various test hardening, docs updates, dependency bumps, and small regression fixes.
