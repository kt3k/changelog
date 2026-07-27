---
date: 2026-07-26
repo: biomejs/biome
period: weekly
slug: 2026-W30
period_label: "Jul 20–26, 2026"
size: L
title: "Biome sharpens type inference and expands YAML/Svelte formatting"
excerpt: "A week of major inference refactors, faster typed linting, and big formatter upgrades for YAML, CSS, HTML, and Svelte."
commits: 44
---

### **Type-aware analysis got more accurate and faster**
Biome spent much of the week refactoring its JS/TS inference engine to reduce false positives and improve performance. Rules like `noMisusedPromises`, `noMisleadingReturnType`, `useAwaitThenable`, and `useExhaustiveSwitchCases` now avoid diagnostics when inference is incomplete, while type consumers were rewritten to request only the information they need and cache export resolution. The result is both broader coverage for inferred async/Promise cases and less repeated type work in hot lint paths.

### **Formatter support expanded significantly, especially for YAML**
YAML saw the biggest user-facing formatter changes: support landed for document markers and directives, flow mappings, block scalars, cleaner comment indentation, node-property placement, and better handling of multiline/comment-heavy structures. On the CSS side, Biome fixed selector-boundary comment placement, escaped newlines in attribute selectors, SCSS parent-selector parsing, and commented function arguments, improving stability across tricky stylesheet inputs. HTML/Svelte formatting also got several correctness fixes, including comment deduplication, idempotent embedded reformatting, and support for Svelte declaration tags.

### **Parser and analyzer coverage broadened across web frameworks**
HTML and template support improved in a few notable ways: shorthand attributes now participate correctly in ARIA role inference, mixed-case doctypes are accepted, and Svelte-specific constructs like `{let ...}` and `{const ...}` are now parsed, formatted, and linted. These changes close several real-world gaps in Astro/Svelte/Vue-style markup handling and reduce false positives in accessibility and formatting workflows.

### **New lint capability and CLI output improvements**
Biome added a nursery `noRestrictedProperties` rule, along with migration/config support so ESLint conversions preserve options. On the CLI side, reviewdog-compatible `rdjson` output now includes explicit severities for every diagnostic, making downstream integrations more reliable.

### **Performance and infrastructure work rounded out the week**
The formatter picked up hot-path optimizations that the team reports as roughly 7% faster overall, and `noMisusedPromises` avoids unnecessary repeated inference on some expressions. Biome also added benchmark coverage for lint rules in CI, updated some dependencies, and made smaller maintenance changes around audit ignores, release metadata, and test snapshots.

### Other misc changes
- Tailwind class sorting now orders utilities by name more consistently
- Canonical inferred globals and `Symbol` global type plumbing were refactored
- Misc dependency bumps, lockfile updates, docs, and test/snapshot refreshes
