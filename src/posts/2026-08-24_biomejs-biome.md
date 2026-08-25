---
date: 2026-08-24
repo: biomejs/biome
size: L
title: "Vue, Astro, and Markdown fixes land"
excerpt: "Major parser/linter fixes for Vue and Astro, plus a markdown formatter perf win and a couple of correctness bug fixes."
commits: 10
authors: [levrik, Netail, scs0209, dyc3, Princesseuh, ematipico, nhedger, 1678092075]
commit_authors: {"7754894": levrik, "496268d": Netail, "e55c2f5": scs0209, "a3bf6a5": dyc3, "88f805e": Princesseuh, "6ef52b0": 1678092075}
---

### **Vue custom directives no longer trigger unused warnings** (7754894)
Biome now recognizes variables and imports used as custom Vue directives, so `noUnusedVariables` and `noUnusedImports` stop flagging valid `v-highlight`-style bindings. The fix adds Vue directive-aware reference tracking and matching, closing a real false-positive gap in embedded template analysis.

### **Astro parsing now handles implicit fragments and void elements** (88f805e)
Astro expressions can now parse adjacent elements as implicit fragments instead of erroring, and unclosed HTML void elements like `{cond && <br>}` are accepted in templates. This touches parser, formatter, analyzer, and factory plumbing, so it meaningfully broadens Astro support and fixes multiple user-facing parse failures.

### **Markdown list formatting avoids quadratic behavior** (a3bf6a5)
The markdown formatter was reworked to keep pre-marker indentation only in the cases that actually need it, while skipping over newline and quote-prefix blocks more deliberately. This is a performance-oriented fix that should prevent list formatting from blowing up on certain nested layouts.

### **`noUnusedVariables` stops flagging implemented overload type params** (6ef52b0)
Type parameters declared on non-default function overload signatures are no longer reported as unused when the overload has an implementation. That aligns the rule with TypeScript semantics and removes a false positive that affected real overload patterns.

### **GraphQL enum naming diagnostics are more accurate** (496268d)
`useGraphqlNamingConvention` now ignores trivia such as comments and descriptions when deciding whether an enum value violates the rule, and the diagnostic range points at the actual enum value token. This makes the lint both less noisy and easier to fix.

### **Markdown blockquotes preserve fenced code formatting** (e55c2f5)
Fenced code blocks inside blockquotes are now dedented consistently before formatting, making the formatter idempotent for that structure. It fixes a visible markdown round-trip issue without changing broader quote formatting behavior.

### Other misc changes
- Rust toolchain bumped to 1.98.0
- `pnpm` updated to 11.22.0
- `papaya` crate bumped to 0.2.5
- Agent scan config adjusted
- Small internal cleanup/refactor commits
