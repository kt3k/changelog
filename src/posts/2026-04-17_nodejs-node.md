---
date: 2026-04-17
repo: nodejs/node
size: L
title: "WebCrypto, URLPattern, and N-API get fixes"
excerpt: "Notable API and behavior fixes landed across WebCrypto, URLPattern, streams, and N-API, plus a few platform/workaround updates."
commits: 10
authors: [aduh95, panva, tniessen, richardlau, bnoordhuis, KevinEady, flakey5, mcollina]
commit_authors: {"2503408": KevinEady, "320b450": tniessen, "5f02bdb": richardlau, "59072b8": aduh95, "c1d7150": bnoordhuis, "4e612c0": panva, "afb8bcd": aduh95, "4cb1f28": panva, "b178842": flakey5, "9a7e7b8": mcollina}
---

### **WebCrypto tightens key checks and error ordering** (4cb1f28)
Node’s WebCrypto implementation now validates key algorithm and usage earlier in `encrypt`, `decrypt`, `wrapKey`, `unwrapKey`, and sign/verify flows, with more specific `InvalidAccessError` messages. The change also reorders validation so callers get clearer failures before any crypto work starts, aligning behavior more closely with the WebCrypto spec and tests.

### **URLPattern defaults now follow WebIDL overload rules** (4e612c0)
`URLPattern` construction and execution were updated to treat `null`/`undefined` inputs and dictionary arguments the way WebIDL expects, including defaulting dictionaries and stringifying certain union cases. This fixes several edge cases in argument handling and makes Node’s behavior match web platform semantics more closely.

### **N-API gains external SharedArrayBuffer support** (c1d7150)
A new experimental `node_api_create_external_sharedarraybuffer` API lets addons create `SharedArrayBuffer`s backed by externally managed memory, with an out-of-thread finalizer type for cleanup. This is a meaningful expansion of the N-API surface for addon authors working with shared memory.

### **Threadsafe function abort now drains queued work before finalizing** (2503408)
Aborting a threadsafe function now waits for the queue to drain before running the finalizer, preventing the context from being torn down too early. That fixes a real lifetime bug that could affect addons using TSFN callbacks during shutdown.

### **Nested stream compose errors now propagate instead of hanging** (9a7e7b8)
Stream composition and `Readable.from()` destruction were adjusted so errors from nested `.compose()` chains propagate correctly and don’t leave the pipeline stuck. This is a user-visible bug fix for stream consumers composing async generators.

### **TurboSHAKE argument validation is hardened** (320b450)
The crypto TurboSHAKE path now checks the original 32-bit domain-separation value before narrowing it to `uint8_t`. That closes a small validation gap and makes the bounds check harder to bypass.

### **AIX `rm -r` permissions bug gets a libc++ workaround** (5f02bdb)
Node now treats AIX libc++’s mistaken `EEXIST` return from `std::filesystem::remove_all()` like a permission error in `rm`. This is a platform-specific fix for incorrect errno behavior during recursive removal.

### Other misc changes
- Experimental flag cleanup and option-default adjustments (59072b8)
- Skip `test-temporal-with-zoneinfo` on system-icu builds (afb8bcd)
- Release workflow update to pass the version to the release worker (b178842)
