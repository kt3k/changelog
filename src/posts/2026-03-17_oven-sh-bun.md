---
date: 2026-03-17
repo: oven-sh/bun
size: L
title: "Bun gets cron jobs and debugger fixes"
excerpt: "Major new cron API lands, alongside bundler, install, and inspector fixes plus a macOS puppeteer workaround."
commits: 6
authors: [robobun, Jarred-Sumner]
commit_authors: {"af24e28": robobun, "1d50d64": robobun, "5693fc1": robobun, "047cedb": Jarred-Sumner, "47826b3": robobun, "1628bfe": Jarred-Sumner}
---

### **Bun.cron lands for OS-level scheduling and parsing** (1628bfe)
Bun now exposes a full `Bun.cron` API to register OS-level cron jobs, remove them, and parse cron expressions into the next matching UTC `Date`. The release adds runtime support, type definitions, parser implementation, and extensive docs/tests, making scheduled jobs a first-class part of Bun.

### **Security scanner install failures now report diagnostics** (af24e28)
`bun install` no longer exits silently when the security scanner hits an error. The installer now prints specific messages for the main failure paths, which should make CI and partial-install issues much easier to debug.

### **Bundler now preserves star imports through barrel re-exports** (47826b3)
Fixes a regression where barrel optimization could drop exports when a namespace import was re-exported from a side-effect-free barrel. The bundler now propagates the star-import flag correctly, preventing missing symbols in bundled output.

### **Debugger mode disables the runtime transpiler cache** (5693fc1)
When the inspector is active, Bun now disables the runtime transpiler cache so the printer still runs and emits the inline source map data the debugger needs. This fixes breakpoint line-number drift for larger files, especially in VSCode/debug-terminal workflows.

### **macOS Next.js puppeteer tests switch to headless shell** (1d50d64)
The Next.js integration test now uses Puppeteer’s `headless: "shell"` mode on macOS, avoiding Gatekeeper issues with the full Chrome for Testing bundle. The test harness also retries with a longer delay and tightens binary permission/quarantine cleanup on macOS.

### Other misc changes
- Removed the Buildkite benchmark upload step (047cedb)
