---
date: 2026-08-12
repo: denoland/deno
size: L
title: "Cache, permissions, and fetch get tougher"
excerpt: "Major fixes landed for cache Vary matching, import/IP deny checks, fetch retry behavior, and several runtime edge cases."
commits: 15
authors: [nathanwhit, bartlomieju, petamoriken, Boulea7, minato32, crowlbot, xevrion, badgerbees]
commit_authors: {"74ddcdd": nathanwhit, "ac12d1a": nathanwhit, "f169b71": nathanwhit, "f298025": Boulea7, "cfa7571": bartlomieju, "cea3796": crowlbot, "17269e8": xevrion, "073a2c9": badgerbees, "214c916": bartlomieju, "b854123": bartlomieju, "135485c": petamoriken, "1b1fd2a": petamoriken, "28280d5": nathanwhit}
---

### **Cache Vary matching now follows header-list semantics** (74ddcdd)
Cache lookups now treat `Vary: *` as an automatic miss and compare repeated request/response headers by combining all matching values in order. That fixes incorrect cache hits when headers were duplicated and brings both SQLite and remote cache backends in line with Fetch semantics.

### **Import deny rules now block resolved IPs** (b854123)
`--deny-import` is now enforced after DNS resolution as well as on the original hostname, closing a gap where hostnames like `127.0.0.1.nip.io` could bypass an IP-based deny rule. The module fetcher now uses a permissioned HTTP client that re-checks resolved addresses against the deny list.

### **Fetch retries are limited to reused pooled connections** (214c916)
Transport retries now only happen for pooled connections that have already been used, instead of on every transport error. This reduces accidental retries on fresh connections and makes fetch’s retry behavior more precise for network failures.

### **N-API finalizers survive until the right shutdown point** (cfa7571)
Pending finalizers are now tracked by identity so they can be deregistered cleanly when a reference is reset or dropped, while still running for unreleased references at environment shutdown. This fixes duplicate/misordered finalizer handling that could surface as unwrap and cleanup bugs.

### **Tarball extraction rejects unsafe paths before creating directories** (28280d5)
npm tar extraction now normalizes entry paths up front and refuses anything that would escape the output directory, instead of creating parent directories first and checking later. That closes a path traversal class of extraction bugs while preserving valid nested and extended-name entries.

### **FS open permissions now account for creation flags** (ac12d1a)
Open-option classification now treats create, create-new, and truncate as write-producing operations, including cases where `O_RDONLY` is combined with creation flags. This fixes permission checks so read-only opens that can still create or mutate files require write access.

### **Bundle helper acquisition no longer depends on workspace npmrc** (f169b71)
The bundler now resolves and caches its pinned esbuild helper through isolated npm cache services instead of inheriting workspace registry settings. That prevents workspace `.npmrc` configuration from interfering with esbuild downloads and makes helper acquisition more deterministic.

### **REPL input validation skips regex literals** (17269e8)
The REPL parser now avoids misclassifying regex literals during input validation, which should prevent false errors while typing multi-line snippets. This is a targeted correctness fix for interactive use.

### **Node dns.lookupService accepts string ports** (f298025)
Node’s `dns.lookupService` compatibility layer now accepts string ports instead of rejecting them. That aligns Deno’s behavior more closely with Node expectations for callers passing port values as strings.

### **perf_hooks now reports proxied request URLs correctly** (073a2c9)
The HTTP client/server polyfills were adjusted so `perf_hooks.detail.req.url` no longer duplicates proxied-path information. This improves observability output for proxied requests and related HTTP tests.

### **SafeArrayIterator gets a faster primordial implementation** (135485c)
Primordials now use an index-based `SafeArrayIterator` instead of allocating a real iterator and going through user-patchable `next()` paths. The change is aimed at performance and also preserves exhaustion semantics when the backing array grows mid-iteration.

### **Primordials/object-creation bugs fixed across runtime polyfills** (1b1fd2a)
Several runtime and Node polyfills were updated to avoid subtle issues around `ObjectCreate`/`ObjectDefineProperties`, including null-prototype descriptors and safer property definition handling. This is a broad correctness cleanup across core web, Node, and runtime initialization paths.

### Other misc changes
- Marked a flaky node_compat test as flaky (cea3796)
- Dependency/version and lockfile updates
- Test coverage and fixture updates for the fixes above
