---
date: 2026-08-07
repo: denoland/deno
size: L
title: "CLI parser migration lands; OAEP fix"
excerpt: "Deno removes clap from the CLI, fixes RSA-OAEP label handling, and patches HTTP error routing plus release CDN cache purging."
commits: 10
authors: [bartlomieju, nathanwhit, subotac, littledivy, maoyouaa]
commit_authors: {"5211303": maoyouaa, "ce9bc92": bartlomieju, "41b646e": bartlomieju, "464ca27": subotac, "753517f": bartlomieju, "eec1ad8": nathanwhit, "3c4a4ad": nathanwhit}
---

**Deno finishes the clap removal in its CLI** (41b646e)
The legacy clap command tree, parser glue, and related error plumbing are gone, completing the migration to `deno_cli_parser`. This trims a major dependency layer and simplifies the CLI stack, while preserving the remaining hand-rolled parsing needed by `dcore`.

**CLI flag handling is refactored onto smaller free functions** (ce9bc92)
Several one-method extension traits were replaced with free functions for file-pattern resolution, target selection, npm system info, and graph-kind conversion. The change reduces public trait surface and makes the CLI helpers easier to use across call sites.

**Dynamic shell completions now use `deno_cli_parser`** (753517f)
Deno’s dynamic completion flow moves off `clap_complete` and generates completion scripts from the new parser instead. The runtime callback now computes candidates directly, which keeps shell completions working after clap’s removal.

**HTTP `serve` now routes bad async `onError` responses safely** (464ca27)
Invalid or rejected async responses from `onError` are now handled through a dedicated fallback path instead of leaking into the normal response path. That closes a bug where error handling itself could fail to produce the intended 500 response.

**RSA-OAEP now preserves label bytes correctly** (3c4a4ad)
The crypto helpers centralize OAEP padding construction and stop normalizing the label through lossy UTF-8 conversion. That matters for interoperability, since OAEP labels are byte-sensitive and should round-trip exactly.

**TLS rejects mismatched client cert/key pairs without panicking** (5211303)
`ext/tls` now avoids a panic when a client certificate and private key do not match. Instead of crashing, fetch/handshake flows can fail cleanly with an error.

**Inspector.open now requires sys permission** (eec1ad8)
The Node inspector open path now checks for system permission before proceeding. This tightens access control around opening the inspector endpoint.

### Other misc changes
- Release workflows now purge CDN cache for mutable version files after publishing.
- CI startup-order jobs are restricted to main, tags, or `ci-full` PRs.
- Dependency/build cleanup from removing clap and related completion crates.
