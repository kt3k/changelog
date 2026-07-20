---
date: 2026-07-19
repo: vitejs/vite
period: weekly
slug: 2026-W29
period_label: "Jul 13–19, 2026"
size: L
title: "Vite adds top-level input, sharper optimizer and SSR fixes"
excerpt: "A week of build ergonomics: one-entry config input, better dep optimization, wasm/SSR correctness, and asset URL fixes."
commits: 28
---

### **Build config gets a top-level `input` entry point**
Vite now lets `input` live at the top level and reuses it across build, library mode, SSR, and dep scanning when no explicit entry is set. That simplifies non-HTML setups and removes repeated entry configuration.

### **Dependency optimizer and config loading get smarter**
The optimizer now recognizes more lockfile layouts, checks common package managers earlier, and better handles dynamic import interop based on the importer’s module format. Vite also warns when `--configLoader native` hits Node-incompatible config patterns, making native loading failures easier to spot.

### **SSR, wasm, and legacy output correctness improve**
Several correctness fixes landed in SSR and build output: switch-case declarations now scope properly during SSR transforms, stack trace decoding no longer depends on `globalThis.Buffer`, and wasm imports now unwrap globals appropriately for JS consumers while preserving raw globals for wasm-to-wasm links. Legacy polyfill chunks also avoid emitting newer syntax than the configured browser target supports.

### **Build asset mapping and runtime URLs are more reliable**
CSS sidecar chunks are now mapped back to the correct JS chunk filenames, which prevents broken or stale CSS references in build output. The dev server also labels network URLs with interface names, and Vite now realpaths the project root to avoid symlink-related path mismatches.

### **Other misc changes**
- Docs updates for library format defaults, the new `input` option, lockfile detection, and various API/guide clarifications
- Release/version bumps for core packages and plugin-legacy
- Small regression tests and fixture updates around CSS code splitting, browser:false resolution, config loading, and dev server logging
