---
date: 2026-07-23
repo: leanprover/lean4
size: L
title: "HTTP client fixes and new redirect/API support"
excerpt: "Lean’s HTTP stack gained redirect validation, body-stream error propagation, and RFC-compliant handling for bodyless responses, plus TSan support."
commits: 13
authors: [sgraf812, algebraic-dev, Kha, Garmelon, hargoniX, wkrozowski, tydeu]
commit_authors: {"d2a1500": algebraic-dev, "a347c85": algebraic-dev, "202c791": algebraic-dev, "749f580": Garmelon, "421c022": hargoniX, "debc2da": sgraf812, "2b3c28a": sgraf812, "7f03b50": sgraf812, "ec525bb": wkrozowski, "77a5093": Kha, "7db3fc2": sgraf812, "212cf2d": Kha, "46e7a11": tydeu}
---

### **HTTP client now finishes bodyless responses correctly** (d2a1500)
The H1 client now treats HEAD responses as bodyless even when framing headers advertise bytes, so it won’t stall waiting for data that must never arrive. The change also auto-drains known zero-length client responses, fixing hangs on cases like 204/304-style responses.

### **Body streams can now fail with terminal errors** (a347c85)
`Body.Stream` adds `closeWithError`/terminal error tracking so a producer can surface a real IO failure to consumers instead of silently ending the stream. That makes truncated or otherwise broken bodies visible to callers after any buffered chunks are delivered.

### **Redirect handling became a first-class HTTP API** (202c791)
Lean now has `RedirectPlan` support for validating redirects against RFC 9110 and following them automatically. The patch also adds reusable header/method/URI helpers that make redirect logic and HTTP method classification more precise.

### **ThreadSanitizer support landed in the build and runtime** (421c022)
The build now has a dedicated TSan preset and CI job, with test selection trimmed to a smaller subset to keep runtime and memory use manageable. Runtime C/C++ support was updated so Lean’s refcount paths behave correctly under TSan instrumentation.

### **Option deprecations now come from `@[deprecated]`** (ec525bb)
`register_option` now mirrors the replacement name, message, and `since` metadata from `@[deprecated]`, instead of letting callers set the internal deprecation field directly. This makes deprecation warnings consistent for both `set_option` and meta-code use.

### **`vcgen` now respects explicit specs over ambient ones** (debc2da)
Specs named directly in a `vcgen [...]` list now outrank specs pulled in from ambient locals or `*`, so the call-site choice wins when multiple candidates match. The fix also preserves higher priority when the same proof is reinserted.

### **`forall_congr` is replaced by `pi_congr` in congruence/simp** (7db3fc2)
The core congruence and simp machinery now uses the more general `pi_congr`, which works beyond `Prop`-only cases and fixes prior universe limitations. `forall_congr` remains available but is now deprecated.

### Other misc changes
- Formatter fix for spacing before `do` in `for` loops (2b3c28a)
- CI/build tweaks: adaptation PR workflow, lld sanitize preset, Lake core init, stdlib flags comment cleanup (749f580, 77a5093, 46e7a11, 212cf2d)
- Revert of the earlier `forall_congr` replacement patch ahead of re-review (7f03b50)
