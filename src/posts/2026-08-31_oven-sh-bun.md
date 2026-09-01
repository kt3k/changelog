---
date: 2026-08-31
repo: oven-sh/bun
size: L
title: "Bundler tree-shaking, http2, and test fixes"
excerpt: "Major bundler upgrades plus Bun test, http2, image, and memory-safety fixes landed alongside a few performance and runtime tweaks."
commits: 24
authors: [robobun, Jarred-Sumner, alii]
commit_authors: {"1314777": robobun, "8491443": robobun, "e1c1325": robobun, "e5154cd": Jarred-Sumner, "05921d5": robobun, "96c579e": robobun, "68b42d9": robobun, "90f51ac": robobun, "e8eaae9": Jarred-Sumner, "5f0bf14": robobun, "ce93361": robobun, "2a0fda9": robobun, "936bf86": robobun, "d393bf9": robobun, "fe56081": Jarred-Sumner}
---

### **Tree-shake dynamic imports and require() targets** (e5154cd)
Bun’s bundler now analyzes how string-literal `import()` and `require()` results are used and drops unobserved exports from those modules. That can cascade into smaller chunks and less code loaded at runtime, especially in split bundles.

### **Re-exported namespace property reads bind directly** (e8eaae9)
Property access on re-exported namespaces now resolves straight to the underlying export instead of forcing a namespace object first. This improves tree-shaking and introduces a new `deprecatedNamespaceObjectSetters` option for getter-only namespace objects going forward.

### **`bun test --parallel` stops respawning dead startup workers forever** (2a0fda9)
Parallel test workers that die before becoming ready now hit a bounded retry path instead of looping indefinitely. The fix also adds clearer startup-failure reporting and avoids silently masking this class of crash.

### **`bun test --isolate` restores synthetic allocation limits per file** (e1c1325)
The isolate test runner now resets the synthetic allocation limits after each file, preventing one test’s state from leaking into the next. This fixes an intermittent Linux CI failure where large `res.text()` calls could trip `ERR_STRING_TOO_LONG` only in parallel batches.

### **`Bun.serve` now cancels unread response bodies on abort/HEAD** (936bf86)
When a response will never be transmitted, Bun now explicitly cancels its body stream so the source can release resources and stop work. This plugs a real leak/hang case in streaming handlers that keep producing after the client disconnects.

### **`Buffer.toString()` allocation failures now report the right error** (8491443)
Failed string allocations now distinguish true out-of-memory from strings that are simply too large. That brings Bun’s behavior closer to Node’s `ERR_MEMORY_ALLOCATION_FAILED` path and fixes confusing `ERR_STRING_TOO_LONG` failures.

### **`inspect` property dedup becomes linear-time** (5f0bf14)
The visited-property tracking used by `Bun.inspect`, `console.log`, and assertion diffs now avoids quadratic scans. Large object inspection should scale much better in developer-facing output paths.

### **`node:http2` fills in missing compatibility bits** (05921d5, 96c579e, 90f51ac)
Bun’s HTTP/2 API gained `Http2SecureServer#closeIdleConnections()`, correct `ClientHttp2Session#destroy(undefined, code)` shutdown behavior, and the `server` getter on `ServerHttp2Session`. These changes close several Node compatibility gaps that could otherwise break framework feature detection.

### **`dns.resolve(..., "NAPTR")` is now accepted** (68b42d9)
Bun now recognizes `NAPTR` as a valid DNS record type in the generic resolve APIs. Code that uses Node’s documented `dns.resolve()` surface should no longer throw on this rrtype.

### **Bundler renaming now avoids nested-scope collisions** (1314777)
The symbol renamer now delays nested-scope renaming until all top-level symbols are registered in the chunk. This fixes a real production breakage where a nested local could shadow a later helper and make bundled output throw at load.

### **Mac HEIC decode failures are no longer silent black images** (fe56081)
`Bun.Image` now reports decode failures from ImageIO instead of returning a successful-but-black result, and it can handle 10-bit HEIC on macOS. That avoids silently corrupting image pipelines that resize or convert bad inputs.

### **Common string tables moved onto VM client data** (d393bf9)
The shared string cache was relocated so VM-related globals no longer each carry their own copy. This trims duplication across contexts like `node:vm`, ShadowRealms, and isolated test runs, while keeping the cache safely rooted.

### **`util.parseEnv()` now stores numeric keys as real indexed properties** (ce93361)
Keys like `"0"` are now inserted in a way that makes normal property lookup and `in` checks work correctly. This fixes a consistency bug that also triggered debug assertions.

### Other misc changes
- Dependency / baseline updates and merge noise
- `bun build` / WebKit build-system tweaks, including local WebKit mimalloc alignment
- Intl test refactor and test duration snapshot refresh
- A few internal JSC refactors and docs updates around common strings and build options
