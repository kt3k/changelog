---
date: 2026-06-23
repo: denoland/deno
size: L
title: "Deno adds compression, compile storage, and fmt config"
excerpt: "Big feature day: configurable serve compression, persistent compile-time storage, pnpm auto-migration, and several runtime/node fixes."
commits: 10
authors: [bartlomieju, divybot, nathanwhit, fibibot, haru0017]
commit_authors: {"3c3a651": nathanwhit, "fd41ccc": bartlomieju, "a72c413": bartlomieju, "dbcd1a9": bartlomieju, "bc6e3cb": bartlomieju}
---

### **Serve compression can now be disabled** (3c3a651)
`Deno.serve` gains an `automaticCompression` option, plus a `DENO_SERVE_AUTOMATIC_COMPRESSION=0|false` env override to turn it off globally. This gives apps explicit control over response-body compression without changing the default behavior.

### **Compiled apps get persistent Web storage and KV** (fd41ccc)
`deno compile` binaries now derive a stable app identity so `Deno.openKv()`, `localStorage`, and `caches` can live in a per-app data directory instead of falling back to ephemeral or unsupported behavior. The new `--app-name` flag lets authors pin that identity across renames, which matters for apps that rely on persisted state.

### **Deno-in-Deno child processes keep their permissions** (a72c413)
The Node-compat layer now injects `-A` when spawning a Deno subcommand that runs user code and no explicit permission flags were provided. This closes a real footgun where passing through `deno run ...`-style args could silently drop the implicit full permissions that npm tools expect.

### **pnpm workspaces can auto-migrate on resolution failure** (dbcd1a9)
When resolution fails in a project with `pnpm-workspace.yaml`, Deno now detects that file and converts supported workspace/catalog settings into the equivalent `deno.json` fields before asking the user to retry. That avoids the misleading dead-end error and makes pnpm-based monorepos much less painful to use.

### **`preferPackageJson` becomes a persistent config option** (bc6e3cb)
Dependency-management commands can now be configured to target `package.json` by default via `
