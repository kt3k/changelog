---
date: 2026-08-22
repo: biomejs/biome
size: L
title: "Two new lint rules, one Vue fix"
excerpt: "Biome adds Astro and CSS custom-property lint rules, fixes Vue attribute punctuation handling, and improves GritQL named re-export matching."
commits: 4
authors: [dyc3, jp-knj, ematipico]
commit_authors: {"18883b7": dyc3, "5c353e6": jp-knj, "3e5367f": ematipico, "a7cd286": dyc3}
---

### **New Astro `set:html` security rule** (5c353e6)
Biome adds `noAstroSetHtmlDirective`, a nursery lint rule that bans Astro’s `set:html` directive because untrusted HTML can lead to XSS. The rule is wired into config generation and ESLint migration, so projects can enable and migrate to it cleanly.

### **New CSS custom-property reference check** (3e5367f)
`noUndeclaredCustomProperties` now reports `var(--foo)` references when the custom property is not defined in available CSS or supported embedded style contexts. This closes a common stylesheet correctness gap and extends coverage to HTML-like style attributes and JSX string styles.

### **Vue hyphenation rule now ignores punctuation** (18883b7)
`useVueHyphenatedAttributes` no longer flags lowercase attribute names just because they contain punctuation such as `:` or `_`. The fix also avoids suggesting auto-fixes for colon-delimited names, preventing changes that could alter attribute meaning.

### **GritQL export patterns match more named re-exports** (a7cd286)
Grit patterns for `export { ... } from ...` now match aliased specifiers, inline `type` modifiers, and multiple specifier forms. That makes repository-wide refactors and searches more reliable for TypeScript export syntax.

### Other misc changes
- Configuration/schema updates for the new rules
- Added and expanded tests/snapshots for HTML, CSS, Vue, and GritQL cases
- Small rule registry and generated-file updates
