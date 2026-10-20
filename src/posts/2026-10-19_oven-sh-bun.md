---
date: 2026-10-19
repo: oven-sh/bun
size: L
title: "Bun bake grows page data, overlays get smarter"
excerpt: "Bake now supports page data hooks and dev overlays were redesigned and improved; build tools and bindgen also saw major internal work."
commits: 5
authors: [alii, dylan-conway, Jarred-Sumner]
commit_authors: {"3880151": dylan-conway, "91e7e3b": alii, "02f36b4": alii, "94f1325": alii, "6bb5dc1": Jarred-Sumner}
---

**Bindgen moves six core classes to typed schemas** (3880151)
Bun’s Rust/JS binding generator now covers `Crypto`, `TextDecoder`, `Bun.FileSystemRouter`, `MatchedRoute`, `ResourceUsage`, and `S3Stat`. That replaces hand-written argument and getter plumbing with schema-driven, typed generated code, which should make these APIs easier to maintain and extend.

**Bake adds `getServerSideProps`, `getStaticProps`, and `getStaticPaths`** (94f1325)
`bun bake` now supports the page data hooks from the Bake framework design, so page modules can choose server-only data loading behavior. The bundler also strips these exports from browser builds and adjusts the runtime/types to match, which is key for keeping server/client responsibilities separated.

**Dev error overlay gets a full redesign and better grouping** (91e7e3b)
The dev-server overlay now matches the new bun.com visual style, with a heavier framed layout, pink accent counts, and cleaner typography. It also groups same-kind errors into a single card, making large error sets much easier to scan.

**Error overlay fixes scrolling, duplicate errors, and URL underlines** (02f36b4)
This patch fixes the overlay so long error lists can actually scroll, prevents duplicate reports from showing twice, and underlines the full `url(...)` token in CSS errors instead of only part of it. It also tightens CSS import-record tracking so the reported span is more accurate.

**`bun check`/`bun lint`/`bun fmt` get faster and more correct** (6bb5dc1)
The formatter and linter now handle CLI parsing and staged-file workflows more accurately, and `bun check` gets a major speedup on large projects. The docs also expand to cover ignore-file behavior, module type detection, and when fixes are considered safe.

### Other misc changes
- Documentation updates for bindgen, formatting, and linting behavior.
- Minor runtime/bundler plumbing for Bake framework and file validation.
- Small test updates and internal refactors around bindgen and overlay behavior.
