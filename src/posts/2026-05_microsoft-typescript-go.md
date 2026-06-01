---
date: 2026-05-31
repo: microsoft/typescript-go
period: monthly
slug: 2026-05
period_label: "May 2026"
size: L
title: "TypeScript-Go hardens JSDoc, emit, and LS stability"
excerpt: "A month of broad correctness work: JSDoc parsing/diagnostics, declaration emit fidelity, crash fixes, and faster resolution/scanning paths."
commits: 154
---

### Core compiler stability and correctness
**Crash and panic fixes across checker, parser, and printer** — May saw a steady stream of robustness fixes, eliminating crashes in tuple inference, JSX recovery, async accessors, JSDoc reparsing, destructuring, `noUncheckedIndexedAccess` + `noLib`, decorated private members, regex scanning on invalid UTF-8, and several other edge cases. Many of these were hard failures turned into ordinary diagnostics.

**More accurate type inference and narrowing** — The checker got multiple targeted inference fixes: better `this.xxx` assignment typing, improved handling of `never` and unions, safer recursive constraint expansion, corrected enum `NaN` behavior, improved rest/tuple inference, and a fix for expando object circularity and inferred index signatures. These changes tighten correctness in common generic and object-literal patterns.

### JSDoc, diagnostics, and editor behavior
**JSDoc parsing and host matching were significantly refined** — The month was especially heavy on JSDoc work: `@extends`/`@augments`, `@param`, `@satisfies`, fenced code blocks, `@template` modifiers, namespace declarations, `@callback`, and `@overload` all saw parser, reparse, and diagnostics fixes. Error spans became more accurate too, notably for `@satisfies` and property-access bases.

**Language service feedback is more consistent** — Hover and diagnostics behavior improved for `as const`, destructured bindings, JSX intrinsic tags, signature help, workspace symbols, and VS-style Find All References. Several fixes also removed state poisoning and crash paths after hover/diagnostic requests.

### Declaration emit and output fidelity
**Declaration emit was a major focus** — `.d.ts` generation gained many precision fixes: trailing commas in binding patterns, preserved `readonly` and JSDoc, better handling of shadowed type parameters, computed property names, numeric export names, `typeof` postfix forms, `NaN`/`Infinity`, `new`-like property names, and non-ASCII string literals. The emit pipeline now more closely preserves source intent and avoids duplicate or malformed declarations.

**JSDoc-to-declaration translation improved** — The emitter now restores nested JSDoc names, preserves namespace-like declarations, and handles more JSDoc-driven shapes without flattening or dropping information. This reduces churn in generated typings and makes output better match source comments.

### Performance, resolution, and LSP robustness
**Filesystem and resolution paths got faster** — The watcher reduced redundant directory scanning, `realpath` handling was sped up on Linux/macOS and symlink-heavy trees, and symbol-accessibility lookups were cached more effectively. Auto-import scanning also became more selective around package exports, with an opt-in deeper search preference to avoid expensive tree walks.

**The server and extension became more resilient** — The LSP now shuts down when its parent exits, avoids hanging on diagnostics refresh, handles unsupported platform probing, and records better crash telemetry. The VS Code extension also adjusted `useTsgo`/config precedence and added experimentation telemetry plumbing.

### Project/configuration and module-resolution updates
**Config and project discovery were tightened** — `tsconfig` option names are now case-sensitive with suggestions, `jsconfig.json` is preferred for JS files when both configs exist, `rootDir` mismatches are diagnosed earlier, and `extends` cycles no longer deadlock. Module resolution also saw fixes for package exports fallback, self-name resolution, and `paths`/project-relative specifier selection.

### Other misc changes
**Editor and tooling polish** — Added VS tooltip-coloring coverage, classified VS references output, improved path completions, fixed auto-import casing and CSS augmentation crashes, aligned completion tags for deprecated items, and updated assorted test baselines, docs, Copilot instructions, and release metadata.
