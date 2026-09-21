---
date: 2026-09-20
repo: biomejs/biome
size: M
title: "Biome adds two nursery JS lint rules"
excerpt: "New rules flag promise rejections without Errors and self-imports; Tailwind preset and rule-doc handling also saw notable updates."
commits: 5
authors: [dyc3, Netail, m1handr, johncarmack1984]
commit_authors: {"2906986": johncarmack1984, "9bbff0c": dyc3, "81b0adb": Netail, "0884e29": dyc3, "17a2560": m1handr}
---

### **New JS rule enforces Error objects in Promise rejections** (9bbff0c)
Biome now ships `usePromiseRejectErrors`, a nursery lint rule that flags `Promise.reject(...)` and rejection paths that use non-Error values. The rule is wired into configuration, diagnostics, migration mapping, and the public schema, so it can be enabled and surfaced consistently across the toolchain.

### **New nursery rule bans self-imports** (81b0adb)
`noSelfImport` was added to catch modules importing themselves, a common source of accidental circular or nonsensical imports. The rule is fully registered in config, diagnostics, and ESLint migration support, and includes dedicated tests.

### **Tailwind arbitrary-value checks now use shared syntax detection** (0884e29)
`noTailwindArbitraryValue` was refactored to rely on the shared Tailwind syntax query instead of its own attribute parsing and Tailwind parser path. This also removes the rule’s `attributes` and `functions` options, simplifying the API while aligning detection with other Tailwind-based rules.

### **Rule-doc analyzer now handles HTML-like snippets for JS rules** (17a2560)
Biome improved documentation snippet analysis so JavaScript rule docs can include HTML-like embedded examples, including Astro cases. This makes rule docs more accurate and reduces false failures when validating embedded examples.

### Other misc changes
- Updated the Tailwind v4 class-sorting preset to Tailwind CSS 4.3.3 (2906986).
- Added/updated rule docs and config plumbing for the new rules.
- Minor doc-example adjustments for `useAltText` and `noUnusedVariables`.
