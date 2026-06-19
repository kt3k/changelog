---
date: 2026-06-18
repo: biomejs/biome
size: L
title: "Security fixes and semantic/lsp updates"
excerpt: "Biome shipped two security-related dependency fixes plus meaningful lint, config, and LSP behavior changes."
commits: 10
authors: [ematipico, Mokto, Bertie690, theBGuy, IxxyDev, qwertycxz]
commit_authors: {"c245f9d": Mokto, "043fbb5": ematipico, "0beea15": Bertie690, "3694a13": theBGuy, "39e4fd5": IxxyDev, "844b1be": ematipico, "3375b53": ematipico, "23814f1": qwertycxz}
---

### **Security fixes for Vite and an internal CVE**
Biome updated `vite` to 7.3.5 across the JS packages and added a workspace exception for that security release (3c47daf). It also bumped `git2` in the codegen toolchain and adjusted the formatter’s dirty-file scan to handle path access more safely (3375b53).

### **`noUnusedVariables` now recognizes Svelte `{@html}` usage**
The HTML parser and analyzer were updated so Svelte variables referenced inside `{@html expr}` are treated as used, including cases inside `<pre>` blocks (c245f9d). This closes a false positive in `noUnusedVariables` and required a parser tweak to keep `<pre>` content visible to the AST while preserving verbatim formatting.

### **`useAnchorContent` stops flagging anchors used as render props**
`useAnchorContent` now skips `<a>` elements passed as JSX attribute values on custom components, covering plain, wrapped, and parenthesized forms (3694a13). That avoids false positives for patterns like `render={<a href="..." />}`, where the component may later render the anchor as intended content.

### **Rule configuration now requires an explicit `level`**
Biome now errors when a rule option omits `level`, making the config shape stricter and less ambiguous (043fbb5). The deserializer and config tests were updated so missing-level rule entries fail fast instead of being accepted implicitly.

### **Same-name function overloads are preserved separately in semantic analysis**
The semantic/module graph pipeline now tracks function declarations and `declare function` overload signatures with a dedicated declaration kind instead of lumping them into hoisted values (39e4fd5). That improves overload handling in scope analysis and reduces the risk of collapsing distinct function overload bindings.

### **LSP go-to-definition is now opt-in**
Biome disabled go-to-definition by default in the LSP extension to avoid eager module-graph work and the memory issues it could trigger in large workspace roots (844b1be). Users who need the feature will have to enable it explicitly in editor settings.

### **Other misc changes**
- Docs/rustdoc cleanup for `noImplicitCoercions` (0beea15)
- `biome_configuration` schema gained `allowTrailingCommas` for VS Code (23814f1)
