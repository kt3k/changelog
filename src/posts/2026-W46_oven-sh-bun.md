---
date: 2026-11-15
repo: oven-sh/bun
period: weekly
slug: 2026-W46
period_label: "Nov 9–15, 2026"
size: L
title: "Bun slashes unsafe ownership while pushing AOT forward"
excerpt: "A week of major runtime refactors, deeper AOT compiler coverage, stricter install/tar behavior, and several security/correctness fixes."
commits: 89
---

### **Runtime safety gets a broad ownership overhaul**
Bun spent most of the week replacing raw pointers, manual cleanup paths, and handwritten callback tables with typed owners, enums, trait objects, and reference-counted handles across the watcher, bundler, VM/dev server, HTTP, DNS, streams, and event-loop code. The result is a large reduction in `unsafe` plumbing and a cleaner lifetime model across core subsystems, with several leak/UAF classes eliminated along the way.

### **AOT compiler keeps expanding and stabilizing**
The experimental `--aot` path saw repeated upgrades to reach analysis, embedding rules, module resolution, diagnostics, and runtime behavior. Over the week it gained support for more bundles, built-ins, async error handling, mocked file awaits, class/parameter edge cases, and broader test-run coverage, while also fixing miscompilations around `eval`, parameter defaults, file writes, and indirect package/file discovery.

### **Security and correctness fixes tighten low-level behavior**
A number of focused fixes landed in areas that can affect safety or observable correctness: macro expansion is now blocked in `data:` URL modules, Windows `bun run`/`bunx` rejects command metacharacters for `.cmd`/`.bat` bins, and safe wrappers around simdutf/Highway/picohttpparser now validate slice lengths. The week also included fixes for HTTP request head resumption, HTTP/2 and DNS borrow/timing issues, SQL message lifetimes, and BoringSSL handle ownership.

### **Install/tar and npm compatibility got stricter**
Install-time and archive handling were hardened to better match npm behavior and reduce ambiguity. Bun now pins vendored test suites by exact commit as well as tag, tar extraction logic is stricter about headers and dependency bins, and npm-mode tar parsing was tightened around filenames and gzip-layer expectations.

### **CSS and bundler correctness improved**
Bundler work focused on preserving CSS layer ordering in rare hoisting/non-stylesheet cases and tightening CSS AST lifetime tracking to let the borrow checker enforce invariants that were previously only documented in comments. Later in the week, CSS chunk printing also picked up correctness work alongside broader bundler ownership refactors.

### **Release, engine, and test infrastructure moved forward**
Bun updated its embedded WebKit/JSC snapshot multiple times, added more baseline/platform allowlists, and improved release CI so branches are checked more carefully and drafts are produced more cleanly. Test and benchmark infrastructure also got AOT-oriented reshaping, plus assorted harness cleanup and new regression coverage.

### **Other misc changes**
Version bumps and LATEST updates, Windows sysroot/build fixes, CLI/test plumbing cleanups, docs refreshes, dependency/config churn, and assorted internal refactors across AST, parser, and runtime code.
