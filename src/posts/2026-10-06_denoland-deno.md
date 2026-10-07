---
date: 2026-10-06
repo: denoland/deno
size: M
title: "Deno tightens completions, perf, and N-API safety"
excerpt: "Bare-run zsh completions now include script paths, hot paths shed allocations, and N-API dataview bounds checks are hardened."
commits: 6
authors: [bartlomieju, petamoriken, lrowe]
commit_authors: {"a18ce33": bartlomieju, "2f88519": petamoriken, "117c76f": petamoriken, "ead2af9": bartlomieju, "94e7a16": lrowe}
---

### **Zsh completions now handle bare `deno run` scripts** (a18ce33)
The generated zsh completion for `deno [flags] <script>` now offers script paths as well as subcommands in the first position, fixing a gap where bare invocations stopped completing after non-subcommand input. It also folds the default subcommand’s flags into root completion so options like `-A` are suggested before the script.

### **Avoid allocating null-prototype default option objects on hot paths** (2f88519)
Several JS APIs now reuse a shared frozen empty-options object instead of constructing a fresh null-prototype object for every defaulted call. This trims avoidable allocations across filesystem, networking, fetch, node polyfills, and related runtime paths.

### **Add `SharedArrayBuffer` primitives to core primordials** (117c76f)
Core and web/runtime code now use primordials for `SharedArrayBuffer` access instead of reaching for object properties directly. That removes a long-standing primordials gap and makes byte-length/slice handling more consistent in streams, buffers, and internal helpers.

### **Harden `napi_create_dataview` against overflow** (ead2af9)
The N-API dataview creation path now checks `byte_offset + byte_length` with checked addition before comparing against the backing buffer size. This closes an overflow edge case that could previously bypass bounds validation.

### **Fix idle-connection cleanup in fetch’s hyper stack** (94e7a16)
`hyper` and `hyper-util` were bumped to newer patch/minor releases to address an idle interval cleanup issue when connection pools empty out. This is a targeted networking fix that resolves a known fetch-side bug.

### Other misc changes
- Dependency bump: `xxhash-rust` 0.8.15 -> 0.8.16 (0875ce3)
