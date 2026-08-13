---
date: 2026-08-12
repo: biomejs/biome
size: M
title: "Biome tightens HTML whitespace and class sorting"
excerpt: "HTML formatter whitespace fixes and smarter Tailwind v4 class ordering headline a notable day, with smaller CLI flags metadata cleanup."
commits: 3
authors: [dyc3, johncarmack1984, yanthomasdev]
commit_authors: {"36430eb": dyc3, "ff31f40": johncarmack1984, "57b197e": yanthomasdev}
---

### **HTML formatter now handles whitespace more accurately in fallback elements** (36430eb)
Biome fixed whitespace borrowing/classification around `marquee`, `noscript`, `video`, `audio`, and `object`, reducing cases where text or child content was formatted with the wrong spacing. The change also adds coverage for CSS display classifications and noscript adjacency, so formatting is more consistent with the elements’ actual layout behavior.

### **Tailwind v4 `useSortedClasses` learns custom-property ordering and stricter modifier validation** (ff31f40)
The sorter now handles custom properties and unknown property names explicitly, placing them after real properties instead of misclassifying them. It also rejects invalid modifiers for arbitrary properties and extends the Tailwind v4 preset/type plumbing, which should make class sorting more correct for newer Tailwind syntax.

### Other misc changes
- `biome rage` metadata updated to include more environment variables and clearer wording (57b197e)
- Test snapshot updates and minor CLI assertion tweaks
- Changeset/release-note entries added
