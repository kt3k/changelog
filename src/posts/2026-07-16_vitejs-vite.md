---
date: 2026-07-16
repo: vitejs/vite
size: M
title: "Vite tightens optimizer, wasm, and SSR fixes"
excerpt: "Support for new lockfiles, wasm global unwrapping, and several runtime bug fixes land alongside type and legacy build improvements."
commits: 15
authors: [sapphi-red, colinhacks, guybedford, PieterScheffers, linyiru, btea, dogledogle, Teglgaard, dfedoryshchev]
commit_authors: {"6319827": PieterScheffers, "8100320": sapphi-red, "65d3604": colinhacks, "9e79b51": guybedford, "302c755": linyiru, "14fcb66": sapphi-red, "6c08c39": sapphi-red, "f8b38e3": Teglgaard, "c4df6ef": sapphi-red}
---

### **Wasm imports now unwrap globals for JS consumers** (9e79b51)
Vite’s wasm plugin now distinguishes between the raw instance layer and the user-facing module when a `.wasm` export includes `WebAssembly.Global`. That lets wasm-to-wasm imports keep receiving the real global while JS imports get a friendlier wrapper, and it also enables `js-string` builtins/imported string constants during instantiation.

### **Optimizer recognizes more lockfiles and prefers common managers first** (14fcb66, 65d3604, 6319827)
The dep optimizer now detects newer lockfile locations for `nub`, `aube`, and bun/rush layouts, and the docs were updated accordingly. It also checks the most common lockfiles earlier, which should reduce unnecessary work when deciding whether pre-bundling needs to rerun.

### **PostCSS config types are now exported for type-safe configs** (302c755)
Vite now exposes a `PostcssUserConfig` type, backed by a dts rewrite step that makes `postcss-load-config` bundle cleanly as ESM. This gives users a typed config surface without losing compatibility with the underlying PostCSS config package.

### **Dynamic import interop now follows the importer’s module format** (6c08c39)
The optimizer now treats dynamic imports differently depending on whether the importer’s format is explicitly ESM/CJS or still ambiguous, which fixes CJS interop cases that depended on `__esModule`. This closes a subtle correctness gap for dynamic imports from CommonJS dependencies.

### **SSR stack traces no longer depend on `globalThis.Buffer`** (f8b38e3)
Module runner source-map decoding now captures `Buffer` at module load time and falls back safely when it’s missing. That prevents crashes while preparing stack traces in Buffer-less realms, including browser-parity test environments.

### **Legacy polyfill chunks avoid newer syntax for older targets** (c4df6ef)
The legacy plugin now respects the configured modern target when minifying polyfill chunks, instead of allowing output that can use syntax unsupported by those browsers. This avoids shipping newer constructs like optional catch binding to environments that still need compatibility.

### **Bundled dev mode stops duplicating `buildEnd` on close** (8100320)
The bundled dev server now tracks when it has already been closed and avoids firing shutdown work twice. That fixes lifecycle behavior in full bundle mode, where plugins could previously see duplicate `buildEnd` hooks.

### Other misc changes
- Release bumps for `vite@8.1.5` and `plugin-legacy@8.2.1`.
- Docs clarifications for environment hooks and static deploy links.
- Client overlay message formatting alignment.
- Minor build/doc typo fix for `build.cssMinify` default.
