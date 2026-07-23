---
date: 2026-07-22
repo: biomejs/biome
size: L
title: "CSS, inference, and CLI output get a boost"
excerpt: "Major CSS formatter and type-inference refactors land, plus fixes for rdjson severity and Svelte/CSS formatting edge cases."
commits: 7
authors: [ematipico, denbezrukov, marschattha, ruidosujeira]
commit_authors: {"2909809": denbezrukov, "f0ebdbb": denbezrukov, "e9a9f03": ematipico, "ec8c501": ematipico, "67fa4b7": ematipico, "cc90e65": marschattha, "6d18204": ruidosujeira}
---

### **Preserve escaped attribute newlines in CSS formatting** (f0ebdbb)
Fixes a selector-formatting bug where escaped newlines inside attribute matcher values could break surrounding groups. The formatter now preserves those literal line breaks without expanding the whole selector, keeping output stable for range formatting.

### **Add canonical inferred globals to module inference** (ec8c501)
Module type inference now tracks canonical global types instead of relying on the previous globals plumbing. This is a substantial internal rewrite that changes how inferred globals are represented and merged, which should make future type inference behavior more consistent.

### **Refactor inference to structural type mapping** (67fa4b7)
The type system was reworked around structural mapping of interned types, replacing a large chunk of the old substitution machinery. This is a deep refactor in the inference core and lays groundwork for more flexible type transformations.

### **Support preserved SCSS custom properties in CSS** (2909809)
CSS formatting and analysis now recognize preserved SCSS custom property syntax as a first-class node family. That expands parser/factory coverage and prevents lints from misfiring on custom property values.

### **Populate severity in rdjson reporter output** (cc90e65)
The CLI’s Reviewdog-compatible reporter now emits explicit severities for every diagnostic. That makes the output more useful to downstream tooling, which no longer has to guess whether a finding is an error, warning, or info.

### **Match Prettier for Svelte destructuring and bind formatting** (6d18204)
Svelte `{#each}` destructuring no longer inserts extra spaces inside square brackets, and multiline `bind:` function expressions are indented more cleanly. This brings the HTML/Svelte formatter closer to expected output on real-world templates.

### Other misc changes
- Inference resolver ported to Salsa module inference (e9a9f03)
- Test and snapshot updates across CSS, CLI, HTML, and inference
- Minor lint guards for CSS custom property values
