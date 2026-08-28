---
date: 2026-08-27
repo: biomejs/biome
size: L
title: "Vue lint fixes and stdin framework support"
excerpt: "Better Vue ref analysis, faster type inference, and full HTML support for stdin files; release housekeeping and CI cleanup round it out."
commits: 6
authors: [dyc3, MatteoGabriele, levrik]
commit_authors: {"afc4615": dyc3, "372cd68": dyc3, "382b15d": dyc3, "6f40e82": levrik}
---

### **Vue ref rule now tracks aliases and avoids false positives** (372cd68)
`noVueRefAsOperand` was overhauled to follow Vue refs through declaration aliases, `toRefs()` properties, and `useTemplateRef()` results. It also stops flagging supported cases like plain ref transfers, `defineModel()` modifiers, and `.effect`, while improving rule performance.

### **stdin-file-path now gets full Astro/Svelte/Vue support** (afc4615)
Files checked from stdin now use the same full HTML/framework support as normal files when experimental full support is enabled. That fixes editor/CLI workflows where Astro, Svelte, or Vue markup references were previously handled incompletely.

### **`noFloatingPromises` avoids expensive full inference on class methods** (382b15d)
Type inference was tightened so calls to non-Promise methods on third-party TypeScript classes can be classified without falling back to costly full inference. This should noticeably reduce overhead in projects that hit that rule often.

### **`noVueRefAsOperand` stops blaming nested callback params** (6f40e82)
The Vue ref rule no longer misidentifies callback parameters inside `ref()`, `computed()`, and similar calls as unwrapped refs. This removes a class of false positives in common array callback patterns like `.find()` and `.map()`.

### Other misc changes
- CI agentscan config simplified and pruned (1 commit)
- Release housekeeping: changelog updates and removal of published changesets (1 commit)
