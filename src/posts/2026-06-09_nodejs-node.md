---
date: 2026-06-09
repo: nodejs/node
size: M
title: "Crypto internals and core fixes land"
excerpt: "KeyObject/WebCrypto refactors, recursive fs.watch bugfixes, and Undici 8.4.0 headline a busy day of updates."
commits: 15
authors: [nodejs-github-bot, watilde, marcopiraccini, panva, araujogui]
commit_authors: {"4899634": araujogui, "a6c7477": panva, "62d143a": marcopiraccini, "716a92e": marcopiraccini, "c64f6af": nodejs-github-bot}
---

### **Crypto KeyObject/WebCrypto import paths refactored** (a6c7477)
Node’s crypto internals now route `KeyObject.prototype.toCryptoKey()` through the base `KeyObject` class and use cached native key types directly in Web Crypto import paths. This reduces wrapping/unwrapping overhead and tightens public/private key validation for asymmetric algorithms while updating the relevant tests.

### **Fix recursive fs.watch deleting prefix siblings** (716a92e)
The JS recursive watcher no longer treats every filename with the same prefix as a child when unwinding watches, which was causing spurious recursive watch events on unrelated sibling paths. This is a real correctness fix for `fs.watch({ recursive: true })` on platforms that use the JS implementation.

### **Undici bumped to 8.4.0** (c64f6af)
Node’s bundled Undici was upgraded, bringing a broad set of HTTP client and fetch changes along with refreshed docs and security guidance. The update also advances Undici’s version support table and includes behavioral/internal changes across dispatch, redirect, and fetch code.

### **Fix URLSearchParams(null) serialization** (62d143a)
`URLSearchParams(null)` now serializes to `null=` as required by the spec instead of the previous incorrect output. This closes a standards bug in WHATWG URL handling.

### **Remove style cache usage from util.styleText slow path** (4899634)
`styleText()` was cleaned up to avoid the slow-path style cache and compute styles directly as needed. It also simplifies hex color handling while preserving validation and close-code replacement behavior.

### **Other misc changes**
- Updated ngtcp2 and nghttp3 deps
- Updated zlib, sqlite, googletest, and nixpkgs
- Added/expanded tests for scheduler ERR_INVALID_THIS, SEA assets, stream compose, and WPT urlpattern
