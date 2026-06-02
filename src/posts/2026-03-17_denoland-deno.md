---
date: 2026-03-17
repo: denoland/deno
size: L
title: "Deno gets faster, safer, and more Node-compatible"
excerpt: "Major Node-compat fixes, performance wins in eval/LSP/fs, and crash/security hardening across core and web APIs."
commits: 20
authors: [bartlomieju, Tango992, nathanwhit, veeceey, shivamtiwari3, fraidev, Hajime-san]
commit_authors: {"2309415": fraidev, "3998494": bartlomieju, "6aa3354": bartlomieju, "e4ae311": nathanwhit, "922a9ca": bartlomieju, "9be5e36": Tango992, "21a8152": bartlomieju, "832fbcf": bartlomieju, "974c6da": bartlomieju, "40c1da6": bartlomieju, "457de64": bartlomieju, "44301a6": bartlomieju, "4ba47aa": bartlomieju, "c665693": bartlomieju, "66db846": veeceey, "14bb3e7": shivamtiwari3, "5e966f1": Tango992, "4b0474c": bartlomieju, "b8c4441": Hajime-san}
---

### **Node Buffer, tty, crypto, and process compatibility level up**
Several high-impact Node compatibility fixes landed: `Buffer.concat` now avoids spoofed length-based memory issues, `markAsUntransferable()` is implemented, and `internal/buffer` is requireable again (6aa3354). The `node:tty` stack was largely rewritten atop uv compat for broader terminal support on Windows and elsewhere (e4ae311), while `process.unref()` now behaves like Node and lets child processes survive parent exit (21a8152).

### **eval now auto-detects CJS vs ESM**
`deno eval` can now infer whether code should run as CommonJS or ESM based on whether it contains `import`/`export` syntax (9f327bb). That removes a common compatibility footgun when reproducing Node issues and makes quick snippets more flexible.

### **Performance wins for large projects and hot paths**
Linux now trims glibc arenas after module loading to reclaim RSS that would otherwise stay inflated on large TypeScript workloads (922a9ca). The day also includes a faster LSP diff backend, TextEncoder/TextDecoder hot-path optimizations, buffered `FsFile.writable` writes, and moving `fs.cpSync` to Rust for a large copy-speed boost (832fbcf, 44301a6, 4ba47aa, 5e966f1).

### **Signals, errors, and Web APIs become more correct**
Windows signal support expanded to include more standard signals and better `Deno.kill()` behavior (40c1da6), signal listener cleanup now handles `process.once()` wrappers correctly (3998494), and `QuotaExceededError` is now a proper `DOMException`-derived class (66db846). Core error handling also became more robust, avoiding a panic when JS error construction fails and improving crypto/OpenSSL error reporting and API coverage (974c6da, 4b0474c, c665693).

### Other misc changes
- REPL Tab-completion panic fix at line start (457de64)
- `FileHandle` can now be passed as `fd` to `ReadStream`/`WriteStream` (9be5e36)
- `process` signal listener cleanup and JUnit location override fixes (3998494, 14bb3e7)
- `child_process.send()` validation fix (2309415)
- `cp`/module-loading and lazy ESM panic fixes in core (b8c4441)
- Dependency/build/test updates tied to the above changes
