---
date: 2026-05-22
repo: denoland/deno
size: M
title: "Inspector hostnames and cache cleanup land"
excerpt: "Deno now resolves inspector hostnames like localhost, trims binary size in net, and removes a couple of unused deps."
commits: 5
---

### **Inspector flags now resolve hostnames** (b47520d)
Deno's inspector parser now accepts hostnames such as `localhost` in `--inspect`, `--inspect-port`, and `inspector.open(...)`, resolving them through DNS instead of rejecting anything that isn't an IP literal. It also adds `op_inspector_port` so `process.debugPort` reports the actual bound port, bringing Node compatibility closer for inspector workflows.

### **Install shims no longer depend on shell-escape** (a2fc6d3)
The Unix install shim generator replaces the external `shell-escape` crate with a small local POSIX quoting helper. This keeps quoting behavior intact for spaces, quotes, shell metacharacters, and empty strings while removing a dependency from the install path.

### **Quinn TLS provider size reduced in `deno_net`** (c29ea5a)
The networking extension switches Quinn to the explicit AWS-LC Rustls provider feature instead of the broader `rustls` alias. That avoids pulling in Quinn's Ring provider path and trims the release-lite binary size.

### Other misc changes
- Release/version bump for 2.8.0 and CI cache key refreshes (1 commit)
- NPM cache encoding and tmp-name refactors to drop unused deps (1 commit)
- Misc dependency removals from workspace manifests
