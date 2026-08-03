---
date: 2026-08-02
repo: nodejs/node
size: L
title: "FFI, crypto, and tracing get major updates"
excerpt: "Node.js adds safer FFI callback/library handling, broadens crypto key loading, updates root certs, and tightens tracing/perfetto integration."
commits: 17
authors: [legendecas, trivikr, nodejs-github-bot, panva, soulee-dev, araujogui, davidje13, YspritanHyzygy, MikeMcC399, marco-ippolito]
commit_authors: {"f43086d": trivikr, "565c3da": panva, "f97c7a3": nodejs-github-bot, "c55eb4a": trivikr, "a6e7e6a": araujogui, "bb76938": trivikr}
---

### **FFI: prevent callback ref/unref crashes after GC** (f43086d)
`refCallback()` and `unrefCallback()` now reject with `ERR_INVALID_ARG_VALUE` if the callback function has already been garbage-collected after a prior `unrefCallback()`. This closes a crash path where `ClearWeak()`/`SetWeak()` would dereference an empty persistent handle.

### **Crypto: load private keys via STORE loaders and WHATWG URLs** (565c3da)
Private-key inputs can now be WHATWG URL objects and can resolve through OpenSSL STORE loaders, with support for optional property queries and passphrases. This expands the places Node can load keys from while preserving the expected provider-owned `EVP_PKEY` behavior for normal `KeyObject` and `CryptoKey` use.

### **FFI: block fast calls after a dynamic library is closed** (c55eb4a)
Fast API trampolines now check whether the underlying `DynamicLibrary` has been closed before jumping into native code, and raise `ERR_FFI_LIBRARY_CLOSED` instead of calling into unloaded memory. Node also wires `close()`/`Symbol.dispose` through a wrapper so the closed state is tracked consistently.

### **Zlib ZIP reader now preserves the archive’s physical path** (f97c7a3)
The ZIP reader keeps both the original Central Directory path and the Unicode-override path, so consumers can inspect the physical filename even when the Info-ZIP Unicode Path Extra Field changes the effective name. It also updates directory/unsafe classification to account for both names, reducing the chance of mislabeling suspicious archive entries.

### **Net: runtime-deprecate `Server.prototype._listen2`** (a6e7e6a)
`_listen2` is now a runtime deprecation with a dedicated warning code, but monkeypatches still keep working because `net.Server.listen()` routes through it when userland overrides the method. This formalizes an old internal escape hatch without breaking existing wrappers.

### **Stream iterators: make `Writer.end()` obey `AbortSignal`** (bb76938)
`BroadcastWriter.end()` and `PushWriter.end()` now reject immediately when passed an already-aborted signal, and push-writer end promises are raced against later aborts. That makes writer shutdown semantics match the AbortSignal contract instead of silently ignoring cancellation.

### **Other misc changes**
- Updated root certificates to NSS 3.125.
- Added missing FFI type-name docs (`float32`/`float64`).
- Perfetto build/test and trace-event integration fixes.
- Added unique permission warning codes.
- Stream, CLI, and contributing docs updates.
- Nix/build workflow and pin bumps.
