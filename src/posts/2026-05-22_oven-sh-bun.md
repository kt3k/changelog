---
date: 2026-05-22
repo: oven-sh/bun
size: L
title: "Security, parser, and shell fixes land"
excerpt: "Bun tightens VM sandbox isolation, fixes parser panics and YAML/YAML-like edge cases, hardens shell globbing, and upgrades WebKit."
commits: 13
authors: [robobun, Jarred-Sumner, alii, sosukesuzuki, dylan-conway]
commit_authors: {"3219132": robobun, "7b34ff6": alii, "e5db584": Jarred-Sumner, "f7a2e06": robobun, "b8c19a7": robobun, "82cf7dc": robobun, "e0b291a": sosukesuzuki, "346ce08": dylan-conway}
---

### **Sandboxed vm globals now keep their own Object.prototype** (7b34ff6)
`vm.createContext(vm.constants.DONT_CONTEXTIFY)` now builds the sandbox from the sandbox realm’s own `Object.prototype` instead of reusing the host realm’s structure. That closes a prototype-chain leak where sandbox code could reach host intrinsics via `globalThis.constructor.constructor(...)` and mutate host `Object.prototype`.

### **WebKit upgrade refreshes Bun’s JavaScriptCore fork** (e0b291a)
Bun advances its WebKit fork to `39d4ce1f12ea`, pulling in a large upstream engine refresh and corresponding JSC binding updates. This is a broad engine-level change that can affect runtime behavior, compatibility, and performance across the stack.

### **YAML explicit `?` mapping keys now parse correctly** (346ce08)
The YAML parser fixes explicit mapping-key handling that previously broke non-trivial `?`-style mappings. This restores parsing for explicit keys and aligns Bun’s behavior with YAML syntax expectations, especially around multi-line and nested mapping forms.

### **Shell globbing now ignores metacharacters from interpolated data** (e5db584)
The shell expansion path now distinguishes literal glob tokens from characters that arrived via interpolation, variables, command substitution, or quoted text. That prevents accidental pattern broadening and makes globbing behave more predictably and safely when user data contains `*`, `{}`, or related metacharacters.

### **TypeScript `declare`/`using` edge cases stop panicking** (3219132, f7a2e06)
Two parser bugs that fuzzer hits could crash Bun on ambient TypeScript constructs: dropped `declare` statements no longer leave stale scopes behind, and `using` / `await using` declarations in ambient contexts now produce syntax errors instead of panics. These fixes turn build-breaking crashes into normal parser rejections.

### **Patch parser handles truncated `---` / `+++` headers safely** (b8c19a7)
A truncated patch header like `--- ` or `+++ ` no longer causes an out-of-bounds slice panic. This matters for `bun pm patch` and patch application from dependency metadata, where malformed or incomplete headers should fail gracefully.

### **`expect.extend()` no longer risks a SIGSEGV in bun:test** (82cf7dc)
Bun fixes a crash in the Jest-compatible test runtime when constructing or using wrapped expect matchers. The change hardens `expect.extend()` and related statics so malformed matcher construction no longer escalates into a segmentation fault.

### **Other misc changes**
- Parser fix: reject invalid `for-in` / `for-of` initializers
- Input-hardening sweep across 28 subsystems
- Reduce node HTTP backpressure test memory usage
- Package.json empty script/config entries now behave like missing entries
- Shell parser debug-assert cleanup
- Node HTTP/VM test and parser regression coverage additions
