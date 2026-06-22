---
date: 2026-06-21
repo: denoland/deno
size: L
title: "Windows MSI installer and perf wins"
excerpt: "Deno desktop gains MSI output, macOS startup gets faster, and build support expands to loong64 and ppc64."
commits: 3
authors: [divybot, CAB233, littledivy]
commit_authors: {"222d30d": divybot, "1de2b16": CAB233, "f0cdcd8": littledivy}
---

### **Deno desktop now supports Windows .msi installers** (222d30d)
`deno desktop` can now emit `.msi` output alongside the existing macOS/Linux package formats. The change adds MSI authoring in Rust, updates the CLI help, and enforces that MSI builds target Windows, making Windows desktop distribution much more straightforward.

### **macOS binaries switch to chained fixups for faster startup** (f0cdcd8)
The macOS link flags now enable `-fixup_chains`, moving from the legacy eager rebase/bind format to `LC_DYLD_CHAINED_FIXUPS`. That reduces pre-main startup work and trims launch time, with the tradeoff that the build now requires a macOS 12 deployment target.

### **Deno build support expands to loong64 and ppc64** (1de2b16)
Cranelift was bumped to 0.117 and Node process architecture mapping was extended to recognize `loongarch64` and `powerpc64le`. This enables Deno binaries to compile and run on additional architectures that were previously unsupported.

### Other misc changes
- MSI feature pulled in new packaging-related Rust dependencies
- macOS build tooling updated to a newer prebuilt toolchain commit
