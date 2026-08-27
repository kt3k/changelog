---
date: 2026-08-26
repo: denoland/deno
size: L
title: "Desktop gets clipboard, fixes, and packaging polish"
excerpt: "Major desktop runtime additions and several important desktop/publish fixes landed, plus a Node TLS resumption correction and dependency upgrades."
commits: 10
authors: [crowlKats, innovatedev-john-pope, bartlomieju]
commit_authors: {"1100198": crowlKats, "87a1c9f": crowlKats, "366b2f1": crowlKats, "05c1716": crowlKats, "476d0e5": crowlKats, "3b18b5d": crowlKats, "851406c": crowlKats, "1f837b6": innovatedev-john-pope}
---

### **Desktop clipboard API lands in `deno desktop`** (87a1c9f)
Adds `navigator.clipboard` with async text-only `readText()` and `writeText()`, exposed as a branded `Clipboard` on `Navigator.prototype`. This brings the desktop runtime closer to browser behavior for basic clipboard workflows.

### **Desktop binding transport now preserves binary values** (476d0e5)
Desktop bind calls and results now move through a dedicated `DesktopValue` path instead of JSON, so `Uint8Array` survives round-trips without turning into numeric-keyed objects or failing JSON conversion. It also adds depth-bounded conversion to avoid stack overflows on pathological inputs.

### **Private package existence checks are now authenticated** (1100198)
`deno publish` now sends authorization headers when checking whether a package already exists, which fixes false 404s for private packages. This prevents the CLI from misdirecting users to create-package flows for packages they already have access to.

### **Desktop error reporting no longer blocks the JS thread** (851406c)
Unhandled desktop errors now use an async alert op instead of a blocking one, so the runtime can keep servicing timers, servers, and signal handlers while the dialog is open. The handler also logs to stderr first and takes over exit handling more safely.

### **Node TLS session resumption now requires explicit opt-in** (1f837b6)
Client TLS sessions are no longer resumed unless the connection asked for it, matching Node.js behavior more closely. This fixes unexpected session reuse in client TLS flows and tightens the session-store plumbing.

### **Desktop packaging now keeps dotted app names intact** (366b2f1)
The desktop runtime library path logic no longer strips version-like suffixes from app names such as `my-app-2.9.2`. This fixes launch failures on Linux for packaged apps whose names contain dots.

### **Desktop installers now inherit version and license metadata from `deno.json`** (05c1716)
Packaged macOS, Debian, RPM, and MSI artifacts now use the workspace root `deno.json` version instead of hard-coded defaults, and RPM can now pick up the configured license string. That makes release metadata consistent with the project configuration.

### **macOS desktop bundles keep a valid signature** (3b18b5d)
The bundling order was adjusted so the app icon is copied before signing, avoiding broken signatures on fresh builds. The update-confirm sentinel is also only written when an actual update backup exists, preventing stray files from invalidating the bundle.

### Other misc changes
- Upgraded `deno_doc` and `deno_graph` with related API adjustments (1 commit)
- Fixed desktop/macOS launcher and packaging edge cases (1 commit)
- Deflated flaky LSP/PTY tests (1 commit)
