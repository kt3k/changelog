---
date: 2026-08-16
repo: vitejs/vite
period: weekly
slug: 2026-W33
period_label: "Aug 10–16, 2026"
size: M
title: "Optimizer cleanup, define fixes, and docs clarifications"
excerpt: "Vite tightened bundler cleanup, fixed $-prefixed define replacements, and clarified CSS target precedence plus Rolldown docs."
commits: 13
---

### **Resource cleanup across optimizer and transform paths**
Vite now closes temporary Rolldown and define-plugin bundlers after generation, avoiding leaked resources and ensuring `closeBundle` hooks run reliably in optimizer-only flows.

### **Define plugin now handles $-prefixed replacement keys**
A regression in define substitution was fixed so escaped-dot matching no longer breaks keys like `$FOO`. The updated test confirms these values are transformed correctly.

### **Build and config behavior is clearer**
Docs were updated to spell out that `build.cssTarget` takes precedence over `css.lightningcss.targets` when Lightning CSS minifies output, and Rolldown configs now load `package.json` via JSON import attributes instead of manual file parsing.

### Other misc changes
- VitePress was pinned to fix the docs language switcher.
- Build, SSR, and middleware docs received wording and type corrections, including Rolldown terminology updates.
- Minor test, TypeScript, and docs-tooling cleanup landed across the week.
