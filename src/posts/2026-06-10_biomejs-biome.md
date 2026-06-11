---
date: 2026-06-10
repo: biomejs/biome
size: L
title: "Biome lands CSS, Markdown, and Svelte fixes"
excerpt: "Major parser and formatter improvements across CSS Modules, Markdown lists/quotes, and Svelte-aware HTML linting."
commits: 7
authors: [jfmcdowell, Mokto, ematipico, ShaharAviram1, mvanhorn, xsourabhsharma]
commit_authors: {"263c7cc": Mokto, "ac4944f": ematipico, "84b43c5": ShaharAviram1, "311c2b2": mvanhorn, "6e8557b": xsourabhsharma, "fe03ff9": jfmcdowell, "8ac6e4a": jfmcdowell}
---

### **CSS Modules `composes` now accepts comma-separated values** (6e8557b)
Biome’s CSS parser/formatter now handles `composes: classA from "./a.css", classB from "./b.css";` instead of rejecting or misformatting it. This closes a real CSS Modules parsing gap and updates the syntax model so downstream tooling sees a proper separated list.

### **Markdown list formatting is overhauled to match Prettier more closely** (ac4944f)
The Markdown formatter got a substantial rewrite focused on bullet/ordered list behavior, continuation indents, and quote/list edge cases. This is the kind of change that affects day-to-day output quality across a core formatter.

### **Markdown parser fixes block quotes with link-reference definitions** (fe03ff9)
A block quote now resets link-reference-definition continuation state so quoted content like `> 2. q` is parsed correctly after a definition. That fixes a subtle CommonMark interruption bug that could demote valid lists to paragraphs.

### **Svelte interpolations are now understood inside quoted HTML attributes** (263c7cc)
HTML linting and formatting were updated to recognize Svelte template chunks inside quoted attribute values, reducing false positives in `noRedundantAlt`, `useButtonType`, and `noScriptUrl`. This matters for Svelte users because dynamic quoted attributes are now treated more like real values instead of static text.

### **`noProcessEnv` now catches imported `env` usage** (84b43c5)
The JS lint rule was expanded beyond `process.env` member access to also flag `env` when imported or destructured from `process`/`node:process`. That closes a common bypass path and makes the rule materially more effective.

### Other misc changes
- Markdown syntax cleanup: removed dead syntax kinds and bogus-node handling (8ac6e4a)
- Configuration schema docs: avoided Markdown links in JSON schema descriptions (311c2b2)
