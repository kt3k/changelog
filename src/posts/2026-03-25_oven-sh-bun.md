---
date: 2026-03-25
repo: oven-sh/bun
size: L
title: "WebView overhaul and a wave of crash fixes"
excerpt: "Bun adds Chrome-backed WebView capabilities, upgrades to TypeScript 6, and lands multiple crash, leak, and glob performance fixes."
commits: 19
authors: [robobun, sosukesuzuki, dylan-conway, alii, Jarred-Sumner]
commit_authors: {"3909487": robobun, "2e610b1": robobun, "9ead1e1": robobun, "7fb7897": sosukesuzuki, "3eba9cb": alii, "0bcb402": Jarred-Sumner, "698eb81": robobun, "e59a147": dylan-conway, "3ca678c": robobun, "24fa207": robobun, "e94c303": robobun, "36f17ca": sosukesuzuki, "594f421": robobun, "6034bd8": robobun, "9ce5b05": sosukesuzuki}
---

### **Bun.WebView gets EventTarget, richer screenshots, and CDP control** (0bcb402)
`Bun.WebView` now inherits from `EventTarget`, so it can use the standard event-listener APIs directly. The WebView API also grows screenshot encoding options and a raw `cdp()` escape hatch for Chrome backend sessions, making browser automation and inspection much more flexible.

### **Fix crash when consuming Response bodies from async iterables** (2e610b1)
`Response.bytes()` and `Response.arrayBuffer()` could crash when the body came from an async iterable because `null` underlying sources were treated as valid. The fix tightens the checks and adds regression coverage for async-iterable-backed fetch bodies.

### **WebCore callback wrappers drop Strong handles to avoid GC cycles** (7fb7897)
This removes the old `JSCallbackDataStrong` path and consolidates callback handling onto weak references, matching upstream WebKit. It addresses a class of leak-prone GC reference cycles in callback wrappers.

### **Cherry-pick 4 WebCore memory safety fixes from upstream WebKit** (9ce5b05)
Several WebCore internals were backported to close memory-safety gaps, including dropping messages for closed `MessagePort`s and tightening listener bookkeeping. These are structural fixes aimed at preventing leaks and use-after-free style issues in core web APIs.

### **Support TypeScript 6** (3eba9cb)
Bun’s toolchain, docs, and templates were updated to TypeScript 6.0.2, with matching config changes across benches, packages, and project generators. This keeps Bun aligned with the latest TypeScript release and updates the default guidance for Bun projects.

### **Fix glob traversal to avoid double-visiting directories** (e59a147)
Glob scanning now tracks active pattern component indices as a set, eliminating redundant directory reads for patterns like `**/node_modules/**/*.js`. This is a meaningful performance win for glob-heavy workloads, especially on deep trees and Windows.

### **Fix vm.Script / SourceTextModule leak via fetcher owner cycle** (36f17ca)
`NodeVMScriptFetcher` switched its owner reference from strong to weak, breaking a GC cycle that leaked `vm.Script`, `vm.SourceTextModule`, and `vm.compileFunction` results. The new regression tests confirm the objects are collectible once user references are dropped.

### **Fix stack overflow crash when termination exception is already pending** (3909487)
Error construction now bails out early if the VM already has a pending termination exception, instead of trying to throw again and crashing. This closes a nasty edge-case crash during stack overflow and error formatting.

### **Fix `assert.partialDeepStrictEqual` for array inputs** (698eb81)
The array-branch logic now uses safe prototype-bound `Map` methods instead of JSC private method dispatch, which was failing on `SafeMap`. This restores `partialDeepStrictEqual` for arrays, including duplicate and nested element cases.

### **Fix `Bun.dns.lookup()` options guard for non-object cells** (9ead1e1)
The lookup options check now uses `isObject()` instead of `isCell()`, preventing strings and other non-object cells from reaching object-only access paths. That avoids a crash when the second argument is not actually an options object.

### **Fix `mock.module()` validation for non-string first args** (24fa207)
`mock.module()` now rejects non-string specifiers before calling `toString()`, avoiding accidental resolver/autoinstall paths from values like `SharedArrayBuffer`. This closes a crash caused by resolver use before the package manager logger is initialized.

### **Fix stack-buffer-overflow in module resolution logging** (6034bd8)
`resolveMaybeNeedsTrailingSlash` now keeps `PackageManager.log` in sync with the temporary resolver/linker logger, preventing stale stack-pointer use during resolution and auto-install flows. This is a targeted memory-safety fix.

### **Fix crash in `expect.extend()` with numeric matcher keys** (594f421)
The matcher enumeration now skips index-like properties, preventing `putDirect` from hitting array-index assertions on numeric keys. This makes custom matcher extension robust against objects with integer property names.

### **Fix braces lexer panic on empty input** (3ca678c)
`Bun.$.braces("")` now returns safely instead of indexing into an empty token list, and parser advancement no longer underflows at position zero. This fixes an out-of-bounds crash on empty brace patterns.

### **Fix TOML.parse logger leak on parse errors** (e94c303)
`TOMLObject.parse` now deinitializes its `Log` on error paths, matching the other config parsers and preventing a per-failure leak. The parser also now uses the newer argument access pattern.

### Other misc changes
- TypeScript 6 and 7 migration docs added.
- Windows glob directory filtering via `NtQueryDirectoryFile`.
- Build fix for `glob` after active-set refactor.
- Docs cleanup and duplicate comment removal.
- Internal WebCore refactors and test-only updates.
