---
date: 2026-10-02
repo: nodejs/node
size: M
title: "Node fixes fs, FFI, and V8 edge cases"
excerpt: "A mixed day of real bug fixes: cpSync timestamp handling, FFI allocation and pointer validation, plus a V8 spec fix."
commits: 9
authors: [trivikr, christianaurichzm, sjungwon03, joyeecheung, nodejs-github-bot, mcollina, avivkeller]
commit_authors: {"4791219": sjungwon03, "7fab656": christianaurichzm, "cfb6aa1": joyeecheung, "90d71c1": nodejs-github-bot, "4486dce": mcollina, "463711a": trivikr, "de073c5": trivikr, "a7a9784": avivkeller}
---

### **cpSync now skips timestamp updates for untouched files** (7fab656)
When `cpSync()` is run with `force: false` and `preserveTimestamps: true`, existing destination files that are left in place no longer get their source timestamps copied onto them. That brings the native directory-copy path in line with the JavaScript walk used by filtered copies and avoids silently mutating skipped files.

### **Fast FFI now validates pointer BigInts in optimized calls** (463711a)
Node now forces the JS-side wrapper for fast FFI signatures that include pointer arguments, so oversized or negative BigInts are rejected consistently even after optimization. This closes a correctness hole where cold calls threw but optimized calls could truncate values and pass bad pointers to native code.

### **FFI buffer copies fail with a catchable error instead of aborting** (de073c5)
`toArrayBuffer()` now allocates with a return-null failure mode and throws `ERR_MEMORY_ALLOCATION_FAILED` when the backing store cannot be created. That matches `toBuffer()` and turns a process-killing OOM path into a normal exception.

### **Builtin exposure policy is centralized in the JS loader** (4791219)
The rules for scheme-only and option-gated builtins were moved into `realm.js`, with the pre-execution bootstrap now enabling them through a shared policy path. This is a notable loader refactor that makes exposure rules easier to reason about and keeps policy data in one place.

### **TypedArray.prototype.set fixes immutable-buffer check order** (a7a9784)
Node picked up a V8 patch that corrects the ordering of `TypedArray.prototype.set` checks for immutable array buffers and related source validation. This aligns behavior with the spec and prevents incorrect side effects during `set()`.

### Other misc changes
- Process.nextTick resource allocation optimized with a class (4486dce)
- V8 serializer/deserializer test updated to avoid hardcoded headers (cfb6aa1)
- Timezone data updated to 2026e (90d71c1)
- eslint dependency bump for brace-expansion (d880e74)
