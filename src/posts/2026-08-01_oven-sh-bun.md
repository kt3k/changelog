---
date: 2026-08-01
repo: oven-sh/bun
size: L
title: "Browser resolution, streams, and install fixes"
excerpt: "A packed day: several user-visible bug fixes across bundling, fetch/streams, source maps, S3, Node APIs, and installer behavior."
commits: 20
authors: [robobun]
commit_authors: {"3761941": robobun, "8238721": robobun, "9067083": robobun, "f91d5c9": robobun, "65c47c8": robobun, "93c4666": robobun, "3ff3579": robobun, "145300a": robobun, "289f532": robobun, "5f7e62d": robobun, "702e541": robobun, "1dfe612": robobun, "775197e": robobun, "b4aa3a0": robobun}
---

### **Bundler no longer picks bare `$` as a minified identifier** (f91d5c9)
`--minify-identifiers` will now avoid generating a top-level `$`, preventing Bun’s browser bundles from shadowing globals like `window.$` when loaded as classic scripts. This fixes a real compatibility hazard for pages using jQuery-style libraries.

### **S3 list responses now expose `checksumAlgorithm` correctly** (65c47c8)
`S3Client.list()` now returns the documented `checksumAlgorithm` property instead of only the misspelled alias, and the legacy spelling remains as a non-enumerable back-compat field. This brings runtime behavior in line with the TypeScript types and avoids `undefined` reads.

### **Inspector test IDs are now consistent across live and retroactive reporting** (93c4666)
The test reporter now shares one ID counter between tests collected live and tests reported retroactively after `TestReporter.enable`. That prevents mismatched IDs and flaky inspector/test output when debugging starts late.

### **`Bun.write()` now drains unknown-length sources on Linux instead of truncating** (9067083)
When writing from pipes, sockets, or other sources with unknown `st_size`, Bun will keep looping until EOF instead of stopping after the first short `sendfile`/splice-style transfer. This fixes silent data loss for streamed copies on Linux.

### **Bun no longer auto-loads `.env` when invoked as `node`** (3ff3579)
The `node` shim path now skips Bun’s automatic `.env` loading, while direct `bun <file>` usage still behaves as before. That avoids surprising environment injection for Node-compat invocation modes.

### **Browser-map resolution now uses absolute paths for `main` and `index` checks** (3761941)
The resolver now checks browser remaps against the absolute package path, which fixes cases where extensionless `main` entries or `index` lookups were bypassing browser overrides. This makes `bun build --target=browser` respect package authors’ intended prebuilt browser entrypoints.

### **Sourcemap parsing now handles negative VLQ deltas without assertions** (145300a)
Negative generated/original deltas are now handled with wrapping arithmetic and validated before indexing, preventing debug/assert builds from panicking on malformed or edge-case sourcemaps. The JSC-facing sourcemap APIs also return an empty object for negative positions instead of crashing.

### **ReadableStream bodies now release GC roots once wrapper ownership takes over** (289f532)
The fetch/body stream plumbing now downgrades internal strong references after the wrapper’s traced slot owns the stream, preventing unbounded heap growth under SSR-heavy workloads. This addresses a real leak pattern seen in Next.js App Router traffic.

### **Browser builtins now respect package `browser` field before polyfills** (5f7e62d)
The resolver now prefers `browser` mappings for Node builtins ahead of automatic polyfill injection, which can drastically reduce browser bundle size. In the reported case, it cut output by hundreds of KB by avoiding unnecessary crypto-related polyfills.

### **`jsnext:main` now gets the same module/main fallback treatment** (702e541)
Packages that only publish `jsnext:main` now participate in Bun’s module/main fallback logic, fixing mis-resolution to CJS entrypoints in browser bundles. This brings Bun closer to the expectations of packages that use the older ESM hint field.

### **Fetch backpressure is tighter when bytes spill out of `ByteStream`** (8238721)
The body socket no longer resumes early while spilled bytes are still buffered, which reduces memory growth in `Readable.fromWeb(fetch(...).body)` proxy pipelines. The change improves both peak RSS and throughput in the backpressure benchmark.

### **`fs.appendFile({ flag: 'w' })` now truncates like Node** (1dfe612)
An explicit write flag is now honored instead of being overridden to append mode, fixing a semantic mismatch with Node.js. That means `appendFile*` no longer silently ignores caller intent.

### **`pushStream` validation failures now report through the callback only** (775197e)
HTTP/2 push setup now matches Node’s behavior by surfacing validation errors via the callback rather than also emitting stream errors. This removes a compatibility footgun for consumers handling push promise failures.

### **Installer tarball extraction now streams gzip via libarchive** (b4aa3a0)
Bun install no longer inflates buffered tarballs fully into memory before extraction, which avoids pathological memory blowups on large archives. The change also fixes endianness in gzip size handling and keeps the fast path for small archives.

### Other misc changes
- Stream-controller cleanup and barrier-release work for Web Streams
- Lockfile/install ordering fix for frozen-lockfile with npm aliases
- Dead-code removals across JSC, install, and WASI
- Install/test housekeeping and RSS assertion updates
- Documentation and regression test additions
