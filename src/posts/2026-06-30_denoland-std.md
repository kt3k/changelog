---
date: 2026-06-30
repo: denoland/std
size: L
title: "Std ships new APIs and major stability updates"
excerpt: "New XML/collections/async/http APIs landed, plus IndexedHeap was reworked and path compatibility improved for Node.js/Bun."
commits: 13
authors: [tomas-zijdemans, bartlomieju, denobot, kt3k, LeSingh1]
commit_authors: {"4af4c9a": kt3k, "e085217": tomas-zijdemans, "cc47b5c": tomas-zijdemans}
---

### **Collections gain new stable and unstable APIs**
`distinctBy` now passes the element index to its discriminator, and a new stable `zip` helper was added that accepts any iterables, not just arrays. The collections package also stabilized index arguments across several iterable helpers and removed their unstable export aliases in `deno.json`.

### **XML gets record streaming support**
`parseXmlRecords` was added as a new streaming API for assembling records from XML callbacks, alongside internal pipeline/decode helpers and updated package exports. This expands the XML package beyond raw tree parsing and callback streaming into a higher-level async generator workflow.

### **Async Channel is now stable**
`Channel` moved from `async/unstable_channel.ts` to `async/channel.ts`, dropping the unstable branding and updating docs/import examples accordingly. This makes the channel API officially stable and easier to adopt in downstream code.

### **IndexedHeap was reworked for richer priorities**
`IndexedHeap` now supports generic priority types with a comparator, and its API gained `set()` upsert behavior. That’s a significant expansion of the data structure: it can now act as a max-heap or stable tuple-ordered heap, not just a numeric min-heap. (cc47b5c)

### **Problem Details parsing was split and hardened**
The HTTP problem-details API now separates `parseProblemDetails` for plain objects from `parseProblemDetailsResponse` for `Response` bodies, and `createProblemDetailsResponse` gained `statusText` support plus stricter status validation. This is a notable public API change that makes the module more explicit and safer to use. (e085217)

### **Path compatibility improved for Node.js and Bun**
`path` tests were expanded to run under Node and Bun, and the implementation/docs picked up compatibility fixes like using `process.cwd()` in tests and better `toFileUrl` handling for UNC-style paths. This should reduce cross-runtime surprises for consumers using std/path outside Deno. (4af4c9a)

### Other misc changes
- Expect matcher headline polish for `toMatchObject` failures.
- Version bump workflow switched to `deno bump-version` and release metadata was refreshed.
- Codecov action bumped and PR title/labeler scope rate-limits added.
