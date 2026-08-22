---
date: 2026-08-21
repo: oven-sh/bun
size: L
title: "Fetch, sockets, and crash fixes land"
excerpt: "A heavy day of runtime bug fixes spans fetch, networking, install, crypto, and inspector work, plus a few perf and build cleanups."
commits: 73
authors: [robobun, Jarred-Sumner, dylan-conway, alii]
commit_authors: {"24944aa": robobun, "c3972cc": Jarred-Sumner, "b4684c8": robobun, "d95bc35": robobun, "46a796a": robobun, "300f3a0": dylan-conway, "6fb7102": robobun, "95d406c": robobun, "c646103": robobun, "fbc7936": robobun, "365fde2": robobun, "d2659a7": robobun, "b4e645c": robobun, "46f098f": robobun, "614d19f": dylan-conway, "77afa71": robobun}
---

### **Fix numeric fetch timeouts from tripping the 4s sweep tick** (24944aa)
`fetch({ timeout })` could abort in-flight requests at 4000 ms or below because those values were being translated into a single uSockets sweep interval. The fix keeps the numeric timeout from being rounded into the 4s tick path, closing a nasty regression where short requests died against their own budget.

### **Stop paused kqueue sockets from waking the loop on every packet** (c3972cc)
On kqueue, sockets with reads disabled were still leaving a read knote armed, so incoming data kept waking the event loop even when the socket was paused. This reduces spurious wakeups for backpressured `fetch()` bodies and paused `net.Socket` streams.

### **Make `bun pm ls` list shared workspace deps only once** (b4684c8)
`bun pm ls` was duplicating packages that appear both in the root manifest and as workspaces, or in multiple dependency groups. The command now deduplicates the root view so the output matches the actual `node_modules` shape.

### **Align S3 endpoint parsing with `new URL()` semantics** (d95bc35)
`Bun.S3Client` could sign requests for a different host than the one a `new URL(endpoint)` check would approve when credentials-like syntax was embedded in the endpoint string. Endpoint parsing now follows the same host interpretation as `new URL()`, which matters for tenant isolation and request signing safety.

### **Render native Myers diffs directly in assert** (300f3a0)
`assert` now formats Myers diffs in native code instead of round-tripping them through JS objects. That fixes text corruption for Latin-1 and UTF-16 content and makes stack/diff rendering more robust for non-ASCII output.

### **Read timer ids, module timeouts, and inspect depth by value** (6fb7102)
Several runtime readers were keying off JSC’s boxed representation instead of the numeric value itself, which broke timers, `SourceTextModule#evaluate({ timeout })`, and `Bun.inspect({ depth })` for values boxed as doubles. This brings those paths in line with JavaScript semantics and fixes a set of subtle type bugs.

### **Resolve barrel imports once per record** (95d406c)
The bundler was re-resolving deferred barrel imports multiple times, causing duplicate resolve/plugin work and repeated missing-module errors. This change makes barrel resolution idempotent for those records, which should improve both correctness and plugin behavior.

### **Keep `fetch()` null-body responses truly null** (77afa71)
204/205/304 responses and HEAD responses were coming back with a non-null body, so reading them disturbed the body and broke `clone()`. They now produce a real null body, matching Node and avoiding follow-on body state bugs.

### **Hold Windows named-pipe connects and reads safely through failure paths** (46a796a, d2659a7)
Windows named-pipe work fixed two related lifetime issues: failed async connects no longer leak their pipe context, and live pipe sockets stay alive while read callbacks run. Together these close a leak and a crash class around pipe-backed `net.connect()`/`Bun.connect()` flows.

### **Tighten several runtime bug fixes around crash handling, crypto, YAML, and web APIs** (c646103, 365fde2, fbc7936, b4e645c, 46f098f, 614d19f)
Crash-signaling now stops treating self-sent fatal signals as Bun crashes; node:crypto and webcrypto fix integer handling and RSA-PSS salt validation; YAML keeps boxed booleans/numbers inline; and the inspector now builds its debugger VM from a safer copy of the environment. pbkdf2 also moves its callback execution into the native job path.

### Other misc changes
- Dependency bump (1 commit)
- Frame pointer/build flag tweaks for Windows clang-cl
- Dead-code removal and other refactors across runtime, bundler, and js shims
- Test and CI updates, including PR x64 macOS lane restoration
- Docs, comments, and lint/config cleanups
