---
date: 2026-07-16
repo: microsoft/typescript-go
size: L
title: "Hover UX and crash fixes land"
excerpt: "A new Visual Studio-style hover mode ships alongside two stability fixes for type expansion and signature help."
commits: 3
authors: [johnfav03, navya9singh]
commit_authors: {"b8276f3": johnfav03, "165b58e": johnfav03, "3ff7910": navya9singh}
---

### **VS enhanced hover adds symbols, icons, and colored text** (3ff7910)
The LSP hover path now emits a richer VS-specific payload for clients that advertise Visual Studio extensions, including symbol icons and classified/colorized text. This also adds fourslash coverage and baseline rendering support for the new `_vs_rawContent` shape so the richer output can be tested reliably.

### **Fix stack overflow in `checkTypeExpandability()`** (b8276f3)
A recursion guard was added when expanding types so self-referential type arguments no longer blow the stack during quick info generation. This fixes a fatal hover-time crash on cyclic generic shapes and keeps verbosity expansion terminating.

### **Fix nil pointer dereference in signature help for recovered parameter types** (165b58e)
The checker now defensively handles copied type nodes whose parent link is missing during signature-label serialization, avoiding a nil pointer dereference in error-recovered signatures. That makes signature help survive partially parsed code instead of crashing.

### Other misc changes
- Added regression fourslash tests and baselines for the two crash fixes.
- Updated hover baseline plumbing for the new VSQuickInfo command.
