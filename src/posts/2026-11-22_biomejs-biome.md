---
date: 2026-11-22
repo: biomejs/biome
size: L
title: "Astro semantic model lands; parser bugs fixed"
excerpt: "Major Astro semantic-analysis work shipped alongside markdown parser fixes, HTML/Svelte formatter improvements, and a Tailwind SIMD speedup."
commits: 24
authors: [ematipico, dyc3, jfmcdowell, garysassano]
commit_authors: {"a0acfd5": jfmcdowell, "70d6154": garysassano, "8455a95": dyc3, "2c4a0f1": dyc3, "37f53da": ematipico, "89b89df": ematipico, "5d4d474": ematipico, "2ec6bbe": ematipico, "0c0dfe2": ematipico, "e2a8e85": ematipico, "ef2d71a": ematipico, "a5aa4f2": ematipico, "8bdb36c": ematipico, "4ea9690": ematipico, "01ce2dd": ematipico, "6981d43": ematipico, "041fca8": ematipico, "5f0eb32": ematipico, "64bffda": ematipico, "11027d4": ematipico}
---

### **Astro semantic model foundation and cross-language analysis** (64bffda, 5f0eb32, 041fca8, 01ce2dd, 4ea9690, 8bdb36c, a5aa4f2)
Biome added a new Astro semantic model and then rapidly extended it to cover frontmatter, client scripts, `define:vars`, and cross-language references. That unlocked more accurate linting and safer rename/unused-import behavior across Astro templates, scripts, and styles, while also introducing the plumbing to run file-level rules once per host document.

### **Astro now gets dedicated lint rules and rule fixes** (e2a8e85, ef2d71a, 6981d43)
A new Astro-specific `noAstroComponentDefaultExport` rule ships, and existing HTML/CSS analysis now understands dynamic Astro attribute values and `<style define:vars>` custom-property declarations. These changes reduce false positives and make Astro lint results match real template behavior much more closely.

### **Markdown blockquotes no longer hang on whitespace-only quote lines** (a0acfd5)
Biome fixed a Markdown parser hang when a quoted line contains only spaces after `>`, especially inside list items. The formatter and parser now handle blank quote lines and quote-boundary trimming correctly, preventing an infinite-loop class bug on valid Markdown input.

### **HTML/Svelte formatting preserves touching blocks and embedded content** (70d6154, 5d4d474, 2ec6bbe, 0c0dfe2, 89b89df, 11027d4)
Formatting and parsing for HTML/Svelte were tightened to keep `{#if}`/`{#each}` blocks attached to siblings, preserve failed or unsupported Astro embeds, and correctly format `class`/`style` attributes and style-attribute quotes. Astro doctypes after top-level elements are now parsed and rewritten without errors, which fixes a real formatting stability edge case.

### **Tailwind parser gets NEON byte classification** (8455a95)
The Tailwind lexer now uses NEON-based byte classification on aarch64, a targeted performance improvement for ARM users. This should make parsing faster on supported hardware with no behavior change.

### Other misc changes
- Dependency/security advisory update (`Cargo.lock`) (2c4a0f1)
- Rowan token-walk refactor (37f53da)
- Test and snapshot updates for Astro/HTML/Markdown behavior (multiple commits)
- Baseline data refresh for `useBaseline` CSS rules (abe482c)
