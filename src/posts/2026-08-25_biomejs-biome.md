---
date: 2026-08-25
repo: biomejs/biome
size: M
title: "Vue fixes and Markdown perf wins"
excerpt: "Two Vue lint/parser fixes, three Markdown performance improvements, and a changeset tooling upgrade landed today."
commits: 7
authors: [ematipico, dyc3, levrik, Netail, aminya, scs0209]
commit_authors: {"e2fc036": dyc3, "652aedb": levrik, "f283cb6": ematipico, "90b2dac": ematipico, "e170a93": Netail, "e6acded": aminya, "9743d0c": scs0209}
---

### **Vue CSS v-bind now counts as usage** (e2fc036)
`noUnusedVariables` no longer flags Vue `<script setup>` bindings that are only referenced from scoped CSS `v-bind()` calls. This fixes a real false positive in Vue single-file components and required plumbing the service layer to recognize embedded CSS references.

### **`noGlobalAssign` avoids false positives in Vue `<script setup>`** (652aedb)
Assignments to `<script setup>` bindings are no longer mistaken for writes to built-in globals when the same name exists as a Vue binding. That prevents spurious diagnostics in template expressions while still preserving the rule for true global writes in plain script code.

### **Markdown parser gets faster and does less work** (f283cb6, 90b2dac)
Two performance passes trimmed Markdown parsing overhead by reducing rescans, avoiding unnecessary checks/string allocations, and caching frontmatter fence lookups. Together these changes should lower parse time on link-heavy and frontmatter-heavy documents.

### **`useArraySortCompare` skips type inference earlier** (e6acded)
The rule now checks the called member name before asking the type system whether the receiver is an array. That avoids expensive inference for unrelated method calls and speeds up linting in common cases.

### **`useValidAnchor` recognizes Astro shorthand `href`** (9743d0c)
Astro JSX shorthand attributes like `<a {href}>` are now treated as a valid `href` by `useValidAnchor`. This closes a false positive for Astro users and keeps the rule aligned with how shorthand props are compiled.

### Other misc changes
- Changesets tooling upgraded and release workflow updated to the newer action/config format (e170a93).
