---
date: 2026-10-18
repo: oven-sh/bun
size: L
title: "Bake grows frameworks and page routes"
excerpt: "Bun adds Bake framework/page routing support, tightens install semantics, fixes SQL/WebSocket edge cases, and updates type validation."
commits: 16
authors: [dylan-conway, Jarred-Sumner, alii, robobun]
commit_authors: {"5900354": alii, "c1df64b": Jarred-Sumner, "ad4089b": alii, "25ef693": alii, "4354b80": Jarred-Sumner, "bc1030a": Jarred-Sumner, "ed58ba2": dylan-conway, "5667cd6": Jarred-Sumner, "d0831bc": dylan-conway, "ed68082": alii}
---

### **Bun Bake gets pages, frameworks, and config plugins** (ed68082, 25ef693, ad4089b, 5900354)
`bun bake` now understands `.tsx`/`.jsx` pages, `bake.config.ts`, and plugin/framework configuration in addition to the original `app/pages/*.html` + `app/server.*` setup. The new flow lets Bake restart when config changes, hot-reload `app/server.ts`, and wire framework-specific client/server routing into dev and production builds.

### **Install behavior is closer to npm/pnpm, with peer deps and lockfile rules clarified** (c1df64b, 4354b80)
`bun install` now resolves peer dependencies much more like pnpm, and the docs spell out which CLI flags from npm/Yarn/pnpm Bun accepts or ignores. The frozen-lockfile rules were also tightened and documented so edits that don't change resolved package versions no longer fail installs.

### **SQL queries now handle more failure modes and unhandled rejections correctly** (5667cd6)
The SQL layer was updated so started-but-unawaited queries only suppress errors in the cases Bun intentionally can't report them, while connect/build/timeout/cancel failures are still surfaced appropriately. The fix also refines transaction completion behavior and pool retry semantics, which matters for correctness in real apps under load.

### **WebSocket proxy/client fixes for TLS renegotiation and tunnel writes** (bc1030a)
The WebSocket client and proxy tunnel now handle TLS renegotiation and refused writes without spuriously killing healthy connections. This closes a class of proxy-related disconnects and makes the client retry buffered data in the right order after renegotiation completes.

### **Bindgen/typegen validation now checks published types against schemas** (d0831bc, ed58ba2)
Bun added coverage that `packages/bun-types` stays in sync with bindgen schemas, and several docs were updated to match the newer bindgen model. The runtime also moved dozens of small native bindings to schema-driven definitions, reducing manual argument parsing across core APIs.

### Other misc changes
- Zlib option/docs fixes: `memLevel`/`strategy` behavior, dictionary passing, and generated type docs.
- Several flaky test fixes across Windows/macOS/Linux lanes.
- Dead code removed from lint/sema/bindings.
- Minor documentation clarifications for auto-install, publish, cache, and CLI snippets.
