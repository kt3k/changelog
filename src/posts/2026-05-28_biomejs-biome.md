---
date: 2026-05-28
repo: biomejs/biome
size: S
title: "Playground preview WASM gets unstable features"
excerpt: "Preview web builds now compile biome_wasm with unstable language features enabled, exposing Markdown and YAML support in the playground."
commits: 1
authors: [siketyan]
commit_authors: {"bdbfec1": siketyan}
---

### **Playground preview builds enable unstable features** (bdbfec1)
Preview WASM builds for the playground now pass `--features=unstable`, and the WASM crate defines an `unstable` feature that enables Markdown and YAML language support. The `just` build recipe was also updated to forward extra Cargo args, making it easier to toggle features for the web build.
