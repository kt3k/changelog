---
date: 2026-11-27
repo: denoland/deno
size: L
title: "TypeScript rollback, install fix, inspect guard"
excerpt: "Deno rolls back its TypeScript fork, fixes global install script advice, and tightens console inspection for web prototypes."
commits: 3
authors: [haranishi, bartlomieju]
commit_authors: {"ddbb500": haranishi, "27dc592": haranishi, "366cc96": bartlomieju}
---

### **Restore the forked TypeScript checker** (366cc96)
Deno reverts the switch to stock TypeScript and the follow-up changes that depended on it, undoing several breaking type-system behavior changes in one shot. This also rolls back the `export =` declaration change and the relocation of web-platform globals, restoring the previous bundled compiler behavior.

### **Fix skipped-script advice for global installs** (27dc592)
Global installs now carry explicit context through the installer so lifecycle-script warnings can point users at the right recovery path. That fixes misleading advice when scripts are skipped during global `deno install` flows.

### **Guard inspection of uninitialized web prototypes** (ddbb500)
`Deno.inspect` now distinguishes between real instances and bare/prototype objects for `AbortSignal`, `AbortController`, `Blob`, and `File`, avoiding `TypeError: Illegal invocation` on uninitialized prototypes. The new tests cover prototype objects, `Object.create(...)`, and derived instances to ensure getters are only evaluated when the WebIDL brand is present.

### Other misc changes
- None.
