---
date: 2026-05-10
repo: biomejs/biome
size: M
title: "Astro, CSS, and overrides get fixes"
excerpt: "Biome fixed Astro frontmatter handling, Astro diagnostics, HTML/Vue/Svelte newline preservation, and formatter overrides for trailing commas."
commits: 5
authors: [dyc3, Conaclos, denbezrukov]
commit_authors: {"9b1577f": dyc3, "b59133f": dyc3, "ef764d5": Conaclos, "ed26542": denbezrukov, "2e37709": dyc3}
---

### **Support `formatter.trailingCommas` in overrides** (9b1577f)
Biome now honors `trailingCommas` inside formatter override blocks, matching the top-level formatter config. This fixes per-glob formatting behavior so overridden files can use different trailing-comma rules.

### **Preserve Astro frontmatter exactly during write mode** (b59133f)
Biome no longer injects extra newlines into Astro frontmatter when lint/assist write mode runs. That prevents formatting-only writes from silently changing the file structure.

### **Show Astro diagnostic advice at the correct location** (ef764d5)
Astro diagnostics now carry the right offset when reported from embedded content, so suggestions and assist output point to the real source span. This makes lint feedback much easier to act on in mixed Astro files.

### **Fix HTML/Vue/Svelte standalone interpolation newline preservation** (2e37709)
The HTML formatter now keeps existing newlines around isolated interpolations in inline elements instead of collapsing them away. This corrects Vue and Svelte formatting for cases like multiline `{{ value }}` blocks.

### **Refactor SCSS ratio parsing in expressions** (ed26542)
The SCSS parser dropped special handling for `10/10` from interpolatable value parsing and updated the affected snapshots. This is a parser refactor with broad test churn, but the change is internal and focused on expression handling.

### Other misc changes
- Added/updated Astro import-organization test coverage and snapshots.
- Updated a Claude skill doc with a note about `prettier-compare --rebuild` in read-only modes.
- Changeset and snapshot/test maintenance across the touched areas.
