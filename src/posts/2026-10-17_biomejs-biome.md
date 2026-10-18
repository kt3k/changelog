---
date: 2026-10-17
repo: biomejs/biome
size: L
title: "Biome adds SCSS/YAML fixes and faster analysis"
excerpt: "Major SCSS/YAML formatter improvements landed alongside analysis and JS performance wins, plus several migration and Tailwind fixes."
commits: 17
authors: [dyc3, siketyan, denbezrukov, ematipico, latin-1]
commit_authors: {"2228346": dyc3, "b7ae302": denbezrukov, "acdcea5": dyc3, "98aa6f7": dyc3, "cf6e36c": dyc3, "e295f02": dyc3, "cd735e9": dyc3, "fcd3d74": dyc3, "ac71f2b": dyc3, "4de5d3d": latin-1, "9dd88b0": siketyan, "513f7db": siketyan, "13a5374": siketyan, "b9ee204": denbezrukov}
---

### **SCSS now handles dynamic `attr()` units and computed at-rule names** (b7ae302, b9ee204)
Biome's CSS parser and formatter now accept SCSS `attr()` units that are computed via interpolation, and they preserve comments in and around those units. It also now parses and formats computed dashed at-rule names like interpolated `@property`, `@font-palette-values`, and `@position-try` names, widening SCSS support in places that previously errored.

### **YAML formatter keeps directive and flow-map comments in place** (acdcea5, 98aa6f7)
Two YAML comment-placement fixes landed: comments after directives are now kept with the document header instead of drifting across the `---` boundary, and comments between flow-mapping keys and values are preserved more like Prettier. These changes reduce surprising reformatting in real-world YAML files with directives and inline annotations.

### **Vue macro ordering lint now detects and rewrites more cases** (cf6e36c)
The `useVueDefineMacrosOrder` rule got a substantial fix for both detection and reordering, covering more invalid macro arrangements in Vue components. That makes the rule more reliable when it auto-fixes import/macro ordering in complex component setups.

### **Tailwind shorthand classes preserve their intended semantics** (e295f02, 4de5d3d)
Biome tightened Tailwind-related logic so shorthand classes keep their meaning, and CSS property sorting no longer disturbs Tailwind theme wildcard ordering. This reduces false-positive rewrites in Tailwind-heavy codebases where ordering can affect generated styles.

### **`biome migrate eslint` now preserves `eqeqeq` null behavior** (fcd3d74, cd735e9)
The ESLint migration path now carries over `eqeqeq` null-comparison options into Biome's `noDoubleEquals` configuration, instead of dropping that nuance. A related migration fix also marks `useSingleVarDeclarator` as inspired, improving the fidelity of converted configs.

### **CSS-in-JS interpolation support was expanded and polished** (513f7db, 9dd88b0, 13a5374)
Biome expanded parsing and formatting for CSS-in-JS snippets with interpolations, including styled-components/Emotion-style templates, and improved compatibility with Prettier in embedded CSS snippets. The lexer and formatter changes also broaden metavariable handling so interpolations can be parsed and formatted more consistently across embedded CSS contexts.

### **Analysis and JS control-flow graph walking got faster** (ac71f2b, 2228346)
The analyzer now skips walking node kinds that no visitor in a phase cares about, which should speed up linting and assists, especially when running with fewer enabled rules. JS control-flow graph construction was also optimized to visit only statement and function nodes, trimming unnecessary traversal work.

### **CSS `:attr()` parsing/formatting now covers more SCSS cases** (b7ae302)
The `attr()` formatter gained explicit handling for SCSS variable, namespaced variable, and interpolated identifier types, plus comment placement logic around computed units and fallbacks. This closes several edge cases in modern CSS/SCSS syntax rather than treating them as malformed or formatting them awkwardly.

### Other misc changes
- Benchmark CI updated to track more CSS and embedded-formatting targets.
- Sponsors list refreshed across package READMEs.
- Added changesets for upcoming patch releases.
- Minor formatter/parser test updates and internal refactors.
