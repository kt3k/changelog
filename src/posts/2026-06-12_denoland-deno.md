---
date: 2026-06-12
repo: denoland/deno
size: L
title: "Deno fixes crypto, permissions, and npm types"
excerpt: "Major correctness fixes landed for X448, Windows path permissions, npm .d.ts resolution, and node:test run-only behavior."
commits: 8
authors: [divybot, a-skua, avocet-bot, nathanwhit]
commit_authors: {"9f066b8": a-skua, "16aa900": divybot, "d535582": divybot, "ee9e5c7": divybot, "943e317": divybot}
---

### **npm .d.ts resolution now follows package.json again** (16aa900)
`deno check` was misclassifying some npm `.d.ts` files as ESM based on broad `exports` heuristics, which broke valid imports like `import playwright from "playwright"`. The resolver now treats `.d.ts` files by package.json-based mode only, restoring correct CJS vs ESM typing for npm packages.

### **Fix X448 scalar clamping to match RFC 7748** (ee9e5c7)
Deno was deriving the wrong X448 public key because the private scalar was being reduced mod the Ed448 group order instead of being clamped verbatim. This aligns `crypto.subtle` with RFC 7748 and fixes key derivation for PKCS#8 and private JWK inputs.

### **Windows `\\?\` verbatim paths now share permission grants** (d535582)
Permission checks now normalize losslessly simplifiable verbatim paths so `\\?\C:\foo` and `C:\foo` are treated as the same target. That removes surprise reprompts on Windows for paths that refer to the same file.

### **Implement `node:test` context `runOnly(true)`** (943e317)
`TestContext.runOnly` now works instead of throwing, and only direct subtests marked `only: true` are executed while the rest are filtered out. This matches Node's behavior and unblocks nested `node:test` suites that rely on run-only mode.

### **Accept U+30FB in identifiers** (9f066b8)
Deno now accepts KATAKANA MIDDLE DOT in identifiers, matching Unicode 15.1. The new regression test covers both `deno run` and `deno check` for the character in variable names and property access.

### **Other misc changes**
- CI now guards against release binaries embedding eager snapshot parsing flags, and scopes Rust builds to the intended packages. 
- Benchmark publishing now also writes JSONL outputs alongside the existing JSON files.
- Added a regression test for the first `node:http` proxy request under `deno test`.
