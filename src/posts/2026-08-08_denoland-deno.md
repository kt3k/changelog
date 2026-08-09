---
date: 2026-08-08
repo: denoland/deno
size: M
title: "Desktop HMR now gets real runtime APIs"
excerpt: "Deno desktop now runs Vite-based HMR dev servers on the desktop runtime thread, fixing missing BrowserWindow/Tray/Dock access."
commits: 1
authors: [crowlKats]
commit_authors: {"98dc759": crowlKats}
---

### **Desktop HMR dev servers now run inside the desktop runtime** (98dc759)
`deno desktop --hmr` previously spawned framework dev servers as a plain subprocess, which meant server-side code could not see desktop globals like `Deno.BrowserWindow`, `Deno.Tray`, or `Deno.Dock`. This change moves the HMR server execution onto the desktop runtime itself, aligning dev behavior with compiled apps and fixing framework cases like SvelteKit endpoints and Vite SSR handlers.

It also adds a dedicated runtime thread with a larger stack, avoiding macOS stack overflows/SIGBUS crashes on deep module graphs during synchronous parsing.

### Other misc changes
- None
