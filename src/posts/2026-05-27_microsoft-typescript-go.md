---
date: 2026-05-27
repo: microsoft/typescript-go
size: L
title: "VS references output, alias resolution, and fixes"
excerpt: "Added classified VS Find All References output, fixed alias lookup and a private-identifier panic, plus extension setting cleanup."
commits: 4
authors: [navya9singh, DanielRosenwasser, ahejlsberg]
commit_authors: {"94f31f3": navya9singh, "898015c": DanielRosenwasser, "3215d45": ahejlsberg}
---

### **Classified text output for VS Find All References** (94f31f3)
TypeScript Go now has a dedicated VS-style Find All References baseline/output path, including classified text and cross-project reference item sorting/renumbering for stable tests. This also wires the protocol and language-service pieces needed to serve `TextDocumentVSReferencesInfo`, which should make VS reference results more structured and testable.

### **Resolve aliases through the full meaning chain** (3215d45)
`resolveEntityName` now keeps walking alias links until it finds a symbol with the requested meaning, instead of stopping at the first alias hop. That fixes cases where CommonJS-exported or re-exported types could resolve to the wrong symbol shape.

### **Fix panic for decorators on private identifiers** (865c8d0)
A checker panic in `getClassElementPropertyKeyType` was replaced with a normal error type return. This prevents completion/type-checking from crashing on decorator usage against private methods.

### **Fix configuration lookup and `js/ts` preference in the extension** (898015c)
The extension now treats `js/ts.experimental.useTsgo` as the preferred save target when syncing the toggle, and it cleans up the older `typescript` setting when appropriate. It also fixes the warning/source-setting lookup so the UI points at the right config key.

### Other misc changes
- Added fourslash coverage for the new VS references baseline format.
- Updated hover/signature help/printer and LSP generation to support the new reference/classification plumbing.
- Miscellaneous baseline updates and test additions.
