---
date: 2026-09-06
repo: biomejs/biome
size: M
title: "New lint rules and parser fix land"
excerpt: "Biomes adds two safety-focused lint rules, fixes a markdown fence loop, and improves preview release metadata."
commits: 6
authors: [dyc3, Netail]
commit_authors: {"de0528f": dyc3, "5a9c1fc": dyc3, "71c8f74": dyc3, "07a0073": Netail, "c23e4c7": Netail}
---

### **Add CSS layering rule support and migration mapping** (07a0073)
Biome now ships the nursery `useLayeredStyles` rule, which enforces cascade-layer usage for style rules and layered imports. The change also wires the rule into configuration, diagnostics, schema generation, and ESLint migration so it can be enabled and migrated consistently.

### **Add Svelte `{@html}` safety rule** (de0528f)
This introduces the nursery `noSvelteAtHtmlTags` rule to flag Svelte `{@html}` tags that render unescaped HTML. It’s integrated across rule metadata, domain selection, schema generation, and migration support, making it available as a first-class lint check.

### **Prevent infinite loop in markdown fenced-code parsing** (5a9c1fc)
The markdown parser is updated to avoid getting stuck after closing fenced code blocks, fixing a correctness issue that could hang parsing on certain list-and-fence combinations. New regression tests cover the affected indentation and trailing-whitespace cases.

### **Add iframe sandbox safety lint** (c23e4c7)
Biome adds `noUnsafeIframeSandbox`, a nursery rule that reports `iframe` sandbox configurations combining `allow-scripts` and `allow-same-origin`. That combination can let embedded content escape its sandbox, so this is a meaningful security-oriented lint addition.

### **Improve preview release notes with branch/PR context** (71c8f74)
Preview release messages now include the source branch or tag, and when possible link to the associated open pull request. This makes preview builds easier to trace back to the work that produced them.

### Other misc changes
- Rust toolchain bumped to 1.98.1 (1 commit).
