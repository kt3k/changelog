---
date: 2026-07-27
repo: nodejs/node
size: M
title: "Rust upgrade and QUIC/test cleanup"
excerpt: "Node updates its Rust toolchain and vendored crates, plus a QUIC stream state tweak and broad test assertion cleanup."
commits: 8
authors: [Renegade334, aduh95, Archkon, efekrskl, Manishearth, manNomi, skdas20]
commit_authors: {"ea48ad3": Renegade334, "cb3add2": Renegade334, "8ba8981": Manishearth, "58795e9": manNomi}
---

**Raise the Rust floor to 1.86 and refresh vendored crates** (ea48ad3, cb3add2, 8ba8981)
Node now requires rustc/cargo 1.86 for Temporal-related builds, and the bundled Rust crates were regenerated for V8 14.6.202.34-node.26. This keeps the native Rust toolchain and Chromium vendoring aligned, but it also means newer Rust is now required to build affected parts of the tree.

**Serialize QUIC stream reset codes as strings** (58795e9)
QUIC stream state JSON output now stringifies `resetCode` before serialization, and the corresponding test asserts the value is `
