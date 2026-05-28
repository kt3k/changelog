---
date: 2026-05-26
repo: denoland/deno
size: L
title: "Deno fixes TLS, KV serialization, and Node compat"
excerpt: "A big day of Node compatibility and runtime fixes: TLS/PFX handling, KV host-object round-tripping, npm preload resolution, and more."
commits: 16
authors: [bartlomieju, divybot, nathanwhitbot, mochaaP, nathanwhit]
commit_authors: {"94e12d4": nathanwhitbot, "88d31a2": nathanwhitbot, "bd343a7": bartlomieju, "c10cf51": mochaaP, "5ca12ed": bartlomieju, "7aadfe8": bartlomieju, "b7e7233": bartlomieju, "598f39d": bartlomieju, "f542a81": bartlomieju, "c2c9105": divybot, "1ecd4c5": bartlomieju, "97c8a66": bartlomieju, "8ab9700": bartlomieju, "ca44f50": nathanwhit, "41d7773": divybot, "4e8c174": divybot}
---

### **Fix PKCS#12/PFX loading for `node:tls`** (5ca12ed)
`tls.createServer({ pfx })` and `tls.connect({ pfx })` now actually extract certs and keys instead of only validating the archive. That makes PFX-only TLS configs usable again, including cases where a PFX bundles extra CA material.

### **Support PKCS#12 MACs beyond SHA-1** (c2c9105)
Deno’s PFX validation now accepts modern OpenSSL-generated archives that use SHA-2-family MACs, instead of failing with `mac verify failure`. The implementation also adds a defensive iteration cap to avoid letting hostile PFX input burn CPU.

### **Fix `core.deserialize` for host objects** (bd343a7)
`Blob`, `File`, `DOMException`, `CryptoKey`, and similar host-branded values can now round-trip through core serialization again. This unblocks KV and broadcast-channel use cases that were previously failing during deserialization.

### **Make `deno run --preload/--import` work with npm specifiers** (f542a81)
Preload/import modules now go through the workspace/npm resolver, so `npm:` specifiers and bare specifiers mapped to npm packages resolve before the preload pipeline runs. This fixes a real startup path that previously failed with missing package constraints.

### **Reinstate Node-style TLS client auth errors** (8ab9700)
When a server requests a client cert but the client sends none, `socket.authorized` now correctly reports `false` and surfaces the expected authorization error. This aligns Deno with Node’s trust semantics for client-auth checks.

### **Fix `.node` addon imports to fail clearly under ESM** (598f39d)
Importing a native addon via ESM now throws a targeted `TypeError` instead of leaking a raw binary-as-JS syntax error. The message points users toward `createRequire()` / CJS loading, matching Node’s loader constraints.

### **Wake the runtime after direct `Deno.serve` dispatch** (ca44f50)
Serve handlers that cross into async node/net-backed I/O now reliably wake the outer runtime loop after the callback returns. This closes a subtle hang where the request was accepted but the JS runtime wasn’t polled again soon enough.

### **Make `crypto.checkPrime` enforce minimum Miller-Rabin rounds** (b7e7233)
The prime checker now always runs at least the FIPS-recommended number of Miller-Rabin iterations, even when callers pass `checks: 0`. That fixes a correctness hole where some composites could previously be reported as prime.

### **Fix `fs.exists` not to throw `NotFound`** (c10cf51)
The Node `fs.exists` compatibility path no longer turns a missing path into an exception. This restores the expected boolean-style behavior for existence checks.

### **Allow array forms in `tls.createSecureContext`** (7aadfe8)
`cert`, `key`, and `pfx` now honor Node’s documented array forms instead of being coerced into unusable values. This improves interoperability with tooling that emits cert chains or client-cert options in array form.

### **Reset `req.reusedSocket` on transparent retry** (97c8a66)
HTTP agent retries now clear the reused-socket flag when a request is transparently retried. That keeps retry bookkeeping accurate for client code that inspects socket reuse.

### **Don’t invoke Proxy traps during `util.inspect`** (41d7773)
`util.inspect` now inspects the proxy target by default instead of walking the proxy itself, matching Node and avoiding surprising trap execution. This prevents inspection from triggering user code or throwing on malformed traps.

### **Add missing `node:util` APIs** (4e8c174)
Deno now exposes `util.getSystemErrorMap()`, `util.transferableAbortSignal()`, and `util.transferableAbortController()`. This fills out more of the Node util surface area expected by compatibility-heavy packages.

### Other misc changes
- Replaced the `cache_control` dependency with local Cache-Control parsers for HTTP compression/freshness logic (94e12d4).
- Reused the node:http keep-alive timer to cut per-request timer churn and added regression coverage (88d31a2).
- Inspector now emits `NodeWorker.attachedToWorker` for late workers (1ecd4c5).
- Misc Node/TLS, HTTP, and test updates across the workspace.
