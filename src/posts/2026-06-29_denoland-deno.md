---
date: 2026-06-29
repo: denoland/deno
size: L
title: "Deno tightens npm, Node, and Jupyter fixes"
excerpt: "Major npm resolver and node-compat bug fixes landed, plus Jupyter prompt handling and several security/behavior fixes."
commits: 22
authors: [bartlomieju, nathanwhit, tomas-zijdemans, LeSingh1, Medo-ID, Vallabh-1504, kapil971390, minato32, crowlbot, nathanwhitbot, hugoalh, sectore]
commit_authors: {"1d08c79": nathanwhit, "96cedb7": tomas-zijdemans, "ede442b": LeSingh1, "9b23333": bartlomieju, "38e00aa": bartlomieju, "4c2f662": bartlomieju, "6ddc9d7": Vallabh-1504, "c815982": kapil971390, "4216f2b": bartlomieju, "ed07e25": bartlomieju, "3a8ae3f": minato32, "0532e63": nathanwhitbot, "3ca0e08": bartlomieju}
---

### **Fix min-age npm dist-tags by falling back to <= tagged version** (1d08c79)
When a dist-tag points to a version that is too new for the configured dependency-age policy, Deno now retries resolution with a semver range capped at the tagged version instead of failing outright. This brings behavior in line with npm-pick-manifest/pnpm for tags like `latest`, `canary`, and `next`, while still preserving the original error when no acceptable version exists.

### **Preserve TLS close_notify on JS-backed Node sockets** (96cedb7)
`node:tls` now flushes the TLS shutdown alert for JS stream-backed sockets so peers actually observe EOF instead of hanging until timeout. This fixes a class of shutdown bugs seen in JS-duplex integrations like tedious/mssql and aligns Deno’s behavior with native TLS sockets.

### **Fix Jupyter stdin handshake ordering for prompt()/confirm()** (3ca0e08)
The kernel now waits until the ZMTP handshake completes before registering a stdin peer for sending. That prevents early `input_request` frames from corrupting the handshake, which was causing frontends like VS Code to kill the kernel when a cell prompted for input.

### **Harden node:sqlite attach limits under scoped permissions** (38e00aa)
Deno now keeps `ATTACH DATABASE` capped at zero when the process lacks full filesystem permissions for the database path, even if `limits.attach` is set. The fix closes a permission bypass where opening a database with custom limits could re-enable attach and reach files outside the intended boundary.

### **Make Deno’s doc extractor strip quoted JSDoc code fences correctly** (ede442b)
JSDoc extraction now removes leading `>` blockquote markers from code blocks so generated docs render the code as intended. This fixes malformed documentation output for quoted examples.

### **Node child_process now recognizes more Deno subcommands** (9b23333)
Spawning the Deno executable through `node:child_process` now passes through Deno subcommands like `bundle` and `serve` correctly instead of misclassifying them as scripts. That restores compatibility for Node-style process spawning of Deno CLI commands.

### **Make URL and URLSearchParams non-serializable** (4c2f662)
`URL` objects now throw during `structuredClone()` and `postMessage()` instead of silently turning into empty objects. This matches browser/Node behavior and fixes a standards mismatch in Deno’s web platform implementation.

### **Fix `node:process` export of `report`** (6ddc9d7)
`report` is now exported as a named value from `node:process`, matching the Node API surface. This corrects a compatibility gap for code that imports the property directly.

### **Use case-insensitive matching for `trust-policy-exclude`** (c815982)
npm trust-policy exclusions now compare package names case-insensitively, matching npm’s package-name rules. This fixes exclusions that failed to apply when `.npmrc` and registry names used different casing.

### **Reject unpermitted `node:net` unix socket binds** (4216f2b)
Binding a Unix-domain socket through `node:net` now checks filesystem permissions before the socket is created. The underlying libuv compatibility layer also records the bound path only after a successful bind, preventing cleanup logic from acting on a path that never bound.

### **Decode percent-encoded npm subpaths** (ed07e25)
npm specifiers now correctly decode percent-encoded subpaths, fixing resolution for packages that contain non-ASCII or otherwise encoded path segments. That makes imports like encoded Unicode subpaths resolve the actual target file.

### **Show scoped-registry auth hint on tarball 404s** (3a8ae3f)
Deno now surfaces the “No auth for tarball URI, but present for scoped registry” hint not just on 401s but also on 404s from private registries. This improves diagnostics for registries like GitLab that intentionally return 404 for private packages.

### **Normalize npm bin names that contain path separators** (0532e63)
Bin entry names are now canonicalized so embedded `/` or `\` segments don’t create nested paths inside `node_modules/.bin`. This avoids malformed bin shims and fixes cases where package metadata used scoped or path-like bin names.

### **Other misc changes**
- Bumped `denokv_*` crates to 0.14.0 and updated `rusqlite`/SQLite linking pins.
- Fixed `mock.reset()` to also reset Node mock timers.
- Corrected a JSX schema property name.
- Adjusted a flaky streams test assertion.
- Defaulted the desktop window title to the app name.
- Nix/flake tooling updates for rust-analyzer and non-NixOS builds.
