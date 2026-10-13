---
date: 2026-10-12
repo: biomejs/biome
size: L
title: "Markdown embeds, CSS parsing, and new lint rules"
excerpt: "Biome added multiple new lint rules, improved CSS/SCSS handling, fixed plugin include resolution, and expanded markdown embed behavior."
commits: 19
authors: [dyc3, denbezrukov, ematipico]
commit_authors: {"0651f3a": ematipico, "84f62f2": dyc3, "90f2eaf": dyc3, "6dcc3b7": denbezrukov, "80a9204": dyc3}
---

### **Markdown embeds now format and analyze embedded code** (0651f3a)
Biome now recognizes fenced code blocks, frontmatter, and HTML blocks as embedded languages and can format them with the relevant language formatter. It also adds `markdown.analyzeEmbeds` so lint/assist can run inside embeds, plus migration support from Prettier’s embedded-language formatting option.

### **Plugin `includes` now resolve relative to the config file** (90f2eaf)
Plugin glob patterns are no longer matched against absolute paths; they’re evaluated relative to the directory of the configuration file, matching how `files.includes` and `overrides[].includes` work. That fixes plugins silently not running for relative patterns and aligns include behavior across config types.

### **CSS/SCSS media feature parsing got broader support** (6dcc3b7)
Biome now treats computed SCSS media feature names and related expressions as dynamic in `noUnknownMediaFeatureName`, reducing false positives on valid computed queries. The parser and formatter were also updated to handle computed media feature syntax in both CSS and SCSS.

### **Tailwind raw-color diagnostics now suggest theme colors** (84f62f2)
`noTailwindRawColors` can now read the configured Tailwind stylesheet and suggest up to three matching design-system colors instead of only flagging raw palette values. This makes the rule much more actionable in projects with a custom theme.

### **More rules for Svelte, Vue, booleans, and `this` usage**
Biome added several new lint rules across JS, HTML, and Svelte/Vue support, including `useSvelteReactiveClasses`, `useLowercaseTestTitle`, `useSimplifiedBooleanReturn`, `useSvelteShorthandDirective`, `noSvelteAddEventListener`, `useVueMatchingComponentFileName`, `noInvalidThis`, `useTailwindStaticClassStrings`, and `noObjectConstructor`. These expand coverage for common framework patterns and correctness issues.

### **`noUnusedImports` now handles Svelte stores** (80a9204)
Unused-import detection was updated to account for Svelte store conventions, so store imports and subscriptions are classified correctly instead of being incorrectly flagged. That should reduce false positives in Svelte projects.

### Other misc changes
- Rule metadata and unsupported-rule mappings updated (2 commits)
- GitHub Actions workflow version bumps (1 commit)
- Minor internal rule metadata tweaks in lint rules and migration code (2 commits)
