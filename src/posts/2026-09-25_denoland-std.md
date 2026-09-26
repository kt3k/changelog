---
date: 2026-09-25
repo: denoland/std
size: S
title: "Crypto WASM dependency bump"
excerpt: "Bumped keccak in the crypto WASM package and rebuilt the checked-in bundle to keep it in sync."
commits: 1
authors: [piscisaureus]
commit_authors: {"f834d02": piscisaureus}
---

### Other misc changes
- Dependency bump: keccak 0.1.5 -> 0.1.6 in `crypto/_wasm` (f834d02)
- Rebuilt checked-in `crypto/_wasm/lib/deno_std_wasm_crypto.mjs` and updated `Cargo.lock` to match
