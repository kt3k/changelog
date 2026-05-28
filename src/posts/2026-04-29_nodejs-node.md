---
date: 2026-04-29
repo: nodejs/node
size: M
title: "HTTP/2 fixes, FFI disposal, config strictness"
excerpt: "Node.js tightened config-file validation, fixed nghttp2 integration, and added Symbol.dispose support to ffi dynamic libraries."
commits: 10
authors: [aduh95, bengl, marco-ippolito, watilde, pimterry, nodejs-github-bot, mcollina]
commit_authors: {"5d578c5": marco-ippolito, "4a32c00": pimterry, "5320a1b": nodejs-github-bot, "61db260": mcollina}
---

### **HTTP/2 session errors now surface correctly** (4a32c00)
Node now detects when nghttp2 internally terminates a session and turns that into an application-visible HTTP/2 error after the GOAWAY is sent. This closes a gap where some protocol failures could silently bypass the expected session error callback.

### **`DynamicLibrary` and `dlopen()` objects support `using`** (61db260)
The ffi module now implements `Symbol.dispose` on `DynamicLibrary` and on the object returned by `dlopen()`, so they can be cleaned up automatically with explicit resource management. The docs and tests were updated to show and verify the new lifecycle behavior.

### **`node.config.json` now rejects unknown fields** (5d578c5)
Unknown namespaces in config files are now treated as invalid content instead of being ignored, while the special `$schema` field is explicitly allowed. That makes config parsing stricter and helps catch mistakes that would otherwise be silently missed.

### **nghttp2 was updated to 1.69.0 with Node integration fixes** (5320a1b)
The bundled nghttp2 dependency was bumped, along with follow-up source and test changes to match newer protocol-error behavior. This is a meaningful HTTP/2 maintenance update because it keeps Node aligned with upstream nghttp2 and avoids integration regressions.

### Other misc changes
- Corrected documented diagnostics_channel built-in channel names
- Updated docs example formatting for `util.callbackify`
- Excluded HTML docs from the slim tarball
- Reused V8 builds more effectively in shared test workflows
- CI label / workflow maintenance updates
- ESLint toolchain dependency bumps (1 commit)
