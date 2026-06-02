---
date: 2026-05-14
repo: microsoft/typescript-go
size: L
title: "TypeScript-Go sharpens overloads, index signatures"
excerpt: "JS expando index signatures now infer better, overload-tag handling was tightened, and realpath resolution got a major speedup."
commits: 11
authors: [weswigham, jakebailey, andrewbranch, a-tarasyuk, johnfav03, ahejlsberg]
commit_authors: {"4423492": weswigham, "c282336": weswigham, "49b85c9": andrewbranch, "c65161e": weswigham, "137998e": a-tarasyuk, "a8b2a52": jakebailey, "37632e9": johnfav03, "895d80c": ahejlsberg, "2d9635d": jakebailey}
---

### **Speed up realpath resolution on Linux and macOS** (a8b2a52)
This adds platform-specific canonical path resolution using cheaper syscalls instead of `filepath.EvalSymlinks`. The Linux and Darwin implementations should cut filesystem lookups from O(depth) to roughly O(1), which matters for editor and language-service responsiveness.

### **Provide implicit index signatures for JS expando object literals** (895d80c)
JS expando object literals now count as inferable index-signature sources, so objects extended with properties can flow into `Record<string, ...>`-style expectations more naturally. The change fixes related type inference and error reporting around these patterns, and it updates the checker logic to treat JS literals alongside other inferable object forms.

### **Accept `@overload` tag declaration changes** (c282336)
Several `@overload`-related test baselines were moved from triaged to accepted, reflecting finalized JS declaration emit behavior. This is a behavior-shaping compiler change, not just test churn, because it codifies what kinds of declarations can participate in overload tagging.

### **Handle deprecated tags in completions** (137998e)
Completion generation now preserves deprecation metadata from both sort-text and kind-modifier parsing, emitting `CompletionItemTagDeprecated` when appropriate. That should improve LSP completion fidelity for deprecated symbols and tags.

### **Collect telemetry on recovered notification panics and stderr on unrecovered panics** (49b85c9)
The VS Code extension now captures recent server stderr, sanitizes it, and includes it in crash telemetry for language-server disconnects. That gives maintainers much better signal when diagnosing server panics without exposing raw user data.

### **Move `@callback` variadic baseline to accepted** (c65161e)
Baseline triage was updated for `@callback` variadic behavior, indicating the previous diffs are now considered expected.

### **Use original node text when reporting cannot find name errors where possible** (4423492)
The checker now prefers the original declaration text for unresolved-name diagnostics when the missing identifier matches the source node. This improves error messages, especially around escaped identifier spellings.

### **Fixed `useTsgo` setting priority ordering** (37632e9)
The VS Code extension adjusts how workspace and user priorities are merged for `useTsgo`, fixing setting resolution order.

### **Add `unstable` to API exports in `package.json`** (a661e41)
The native-preview package renamed its public entrypoints under an `unstable/` namespace and updated internal tests accordingly. This is an API surface change for consumers of those exports, even though the implementation details are mostly packaging and test updates.

### **Don't double count approximateLength during node reuse recovery** (2d9635d)
A small checker fix prevents `approximateLength` from being incremented twice during recovery boundary handling, reducing the chance of skewed node-copy behavior.

### **Other misc changes**
- Accepted `@callback` and `@overload` baseline moves across several tests.
- README status note updated.
- Minor test/baseline maintenance around numeric-separator diagnostics and completion generation.
