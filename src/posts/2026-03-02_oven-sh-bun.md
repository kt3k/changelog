---
date: 2026-03-02
repo: oven-sh/bun
size: L
title: "Bun hardens bundling, buffers, and I/O"
excerpt: "Major fixes for dynamic-import bundling, buffer detachment safety, and several runtime/parser edge cases; plus new markdown metadata."
commits: 16
authors: [robobun, dylan-conway, Jarred-Sumner, anthonybaldwin, sosukesuzuki]
commit_authors: {"6c7e972": dylan-conway, "32edef7": Jarred-Sumner, "aa51d60": anthonybaldwin, "1896d27": robobun, "9e1044f": robobun, "36793df": robobun, "a67d8e2": robobun, "1278e46": sosukesuzuki, "0b61853": dylan-conway, "5d79daa": robobun, "6f256c4": robobun, "5ff4536": robobun, "616501d": robobun}
---

### **Bundler now preserves barrel exports for dynamic import** (6c7e972)
Dynamic `import()` of a side-effect-free barrel now correctly escalates to preserving the full namespace, even when a static named import already seeded partial export tracking. This fixes invalid ESM output where exports needed by the dynamic import could be dropped.

### **Buffer search methods are made detachment-safe** (616501d)
`Buffer.indexOf()`, `lastIndexOf()`, and `includes()` now re-fetch the underlying typed array after JS callbacks like `valueOf()`/`toString()` can detach the backing `ArrayBuffer`. That closes a use-after-free class of bug and aligns detached-buffer behavior with Node.js.

### **Windows async file reads no longer exit early or leak on error** (1896d27)
`Bun.file()` async reads on Windows now keep the event loop alive until the operation completes, preventing silent early process exit. Paired error-path fixes in `ReadFileUV` also close a file-descriptor leak and avoid a use-after-free during OOM handling.

### **Chunked encoding parser now handles split CRLF safely** (a67d8e2)
The HTTP chunked-transfer parser was hardened to buffer a `\r` at segment end and resume correctly when `\n` arrives later, instead of misparsing across TCP boundaries. The patch also tightens overflow handling and adds regression coverage for chunking and request-smuggling cases.

### **Valkey RESP parser now caps nesting depth** (9e1044f)
RESP aggregate parsing now enforces a maximum nesting depth of 128 across arrays, maps, sets, attributes, and pushes. This prevents excessively deep server responses from burning stack or hanging the parser on pathological input.

### **Markdown list callbacks gain richer metadata** (32edef7)
The markdown runtime callback metadata now includes list index, nesting depth, ordered status, and start value. That gives consumers more context when rendering or transforming lists.

### **CSS mask parsing now preserves geometry-box values** (aa51d60)
Mask shorthand parsing now restores parser state on failure so values like `padding-box` and `content-box` aren’t consumed and lost. This fixes incorrect shorthand parsing for masks with geometry boxes.

### **Bun shell keeps empty string arguments intact** (6f256c4)
Shell interpolation and single-quote lexing were fixed so empty arguments like `""`, `''`, and `${''}` are preserved instead of being dropped. This matters for commands that rely on explicit empty parameters, such as password prompts.

### **Pack/publish refresh package metadata after lifecycle scripts** (5d79daa)
`bun pack` and `bun publish` now re-read `name` and `version` after lifecycle scripts mutate `package.json`. That prevents stale tarball names and registry metadata when scripts rewrite package fields mid-run.

### **Chunk watcher no longer spins at 100% CPU** (5ff4536)
The Linux inotify watcher resets its internal read pointer after buffered events are consumed, fixing a busy-loop condition. This is a small but important reliability fix for file watching on Linux.

### **Windows file-path handling now preserves UTF-8** (d5badc2)
`Bun.file().stat()` and `Bun.file().delete()` no longer corrupt non-ASCII paths through double-encoding. That restores correct behavior for file names containing umlauts, Japanese characters, and emoji.

### **GC safety fixed for pre-creation write barriers** (1278e46)
`NodeVMModule` and `NodeVMSyntheticModule` now use early-init write barriers when fields are initialized before `finishCreation()`. This avoids a latent garbage-collector safety issue during object construction.

### **Windows ARM64 shims now build natively** (0b61853)
The Windows `node_modules/.bin` shim is now built for the target architecture instead of always being x86_64. On ARM64 builds, that removes unnecessary x64 emulation for package binaries.

### **Lifecycle and test infrastructure updated for Vite 7** (36793df)
The Vite build integration app was upgraded to rolldown-vite 7.x and matching SvelteKit/Svelte dependencies, with config and timeout updates to keep the test green. This is mainly ecosystem maintenance.

### Other misc changes
- Fixed `Bun.file().text()/arrayBuffer()/bytes()` regression tests for Windows async reads.
- Added regression coverage for buffer detachment in `Buffer.indexOf()` family.
- Updated HTTP/SSE docs and a small docs fix for issue #27479.
- Misc markdown, build, and test fixture updates.
